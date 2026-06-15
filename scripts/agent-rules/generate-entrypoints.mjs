import { readFileSync, writeFileSync, lstatSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const repoRoot = resolve(scriptDir, "../..");

// AGENTS.md is hand-maintained (it owns the contributor load order and migration
// notes); only .cursorrules is generated from a template. CLAUDE.md is a symlink to
// AGENTS.md.
const CURSORRULES_OUT = resolve(repoRoot, ".cursorrules");
const CLAUDE_PATH = resolve(repoRoot, "CLAUDE.md");

const GENERATED_HEADER = (templatePath) =>
  [
    "<!-- AUTO-GENERATED FILE. -->",
    `<!-- Source: ${templatePath} -->`,
    "<!-- Regenerate with: pnpm agent-rules:generate -->",
    "",
  ].join("\n");

const toOutput = (templatePath, body) =>
  `${GENERATED_HEADER(templatePath)}${body.trimEnd()}\n`;

const mode = process.argv.includes("--check") ? "check" : "write";

function render(templateRelativePath) {
  const abs = resolve(repoRoot, templateRelativePath);
  const body = readFileSync(abs, "utf8");
  return toOutput(templateRelativePath, body);
}

function ensureFile(path, expected) {
  const current = readFileSync(path, "utf8");
  if (current !== expected) {
    throw new Error(`${path} is out of date. Run: pnpm agent-rules:generate`);
  }
}

const cursorrulesExpected = render(
  "scripts/agent-rules/templates/cursorrules.local.md",
);

if (mode === "check") {
  ensureFile(CURSORRULES_OUT, cursorrulesExpected);
  console.log("Agent entrypoints are up to date.");
} else {
  writeFileSync(CURSORRULES_OUT, cursorrulesExpected, "utf8");
  console.log("Regenerated .cursorrules from template.");
}

try {
  const stat = lstatSync(CLAUDE_PATH);
  if (!stat.isSymbolicLink()) {
    console.warn(
      "Warning: CLAUDE.md is not a symlink to AGENTS.md. Consider linking it to avoid drift.",
    );
  }
} catch {
  console.warn("Warning: CLAUDE.md not found.");
}
