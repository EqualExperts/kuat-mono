#!/usr/bin/env node
// Distribution guard: contributor skills must stay repo-local.
//
// Phase 7 rule (firm): `.claude/skills/` is project-scoped tooling for the DS
// team. It must never reach a published payload — not the npm packages, not the
// `agent-docs` bundle. This is the kuat-mono equivalent of Run A's
// `verifyNoContributorLeak()`.
//
// Fails if:
//   - any `.claude` directory exists inside a package dir or its agent-docs
//   - any package.json `files` array references `.claude`
//   - the bundle include list (core-bundle.manifest.json) references `.claude`
//
// Usage: node scripts/components/verify-no-skill-leak.mjs

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");
const packagesDir = path.join(repoRoot, "packages");

const problems = [];
const rel = (p) => path.relative(repoRoot, p);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

// Recursively assert no `.claude` path segment appears anywhere under a tree.
async function assertNoClaudeSegment(dir, label) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name === ".claude") {
      problems.push(`${label}: contributor-skill dir leaked into ${rel(full)}`);
      continue;
    }
    if (entry.isDirectory() && entry.name !== "node_modules") {
      await assertNoClaudeSegment(full, label);
    }
  }
}

// Sanity: the skill we ship should actually be repo-local.
if (!(await exists(path.join(repoRoot, ".claude/skills")))) {
  console.warn("verify-no-skill-leak: note — no repo-local .claude/skills/ found (nothing to protect yet).");
}

const pkgs = (await readdir(packagesDir, { withFileTypes: true }))
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const pkg of pkgs) {
  const pkgDir = path.join(packagesDir, pkg);

  // No .claude anywhere in the package source or its built agent-docs.
  await assertNoClaudeSegment(pkgDir, `package ${pkg}`);

  // No `files` entry pulls in .claude.
  try {
    const pkgJson = JSON.parse(await readFile(path.join(pkgDir, "package.json"), "utf8"));
    const files = pkgJson.files ?? [];
    for (const f of files) {
      if (f.split(/[/\\]/).includes(".claude") || f.includes(".claude")) {
        problems.push(`package ${pkg}: package.json "files" references ${f}`);
      }
    }
  } catch {
    /* no package.json — skip */
  }
}

// The bundle include list must not pull in .claude.
try {
  const bundleManifest = JSON.parse(
    await readFile(path.join(repoRoot, "scripts/agent-docs/core-bundle.manifest.json"), "utf8"),
  );
  for (const inc of bundleManifest.include ?? []) {
    if (inc.source?.includes(".claude")) {
      problems.push(`core-bundle.manifest.json: include source references ${inc.source}`);
    }
  }
} catch {
  /* no manifest — skip */
}

if (problems.length) {
  console.error("✗ contributor-skill leak detected:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("✓ no contributor-skill leak: .claude/skills/ stays repo-local (absent from packages, agent-docs, files, and the bundle).");
