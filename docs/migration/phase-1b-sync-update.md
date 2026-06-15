# Phase 1b — kuat-mono Sync Update

**Repo / Claude Code project:** `kuat-mono`
**Branch:** `migration/phase-1b-reference-paths`
**Runs:** **lockstep with [Phase 1](phase-1-reference-refactor.md)** — merge in the same window.

> Run in plan mode first. This is the downstream half of the rename `kuat-docs/rules/` → `reference/`. If Phase 1 keeps the tree under `kuat-docs/` instead of root, adjust the target paths accordingly (read Phase 1's logged checkpoint decision first).

---

## Objective

Update everything in `kuat-mono` that reads the upstream rules so it consumes the new `reference/` layout without breaking the sync, entrypoint generation, or package `agent-docs` bundling.

---

## What reads the upstream rules today (verify against live tree)

| Location | Current assumption | Update to |
|----------|--------------------|-----------|
| `scripts/agent-rules/sync-upstream.sh` | subtrees upstream into `external/kuat-agent-rules` | unchanged mechanism; verify branch/paths |
| `scripts/agent-rules/generate-entrypoints.mjs` | reads `kuat-docs/rules/...` (e.g. `LOADING.md`) | read `reference/...`; drop global `LOADING.md` assumption |
| `scripts/agent-docs/bundle-for-core.mjs` | snapshots `kuat-docs/rules/{foundations,types/web,...}` into `packages/*/agent-docs/rules` | snapshot from `reference/{design-language,content,accessibility,media-types/web-product,...}` |
| `AGENTS.md` (load order) | points at `external/kuat-agent-rules/kuat-docs/rules/LOADING.md` + overlay | point at `reference/` entry; remove LOADING taxonomy |
| `kuat-docs/` overlay (`components/`, `LOADING.md`, `rules/`) | mirrors upstream `rules/` layout | realign component-registry path + overlay to `reference/media-types/web-product/` |
| `packages/*/agent-docs/` (built output) | bundled `rules/` snapshot | regenerate from `reference/` |

Use Phase 1's `reference/MIGRATION-MAP.md` as the authoritative old→new path lookup.

---

## Tasks

1. Branch + note in `kuat-agent-rules` LOG that 1b is in flight (cross-link PRs).
2. Sync the Phase-1 branch of upstream into `external/kuat-agent-rules` (point `sync-upstream.sh` at the Phase-1 ref temporarily to test before it merges to `main`).
3. Update `generate-entrypoints.mjs` and `bundle-for-core.mjs` to the new `reference/` paths via the MIGRATION-MAP.
4. Update `AGENTS.md`, the `kuat-docs/` overlay, and the component-registry references.
5. Regenerate package `agent-docs/` bundles; confirm `@equal-experts/kuat-core|react|vue` still build.
6. Run `pnpm agent-rules:check` (or `:sync` + `:generate`) and the package builds as verification.

---

## Acceptance criteria

- `pnpm agent-rules:sync` + `pnpm agent-rules:generate` complete green against the new `reference/` layout.
- `node scripts/agent-docs/bundle-for-core.mjs` produces an `agent-docs/` snapshot with no dangling old `rules/` paths.
- All three packages build; component docs still resolve via the registry.
- No reference to the retired global `LOADING.md` remains.

---

## Report back

Fill `docs/migration/report-phase-1b.md`. Capture: every script/path changed, build + sync results, any overlay realignment, and confirmation the two PRs merged together. Flag any upstream path the MIGRATION-MAP missed (feeds a Phase-1 follow-up).
