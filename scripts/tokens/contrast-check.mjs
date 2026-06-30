#!/usr/bin/env node
/**
 * WCAG AA contrast guardrail for Kuat semantic tokens.
 *
 * Parses packages/kuat-core/src/variables.css, resolves every
 * (--x, --x-foreground) pair in BOTH light (:root) and dark (.dark) modes, and
 * asserts each meets the WCAG AA contrast ratio. Catches the class of bug where
 * a foreground token is copied verbatim from light into .dark and lands on a
 * same-tone surface (invisible text).
 *
 * Policy (two bands):
 *   - HARD FAIL (exit 1) below 3:1 — fails WCAG AA for *all* content, including
 *     large text and UI components. This is the invisible-text bug class.
 *   - WARN between 3:1 and 4.5:1 — passes AA only for large text (≥18pt / 14pt
 *     bold) and UI components. Fine for buttons/brand surfaces; confirm the
 *     token isn't used for body copy. Non-blocking.
 *
 * Run: node scripts/tokens/contrast-check.mjs   (exits 1 only on HARD failures)
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { contrast, foregroundOf as FOREGROUND_OF, parseDecls, resolve, stripDarkBlock } from "./lib/css-color.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");
const cssPath = path.join(repoRoot, "packages/kuat-core/src/variables.css");

const AA = 4.5; // WCAG AA, normal text
const AA_LARGE = 3.0; // WCAG AA, large text / UI components — hard floor

function checkMode(label, map) {
  const results = [];
  for (const name of map.keys()) {
    if (name.startsWith("color-")) continue; // @theme mirrors of the base tokens
    const base = FOREGROUND_OF(name);
    if (!base || !map.has(base)) continue;
    const fg = resolve(name, map);
    const bg = resolve(base, map);
    if (!fg || !bg) continue;
    const ratio = contrast(fg, bg);
    if (ratio == null) continue; // non-colour (e.g. chart hex with no pair) — skip
    results.push({ pair: `${base} / ${name}`, mode: label, ratio });
  }
  return results;
}

const css = await readFile(cssPath, "utf8");
const { light, dark } = stripDarkBlock(css);
const lightMap = parseDecls(light);
const darkMap = new Map(lightMap);
for (const [k, v] of parseDecls(dark)) darkMap.set(k, v);

const all = [...checkMode("light", lightMap), ...checkMode("dark", darkMap)].sort((a, b) => a.ratio - b.ratio);
const failures = all.filter((r) => r.ratio < AA_LARGE);
const warnings = all.filter((r) => r.ratio >= AA_LARGE && r.ratio < AA);

console.log(`Kuat token contrast check — ${all.length} foreground/surface pairs (hard ≥ ${AA_LARGE}:1, AA ≥ ${AA}:1)\n`);
for (const r of all) {
  const mark = r.ratio < AA_LARGE ? "✗" : r.ratio < AA ? "!" : "✓";
  console.log(`  ${mark} [${r.mode.padEnd(5)}] ${r.pair.padEnd(46)} ${r.ratio.toFixed(2)}:1`);
}

if (warnings.length) {
  console.log(
    `\n! ${warnings.length} pair(s) pass AA only for large text / UI components (${AA_LARGE}–${AA}:1). ` +
      `OK for buttons/brand surfaces; don't use them for body copy.`,
  );
}
if (failures.length) {
  console.error(`\n✗ ${failures.length} pair(s) below ${AA_LARGE}:1 — fails AA for all content. Fix the token values in variables.css.`);
  process.exit(1);
}
console.log(`\n✓ no pair is below the ${AA_LARGE}:1 hard floor.`);
