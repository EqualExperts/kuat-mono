---
name: generate-tokens
description: Regenerate the brand-colour block of @equal-experts/kuat-core src/variables.css from the upstream colour token source-of-truth, and run the drift gate. Use when colours changed upstream (Run A) and the downstream CSS needs refreshing, or to check variables.css hasn't drifted. Repo-local contributor skill — never packaged or distributed. Downstream half of Phase 7's generate-tokens.
---

# Generate kuat-core colour variables from the token SoT

Repo-local skill for **Kuat design-system contributors**. It keeps the downstream CSS
(`@equal-experts/kuat-core` `src/variables.css`) in lockstep with the **upstream colour token
source-of-truth**, closing the `#0066CC` drift vector for the CSS.

> **Repo-local.** Lives in `kuat-mono/.claude/skills/` (project scope), discovered when you work in this
> repo, **never** bundled or in the marketplace. The `verify-no-skill-leak` guard enforces this.

## The model (read first)

- **Source of truth:** upstream `reference/design-language/tokens/colors.tokens.json` in
  **kuat-agent-rules** (W3C design tokens). The upstream `generate-tokens.mjs` owns `colours.md`.
- **Downstream:** this skill owns only the **brand-palette block** of kuat-core `variables.css` — the 44
  `--<scale>-<step>` vars between the `/* GENERATED:brand-palettes … */` … `/* /GENERATED:brand-palettes */`
  sentinels. Everything else in `variables.css` (support scales slate/red/indigo, semantic light/`.dark`,
  `@theme inline`, typography, shadows) is **local + hand-owned** — it references the brand scale vars via
  `var()`, so it follows the SoT automatically.
- **kuat-core is downstream — never the reverse.** Change colours in the upstream token file, sync, regenerate.

## When to use

- Upstream colours changed (Run A) and you've synced — refresh the CSS.
- Verifying `variables.css` hasn't drifted from the tokens (CI / pre-release).

## When NOT to use

- Editing the brand scale values — do that in the **upstream** token file, not here.
- Editing support scales (slate/red/indigo) or semantic/`@theme` blocks — those are hand-owned local CSS,
  outside the generated sentinels.

## Steps

1. **Sync the SoT** (the generator reads the synced cache; `external/` is gitignored):
   ```bash
   pnpm agent-rules:sync
   ```
2. **Regenerate** the brand block:
   ```bash
   pnpm tokens:generate
   ```
3. **Check** for drift (CI-safe; exit 1 + first-diff line on mismatch):
   ```bash
   pnpm tokens:check        # also part of `pnpm contributor:check`
   ```
4. **Build** to confirm nothing downstream broke:
   ```bash
   pnpm build
   ```

## Definition of done

- `variables.css` brand block matches the token SoT (`pnpm tokens:check` green).
- `pnpm build` green; `pnpm contributor:check` green.
- **Release coupling:** ship the regenerated `variables.css` in the **same release** as the upstream
  colour change, so the two artifacts never ship out of sync.

## Notes

- Generation is **deterministic** (no timestamps) so `--check` is stable.
- Only the sentinel block is generated; if a brand *scale* is ever added upstream, also extend the
  `@theme inline` brand mappings (hand-owned `var()` indirection) — scale steps are otherwise fixed 50…950.

## Related

- Part of the [contribution model](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md) — this is the **Medium · token** path (Heavy for token *structure*) ([proposing a token change](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/proposing-a-token-change.md)).

---
_Phase 7 Run B · B2 · contributor skill · v1 (2026-06-19)_
