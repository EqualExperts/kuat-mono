#!/usr/bin/env node
/**
 * generate-token-contract — emit packages/kuat-core/token-contract.json, the
 * machine-readable record of exactly which shadcn semantic tokens kuat-core
 * defines in BOTH light and dark, plus the `--color-*` utility each one backs.
 *
 * This is the conflict guard for the shadcn add path: the contract is the single
 * list the coverage audit (scripts/shadcn/audit-coverage.mjs) diffs an added
 * component's consumed tokens against, so a third-party item that resolves to a
 * shadcn default instead of a Kuat token is surfaced rather than shipped.
 *
 * SOURCE OF TRUTH is packages/kuat-core/src/variables.css — NOT colors.tokens.json.
 * The semantic + light/dark blocks are hand-owned in variables.css (they reference
 * the brand-scale vars via var()); only the brand palettes come from the upstream
 * token SoT. So the contract is generated from the CSS, mirroring the deterministic
 * + `--check` drift conventions of generate-variables.mjs / contrast-check.mjs.
 *
 * Modes:
 *   (default)  rewrite packages/kuat-core/token-contract.json
 *   --check    regenerate in memory, diff vs the committed file, exit 1 on drift
 *
 * Output is DETERMINISTIC (sorted, no timestamps) so --check is stable.
 *
 * Usage:  node scripts/tokens/generate-token-contract.mjs [--check]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDecls, resolve, stripDarkBlock } from "./lib/css-color.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const CSS_PATH = path.join(REPO_ROOT, "packages/kuat-core/src/variables.css");
const PKG_PATH = path.join(REPO_ROOT, "packages/kuat-core/package.json");
const OUT_PATH = path.join(REPO_ROOT, "packages/kuat-core/token-contract.json");

/**
 * The shadcn v4 semantic vocabulary kuat-core owns. Data, not prose: this is the
 * exact list the contract must cover in light + dark. Order here is the order the
 * contract emits (deterministic).
 */
const SHADCN_SEMANTIC = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

function die(msg) {
  console.error(msg);
  process.exit(1);
}

/** Isolate the body of the `@theme inline { … }` block (depth-aware brace match). */
function themeInlineBody(css) {
  const at = css.indexOf("@theme inline");
  if (at === -1) return "";
  const brace = css.indexOf("{", at);
  let depth = 0;
  let i = brace;
  for (; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  return css.slice(brace + 1, i);
}

/** Map every `--color-<util>: var(--<token>)` registration → { util: token }. */
function parseColorUtilities(themeCss) {
  const map = {};
  const re = /--color-([\w-]+)\s*:\s*var\(\s*--([\w-]+)\s*\)/g;
  let m;
  while ((m = re.exec(themeCss))) {
    map[m[1]] = m[2];
  }
  return map;
}

/** Render the canonical token-contract.json string for the given variables.css. */
function renderContract(css, version) {
  const { light, dark } = stripDarkBlock(css);
  const lightDecls = parseDecls(light); // everything outside .dark (incl. @theme + brand scales)
  const darkDecls = parseDecls(dark); // ONLY what .dark re-declares
  const darkResolved = new Map(lightDecls); // dark cascade = light ∪ dark overrides
  for (const [k, v] of darkDecls) darkResolved.set(k, v);

  const colorUtilities = parseColorUtilities(themeInlineBody(light));

  // Reverse the registration map so we can name the utility a token backs
  // (registrations are `--color-X: var(--X)`, so util name == token name).
  const utilityOf = {};
  for (const [util, token] of Object.entries(colorUtilities)) utilityOf[token] = util;

  const semanticTokens = {};
  for (const token of SHADCN_SEMANTIC) {
    const lightPresent = lightDecls.has(token);
    const darkPresent = darkDecls.has(token);
    semanticTokens[token] = {
      lightPresent,
      darkPresent,
      light: lightPresent ? resolve(token, lightDecls) : null,
      dark: lightPresent || darkPresent ? resolve(token, darkResolved) : null,
      backsUtility: utilityOf[token] ?? null,
    };
  }

  // Sort colorUtilities keys for deterministic output.
  const sortedUtilities = {};
  for (const util of Object.keys(colorUtilities).sort()) sortedUtilities[util] = colorUtilities[util];

  // The full authored kuat-core vocabulary (light ∪ dark), excluding the
  // `--color-*` @theme mirrors (those are derived, not authored). This is what
  // lets the audit tell a legitimate raw `var(--slate-950)` from a fabricated
  // `var(--frobnicate)` — a token is "inherited" if Kuat defines it at all.
  const definedVariables = [...new Set([...lightDecls.keys(), ...darkDecls.keys()])]
    .filter((name) => !name.startsWith("color-"))
    .sort();

  const contract = {
    $generated:
      "DO NOT HAND-EDIT — generated from packages/kuat-core/src/variables.css. Run `pnpm tokens:contract:generate`.",
    source: "packages/kuat-core/src/variables.css",
    version,
    semanticVocabulary: SHADCN_SEMANTIC,
    semanticTokens,
    colorUtilities: sortedUtilities,
    definedVariables,
  };
  return `${JSON.stringify(contract, null, 2)}\n`;
}

function main() {
  const check = process.argv.includes("--check");
  if (!fs.existsSync(CSS_PATH)) die(`token-contract: source not found at ${path.relative(REPO_ROOT, CSS_PATH)}`);
  const css = fs.readFileSync(CSS_PATH, "utf8");
  const { version } = JSON.parse(fs.readFileSync(PKG_PATH, "utf8"));
  const generated = renderContract(css, version);
  const rel = path.relative(REPO_ROOT, OUT_PATH);

  if (check) {
    const current = fs.existsSync(OUT_PATH) ? fs.readFileSync(OUT_PATH, "utf8") : "";
    if (current === generated) {
      console.log(`tokens:contract:check ok — ${rel} matches variables.css`);
      process.exit(0);
    }
    console.error(`tokens:contract:check FAILED — ${rel} has drifted from variables.css.`);
    console.error(`Run \`pnpm tokens:contract:generate\` (don't hand-edit ${rel}).`);
    const a = current.split("\n");
    const b = generated.split("\n");
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        console.error(`  first diff at line ${i + 1}:`);
        console.error(`    committed:  ${a[i] ?? "(missing)"}`);
        console.error(`    generated:  ${b[i] ?? "(missing)"}`);
        break;
      }
    }
    process.exit(1);
  }

  fs.writeFileSync(OUT_PATH, generated, "utf8");
  const { semanticTokens } = JSON.parse(generated);
  const missing = SHADCN_SEMANTIC.filter((t) => !semanticTokens[t].lightPresent);
  const darkGaps = SHADCN_SEMANTIC.filter((t) => semanticTokens[t].lightPresent && !semanticTokens[t].darkPresent);
  console.log(
    `tokens:contract:generate — wrote ${rel} (${SHADCN_SEMANTIC.length} semantic tokens) from ${path.relative(REPO_ROOT, CSS_PATH)}`,
  );
  if (missing.length) console.warn(`  ⚠ ${missing.length} token(s) not defined at all: ${missing.join(", ")}`);
  if (darkGaps.length) console.warn(`  ⚠ ${darkGaps.length} token(s) light-only (no .dark declaration): ${darkGaps.join(", ")}`);
  if (!missing.length && !darkGaps.length) console.log(`  ✓ every semantic token defined in light and dark.`);
}

main();
