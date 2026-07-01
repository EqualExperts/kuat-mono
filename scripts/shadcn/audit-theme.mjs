#!/usr/bin/env node
/**
 * audit-theme — the theme-INTEGRITY gate (companion to audit-coverage).
 *
 * audit-coverage checks token NAMES: does every token a component consumes exist
 * in the contract. That misses the failure a Kuat consumer is most likely to hit:
 * `shadcn init` appends its own `:root`/`.dark` blocks AFTER the kuat-core import,
 * so at equal specificity they win the cascade and every semantic token silently
 * resolves to shadcn's default theme instead of Kuat's — while name-coverage stays
 * green (the "shadowed token" failure; see docs/shadcn/report-shadcn-step-1.md).
 *
 * This check resolves the consumer's EFFECTIVE `:root`/`.dark` values (kuat-core
 * baseline + the consumer's own blocks, last-declaration-wins) and diffs each
 * semantic token against the authored value the contract ships
 * (semanticTokens[t].light / .dark). Comparison is by resolved COLOUR, not text,
 * so oklch(1 0 0) vs oklch(1.0 0.0 0.0) is correctly "intact".
 *
 * Reports ✅ intact / ⚠️ OVERRIDDEN (authored → effective) per token+mode, and
 * exits non-zero if anything overrides Kuat's authored value. Remediation: don't
 * run `shadcn init` in a Kuat app (it writes a rival theme) — use the Kuat
 * components.json preset, or strip shadcn's appended :root/.dark blocks.
 *
 * Zero runtime deps; CI-runnable.
 *   Usage:  pnpm shadcn:audit-theme -- <global-css-file-or-dir> [--contract <path>]
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { parseDecls, resolve, toLinearRgb } from "../tokens/lib/css-color.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");

function fail(msg) {
  console.error(msg);
  process.exit(2);
}

/** Resolve a file via the consumer's node_modules, with a repo fallback. */
function resolveFrom(specifier, repoFallback) {
  try {
    return createRequire(path.join(process.cwd(), "noop.js")).resolve(specifier);
  } catch {
    return fs.existsSync(repoFallback) ? repoFallback : null;
  }
}

function loadContract(flagPath) {
  const p =
    (flagPath && path.resolve(process.cwd(), flagPath)) ||
    resolveFrom("@equal-experts/kuat-core/token-contract.json", path.join(REPO_ROOT, "packages/kuat-core/token-contract.json"));
  if (!p || !fs.existsSync(p)) fail("audit-theme: no token-contract.json found. Pass --contract <path> or install @equal-experts/kuat-core.");
  return { contract: JSON.parse(fs.readFileSync(p, "utf8")), from: p };
}

function loadBaselineCss() {
  const p = resolveFrom(
    "@equal-experts/kuat-core/variables.css",
    path.join(REPO_ROOT, "packages/kuat-core/src/variables.css"),
  );
  if (!p || !fs.existsSync(p)) fail("audit-theme: could not resolve @equal-experts/kuat-core/variables.css (the authored baseline).");
  return fs.readFileSync(p, "utf8");
}

/** Return the body of every `selector { … }` block, in document order. Depth-aware. */
function findBlocks(css, selector) {
  const bodies = [];
  let from = 0;
  for (;;) {
    const at = css.indexOf(selector, from);
    if (at === -1) break;
    const brace = css.indexOf("{", at);
    if (brace === -1) break;
    // Only whitespace/commas may sit between the selector and its brace, so
    // `.dark {` matches but `.darker {` / `--dark: …` do not.
    if (!/^[\s,]*$/.test(css.slice(at + selector.length, brace))) {
      from = at + selector.length;
      continue;
    }
    let depth = 0;
    let i = brace;
    for (; i < css.length; i += 1) {
      if (css[i] === "{") depth += 1;
      else if (css[i] === "}") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    bodies.push(css.slice(brace + 1, i));
    from = i + 1;
  }
  return bodies;
}

/** Same resolved colour? Compare in linear RGB so oklch(1 0 0) == oklch(1.0 0.0 0.0). */
function sameColour(a, b) {
  if (a == null || b == null) return a === b;
  const la = toLinearRgb(a);
  const lb = toLinearRgb(b);
  if (la && lb) return la.every((c, i) => Math.abs(c - lb[i]) < 1e-3);
  return a.trim().replace(/\s+/g, " ") === b.trim().replace(/\s+/g, " ");
}

function main() {
  const argv = process.argv.slice(2);
  let contractFlag = null;
  const targets = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--contract") contractFlag = argv[(i += 1)];
    else if (a !== "--" && !a.startsWith("--")) targets.push(a);
  }
  if (!targets.length) fail("audit-theme: no target CSS given.\n  Usage: pnpm shadcn:audit-theme -- <global-css-file-or-dir>");

  const { contract, from } = loadContract(contractFlag);
  const baseline = loadBaselineCss();

  // Gather the consumer's own CSS (the file(s) that import kuat-core and may carry
  // rival :root/.dark blocks).
  const cssFiles = [];
  for (const t of targets) {
    if (!fs.existsSync(t)) fail(`audit-theme: target not found: ${t}`);
    if (fs.statSync(t).isFile()) cssFiles.push(t);
    else
      cssFiles.push(
        ...fs
          .readdirSync(t, { recursive: true })
          .map((r) => path.join(t, r))
          .filter((p) => path.extname(p) === ".css" && fs.statSync(p).isFile()),
      );
  }
  if (!cssFiles.length) fail("audit-theme: no .css files found in target.");
  const consumerCss = cssFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");

  // Cascade order: kuat-core baseline first, then the consumer's blocks.
  const baseRoot = findBlocks(baseline, ":root");
  const baseDark = findBlocks(baseline, ".dark");
  const consRoot = findBlocks(consumerCss, ":root");
  const consDark = findBlocks(consumerCss, ".dark");

  const build = (blocks) => {
    const m = new Map();
    for (const b of blocks) for (const [k, v] of parseDecls(b)) m.set(k, v); // last wins
    return m;
  };
  // Light mode: all :root, in order. Dark mode: all :root then all .dark, in order.
  const lightMap = build([...baseRoot, ...consRoot]);
  const darkMap = build([...baseRoot, ...baseDark, ...consRoot, ...consDark]);

  // Which semantic tokens did the CONSUMER redeclare (the smoking gun)?
  const consumerDeclared = new Set([...build(consRoot).keys(), ...build(consDark).keys()]);

  const results = [];
  for (const token of contract.semanticVocabulary) {
    const authored = contract.semanticTokens[token];
    for (const mode of ["light", "dark"]) {
      const eff = resolve(token, mode === "light" ? lightMap : darkMap);
      const intact = sameColour(authored[mode], eff);
      results.push({ token, mode, authored: authored[mode], eff, intact, redeclared: consumerDeclared.has(token) });
    }
  }

  const drift = results.filter((r) => !r.intact);
  console.log(`shadcn theme-integrity audit — ${cssFiles.length} css file(s): ${cssFiles.map((f) => path.relative(process.cwd(), f)).join(", ")}`);
  console.log(`  contract: ${path.relative(process.cwd(), from)} (kuat-core ${contract.version})\n`);

  if (!drift.length) {
    console.log(`✓ all ${contract.semanticVocabulary.length} semantic tokens resolve to Kuat's authored values in light and dark.`);
    return;
  }

  for (const r of drift.sort((a, b) => a.token.localeCompare(b.token) || a.mode.localeCompare(b.mode))) {
    console.log(`  ⚠️  --${r.token.padEnd(30)} [${r.mode.padEnd(5)}] OVERRIDDEN  Kuat: ${r.authored ?? "(none)"}  →  now: ${r.eff ?? "(unresolved)"}`);
  }
  const tokens = [...new Set(drift.map((r) => r.token))];
  console.error(
    `\n✗ ${tokens.length} semantic token(s) no longer resolve to Kuat's theme: ${tokens.join(", ")}.\n` +
      `  Something (usually \`shadcn init\`) redeclared them AFTER the kuat-core import and won the cascade.\n` +
      `  Fix: don't run \`shadcn init\` in a Kuat app — use the Kuat components.json preset, or remove the\n` +
      `  rival :root/.dark blocks from your global stylesheet so kuat-core's values apply.`,
  );
  process.exit(1);
}

main();
