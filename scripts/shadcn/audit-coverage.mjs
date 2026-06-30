#!/usr/bin/env node
/**
 * audit-coverage — the shadcn/third-party token-coverage gate.
 *
 * Given a just-added shadcn or third-party component/block (a file or dir), this
 * enumerates every Kuat token it consumes — raw `var(--x)` refs AND the Tailwind
 * token utilities (`bg-/text-/border-/ring-/fill-*`) that map to a `--color-*` —
 * and diffs them against the generated token contract
 * (@equal-experts/kuat-core/token-contract.json):
 *
 *   ✅ inherited   — Kuat defines the token (semantic in light+dark, or any
 *                    authored kuat-core variable / brand scale)
 *   ⚠️ missing     — Kuat doesn't define it; on shadcn defaults it would silently
 *                    diverge from the brand. (BLOCKS)
 *   ⚠️ dark-gap    — semantic token defined in light only, no `.dark` value. (BLOCKS)
 *
 * It also prints a WCAG contrast note for any foreground/surface pair the item
 * uses together (e.g. primary + primary-foreground), in both light and dark.
 *
 * Exits non-zero on any missing or dark-gap token. Remediation: add the token to
 * kuat-core (variables.css, light AND dark) so every consumer inherits it — never
 * leave it on a shadcn default — or add an explicit local mapping.
 *
 * Zero runtime deps; CI-runnable.  Usage:  pnpm shadcn:audit -- <path> [--contract <path>]
 *
 * TODO(R4): an editor-time ESLint rule should wrap this same enumerate→diff logic
 * so coverage is enforced as-you-type, not only in CI. (R4 is a still-open
 * decision — do not build the plugin here; this is the seam.)
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { contrast, foregroundOf } from "../tokens/lib/css-color.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");

const SCAN_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".vue", ".css", ".html", ".svelte", ".astro"]);
const UTILITY_PREFIXES = ["bg", "text", "border", "ring", "fill"];
const AA = 4.5;
const AA_LARGE = 3.0;

function fail(msg) {
  console.error(msg);
  process.exit(2);
}

/** Resolve the token contract: --contract flag → installed kuat-core → repo copy. */
function loadContract(flagPath) {
  const candidates = [];
  if (flagPath) candidates.push(path.resolve(process.cwd(), flagPath));
  try {
    const require = createRequire(path.join(process.cwd(), "noop.js"));
    candidates.push(require.resolve("@equal-experts/kuat-core/token-contract.json"));
  } catch {
    /* not installed — fall through to the repo copy */
  }
  candidates.push(path.join(REPO_ROOT, "packages/kuat-core/token-contract.json"));

  for (const p of candidates) {
    if (p && fs.existsSync(p)) return { contract: JSON.parse(fs.readFileSync(p, "utf8")), from: p };
  }
  fail(
    `audit: no token-contract.json found. Looked at:\n${candidates.map((c) => `  - ${c}`).join("\n")}\n` +
      `  Generate it with \`pnpm tokens:contract:generate\`, or pass --contract <path>.`,
  );
}

function collectFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs
    .readdirSync(target, { recursive: true })
    .map((rel) => path.join(target, rel))
    .filter((p) => SCAN_EXT.has(path.extname(p)) && fs.statSync(p).isFile());
}

/**
 * Enumerate the tokens a source string consumes.
 * Returns Map(token → Set(evidence)) where token is the underlying kuat-core
 * variable name (e.g. `primary`, `muted-foreground`, `ee-blue-500`).
 */
function enumerateTokens(src, colorUtilities) {
  const found = new Map();
  const add = (token, evidence) => {
    if (!found.has(token)) found.set(token, new Set());
    found.get(token).add(evidence);
  };

  // Raw var(--x) references.
  for (const m of src.matchAll(/var\(\s*--([A-Za-z0-9-]+)/g)) {
    add(m[1], `var(--${m[1]})`);
  }

  // Tailwind colour utilities that map to a --color-* registration. The lookbehind
  // keeps us off mid-word matches; arbitrary values (`bg-[…]`) and opacity (`/50`)
  // are naturally excluded by the character class.
  const utilRe = new RegExp(`(?<![A-Za-z0-9-])(${UTILITY_PREFIXES.join("|")})-([A-Za-z0-9][A-Za-z0-9-]*)`, "g");
  for (const m of src.matchAll(utilRe)) {
    const [, prefix, name] = m;
    const token = colorUtilities[name];
    if (token) add(token, `${prefix}-${name}`);
  }

  return found;
}

function classify(token, contract) {
  const sem = contract.semanticTokens[token];
  if (sem) {
    if (sem.lightPresent && !sem.darkPresent) return "dark-gap";
    if (sem.lightPresent || sem.darkPresent) return "inherited";
    return "missing";
  }
  if (contract.definedVariables.includes(token)) return "inherited";
  if (token.startsWith("color-")) return "inherited"; // direct @theme mirror reference
  return "missing";
}

function main() {
  const argv = process.argv.slice(2);
  const flagIdx = argv.indexOf("--contract");
  const contractFlag = flagIdx !== -1 ? argv[flagIdx + 1] : null;
  const targets = argv.filter((a, i) => a !== "--contract" && i !== flagIdx + 1 && !a.startsWith("--"));

  if (!targets.length) fail("audit: no target path given.\n  Usage: pnpm shadcn:audit -- <file-or-dir> [--contract <path>]");

  const { contract, from } = loadContract(contractFlag);

  // Aggregate tokens across all scanned files.
  const tokens = new Map(); // token → Set(evidence)
  let fileCount = 0;
  for (const target of targets) {
    if (!fs.existsSync(target)) fail(`audit: target not found: ${target}`);
    for (const file of collectFiles(target)) {
      fileCount += 1;
      const src = fs.readFileSync(file, "utf8");
      for (const [token, evidence] of enumerateTokens(src, contract.colorUtilities)) {
        if (!tokens.has(token)) tokens.set(token, new Set());
        for (const e of evidence) tokens.get(token).add(e);
      }
    }
  }

  const buckets = { inherited: [], missing: [], "dark-gap": [] };
  for (const [token, evidence] of tokens) {
    buckets[classify(token, contract)].push({ token, evidence: [...evidence].sort() });
  }
  for (const b of Object.values(buckets)) b.sort((a, z) => a.token.localeCompare(z.token));

  // Report.
  console.log(
    `shadcn token-coverage audit — ${tokens.size} token(s) across ${fileCount} file(s) in ${targets.join(", ")}`,
  );
  console.log(`  contract: ${path.relative(process.cwd(), from)} (kuat-core ${contract.version})\n`);

  const MARK = { inherited: "✅", missing: "⚠️ ", "dark-gap": "⚠️ " };
  const LABEL = { inherited: "inherited", missing: "MISSING in Kuat", "dark-gap": "LIGHT-ONLY (dark gap)" };
  for (const kind of ["inherited", "dark-gap", "missing"]) {
    for (const { token, evidence } of buckets[kind]) {
      console.log(`  ${MARK[kind]} --${token.padEnd(34)} ${LABEL[kind].padEnd(22)} (${evidence.join(", ")})`);
    }
  }

  // Contrast notes on any fg/bg pair the item uses together.
  const used = new Set(tokens.keys());
  const notes = [];
  for (const token of used) {
    const base = foregroundOf(token);
    if (!base || !used.has(base)) continue;
    const fg = contract.semanticTokens[token];
    const bg = contract.semanticTokens[base];
    if (!fg || !bg) continue;
    for (const mode of ["light", "dark"]) {
      const ratio = fg[mode] && bg[mode] ? contrast(fg[mode], bg[mode]) : null;
      if (ratio == null) continue;
      const mark = ratio < AA_LARGE ? "✗" : ratio < AA ? "!" : "✓";
      notes.push(`  ${mark} [${mode.padEnd(5)}] ${base} / ${token}: ${ratio.toFixed(2)}:1`);
    }
  }
  if (notes.length) {
    console.log(`\ncontrast (foreground/surface pairs used together, hard ≥ ${AA_LARGE}:1, AA ≥ ${AA}:1):`);
    for (const n of notes.sort()) console.log(n);
  }

  // Verdict.
  const blocking = buckets.missing.length + buckets["dark-gap"].length;
  if (blocking) {
    console.error(
      `\n✗ ${buckets.missing.length} missing + ${buckets["dark-gap"].length} dark-gap token(s). ` +
        `Add each to kuat-core variables.css (light AND dark) so every consumer inherits it — ` +
        `never leave it on a shadcn default — or add an explicit local mapping.`,
    );
    process.exit(1);
  }
  console.log(`\n✓ every consumed token is inherited from kuat-core in both light and dark.`);
}

main();
