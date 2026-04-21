import { readFileSync, writeFileSync, lstatSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const repoRoot = resolve(scriptDir, "../..");

const TEMPLATE_DIR = resolve(repoRoot, "scripts/agent-rules/templates");
const AGENTS_TEMPLATE = resolve(TEMPLATE_DIR, "AGENTS.local.md");
const CURSORRULES_TEMPLATE = resolve(TEMPLATE_DIR, "cursorrules.local.md");

const AGENTS_OUT = resolve(repoRoot, "AGENTS.md");
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

const agentsExpected = render("scripts/agent-rules/templates/AGENTS.local.md");
const cursorrulesExpected = render(
  "scripts/agent-rules/templates/cursorrules.local.md",
);

if (mode === "check") {
  ensureFile(AGENTS_OUT, agentsExpected);
  ensureFile(CURSORRULES_OUT, cursorrulesExpected);
  console.log("Agent entrypoints are up to date.");
} else {
  writeFileSync(AGENTS_OUT, agentsExpected, "utf8");
  writeFileSync(CURSORRULES_OUT, cursorrulesExpected, "utf8");
  console.log("Regenerated AGENTS.md and .cursorrules from templates.");
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
