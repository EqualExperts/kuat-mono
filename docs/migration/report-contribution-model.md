# Execution Report — Contribution Model Rollout (kuat-mono half)

> Companion to the upstream `kuat-agent-rules` rollout. Brief: `docs/migration/contribution-model-rollout-prompt.md`; finalised model: `docs/migration/kuat-contribution-model.md`.

---

**Repo:** kuat-mono
**Branch / PR:** `feature/contribution-model` (PR pending)
**Run date:** 2026-06-23
**Status:** ✅ complete

## 1. What was done

The kuat-mono half of the contribution-model rollout — deliverables 5 + 6 plus the repo-local skill pointers, report, and LOG entry. The upstream `kuat-agent-rules` half (CONTRIBUTING.md, the `contribute/` section, AGENTS.md, the seven skill pointers) was already built on its own `feature/contribution-model` branch and is out of this repo's scope; we confirmed its gates pass (§6).

- **`CONTRIBUTING.md`** — added a top-level **"How Kuat contributions work"** section (after the intro, before Quick Start): the hybrid model, contribution-vs-participation, the four sizes (Fix/Light/Medium/Heavy), the 5-step process with the Slack **#design-system** request step, and the two kuat-mono contributor paths (`add-kuat-component` for components, `generate-tokens` for the downstream token regen). It points to the canonical upstream `contribute/overview.md` rather than duplicating the model; the existing component-build sections below are framed as the "Collaborate" how-to.
- **`AGENTS.md`** — added a **"Contributing"** section linking to this repo's `CONTRIBUTING.md` (front door) and the upstream `contribute/overview.md` (full model), noting `contribute/` sits outside the passive `reference/` library and is never bundled.
- **Contributor skills** — added a `## Related` "Part of the contribution model" pointer to `add-kuat-component` (**Light/Medium · component** path) and `generate-tokens` (**Medium · token** path, Heavy for token *structure*).
- **Docs** — this report; a dated `docs/migration/LOG.md` entry.

## 2. Acceptance criteria

| Criterion (from brief) | Met? | Evidence |
|------------------------|------|----------|
| `CONTRIBUTING.md` present + linked from `AGENTS.md` (kuat-mono) | ✅ | `CONTRIBUTING.md` "How Kuat contributions work"; `AGENTS.md` "Contributing" section |
| Each kuat-mono contributor skill references the model | ✅ | `## Related` pointer in `add-kuat-component` + `generate-tokens` SKILL.md |
| `contribute/` **not** under `reference/` and **not** in any plugin payload | ✅ | Upstream payload dirs are `skills/reference/[assets]/commands` only; `find plugins -type d -name contribute` → none |
| `verify-plugins` green (no contributor leak) | ✅ | Upstream `verify:plugins` → ALL CHECKS PASSED; distribution guard kept 7 repo-local skills out |
| `review-reference-change` still passes | ✅ | Upstream `reference:check` → ALL REFERENCE CHECKS PASSED |
| kuat-mono entrypoints not desynced by the AGENTS.md edit | ✅ | `pnpm agent-rules:check` → up to date |
| Decision log seeded + deprecation-guidelines stub flags Phase-5 | ✅ (upstream) | `contribute/decision-log.md` + `contribute/deprecation-guidelines.md` present in `kuat-agent-rules` (built there) |

## 3. Deviations from the plan

None of substance.
- The plan flagged the option to run the upstream `build:plugins` + `verify:plugins`. `plugins/` is **tracked** in the sibling, so rebuilding would have dirtied that repo's tree. Instead we ran `verify:plugins` against the already-committed payloads (read-only) and grepped the payloads directly — same confirmation, no side effects.
- kuat-mono `AGENTS.md` is **hand-maintained** (only `.cursorrules` is generated), so the Contributing link was a direct edit — no regeneration needed; `pnpm agent-rules:check` stays green.

## 4. Decisions made (with rationale)

- **Augment `CONTRIBUTING.md` in place, don't restructure.** The existing 251-line file is the component-build how-to; the new section frames it as the model's "Collaborate" step rather than duplicating the canonical model.
- **Cross-repo links use the GitHub URL on `main`** (`github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/…`). kuat-mono has no local `contribute/` (the synced `external/` cache is gitignored), so a stable canonical URL is correct for a permanent doc. **Dependency:** these resolve once the upstream `feature/contribution-model` PR merges to `main` (see §5).
- **`contribute/` placement is an upstream concern only.** kuat-mono carries no `contribute/` dir and ships no plugin payloads from it, so there is no payload-leak risk on this side.

## 5. Open decisions for Ed

- **Merge ordering.** The kuat-mono cross-repo links target upstream `main`; they 404 until the upstream `kuat-agent-rules` `feature/contribution-model` PR merges. Recommend merging the upstream PR first (or together), as with the Phase-1 lockstep convention.
- **Duplicate model copy.** `docs/migration/kuat-contribution-model.md` is committed alongside the rollout brief as an execution artifact (the report and LOG reference it by path), consistent with the other `docs/migration/phase-*.md` records. The canonical consumer-facing model remains upstream `contribute/overview.md`; this copy can be pruned once the upstream PR merges if a single source is preferred.

## 6. Verification results

- **kuat-mono** — `pnpm agent-rules:check` → `Agent entrypoints are up to date.`
- **Upstream `reference:check`** (read-only) → `ALL REFERENCE CHECKS PASSED` (passive test, link integrity, structure, token drift; 0 changed reference files — `contribute/` is outside `reference/`).
- **Upstream `verify:plugins`** (read-only, against committed payloads) → `ALL CHECKS PASSED`; `[distribution guard] no contributor skill leaked into any payload (7 repo-local skills kept out)`.
- **Payload audit** — `plugins/kuat-build` and `plugins/kuat-studio` top-level dirs are `skills/reference/[assets]/commands` only; `find plugins -type d -name contribute` → none.

## 7. Follow-ups / backlog

- **Deprecation guidelines (Phase-5 fast-follow).** `contribute/deprecation-guidelines.md` is a stub upstream; it gets designed against the first real case — retiring the legacy `kuat-create`/`kuat-review` skills in Phase 5.
- Open the kuat-mono PR and coordinate merge with the upstream PR (§5).

## 8. Inputs to the next phase

- The canonical model + per-surface pages live at `kuat-agent-rules/contribute/`; kuat-mono links into them by GitHub URL on `main`.
- Phase 5 (rollout/governance) inherits the seeded decision log and the deprecation-guidelines stub as its starting point.
