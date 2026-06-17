# kuat-mono migration log

Dated record of the kuat-mono side of the design-system migration. First entry is the Phase 1b
downstream sync update (`kuat-docs/rules/` → upstream `reference/`); later entries continue the
migration (Phase 7 contributor skills, etc.).

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

---

## 2026-06-17 — Phase 7 Run B execution (contributor skills)

**Branch (this repo):** `feature/phase-7-contributor`
**Plan:** [phase-7-kuat-mono-handoff.md](phase-7-kuat-mono-handoff.md) (Run B), [phase-7-contributor-skills.md](phase-7-contributor-skills.md)
**Scope decision (Ed):** "unblocked parts now" — build **B1** + **B3**, **defer B2** (token SoT not synced).

### Context / correction
- `/kuat-phase 7 run b` invoked the `kuat-phase` skill, which is **hardwired to Phase 1b** and
  re-emitted its 1b prompt regardless of args. **Phase 1b is already merged** (PR #20). Did **not**
  re-run 1b; executed Phase 7 Run B instead, per branch + args.
- Phase 7 planning docs were on `migration/phase-7-planning-docs` (commit `694f880`); cherry-picked
  onto this branch so it is self-contained.

### Decisions
- **Skill placement = repo-local.** `add-kuat-component` lives in `kuat-mono/.claude/skills/`
  (project scope). Never packaged, never in the marketplace — enforced by a new guard.
- **Registry: manifest is the SoT; the `.md` table stays upstream-owned.** The registry's
  **Source** prose and **Upstream refs** links are curated, *not* mechanical transforms of the
  manifest `sources`. So the generator emits the manifest-derived rows (ID / display name /
  derived source / doc path) and the drift check enforces **ID-set parity + doc-path + display-name**
  only — curated columns excluded.
- **Manifest schema += `displayName`** so the display column is derivable.
- **Drift check targets the committed bundled registry** (`packages/kuat-core/agent-docs/.../component-registry.md`)
  — always present, deterministic in CI (the `external/` sync is gitignored).
- **No turbo task.** These are repo-level (not per-package) checks, so they are root npm scripts
  (`components:registry:check`, `components:verify-no-leak`, aggregate `contributor:check`),
  CI-ready once a CI config exists. No `.github/workflows` in this repo today.

### Changes
- **New** `scripts/components/{lib,generate-registry,check-registry,verify-no-skill-leak}.mjs`.
- **New** `.claude/skills/add-kuat-component/SKILL.md` (repo-local contributor skill).
- **New** `scripts/components/registry.generated.md` (generated artifact; deliberately outside
  `kuat-docs/components/` so the bundle never ships it).
- `kuat-docs/components/components.manifest.json` — added `displayName` to all 3 entries.
- `package.json` — added `components:registry:generate|check`, `components:verify-no-leak`, `contributor:check`.
- Regenerated `packages/{kuat-core,kuat-react,kuat-vue}/agent-docs` (manifest now carries `displayName`).
- **Deferred:** B2 documented in [phase-7-b2-deferred.md](phase-7-b2-deferred.md); no code.

### Verification
- `pnpm components:registry:generate` → 3 rows; `pnpm components:registry:check` → **green** (3 in sync).
- Drift check **bites**: temporary manifest entry with no registry row → check exits non-zero with first-diff message; reverted → green.
- `pnpm components:verify-no-leak` → **green** (`.claude/skills/` absent from packages, agent-docs, `files`, and the bundle).
- `node scripts/agent-docs/bundle-for-core.mjs` → manifest (with `displayName`) propagated to all 3 packages.
- `pnpm build` → **5/5 turbo tasks** green; `pnpm test:run` → green.
- End-to-end eval: scaffolded a throwaway component via the skill (code → doc → manifest → registry → bundle → build/test/check) then reverted — no unrequested component committed.

### Follow-ups
- **B2** once Run A's token SoT is synced (see [phase-7-b2-deferred.md](phase-7-b2-deferred.md)).
- Wire `contributor:check` into real CI when a workflow exists.
- Align `registry.generated.md` column format with Run A's final `component-registry.md` once synced.
- **Merge gate:** Run B depends on Run A; coordinate so they land together (B2 stays deferred meanwhile).
