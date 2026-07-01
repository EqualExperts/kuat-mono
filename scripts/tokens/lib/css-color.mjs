/**
 * css-color — shared CSS-variable parsing + colour/contrast helpers for the
 * token scripts (contrast-check, generate-token-contract, the shadcn audit).
 *
 * These were originally private to scripts/tokens/contrast-check.mjs. They are
 * extracted here so the oklch→contrast maths and the variables.css parsing live
 * in ONE place — three scripts now reason about the same tokens the same way
 * (reuse, don't recreate). Behaviour is identical to the original contrast-check
 * implementation; that script's output is the regression baseline.
 *
 * All functions are pure (no I/O) so callers own how variables.css is read.
 */

/**
 * Split a variables.css string into its light scope (everything outside the
 * first `.dark { … }` block) and the raw body of that `.dark` block. Brace
 * matching is depth-aware so nested `{ … }` (e.g. @theme inline) is handled.
 */
export function stripDarkBlock(css) {
  // Drop comments first so a `.dark` / `:root` mentioned in prose can't be
  // mistaken for a selector. Downstream only reads `--x: y;` decls, so removing
  // comments is safe and keeps parsing robust.
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
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

/** Parse all `--name: value;` declarations in a scope into a Map(name → value). */
export function parseDecls(scopeCss) {
  const map = new Map();
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(scopeCss))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

/** Resolve a token to its final literal, following `var(--x)` chains. */
export function resolve(name, map, seen = new Set()) {
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
export function oklchToLinearRgb(L, C, H) {
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

/** Parse a resolved colour literal (oklch(...) or #rrggbb) to linear-light sRGB. */
export function toLinearRgb(value) {
  const oklch = value.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/i);
  if (oklch) return oklchToLinearRgb(Number(oklch[1]), Number(oklch[2]), Number(oklch[3]));

  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [srgbToLinear((n >> 16) / 255), srgbToLinear(((n >> 8) & 255) / 255), srgbToLinear((n & 255) / 255)];
  }
  return null;
}

export function luminance(linearRgb) {
  const [r, g, b] = linearRgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two resolved colour literals, or null if non-colour. */
export function contrast(v1, v2) {
  const a = toLinearRgb(v1);
  const b = toLinearRgb(v2);
  if (!a || !b) return null;
  const L1 = luminance(a);
  const L2 = luminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

/**
 * Given a token name, return the name of the surface it sits on — i.e. the
 * base of a `*-foreground` token, with `foreground` itself paired to
 * `background`. Returns null for tokens that aren't a foreground.
 */
export function foregroundOf(name) {
  return name === "foreground"
    ? "background"
    : name.endsWith("-foreground")
      ? name.slice(0, -"-foreground".length)
      : null;
}
