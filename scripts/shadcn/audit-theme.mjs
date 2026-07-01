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
 * This check resolves the consumer's EFFECTIVE `:root`/`.dark` values and diffs each
 * semantic token against the authored value the contract ships
 * (semanticTokens[t].light / .dark). Comparison is by resolved COLOUR, not text,
 * so oklch(1 0 0) vs oklch(1.0 0.0 0.0) is correctly "intact".
 *
 * TWO MODES — because theme integrity is all about CASCADE ORDER:
 *   --entry <css>   Resolve @imports in true document order (kuat-core is one of
 *                   them). This is the ACCURATE mode and the only one that can
 *                   verify the "import kuat-core last so it wins" prevention setup.
 *   <file|dir>      Simpler mode: kuat-core baseline FIRST, then the target file's
 *                   own blocks — models "kuat imported first, something appended
 *                   after" (the classic shadcn-init clobber). Use when you don't
 *                   have/entry the full import chain.
 *
 * Exits non-zero on any override. Zero runtime deps; CI-runnable.
 *   Usage:  pnpm shadcn:audit-theme -- --entry src/index.css
 *           pnpm shadcn:audit-theme -- <global-css-file-or-dir>
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { parseDecls, resolve, toLinearRgb } from "../tokens/lib/css-color.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const require_ = createRequire(path.join(process.cwd(), "noop.js"));

function fail(msg) {
  console.error(msg);
  process.exit(2);
}

function resolveFrom(specifier, repoFallback) {
  try {
    return require_.resolve(specifier);
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

/** Inline every `@import` in document order (packages via node_modules, relative via fs). */
function expandImports(file, seen = new Set()) {
  const abs = path.resolve(file);
  if (seen.has(abs) || !fs.existsSync(abs)) return "";
  seen.add(abs);
  const dir = path.dirname(abs);
  return fs.readFileSync(abs, "utf8").replace(/@import\s+(?:url\()?["']([^"']+)["']\)?[^;]*;/g, (_m, spec) => {
    if (spec === "tailwindcss" || /^https?:/.test(spec)) return `/* skipped @import ${spec} */`;
    let target = null;
    if (spec.startsWith(".")) target = path.resolve(dir, spec);
    else {
      try {
        target = require_.resolve(spec); // consumer app: kuat-core is in node_modules
      } catch {
        // Repo fallback: @equal-experts/kuat-core isn't a root dep here, so map its
        // subpath exports (./variables.css → src/variables.css) to the workspace source.
        if (spec.startsWith("@equal-experts/kuat-core/"))
          target = path.join(REPO_ROOT, "packages/kuat-core/src", spec.slice("@equal-experts/kuat-core/".length));
      }
    }
    return target && fs.existsSync(target) ? expandImports(target, seen) : `/* unresolved @import ${spec} */`;
  });
}

/** Ordered list of `:root`/`.dark` block bodies, in document order. Depth-aware. */
function scanBlocks(css) {
  const out = [];
  let from = 0;
  for (;;) {
    const r = css.indexOf(":root", from);
    const d = css.indexOf(".dark", from);
    if (r === -1 && d === -1) break;
    const [at, type] = d === -1 || (r !== -1 && r < d) ? [r, ":root"] : [d, ".dark"];
    const brace = css.indexOf("{", at);
    if (brace === -1) break;
    if (!/^[\s,]*$/.test(css.slice(at + type.length, brace))) {
      from = at + type.length;
      continue;
    }
    let depth = 0;
    let i = brace;
    for (; i < css.length; i += 1) {
      if (css[i] === "{") depth += 1;
      else if (css[i] === "}" && (depth -= 1) === 0) break;
    }
    out.push({ type, body: css.slice(brace + 1, i) });
    from = i + 1;
  }
  return out;
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
  let entry = null;
  const targets = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--contract") contractFlag = argv[(i += 1)];
    else if (a === "--entry") entry = argv[(i += 1)];
    else if (a !== "--" && !a.startsWith("--")) targets.push(a);
  }

  const { contract, from } = loadContract(contractFlag);

  // Build the CSS to scan, in cascade order.
  let cssToScan;
  let sourceLabel;
  if (entry) {
    if (!fs.existsSync(entry)) fail(`audit-theme: --entry file not found: ${entry}`);
    cssToScan = expandImports(entry);
    sourceLabel = `entry ${path.relative(process.cwd(), entry)} (imports resolved in order)`;
    if (!/--ee-blue-500\s*:/.test(cssToScan))
      console.warn(`⚠ ${entry} doesn't appear to import @equal-experts/kuat-core/variables.css — can't verify Kuat's theme is applied.`);
  } else {
    if (!targets.length) fail("audit-theme: no target.\n  Usage: pnpm shadcn:audit-theme -- --entry src/index.css   (or a css file/dir)");
    const baseline = fs.readFileSync(
      resolveFrom("@equal-experts/kuat-core/variables.css", path.join(REPO_ROOT, "packages/kuat-core/src/variables.css")) ??
        fail("audit-theme: could not resolve kuat-core variables.css (the authored baseline)."),
      "utf8",
    );
    const files = [];
    for (const t of targets) {
      if (!fs.existsSync(t)) fail(`audit-theme: target not found: ${t}`);
      if (fs.statSync(t).isFile()) files.push(t);
      else files.push(...fs.readdirSync(t, { recursive: true }).map((r) => path.join(t, r)).filter((p) => path.extname(p) === ".css" && fs.statSync(p).isFile()));
    }
    if (!files.length) fail("audit-theme: no .css files found in target.");
    // kuat-core baseline first, then the target's own blocks (models kuat-imported-first).
    cssToScan = baseline + "\n" + files.map((f) => fs.readFileSync(f, "utf8")).join("\n");
    sourceLabel = `${files.length} css file(s): ${files.map((f) => path.relative(process.cwd(), f)).join(", ")}`;
  }

  const blocks = scanBlocks(cssToScan);
  const apply = (bodies) => {
    const m = new Map();
    for (const b of bodies) for (const [k, v] of parseDecls(b)) m.set(k, v);
    return m;
  };
  const lightMap = apply(blocks.filter((b) => b.type === ":root").map((b) => b.body));
  const darkMap = apply(blocks.map((b) => b.body)); // :root then .dark, in document order

  const drift = [];
  for (const token of contract.semanticVocabulary) {
    for (const mode of ["light", "dark"]) {
      const eff = resolve(token, mode === "light" ? lightMap : darkMap);
      if (!sameColour(contract.semanticTokens[token][mode], eff))
        drift.push({ token, mode, authored: contract.semanticTokens[token][mode], eff });
    }
  }

  console.log(`shadcn theme-integrity audit — ${sourceLabel}`);
  console.log(`  contract: ${path.relative(process.cwd(), from)} (kuat-core ${contract.version})\n`);

  if (!drift.length) {
    console.log(`✓ all ${contract.semanticVocabulary.length} semantic tokens resolve to Kuat's authored values in light and dark.`);
    return;
  }
  for (const r of drift.sort((a, b) => a.token.localeCompare(b.token) || a.mode.localeCompare(b.mode)))
    console.log(`  ⚠️  --${r.token.padEnd(30)} [${r.mode.padEnd(5)}] OVERRIDDEN  Kuat: ${r.authored ?? "(none)"}  →  now: ${r.eff ?? "(unresolved)"}`);
  const tokens = [...new Set(drift.map((r) => r.token))];
  console.error(
    `\n✗ ${tokens.length} semantic token(s) no longer resolve to Kuat's theme: ${tokens.join(", ")}.\n` +
      `  Something (usually \`shadcn init\`) redeclared them and won the cascade. Fix: don't run\n` +
      `  \`shadcn init\` in a Kuat app — use the Kuat components.json preset (import kuat-core last),\n` +
      `  or remove the rival :root/.dark blocks so kuat-core's values apply.`,
  );
  process.exit(1);
}

main();
