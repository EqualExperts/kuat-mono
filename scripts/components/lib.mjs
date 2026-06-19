// Shared helpers for the component-registry generator + drift check.
//
// The component *source of truth* in kuat-mono is the manifest
// (`kuat-docs/components/components.manifest.json`). The component *registry*
// (`component-registry.md`) is owned upstream in kuat-agent-rules and reaches
// this repo only through the published bundle. These helpers let the generator
// emit the manifest-derived registry rows and let the drift check confirm the
// bundled registry still agrees with the manifest.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(__dirname, "..", "..");

export const MANIFEST_PATH = path.join(
  repoRoot,
  "kuat-docs/components/components.manifest.json",
);

// The drift check runs against the *committed bundled* copy — it is always
// present (the gitignored `external/` sync may be absent in CI).
export const BUNDLED_REGISTRY_PATH = path.join(
  repoRoot,
  "packages/kuat-core/agent-docs/external/kuat-agent-rules/reference/media-types/web-product/component-registry.md",
);

// Lives beside the generator (not under kuat-docs/components/) so the bundle —
// which copies that whole directory into the published agent-docs/ — never ships
// this contributor-only scaffold.
export const GENERATED_REGISTRY_PATH = path.join(
  repoRoot,
  "scripts/components/registry.generated.md",
);

export async function readManifest() {
  const raw = await readFile(MANIFEST_PATH, "utf8");
  return JSON.parse(raw);
}

/**
 * Components in manifest order. JSON object key order is preserved by
 * JSON.parse, which keeps the generated table deterministic.
 */
export function componentList(manifest) {
  return Object.entries(manifest.components ?? {}).map(([id, entry]) => ({
    id,
    slug: entry.slug,
    displayName: entry.displayName ?? "",
    path: entry.path,
    sources: entry.sources ?? [],
  }));
}

/** Derived "Source" column — a starting point the author refines upstream. */
export function formatSource(sources) {
  if (!sources.length) return "—";
  return sources.map((s) => `\`${s}\``).join(" / ");
}

function stripCell(cell) {
  return cell.trim().replace(/^`/, "").replace(/`$/, "").trim();
}

/**
 * Parse the rows of the "## Registry" markdown table. Scoped to that section so
 * the "ID conventions" / "Manifest shape" tables and JSON examples below it are
 * ignored. Returns [{ id, displayName, docPath }].
 */
export function parseRegistryTable(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((l) => /^##\s+Registry/i.test(l));
  if (start === -1) {
    throw new Error('Could not find a "## Registry" section in the registry markdown.');
  }

  const rows = [];
  let seenHeader = false;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^---\s*$/.test(line) || /^##\s/.test(line)) break; // end of section
    if (!line.trim().startsWith("|")) continue;

    const cells = line.split("|").slice(1, -1); // drop leading/trailing empties
    if (cells.length < 4) continue;

    // Skip the header row and the |---|---| separator row.
    if (!seenHeader) {
      seenHeader = true;
      continue;
    }
    if (cells.every((c) => /^[\s:-]*$/.test(c))) continue;

    rows.push({
      id: stripCell(cells[0]),
      displayName: cells[1].trim(),
      docPath: stripCell(cells[3]),
    });
  }
  return rows;
}
