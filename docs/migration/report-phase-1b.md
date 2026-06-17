# Execution Report — Phase 1b: `reference/` path sync-update

**Branch:** `migration/phase-1b-reference-paths` · **Date:** 2026-06-16 · **Author:** ed.ford@equalexperts.com

## Summary

Repointed every kuat-mono consumer of the upstream rules tree from the retired
`external/kuat-agent-rules/kuat-docs/rules/...` layout to the new
`external/kuat-agent-rules/reference/...` layout (per upstream
`reference/MIGRATION-MAP.md`), then regenerated the published `agent-docs/` bundles. The
upstream Phase-1 rename is already vendored in this repo, so no re-sync was performed.

## Changes applied

### Source (hand-edited)

| File | Change |
|------|--------|
| `scripts/agent-docs/core-bundle.manifest.json` | Remapped the 8 upstream `include[]` entries → `reference/...`. Collapsed `foundations/brand.md` + `foundations/logo.md` into one `reference/brand` dir entry (recovers `voice-and-tone.md`, which moved from `content/` → `brand/`). `LOADING.md` (tombstone) → `reference/README.md`. `foundations/design`→`design-language`, `foundations/content`→`content`, `types/web/{product,marketing}`→`media-types/web-{product,marketing}`. Local-overlay entries left untouched. |
| `scripts/agent-docs/bundle-for-core.mjs` | `removeDeprecatedExamples` path → `reference/media-types/web-product/examples`; `loadingConsumer` "Default load" list → `reference/` paths; "Related" link → `reference/README.md`. |
| `AGENTS.md` | Load-order link → `external/kuat-agent-rules/reference/README.md` (hand-edited, not regenerated — see flag below). |
| `.cursor/agents/kuat-documentation.md` | Design-tokens ref → `reference/design-language/`. |
| `kuat-docs/LOADING.md` | "Load after" pointer → `reference/` library README. |
| `kuat-docs/setup/rules-source-of-truth.md` | 4 upstream cells → `reference/{brand,design-language,content,accessibility}` and `reference/media-types/web-{product,marketing}`; loading/rules-index pointers → `reference/README.md` + `reference/MIGRATION-MAP.md`. |
| `kuat-docs/README.md` | "Also load" prefix → `reference/`. |
| `kuat-docs/rules/README.md` | Full index rewrite: path prefix + every foundations/types table link → `reference/...` (incl. `voice-and-tone.md` → `brand/`). |
| `kuat-docs/rules/design/layouts.md` | Upstream pattern links → `media-types/web-{product,marketing}`. |
| `contribution-docs/component-documentation-agent.md` | Upstream GitHub URL → `…/blob/main/reference/media-types/web-product/component-registry.md`. |
| `PUBLISHING.md` | Expected-bundle-contents line → `agent-docs/external/kuat-agent-rules/reference/`. |

### Regenerated (not hand-edited)

`node scripts/agent-docs/bundle-for-core.mjs` rebuilt `packages/{kuat-core,kuat-react,kuat-vue}/agent-docs/`.
21 tracked index files updated (7 per package: `AGENTS.md`, `README.md`, `manifest.json`,
`bundle-manifest.json`, `rules/LOADING-consumer.md`, `kuat-docs/rules/README.md`,
`kuat-docs/rules/design/layouts.md`). The bulky upstream payload under each bundle's
`external/` subtree is **gitignored** (root `.gitignore` `external/` rule) and regenerated at
`prepack`, so it shows no add/delete churn — pre-existing design, unchanged here.

### New

`docs/migration/` scaffolding: `phase-1b-reference-paths.md` (plan), `LOG.md`,
`EXECUTION-REPORT-TEMPLATE.md`, this report.

## Verification

| Check | Command | Result |
|-------|---------|--------|
| Bundler regenerates cleanly | `node scripts/agent-docs/bundle-for-core.mjs` | ✅ exit 0, **zero `skip missing source` warnings**, no `Blocked path` errors |
| New `reference/` subtree shipped | `find …/agent-docs/external/kuat-agent-rules/reference` | ✅ brand, design-language, content, accessibility, media-types/{web-product,web-marketing} |
| `voice-and-tone.md` recovered | `ls …/reference/brand/` | ✅ brand.md, logo.md, voice-and-tone.md |
| `web-product/examples` excluded | `ls …/web-product/examples` | ✅ absent |
| No dangling old paths on disk | `grep -rn "kuat-agent-rules/kuat-docs/rules" .` | ✅ only this report set's plan-doc prose; bundles clean |
| React/Vue mirrors identical to core | `diff -rq` | ✅ byte-identical |
| Packages build | `pnpm build` | ✅ turbo 5/5 successful (kuat-react + kuat-vue vite builds + both Storybook apps; kuat-core tokens-only, no build step) |
| Generator check | `pnpm agent-rules:check` | ⚠️ RED — **pre-existing**, isolated to `AGENTS.md` (`.cursorrules` matches its template); not caused by this phase |

## Flags / follow-ups

1. **Lockstep merge.** This PR must merge alongside the upstream `kuat-agent-rules` Phase-1 PR.
   The rename is already vendored here (local merge of "PR #18 multi-entry-rules-architecture"),
   so they should be ready together. Before merge, confirm upstream `kuat-agent-docs` `main`
   reflects `reference/` so the new GitHub URL in `contribution-docs/component-documentation-agent.md`
   resolves.

2. **MIGRATION-MAP did not need extending** — every old path consumed by kuat-mono had a mapping.
   One naming note worth surfacing upstream: the map renames `scenarios/` → `patterns/`; local
   overlay copy text was updated to say "patterns" where it described upstream.

3. **`LOADING.md` shipped replacement.** The bundle previously shipped the upstream `LOADING.md`;
   that is now a redirect tombstone (moves to `_to-skills/` in Phase 2). The bundle now ships
   `reference/README.md` (the new passive scope index) in its place. Confirm this is the desired
   consumer entry, or switch to `reference/MIGRATION-MAP.md`.

4. **Pre-existing, separate follow-up — `AGENTS.md` ↔ generator divergence.** `AGENTS.md` was
   hand-edited (commit fd5d526) and no longer matches `scripts/agent-rules/templates/AGENTS.local.md`,
   so `agent-rules:check` already failed before this phase. Per decision, `AGENTS.md` was hand-edited
   here and NOT regenerated. Reconciling the template ↔ `AGENTS.md` (or retiring the generator for
   `AGENTS.md`) needs its own change.

5. **Out of scope (left as-is):** the repo-root `kuat-docs/` overlay's own `rules/` directory name
   (local-owned; renaming to mirror `reference/` is a separate decision), and the historical
   `kuat review/dashboard-*.md` review artifacts (point-in-time citations, not build inputs).

## Merge readiness

Code complete and verified. Ready to open the kuat-mono PR and merge **in lockstep** with the
upstream Phase-1 PR. No commit/push performed yet (awaiting go-ahead).
