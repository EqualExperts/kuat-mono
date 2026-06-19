# Phase 7 Run B — B2 `generate-tokens` (downstream) — ✅ RESOLVED

**Status:** ~~deferred (2026-06-17)~~ → **RESOLVED 2026-06-19.** Run A was synced into `external/`, so the
token SoT became available and B2 was implemented. See the
[2026-06-19 B2 entry in LOG.md](LOG.md) and [report-phase-7.md](report-phase-7.md).

> The history below records why it was originally deferred (kept for context).

## Why deferred

B2 generates `@equal-experts/kuat-core` `src/variables.css` from the upstream token
source-of-truth and adds a drift check. The SoT —
`reference/design-language/tokens/colors.tokens.json` — is produced by **Run A** in
`kuat-agent-rules` and **is not in this checkout**: the vendored `external/kuat-agent-rules/`
is a 2026-06-13 snapshot (gitignored), pre-dating Run A's work, and contains the
*hand-maintained* `colours.md`, not the tokens JSON. There is nothing to generate from yet.

## Unblock condition

1. Run A merges in `kuat-agent-rules` (the upstream `generate-tokens` half + `colors.tokens.json`).
2. Re-sync upstream into `external/` (`pnpm agent-rules:sync`) so the tokens land here.

## Intended shape (per the Run B handoff)

- `scripts/tokens/generate-variables.mjs` (`--check` mode) emitting
  `packages/kuat-core/src/variables.css` from the synced
  `reference/design-language/tokens/` (brand scales + aliases; the support scales —
  slate/red/indigo — stay local to kuat-core, not upstream).
- A drift check that fails CI when `variables.css` diverges from the synced tokens.
- Mirror the upstream generator/`--check` shape (`skills/scripts/generate-tokens.mjs`) and wire
  it the way B3's `components:registry:check` is wired here.
- **Release coupling:** land the first `variables.css` regeneration in the *same release* as any
  upstream colour change so the two artifacts never ship out of sync.

See [phase-7-kuat-mono-handoff.md](phase-7-kuat-mono-handoff.md) §B2 for the full description.
