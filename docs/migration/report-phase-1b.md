# Execution Report — Phase 1b (kuat-mono sync update)

> Saved as `docs/migration/report-phase-1b.md`. Drop into the planning project's
> `execution-plans/reports/` to drive the next round.

---

**Repo:** kuat-mono
**Branch / PR:** `rearchitecture` (PR pending — must merge in lockstep with upstream Phase-1 `migration/phase-1-reference-refactor`)
**Run date:** 2026-06-13
**Status:** ✅ complete

## 1. What was done
Repointed everything in kuat-mono that consumes the upstream rules from the retired
`kuat-docs/rules/` layout to the new `reference/` layout, per upstream `reference/MIGRATION-MAP.md`,
and regenerated the published package bundles.

- **Bundle manifest** (`scripts/agent-docs/core-bundle.manifest.json`): replaced the 8 upstream
  `include` entries with `reference/` directories — `brand`, `accessibility`, `design-language`,
  `content`, `media-types/web-product`, `media-types/web-marketing`; dropped the retired `LOADING.md`
  entry; folded brand into a directory include so `voice-and-tone.md` (moved from `content/` to
  `brand/` upstream) stays bundled.
- **Bundle loader** (`scripts/agent-docs/bundle-for-core.mjs`): updated `removeDeprecatedExamples`
  to the new examples path, rewrote the `LOADING-consumer.md` "Default load" list to `reference/`
  paths, and replaced the dead upstream `LOADING.md` link with `reference/README.md`.
- **Entrypoint generator** (`scripts/agent-rules/generate-entrypoints.mjs` + its README): decoupled
  `AGENTS.md` — it now generates only `.cursorrules`; deleted the orphaned `templates/AGENTS.local.md`.
- **AGENTS.md** (hand-maintained): load order now points at `reference/README.md`; removed the
  duplicated migration block.
- **Bundled overlay docs**: `kuat-docs/rules/README.md` (index tables regrouped to the reference
  layout), `kuat-docs/rules/design/layouts.md`, `kuat-docs/rules/scenarios/README.md`.
- **Regenerated** `packages/{kuat-core,kuat-react,kuat-vue}/agent-docs` from the synced `reference/` tree.

## 2. Acceptance criteria
| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `agent-rules:sync` + `agent-rules:generate` green against `reference/` | ✅ | sync (clone-and-copy) synced Phase-1 `reference/`; `generate` → "Regenerated .cursorrules from template." |
| `agent-rules:check` green | ✅ | "Agent entrypoints are up to date." (was red on AGENTS.md pre-phase; decoupling fixed it) |
| `bundle-for-core.mjs` produces snapshot with no dangling old `rules/` paths | ✅ | grep over `packages/*/agent-docs` → 0 hits for `kuat-agent-rules/kuat-docs/rules`, `/types/web`, `/foundations` |
| No retired global `LOADING.md` reference remains | ✅ | grep → only `LOADING-consumer.md` (the bundle's own artifact) remains |
| All three packages build; component docs resolve via registry | ✅ | `pnpm build` → 5/5 turbo tasks successful; storybook `component-docs` compiled; `components.manifest.json` valid |
| Examples excluded from product bundle | ✅ | `…/media-types/web-product/examples` absent after `removeDeprecatedExamples` |

## 3. Deviations from the plan
- **Work branch:** ran on `rearchitecture` (created just before the run) instead of the plan's
  nominal `migration/phase-1b-reference-paths`, per the user's choice.
- **Sync mechanism:** used the script's clone-and-copy fallback (git subtree unavailable). This is
  the correct model — `external/` is gitignored (local cache); `git subtree add` would have committed
  ~100 ignored files. No deviation in outcome; the committed artifact is `packages/*/agent-docs`.

## 4. Decisions made (with rationale)
- **Decouple AGENTS.md from the generator.** It was already hand-maintained and committed without the
  auto-generated header, so `agent-rules:check` failed on it independently of this migration. Generating
  only `.cursorrules` makes `:check` honest and green without clobbering the hand-authored contributor
  entry. Mirrors `docs/migration/LOG.md`.
- **Functional + bundled-only sweep.** Keeps this lockstep PR focused on what breaks the sync/bundle/build;
  prose docs deferred (§7).
- **Brand as a directory include.** Preserves `voice-and-tone.md`, which moved out of `content/` into
  `brand/` upstream, in the published bundle.

## 5. Open decisions for Ed
- **Branch/PR naming:** work landed on `rearchitecture`, not `migration/phase-1b-reference-paths`.
  Confirm whether the PR should be opened from `rearchitecture` as-is or the commits moved to the
  conventionally-named branch before opening. *Default: open the PR from `rearchitecture`.*
- **`reference/README.md` as the entry target:** consumers were repointed there in place of the retired
  `LOADING.md`/`README.md`. Confirm that's the intended passive-reference entry (vs. a per-skill loader
  arriving in Phase 2).

## 6. Verification results
- `pnpm agent-rules:sync` (clone-and-copy fallback) → "Upstream rules synced to external/kuat-agent-rules";
  "Bundled consumer agent docs into packages/kuat-core/agent-docs"; mirrored to react/vue.
  (Cosmetic only: the script's end-of-run file-listing logged `rg: command not found` under the
  non-login shell PATH; guarded by `|| true`, bundle already written.)
- `pnpm agent-rules:generate` → regenerated `.cursorrules`; `pnpm agent-rules:check` → **up to date**.
- Dangling-path grep over `packages/*/agent-docs` → **clean**.
- `pnpm build` → **Tasks: 5 successful, 5 total** (kuat-core, kuat-react, kuat-vue, storybook-react, storybook-vue).

## 7. Follow-ups / backlog
- **Deferred prose sweep (kuat-mono, next PR):** `CONTRIBUTING.md`, `README.md`, `PUBLISHING.md`,
  `kuat-docs/setup/*`, `kuat-docs/examples/*`, `kuat-docs/LOADING.md`, `kuat-docs/README.md`,
  `.cursor/agents/*`, `contribution-docs/*` (incl. component-registry URL), `packages/*/README.md`.
- **Untouched (historical):** `kuat review/*`, `CHANGELOG.md`.
- **Publishing note (backlog):** `external/` is gitignored, so the bundle's `external/.../reference/**`
  raw upstream files are not committed — confirm the npm `files`/publish path still ships them
  (pre-existing; out of 1b scope).

## 8. Inputs to the next phase
- **MIGRATION-MAP location:** upstream `reference/MIGRATION-MAP.md` — covered every path this repo
  consumed; **no gaps found** (no Phase-1 follow-up needed from kuat-mono).
- **Merge coordination:** this PR must merge **together** with upstream Phase-1
  (`migration/phase-1-reference-refactor`). Do not merge until that PR is ready.
- **Phase 2 watch items:** the upstream `_to-skills/` holding area and the legacy
  `skills/*`/`ensure-rules.sh` still reference old paths via tombstones; kuat-mono's `agent-rules:sync`
  default branch returns to `main` once Phase 1 merges.
