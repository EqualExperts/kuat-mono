# Phase 1b migration log — kuat-mono

Dated record of the downstream sync update (`kuat-docs/rules/` → upstream `reference/`).
Runs in lockstep with the upstream **kuat-agent-rules Phase 1** PR
(branch `migration/phase-1-reference-refactor`).

---

## 2026-06-13 — Phase 1b execution

**Branch (this repo):** `rearchitecture`
**Upstream ref synced for testing:** `migration/phase-1-reference-refactor`
**Authoritative path lookup:** upstream `reference/MIGRATION-MAP.md`

### Decisions
- **Work branch:** executed on `rearchitecture` (created immediately before the run) rather than
  the plan's nominal `migration/phase-1b-reference-paths`. The branch name in the AGENTS.md
  convention note was left unchanged; actual branch choice recorded here.
- **AGENTS.md generator drift → decouple.** `AGENTS.md` was already hand-maintained (committed with
  no auto-generated header) and had diverged from `templates/AGENTS.local.md`, so `agent-rules:check`
  failed on it *before* this phase. Resolution: `generate-entrypoints.mjs` now generates **only
  `.cursorrules`**; `AGENTS.md` is owned by hand; the orphaned `AGENTS.local.md` template was deleted.
  `agent-rules:check` is now green.
- **Sweep breadth → functional + bundled only.** Updated the scripts, the bundle manifest, `AGENTS.md`,
  and the overlay files that land in the published `agent-docs/` bundle. Pure prose docs and historical
  artifacts deferred (see Follow-ups).
- **Sync strategy.** `git subtree` is unavailable in this environment, so `sync-upstream.sh` took its
  clone-and-copy fallback — which is the correct model here: `external/` is **gitignored** (a local
  vendoring cache), and the committed artifact is `packages/*/agent-docs/`. No subtree commit of the
  ignored tree was created.

### Changes (commits on `rearchitecture`)
- `07fc687` — repoint rule consumers to `reference/`:
  `scripts/agent-docs/core-bundle.manifest.json` (8 upstream includes → `reference/` dirs, dropped
  `LOADING.md`, folded brand into a dir to preserve `voice-and-tone.md`),
  `scripts/agent-docs/bundle-for-core.mjs` (`removeDeprecatedExamples` path, `loadingConsumer` text,
  dead LOADING.md link → `reference/README.md`),
  `scripts/agent-rules/generate-entrypoints.mjs` + `scripts/agent-rules/README.md` (decouple AGENTS.md),
  deleted `scripts/agent-rules/templates/AGENTS.local.md`,
  `AGENTS.md` (load order → `reference/README.md`; removed duplicated migration block),
  `kuat-docs/rules/README.md`, `kuat-docs/rules/design/layouts.md`, `kuat-docs/rules/scenarios/README.md`.
- `ba79b8d` — regenerate `packages/{kuat-core,kuat-react,kuat-vue}/agent-docs` from the `reference/` tree.

### Verification
- `pnpm agent-rules:sync` (clone-and-copy fallback) → synced Phase-1 `reference/` into `external/`; bundle regenerated and mirrored.
- `pnpm agent-rules:generate` → "Regenerated .cursorrules from template." ; `pnpm agent-rules:check` → **green**.
- Dangling-path grep over `packages/*/agent-docs` → no `kuat-agent-rules/kuat-docs/rules`, `/types/web`, `/foundations`, or retired upstream `LOADING.md`.
- `pnpm build` → **5/5 turbo tasks successful** (kuat-core, kuat-react, kuat-vue, storybook-react, storybook-vue); component-docs compiled.

### Follow-ups
- Deferred prose sweep (next PR): `CONTRIBUTING.md`, `README.md`, `PUBLISHING.md` (incl. the
  `agent-docs/external/.../foundations/` example), `kuat-docs/setup/*`, `kuat-docs/examples/*`,
  `kuat-docs/LOADING.md`, `kuat-docs/README.md`, `.cursor/agents/*`, `contribution-docs/*`
  (incl. the component-registry URL → `reference/media-types/web-product/component-registry.md`),
  `packages/*/README.md`.
- Untouched (historical): `kuat review/*`, `CHANGELOG.md`.
- Upstream Phase-1 feedback: `MIGRATION-MAP.md` covered every path this repo consumed — no gaps.
- **Merge gate:** hold this PR until the upstream Phase-1 PR is ready; merge together.
