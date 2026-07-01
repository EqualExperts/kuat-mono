# shadcn integration — work log (kuat-mono)

## 2026-07-01 (pm) — prevention spike + order-aware audit-theme

Decided (Ed): prevention over write-locking. Write-locking rejected — not clone-durable (git
drops the bit), needs a re-apply hook, blocks legit edits, blunt.

- Made `audit-theme.mjs` **import-order-aware**: new `--entry <css>` mode expands `@import`s in
  true document order (kuat-core resolved from node_modules, repo fallback for the workspace),
  so it can verify cascade-order setups. Kept the baseline-first file/dir mode for simple checks.
- Prevention mechanism (Step-2 `adopt-kuat` preset): redirect shadcn's write target
  (`components.json` → `tailwind.css: src/shadcn.css`) + import kuat-core **last** so it wins the
  cascade. Reference preset in `docs/shadcn/adopt-kuat-preset/`; write-up in
  `docs/shadcn/prevention-spike.md`.
- Verified deterministically: fixture `entry-prevention/` (kuat last) → 32/32 intact, exit 0;
  `entry-clobber/` (kuat first) → overrides flagged, exit 1. The remaining unknown is a shadcn
  CLI behaviour (does `init` honour the `css` redirect?) — that's what the new-app test answers.

## 2026-07-01 — theme-integrity check (beta.2 consumer-test feedback)

Ed tested `kuat-core@0.14.0-beta.2` in a fresh Vite+React+Kuat app. Name-coverage audit
behaved correctly on every case incl. a real shadcn `Dialog` (100% inherited). But he found
the **shadowed-token** gap: `npx shadcn init` appends its own `:root`/`.dark` after the
kuat-core import, winning the cascade — the app renders shadcn's theme while name-coverage
stays green.

- Added `scripts/shadcn/audit-theme.mjs` (`pnpm shadcn:audit-theme -- <global-css>`): resolves
  the consumer's effective `:root`/`.dark` (kuat-core baseline + consumer blocks, last-wins),
  diffs each semantic token against the contract's authored value **by resolved colour**, not
  text. Reports ✅ intact / ⚠️ OVERRIDDEN; exits 1 on drift. No contract change needed — the
  authored light/dark values already ship (feedback rec 2's data half was done in beta.1).
- Fixtures `__fixtures__/{clean,clobbered}-theme.css`. Verified: clean → 32/32 intact (exit 0);
  clobbered → flags primary/popover/dark surfaces (exit 1), correctly leaves light
  background/card intact (white == white by colour).
- Documented in report (theme vs coverage = values vs names) + Part C patch (shadcn-init
  warning for the upstream skill). Prevention (never run `shadcn init`) is Step 2's preset.

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
