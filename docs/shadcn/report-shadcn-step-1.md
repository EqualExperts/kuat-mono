# Report — shadcn integration, Step 1 (kuat-mono)

**Branch:** `feature/shadcn-token-contract` · **Date:** 2026-06-30
**Scope delivered:** Part A (token contract generator) + Part B (CI coverage audit). Part C
(the `review-web-app` skill in `kuat-agent-rules`) is drafted here as a portable patch
([`review-web-app-token-coverage.patch.md`](review-web-app-token-coverage.patch.md)) for a
separate per-repo PR — `kuat-agent-rules` is only present as the gitignored `external/` cache.

## What shipped

A **generated, drift-checked token contract** + a **token-coverage audit** — the conflict guard
that surfaces, before merge, any added shadcn/third-party item resolving a token against a shadcn
default instead of kuat-core. Built **before** the `adopt-kuat` preset (Step 2), so it protects
every add path regardless of how the item got there.

- `packages/kuat-core/token-contract.json` — generated from `variables.css`, **ships** in the
  package (`@equal-experts/kuat-core/token-contract.json`), version-stamped, deterministic.
- `pnpm tokens:contract:generate` / `:check` — `:check` is wired into `contributor:check`.
- `pnpm shadcn:audit -- <path>` — zero-dep CI gate.

## Covered tokens (32 shadcn semantic, all light + dark)

`background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`,
`primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`,
`accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`,
`chart-1…5`, `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-primary-foreground`,
`sidebar-accent`, `sidebar-accent-foreground`, `sidebar-border`, `sidebar-ring`.

Plus a `colorUtilities` map (every `--color-*` → token, so `bg-*/text-*/border-*/ring-*/fill-*`
resolve back) and `definedVariables` (143 authored kuat-core vars, so the audit distinguishes a
legitimate raw `var(--slate-950)` from a fabricated `var(--frobnicate)`).

## Light-only tokens found today

**None.** Every one of the 32 semantic tokens is declared in both `:root` (light) and `.dark`. The
worry in the review about Kuat's dark coverage does not bite at the contract level — kuat-core's
`variables.css` re-declares the full vocabulary (incl. `--sidebar-*` and `--chart-*`) for dark. The
dark-gap branch of the audit is still wired and tested (synthetic contract) so it triggers the moment
a future token is added light-only.

> Note (not a contract gap, but flagged for DS awareness): the existing `tokens:contrast-check`
> reports `primary/primary-foreground`, `secondary/secondary-foreground`, and `sidebar-primary/…`
> in the 3–4.5:1 band (AA for large text / UI only). The audit echoes these as contrast `!` notes on
> items that use those pairs. Pre-existing; out of scope for Step 1.

## Audit pass/fail demo

| Fixture | Result |
|--|--|
| `scripts/shadcn/__fixtures__/covered.tsx` (`bg-card`, `text-primary-foreground`, `var(--ee-blue-500)`, …) | **exit 0** — all 8 tokens ✅ inherited; contrast notes printed |
| `scripts/shadcn/__fixtures__/uncovered.tsx` (`var(--frobnicate)`, `var(--frobnicate-foreground)`) | **exit 1** — 2 ⚠️ MISSING, clear remediation |
| synthetic light-only contract | **exit 1** — 1 ⚠️ dark-gap |

## Drift check

Editing a token value in `variables.css` makes `pnpm tokens:contract:check` fail with a first-diff
line until `tokens:contract:generate` is re-run. The contract cannot silently diverge from the CSS.

## Flag to the planning project — shaping Step 2 (`adopt-kuat` preset)

For added gap items to resolve against this contract by default, the Step-2 `components.json` preset
should set, at minimum:

- `tailwind.cssVariables: true` — use the CSS-variable theme (kuat-core), not hard-coded palette.
- `tailwind.baseColor` — irrelevant once `cssVariables: true`, but set consistently; **do not** let
  the wizard write a rival `:root/.dark` block (the whole point — kuat-core owns it).
- `aliases.utils` → Kuat's `cn` re-export, and `aliases.components` / `aliases.ui` per repo, so
  added items import from the Kuat-wired locations.
- `iconLibrary: lucide` and `rsc`/`tsx` flags to match the consumer.
- Confirm the preset points `tailwind.css` at the entry that imports
  `@equal-experts/kuat-core/variables.css`, so `@theme inline` is processed and every `--color-*`
  utility the audit knows about actually exists at build time.

The audit is the acceptance check for that preset: after `shadcn add` of a gap item with the preset,
`shadcn:audit` on the new file should exit 0 with everything ✅ inherited. Any ⚠️ is a preset miss or a
genuine kuat-core token gap to resolve.
