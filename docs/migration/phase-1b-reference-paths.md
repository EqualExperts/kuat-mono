# Phase 1b — kuat-mono `reference/` path sync-update

**Status:** in progress · **Branch:** `migration/phase-1b-reference-paths` · **Date:** 2026-06-16

## Why

Upstream `kuat-agent-rules` **Phase 1** repositioned its rules tree: everything under
`kuat-docs/rules/` was split into a passive `reference/` library plus a Phase-2 `_to-skills/`
holding area. The authoritative old→new map is
[`external/kuat-agent-rules/reference/MIGRATION-MAP.md`](../../external/kuat-agent-rules/reference/MIGRATION-MAP.md).
The old `kuat-docs/rules/{LOADING,README}.md` survive only as **redirect tombstones**.

This is the **downstream half**. kuat-mono's bundler, scripts, and overlay docs still point at
the dead `external/kuat-agent-rules/kuat-docs/rules/...` paths, so the published `agent-docs/`
bundles (in `@equal-experts/kuat-core`, `kuat-react`, `kuat-vue`) would ship missing rules.
This phase remaps every consumer to `external/kuat-agent-rules/reference/...` and regenerates
the bundles. It must merge in lockstep with the upstream Phase-1 PR.

## Old → new path mapping

| Old (`…/kuat-docs/rules/`) | New (`…/reference/`) |
|---|---|
| `foundations/brand.md` | `brand/brand.md` |
| `foundations/logo.md` | `brand/logo.md` |
| `foundations/content/voice-and-tone.md` | `brand/voice-and-tone.md` |
| `foundations/content/{writing-style,formatting,numbers,punctuation}.md` | `content/…` |
| `foundations/design/` | `design-language/` |
| `foundations/accessibility.md` | `accessibility/accessibility.md` |
| `types/web/product/` | `media-types/web-product/` |
| `types/web/marketing/` | `media-types/web-marketing/` |
| `types/web/product/examples/` | `media-types/web-product/examples/` (excluded from bundle) |
| `LOADING.md` (tombstone) | `README.md` (new passive index) |

## Scope

**Edit (sources):** `scripts/agent-docs/core-bundle.manifest.json`,
`scripts/agent-docs/bundle-for-core.mjs`, `AGENTS.md`, `.cursor/agents/kuat-documentation.md`,
`kuat-docs/LOADING.md`, `kuat-docs/setup/rules-source-of-truth.md`, `kuat-docs/README.md`,
`kuat-docs/rules/README.md`, `contribution-docs/component-documentation-agent.md`.

**Regenerate (do not hand-edit):** `packages/{kuat-core,kuat-react,kuat-vue}/agent-docs/**`.

**Out of scope:** the repo-root `kuat-docs/` overlay's own directory name (local-owned, not
migrated); historical `kuat review/` review artifacts; the `AGENTS.md`↔template divergence
(pre-existing — separate follow-up).

See the verification + flags in [`report-phase-1b.md`](./report-phase-1b.md).
