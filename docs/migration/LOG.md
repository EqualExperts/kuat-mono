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

---

## 2026-06-19 — Phase 7 B2 execution (generate-tokens downstream)

**Branch (this repo):** `feature/phase-7-contributor`
**Unblocked by:** Run A synced into `external/` on 2026-06-19 — `colors.tokens.json` (the SoT) +
upstream `generate-tokens.mjs` now present; upstream `colours.md` is now generated.

### Context
- `/kuat-phase 7 b2` again loaded the skill's hardwired Phase-1b prompt; executed Phase 7 **B2** instead.
- Closes the [B2 deferral](phase-7-b2-deferred.md): kuat-core `variables.css` brand colours are now
  generated from the token SoT with a drift gate.

### Decisions
- **Sentinel-delimited generated block, not whole-file.** Only the value-bearing brand-palette block
  (44 `--<scale>-<step>` vars) is generated; it sits between `/* GENERATED:brand-palettes … */` …
  `/* /GENERATED:brand-palettes */` sentinels. Everything else in `variables.css` (support scales
  slate/red/indigo, semantic light/`.dark`, `@theme inline`, typography, shadows) is local + hand-owned
  and follows the SoT via `var()` indirection. This is the only place brand values can drift.
- **Token source = the synced SoT** (`external/kuat-agent-rules/reference/design-language/tokens/colors.tokens.json`).
  `external/` is a gitignored synced cache (repo's sync-then-use model; CI runs `pnpm agent-rules:sync`
  first). The generator guards with a "run sync" message if absent — same shape as the B3 registry check.
- **Mirrors upstream `generate-tokens.mjs`:** deterministic output, `--check` mode, first-diff message.
- **Scope = brand scales only, not aliases (Ed's call).** Both B2 briefs say "brand scales + aliases",
  but the alias block encodes deliberate *local* choices that diverge from the tokens: the SoT defines
  `brand.the-cloud = #f5f5f5` yet kuat-core maps `--brand-the-cloud → var(--slate-100)` (`#f1f5f9`; the
  CSS comment admits the approximation), and `brand.dark-data` has only a hex in the tokens (no oklch).
  Generating the aliases would change rendered values. So only the 44 brand-scale vars are generated;
  semantic + clean brand aliases follow via `var()` indirection automatically. Discrepancy flagged
  upstream (see Follow-ups).

### Changes
- **New** `scripts/tokens/generate-variables.mjs` (write + `--check`).
- **New** `.claude/skills/generate-tokens/SKILL.md` — repo-local downstream-token skill (per the B2
  execution prompt); the no-leak guard keeps it out of every payload.
- Committed the authoritative B2 brief `docs/migration/phase-7-b2-execution-prompt.md` alongside the
  other Phase-7 planning docs.
- `packages/kuat-core/src/variables.css` — added the 2 sentinel lines only (brand values unchanged;
  generator reproduces them byte-for-byte → confirms no pre-existing drift).
- `package.json` — `tokens:generate`, `tokens:check`; `contributor:check` now runs registry + no-leak +
  tokens.
- Docs: this entry; [report-phase-7.md](report-phase-7.md) (B2 → ✅; corrected B1/B3 "committed bundled
  copy" → "synced bundled copy"); [phase-7-b2-deferred.md](phase-7-b2-deferred.md) marked RESOLVED.

### Verification
- `pnpm tokens:generate` → `git diff variables.css` = **only the 2 sentinel lines** (44 brand lines
  byte-identical).
- `pnpm tokens:check` → green; **drift bites**: temp-edited `ee-blue.500` oklch in the synced SoT →
  exit 1, first diff at line 62 (committed vs generated); reverted → green.
- `pnpm contributor:check` → green (registry + no-leak + tokens).
- `pnpm build` → **5/5** turbo tasks.

### Note (not B2)
- Pre-existing **ref-only churn** in `packages/*/agent-docs/{AGENTS.md,README.md,manifest.json,LOADING-consumer.md}`
  from the Jun-19 `agent-rules:sync` (snapshot ref = repo HEAD) was reverted to HEAD to keep the tree
  clean; it regenerates on the next sync/bundle.

### Follow-ups
- **Run B is now feature-complete** (B1 + B3 + B2). Still merges in lockstep with Run A; Run B + Phase H
  remain the `stable` gates.
- Wire `contributor:check` into CI when a workflow exists (CI must `pnpm agent-rules:sync` first — the
  checks read the synced `external/` cache).
- **Upstream reconciliation (Run A):** `brand.the-cloud` token is `#f5f5f5` but kuat-core uses
  `slate-100` (`#f1f5f9`); `brand.dark-data` token has hex-only (no oklch). Decide upstream whether the
  tokens or the local mappings are authoritative; until then the alias block stays hand-owned downstream.

---

## 2026-06-23 — Contribution model rollout (kuat-mono half)

**Branch (this repo):** `feature/contribution-model`
**Brief:** `docs/migration/contribution-model-rollout-prompt.md` · **Model:** `docs/migration/kuat-contribution-model.md`
**Report:** `docs/migration/report-contribution-model.md`

### Context
- Publishing the Kuat contribution model (hybrid custodians + federated network; Fix/Light/Medium/Heavy;
  skill-mediated, gate-enforced). The upstream `kuat-agent-rules` half (`CONTRIBUTING.md`, the `contribute/`
  section, `AGENTS.md`, 7 skill pointers) was already built on its own `feature/contribution-model` branch;
  this run is the **kuat-mono half** (deliverables 5 + 6 + skill pointers).

### Decisions
- **Augment `CONTRIBUTING.md` in place**, don't restructure: a new "How Kuat contributions work" section
  frames the existing component-build how-to as the model's "Collaborate" step rather than duplicating the
  canonical model.
- **Cross-repo links use the upstream GitHub URL on `main`** (`…/kuat-agent-rules/blob/main/contribute/…`) —
  kuat-mono has no local `contribute/` (the synced `external/` cache is gitignored). These resolve once the
  upstream PR merges to `main` (merge-ordering dependency, see Follow-ups).
- **`AGENTS.md` edited directly** (hand-maintained; only `.cursorrules` is generated) — no regeneration needed.
- **Did not run `build:plugins`** in the sibling (its `plugins/` is tracked, would dirty the tree); confirmed
  the payload guardrail read-only instead.

### Changes
- `CONTRIBUTING.md` — new "How Kuat contributions work" section (hybrid model, contribution-vs-participation,
  four sizes, 5-step process incl. Slack #design-system, `add-kuat-component`/`generate-tokens` paths, canonical link).
- `AGENTS.md` — new "Contributing" section linking `CONTRIBUTING.md` + upstream `contribute/overview.md`.
- `.claude/skills/add-kuat-component/SKILL.md` — `## Related` pointer (Light/Medium · component path).
- `.claude/skills/generate-tokens/SKILL.md` — `## Related` pointer (Medium · token path; Heavy for structure).
- New `docs/migration/report-contribution-model.md`; this LOG entry.

### Verification
- `pnpm agent-rules:check` → up to date (AGENTS.md edit didn't desync `.cursorrules`).
- Upstream `reference:check` → ALL REFERENCE CHECKS PASSED (`contribute/` is outside `reference/`).
- Upstream `verify:plugins` (read-only, committed payloads) → ALL CHECKS PASSED; distribution guard kept
  7 repo-local skills out; `find plugins -type d -name contribute` → none (payload dirs are skills/reference/[assets]/commands only).

### Follow-ups
- **Merge ordering:** the kuat-mono links target upstream `main`; merge the upstream `kuat-agent-rules`
  contribution-model PR first or together (Phase-1 lockstep convention) so the links resolve.
- **Deprecation guidelines (Phase-5 fast-follow):** `contribute/deprecation-guidelines.md` stub upstream is
  designed against the first real case — retiring `kuat-create`/`kuat-review` in Phase 5.
