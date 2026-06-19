# Phase 7 · Run B · B2 — Execution Prompt (downstream `variables.css` generation)

**Repo / Claude Code project:** `kuat-mono` · **Branch:** continue `feature/phase-7-contributor`
**Precondition:** ✅ met — `pnpm agent-rules:sync` has pulled the upstream token SoT into `external/kuat-agent-rules/reference/design-language/tokens/colors.tokens.json` (post-Run-A; the reference generator `external/…/skills/scripts/generate-tokens.mjs` is there to mirror).

> **Intention.** Close the token-SoT loop: make kuat-core `variables.css` **generated** from the synced tokens (it's currently hand-maintained — the `#0066CC` drift vector). Mirrors Run A's upstream `colours.md` generation. **Repo-local skill**, same rule as the rest of Phase 7. This is the last Phase-7 piece; with Phase H it gates `stable`.

Run in plan mode first.

## Deliverables

1. **Generator** (`scripts/agent-docs/generate-variables.mjs` or similar) — read the synced `colors.tokens.json`; emit `packages/kuat-core/src/variables.css`:
   - Generate the **brand scales + aliases** from the tokens (EE Blue / Tech Blue / Transform Teal / Equal Ember + the `--primary`/`--sidebar`/… aliases).
   - **Preserve the support scales** (slate/red/indigo) — they live only in kuat-core, not upstream. So the generator fills the brand/alias regions from tokens and keeps the support-scale block.
   - Add a `GENERATED FILE — DO NOT EDIT BY HAND` banner.
2. **Scripts** — `tokens:generate` (write `variables.css`) + `tokens:check` (`--check`: exit 1 + first-diff message on drift). Copy the shape from `external/…/skills/scripts/generate-tokens.mjs`.
3. **Repo-local skill** — `.claude/skills/generate-tokens/` (downstream half) pointing at the generator; never bundled (the leak check must stay green).
4. **CI hook** — wire `tokens:check` into `contributor:check` / a `.github/workflows` drift gate (the Run B report flagged none exists yet).

## Acceptance / verification

- `variables.css` is generated from the synced tokens (banner present); brand values match the SoT (`--ee-blue-500: #1795d4`, `--tech-blue-500: #22567c`, …); support scales intact.
- **Drift bites:** hand-edit a value in `variables.css` → `tokens:check` exit 1 (first-diff); regenerate → exit 0.
- **Propagation:** change a token upstream → `pnpm agent-rules:sync` → regenerate → `variables.css` reflects it.
- `pnpm build` green (5/5); existing components unaffected; `verify-no-skill-leak` green.

## Report back

Append a **B2** section to `docs/migration/report-phase-7.md` (or `report-phase-7-b2.md`): generator + scripts, the round-trip + drift result, `pnpm build` status. **This completes Phase 7 Run B.** Then commit/PR Run B (B1 + B3 + B2) — and per the handoff, B2's first regeneration should ship in the same release as Run A's upstream colour change (already merged), so the two artifacts never ship out of sync.
