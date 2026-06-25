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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");
const cssPath = path.join(repoRoot, "packages/kuat-core/src/variables.css");

const AA = 4.5; // WCAG AA, normal text
const AA_LARGE = 3.0; // WCAG AA, large text / UI components — hard floor

/** Pairs are derived as (base, `${base}-foreground`); this maps the odd ones. */
const FOREGROUND_OF = (name) =>
  name === "foreground" ? "background" : name.endsWith("-foreground") ? name.slice(0, -"-foreground".length) : null;

function stripDarkBlock(css) {
  const start = css.indexOf(".dark");
  if (start === -1) return { light: css, dark: "" };
  const brace = css.indexOf("{", start);
  let depth = 0;
  let i = brace;
  for (; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  const dark = css.slice(brace + 1, i);
  const light = css.slice(0, start) + css.slice(i + 1);
  return { light, dark };
}

function parseDecls(scopeCss) {
  const map = new Map();
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(scopeCss))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

function resolve(name, map, seen = new Set()) {
  if (seen.has(name)) return null;
  seen.add(name);
  const value = map.get(name);
  if (!value) return null;
  const varMatch = value.match(/^var\(\s*--([\w-]+)\s*(?:,[^)]*)?\)$/);
  if (varMatch) return resolve(varMatch[1], map, seen);
  return value;
}

function clamp01(x) {
  return Math.min(1, Math.max(0, x));
}

/** OKLCH -> linear sRGB (returns linear-light channels, clamped to gamut). */
function oklchToLinearRgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return [
    clamp01(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    clamp01(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    clamp01(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Parse a resolved colour literal to linear-light sRGB. */
function toLinearRgb(value) {
  const oklch = value.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/i);
  if (oklch) return oklchToLinearRgb(Number(oklch[1]), Number(oklch[2]), Number(oklch[3]));

  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [srgbToLinear((n >> 16) / 255), srgbToLinear(((n >> 8) & 255) / 255), srgbToLinear((n & 255) / 255)];
  }
  return null;
}

function luminance(linearRgb) {
  const [r, g, b] = linearRgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(v1, v2) {
  const a = toLinearRgb(v1);
  const b = toLinearRgb(v2);
  if (!a || !b) return null;
  const L1 = luminance(a);
  const L2 = luminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

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
