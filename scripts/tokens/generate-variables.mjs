#!/usr/bin/env node
/**
 * generate-variables — emit the brand-palette block of @equal-experts/kuat-core
 * src/variables.css FROM the upstream colour token source-of-truth.
 *
 * This is the DOWNSTREAM half of Phase 7's generate-tokens. The SoT lives upstream
 * in kuat-agent-rules (reference/design-language/tokens/colors.tokens.json) and the
 * upstream skills/scripts/generate-tokens.mjs owns colours.md. This script owns only
 * the value-bearing brand-palette block of kuat-core's variables.css — the 44
 * `--<scale>-<step>` vars between the GENERATED:brand-palettes sentinels. Everything
 * else in variables.css (support scales slate/red/indigo, semantic light/dark,
 * @theme inline, typography, shadows) is local and hand-owned: it references the
 * brand scale vars via var(), so it follows the SoT automatically.
 *
 * Source path: the SYNCED upstream cache (external/ is a gitignored local vendoring
 * cache — the repo's sync-then-use model). Run `pnpm agent-rules:sync` first.
 *
 * Modes:
 *   (default)  rewrite the sentinel block in variables.css
 *   --check    regenerate in memory, diff vs the committed file, exit 1 on drift
 *
 * Output is DETERMINISTIC (no timestamps) so --check is stable.
 *
 * Usage:  node scripts/tokens/generate-variables.mjs [--check]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");

const TOKENS_PATH = path.join(
  REPO_ROOT,
  "external/kuat-agent-rules/reference/design-language/tokens/colors.tokens.json",
);
const CSS_PATH = path.join(REPO_ROOT, "packages/kuat-core/src/variables.css");

const OPEN = "    /* GENERATED:brand-palettes (from colors.tokens.json — do not hand-edit; run `pnpm tokens:generate`) */";
const CLOSE = "    /* /GENERATED:brand-palettes */";
const INDENT = "    ";

// Brand scales (order + display names match the existing variables.css block).
const SCALES = [
  { key: "ee-blue", name: "EE Blue" },
  { key: "tech-blue", name: "Tech Blue" },
  { key: "transform-teal", name: "Transform Teal" },
  { key: "equal-ember", name: "Equal Ember" },
];
const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

function die(msg) {
  console.error(msg);
  process.exit(1);
}

if (!fs.existsSync(TOKENS_PATH)) {
  die(
    `tokens: source not found at ${path.relative(REPO_ROOT, TOKENS_PATH)}\n` +
      `  external/ is a synced cache — run \`pnpm agent-rules:sync\` first.`,
  );
}
const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf8"));

/** Render the brand-palette block exactly as it should appear between the sentinels. */
function renderBlock() {
  const scaleText = ({ key, name }) => {
    const scale = tokens.color?.[key];
    if (!scale) die(`tokens: missing color.${key} in the token file`);
    const lines = STEPS.map((step) => {
      const node = scale[step];
      if (!node) die(`tokens: missing color.${key}.${step}`);
      const oklch = node.$extensions?.oklch;
      const hex = node.$value;
      if (!oklch) die(`tokens: missing $extensions.oklch for color.${key}.${step}`);
      if (!/^#[0-9a-fA-F]{6}$/.test(hex ?? "")) die(`tokens: bad $value for color.${key}.${step}: ${hex}`);
      return `${INDENT}--${key}-${step}: ${oklch}; /* ${hex.toLowerCase()} */`;
    });
    return `${INDENT}/* ${name} palette */\n${lines.join("\n")}`;
  };
  return SCALES.map(scaleText).join("\n\n");
}

/** Splice the generated block between the sentinels in the given css text. */
function applyBlock(css) {
  const openIdx = css.indexOf(OPEN);
  const closeIdx = css.indexOf(CLOSE);
  if (openIdx === -1 || closeIdx === -1 || closeIdx < openIdx) {
    die(
      `tokens: sentinels not found in ${path.relative(REPO_ROOT, CSS_PATH)}\n` +
        `  expected an "${OPEN.trim()}" … "${CLOSE.trim()}" pair.`,
    );
  }
  const before = css.slice(0, openIdx + OPEN.length);
  const after = css.slice(closeIdx);
  return `${before}\n${renderBlock()}\n${after}`;
}

function main() {
  const check = process.argv.includes("--check");
  const current = fs.readFileSync(CSS_PATH, "utf8");
  const generated = applyBlock(current);
  const rel = path.relative(REPO_ROOT, CSS_PATH);

  if (check) {
    if (current === generated) {
      console.log(`tokens:check ok — ${rel} brand palettes match the token SoT`);
      process.exit(0);
    }
    console.error(`tokens:check FAILED — ${rel} brand palettes have drifted from colors.tokens.json.`);
    console.error(`Run \`pnpm tokens:generate\` (don't hand-edit the GENERATED block).`);
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

  fs.writeFileSync(CSS_PATH, generated, "utf8");
  console.log(`tokens:generate — wrote brand palettes into ${rel} from ${path.relative(REPO_ROOT, TOKENS_PATH)}`);
}

main();
