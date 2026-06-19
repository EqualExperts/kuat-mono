# Execution Report — Phase 7 Run B (kuat-mono contributor skills)

> Saved as `docs/migration/report-phase-7.md`. Drop into the planning project's
> `execution-plans/reports/` to drive the next round.

---

**Repo:** kuat-mono
**Branch / PR:** `feature/phase-7-contributor` (PR pending — merges in lockstep with Run A)
**Run date:** 2026-06-17 (B1 + B3) · 2026-06-19 (B2, once Run A synced)
**Status:** ✅ complete — B1 + B3 + B2 (Run B feature-complete)

## 1. What was done

Built the **kuat-mono half** of Phase 7's contributor tooling. B1 + B3 landed 2026-06-17 (Ed's
"unblocked parts now" scope); **B2 landed 2026-06-19** once Run A was synced into `external/`.

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
- **B2 — `generate-tokens` downstream** (`scripts/tokens/generate-variables.mjs` + repo-local
  `.claude/skills/generate-tokens/SKILL.md`): generates the value-bearing brand-palette block of
  kuat-core `src/variables.css` (44 `--<scale>-<step>` vars, sentinel-delimited) from the synced token
  SoT, with a `--check` drift gate mirroring upstream `generate-tokens.mjs`. Everything else in
  `variables.css` stays local and follows via `var()`. npm scripts `tokens:generate|check`; folded into
  `contributor:check`.
- Cherry-picked the Phase-7 planning docs (`694f880`) onto the branch so it is self-contained.

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `add-kuat-component` adds a component end-to-end; `pnpm build` green | ✅ | E2E eval (throwaway `status-dot`, then reverted): React 273 + Vue 210 tests pass; `pnpm build` 5/5 turbo tasks |
| Registry generated from kuat-mono manifest; CI **fails on drift** | ✅ | `generate-registry.mjs` emits rows; injected mismatch → `check-registry.mjs` exit 1 with first-diff; reverted → exit 0 |
| Contributor skills **repo-local**, absent from every payload | ✅ | `verify-no-skill-leak.mjs` green; `.claude/skills/` not in packages, agent-docs, `files`, or bundle include |
| Skill committed (repo-local, project scope) | ✅ | `.gitignore` un-ignores `.claude/skills/`; `git check-ignore` → trackable |
| B2 `generate-tokens` downstream (variables.css + drift) | ✅ | `tokens:generate` reproduces the brand block byte-for-byte (only sentinels added); `tokens:check` green; drift bites (temp SoT edit → exit 1 at line 62) |

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
- **B2 generates brand scales only, not aliases** (Ed's call), though both briefs say "scales + aliases".
  The alias block encodes deliberate local choices that diverge from the tokens (`the-cloud`→slate-100,
  `dark-data` hex-only) — generating them would change rendered values. Scales are the drift vector;
  aliases follow via `var()`. Discrepancy flagged for upstream reconciliation (§7).

## 4. Decisions made (with rationale)

- **Manifest is the component SoT; the registry `.md` stays upstream-owned.** The registry's
  **Source** prose and **Upstream refs** links are curated, *not* mechanical transforms of the manifest
  `sources`. So the generator emits the derivable columns and the drift check enforces **ID-set parity +
  doc-path + display-name** only; curated columns are excluded. (Mirrors `docs/migration/LOG.md`.)
- **Added `displayName` to the manifest** so the display column is derivable rather than hand-written.
- **Drift checks read the synced cache (sync-then-use).** `agent-docs/external/**` and `external/` are
  both gitignored (`.gitignore:56 external/` matches any `external` dir), so there is no *committed*
  copy of the upstream registry/tokens — they exist after `pnpm agent-rules:sync`. The registry check
  reads the **synced bundled** registry; the B2 tokens generator reads the **synced** SoT directly.
  Both guard with a clear "run sync" message if absent. (Corrects the earlier wording that called these
  "committed" copies.)
- **B2: sentinel-delimited generated block, not whole-file.** Only the 44 value-bearing brand-palette
  vars are generated; support scales / semantic / `@theme inline` stay local and follow via `var()`.
  That block is the only place brand values can drift from the SoT.
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
- **B2 (2026-06-19):** `pnpm tokens:generate` → `git diff variables.css` = only the 2 sentinel lines
  (44 brand lines byte-identical). `pnpm tokens:check` → green; **drift bites**: temp-edited `ee-blue.500`
  oklch in the synced SoT → exit 1, first diff at line 62; reverted → green. `pnpm contributor:check`
  (registry + no-leak + tokens) → green. `pnpm build` → **5/5**.

## 7. Follow-ups / backlog

- ~~B2 `generate-tokens` (downstream)~~ — **done 2026-06-19** (see §6).
- **Wire `contributor:check` into CI** when a `.github/workflows` exists (none today). CI must run
  `pnpm agent-rules:sync` before the checks (they read the synced `external/` cache).
- **Align `registry.generated.md` column format** with Run A's final `component-registry.md` once synced.
- **Storybook in the skill checklist** is documented but was not separately built in the throwaway eval
  (storybook tolerates a missing story; the build stayed green).
- **Upstream colour reconciliation (Run A):** token `brand.the-cloud = #f5f5f5` vs kuat-core
  `--brand-the-cloud → slate-100 (#f1f5f9)`; token `brand.dark-data` is hex-only (no oklch). Decide
  upstream whether tokens or local mappings win; until then the alias block stays hand-owned downstream
  and is excluded from the generated/`tokens:check` surface.

## 8. Inputs to the next phase

- **Merge coordination:** Run B depends on **Run A** (kuat-agent-rules). Land them together. Run B is
  now feature-complete (B1 + B3 + B2).
- **MIGRATION-MAP / path gaps:** none new from this run — Phase 7 Run B adds tooling, not path moves.
- **`stable` gate:** Run B + Phase H are the two gates. Run B's contributor tooling (B1 + B3 + B2) is
  ready; the `tokens:check` gate now protects colour changes from shipping out of sync.
- **For Run A feedback:** kuat-mono's registry drift check enforces ID/display-name/doc-path parity
  against the bundled registry — Run A's upstream registry generation should keep those three columns
  in lockstep with kuat-mono's manifest (curated Source/Upstream-refs remain upstream-owned).
