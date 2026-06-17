#!/usr/bin/env node
// Drift check: the component manifest vs the bundled component registry.
//
// Fails (non-zero, first-diff message) when the manifest and the registry
// disagree on the manifest-derived columns:
//   - a component is in the manifest but missing a registry row (the classic
//     "registry goes stale" failure), or vice versa
//   - the doc path (Overlay / package doc) does not match the manifest `path`
//   - the display name does not match the manifest `displayName`
//
// Curated columns ("Source" prose, "Upstream refs" links) are owned by upstream
// authors and deliberately excluded from drift.
//
// Usage: node scripts/components/check-registry.mjs
// CI-ready: exits 1 on the first divergence.

import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  BUNDLED_REGISTRY_PATH,
  componentList,
  parseRegistryTable,
  readManifest,
  repoRoot,
} from "./lib.mjs";

function fail(message) {
  console.error(`✗ registry drift: ${message}`);
  process.exit(1);
}

const manifest = await readManifest();
const components = componentList(manifest);

let registryMarkdown;
try {
  registryMarkdown = await readFile(BUNDLED_REGISTRY_PATH, "utf8");
} catch {
  fail(
    `bundled registry not found at ${path.relative(repoRoot, BUNDLED_REGISTRY_PATH)} — run \`node scripts/agent-docs/bundle-for-core.mjs\` first.`,
  );
}

const registryRows = parseRegistryTable(registryMarkdown);
const registryById = new Map(registryRows.map((r) => [r.id, r]));
const manifestIds = new Set(components.map((c) => c.id));

// Every manifest component must have a matching registry row.
for (const c of components) {
  const row = registryById.get(c.id);
  if (!row) {
    fail(`"${c.id}" is in the manifest but has no registry row. Run \`pnpm components:registry:generate\` and add the row upstream.`);
  }
  if (!c.displayName) {
    fail(`"${c.id}" is missing "displayName" in the manifest.`);
  }
  if (row.displayName !== c.displayName) {
    fail(`"${c.id}" display name mismatch: manifest "${c.displayName}" vs registry "${row.displayName}".`);
  }
  if (row.docPath !== c.path) {
    fail(`"${c.id}" doc path mismatch: manifest "${c.path}" vs registry "${row.docPath}".`);
  }
}

// Every registry row must map back to a manifest component (no orphans).
for (const row of registryRows) {
  if (!manifestIds.has(row.id)) {
    fail(`"${row.id}" has a registry row but no manifest entry — remove the stale row or add it to the manifest.`);
  }
}

console.log(
  `✓ registry in sync: ${components.length} component(s) match between the manifest and the bundled registry.`,
);
