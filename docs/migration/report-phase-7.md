# Execution Report — Phase 7 Run B (kuat-mono contributor skills)

> Saved as `docs/migration/report-phase-7.md`. Drop into the planning project's
> `execution-plans/reports/` to drive the next round.

---

**Repo:** kuat-mono
**Branch / PR:** `feature/phase-7-contributor` (PR pending — depends on Run A; B2 deferred)
**Run date:** 2026-06-17
**Status:** ⚠️ complete with caveats (B1 + B3 done; B2 deferred — Run A token SoT not synced)

## 1. What was done

Built the **kuat-mono half** of Phase 7's contributor tooling — the unblocked parts (B1 + B3),
per Ed's "unblocked parts now" scope decision.

- **B1 — `add-kuat-component` skill** (`.claude/skills/add-kuat-component/SKILL.md`): a repo-local,
  project-scoped Claude Code skill that walks a DS contributor through adding a component end-to-end
  (React + Vue code, Storybook story, tests, the component doc, the manifest entry, the regenerated
  registry, the agent-docs bundle), modelling `button-group`. Includes the build-wiring steps the
  patterns actually require (`vite.config.ts` `lib.entry` + `components-bundles/bundle-*.css`).
- **B3 — registry generation + drift check** (`scripts/components/`):
  - `generate-registry.mjs` → emits manifest-derived rows to `scripts/components/registry.generated.md`.
  - `check-registry.mjs` → drift gate (manifest ↔ bundled registry) with a first-diff message.
  - `lib.mjs` → shared manifest read + registry-table parser.
  - Manifest schema gained `displayName` (now derivable); regenerated the 3 package `agent-docs`
    `components.manifest.json` to carry it.
  - npm scripts: `components:registry:generate|check`, `components:verify-no-leak`, `contributor:check`.
- **Distribution guard** (`scripts/components/verify-no-skill-leak.mjs`): asserts `.claude/skills/`
  never reaches a package, the agent-docs bundle, a package `files` array, or the bundle include list.
- **`.gitignore`**: un-ignored `.claude/skills/` (`.claude/*` + `!.claude/skills/`) so the contributor
  skill is actually committed/shared while local Claude settings stay ignored.
- **B2 deferred**: documented in [phase-7-b2-deferred.md](phase-7-b2-deferred.md). No code.
- Cherry-picked the Phase-7 planning docs (`694f880`) onto the branch so it is self-contained.

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `add-kuat-component` adds a component end-to-end; `pnpm build` green | ✅ | E2E eval (throwaway `status-dot`, then reverted): React 273 + Vue 210 tests pass; `pnpm build` 5/5 turbo tasks |
| Registry generated from kuat-mono manifest; CI **fails on drift** | ✅ | `generate-registry.mjs` emits rows; injected mismatch → `check-registry.mjs` exit 1 with first-diff; reverted → exit 0 |
| Contributor skills **repo-local**, absent from every payload | ✅ | `verify-no-skill-leak.mjs` green; `.claude/skills/` not in packages, agent-docs, `files`, or bundle include |
| Skill committed (repo-local, project scope) | ✅ | `.gitignore` un-ignores `.claude/skills/`; `git check-ignore` → trackable |
| B2 `generate-tokens` downstream | ⛔ deferred | Upstream token SoT (`colors.tokens.json`) not in this checkout — see §7 |

## 3. Deviations from the plan

- **Skill ran the wrong phase.** `/kuat-phase 7 run b` invoked a skill **hardwired to Phase 1b**; it
  re-emitted the 1b prompt regardless of args. **Phase 1b is already merged (PR #20)** — did not
  re-run it. Executed Phase 7 Run B per the branch name + args instead.
- **`scripts/` not `skills/scripts/`.** kuat-mono's convention is `scripts/`; the new scripts live in
  `scripts/components/` (the handoff referenced the upstream `skills/scripts/` layout).
- **No turbo `check` task.** These are repo-level (not per-package) checks, so they are root npm
  scripts (`contributor:check`); turbo would be the wrong granularity. CI-ready once a workflow exists.
- **Generated registry lives in `scripts/components/`,** not `kuat-docs/components/` — the bundle copies
  that whole directory into the published `agent-docs/`, which would ship the contributor scaffold.

## 4. Decisions made (with rationale)

- **Manifest is the component SoT; the registry `.md` stays upstream-owned.** The registry's
  **Source** prose and **Upstream refs** links are curated, *not* mechanical transforms of the manifest
  `sources`. So the generator emits the derivable columns and the drift check enforces **ID-set parity +
  doc-path + display-name** only; curated columns are excluded. (Mirrors `docs/migration/LOG.md`.)
- **Added `displayName` to the manifest** so the display column is derivable rather than hand-written.
- **Drift check targets the committed bundled registry** (always present, deterministic in CI) — not
  the gitignored `external/` sync.
- **Un-ignore `.claude/skills/`** — without it the whole B1 deliverable couldn't be committed, defeating
  "repo-local skill discovered when working in the repo."
- **Reverted agent-docs snapshot-ref/date churn.** The bundle resolves `git rev-parse HEAD` against the
  gitignored `external/` (not its own repo → picks up kuat-mono's HEAD), so re-bundling rewrites
  `snapshotRef`/`snapshotDate` with noise. Kept only the meaningful `components.manifest.json`
  `displayName` propagation.

## 5. Open decisions for Ed

- **Branch/PR naming:** work is on `feature/phase-7-contributor` (matches the Phase-7 plan exactly).
  Open the PR from it as-is. *Default: yes.*
- **Generated registry committed in `scripts/components/registry.generated.md`** vs gitignored scratch.
  Kept it committed (visible drift in PRs). Confirm, or say the word to gitignore it.
- **`.gitignore` change** (un-ignore `.claude/skills/`) — confirm this is acceptable repo policy
  (local Claude settings remain ignored).

## 6. Verification results

- `pnpm components:registry:generate` → 3 rows; `pnpm components:registry:check` → **green** (3 in sync).
- Drift check **bites**: injected `kuat:ghost-widget` (manifest, no registry row) → exit 1, first-diff
  message; reverted → exit 0.
- `pnpm components:verify-no-leak` → **green**.
- **End-to-end eval** (throwaway `status-dot`, reverted): created React+Vue code + tests + index/entry/
  CSS wiring + doc + manifest entry; `generate` caught the missing registry row (gate works) →
  reconciled the upstream registry → re-bundled → `check` green (4 in sync); `pnpm build` **5/5**;
  `pnpm test:run` → React **273** / Vue **210** tests pass. Fully reverted; working tree clean.
- Final changeset: 7 files modified (+`displayName` ×4, `.gitignore`, `package.json`, `LOG.md`),
  7 new files (skill, 5 scripts incl. generated rows, B2 stub). No `status-dot` residue.

## 7. Follow-ups / backlog

- **B2 `generate-tokens` (downstream)** — blocked on Run A's `colors.tokens.json` syncing into
  `external/`. Tracked in [phase-7-b2-deferred.md](phase-7-b2-deferred.md).
- **Wire `contributor:check` into CI** when a `.github/workflows` exists (none today).
- **Align `registry.generated.md` column format** with Run A's final `component-registry.md` once synced.
- **Storybook in the skill checklist** is documented but was not separately built in the throwaway eval
  (storybook tolerates a missing story; the build stayed green).

## 8. Inputs to the next phase

- **Merge coordination:** Run B depends on **Run A** (kuat-agent-rules). Land them together; B2 stays
  deferred until Run A's token SoT is synced here.
- **MIGRATION-MAP / path gaps:** none new from this run — Phase 7 Run B adds tooling, not path moves.
- **`stable` gate:** Run B + Phase H are the two gates. Run B's contributor tooling (B1 + B3) is ready;
  B2 must land before colour changes can ship safely.
- **For Run A feedback:** kuat-mono's registry drift check enforces ID/display-name/doc-path parity
  against the bundled registry — Run A's upstream registry generation should keep those three columns
  in lockstep with kuat-mono's manifest (curated Source/Upstream-refs remain upstream-owned).
