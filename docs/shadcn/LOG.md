# shadcn integration — work log (kuat-mono)

## 2026-06-30 — Step 1: token contract + coverage audit

Branch `feature/shadcn-token-contract`. Source of intent:
`execution-plans/shadcn-integration-review.md` (audit-first; settled).

- Extracted shared CSS/colour helpers to `scripts/tokens/lib/css-color.mjs`
  (`stripDarkBlock`, `parseDecls`, `resolve`, oklch→linear-RGB, `luminance`,
  `contrast`, `foregroundOf`). Refactored `contrast-check.mjs` to import them —
  output verified **byte-identical** to the pre-refactor baseline (22 pairs).
- Added `scripts/tokens/generate-token-contract.mjs` → emits
  `packages/kuat-core/token-contract.json` from `variables.css`: 32 shadcn
  semantic tokens with light+dark presence/values, the `--color-*` utility map
  (`colorUtilities`), and the full authored kuat-core vocabulary
  (`definedVariables`, 143 entries — lets the audit tell a real Kuat token from a
  fabricated one). Deterministic, version-stamped, `--check` drift gate.
- Scripts: `tokens:contract:generate` / `tokens:contract:check`; `shadcn:audit`.
  Folded `tokens:contract:check` into `contributor:check`.
- Shipped the contract: added `token-contract.json` to kuat-core `files` +
  `exports` (`@equal-experts/kuat-core/token-contract.json`).
- Added `scripts/shadcn/audit-coverage.mjs` (enumerate → diff → report
  ✅/⚠️missing/⚠️dark-gap + contrast notes; exits non-zero on missing/dark-gap;
  `TODO(R4)` ESLint seam) with `__fixtures__/{covered,uncovered}.tsx`.
- Drafted Part C as `docs/shadcn/review-web-app-token-coverage.patch.md` for the
  separate `kuat-agent-rules` PR (skill step + `.kuat/feedback` record schema;
  channel deferred).

### Verification run
- `tokens:contrast-check` — identical to baseline ✓
- `tokens:contract:generate` → 32 tokens, all light+dark, **no light-only gaps** ✓
- `tokens:contract:check` — passes; mutating a token in `variables.css` makes it
  fail (drift gate works), regenerate restores ✓
- `shadcn:audit -- …/covered.tsx` → exit 0; `…/uncovered.tsx` → exit 1 with clear
  remediation; synthetic dark-gap contract → exit 1 ✓
