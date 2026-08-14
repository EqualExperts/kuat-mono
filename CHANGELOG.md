# Changelog

All notable changes to the published Kuat packages are documented in this file.

## Multi-package release - 2026-08-14

### Affected packages
- @equal-experts/kuat-core@0.15.3
- @equal-experts/kuat-react@0.15.3
- @equal-experts/kuat-vue@0.15.3

### Changed
- Fixed the `--radius` token base (was `0.3rem`, making `--radius-sm` resolve to 0.8px instead of the intended 4px; now `0.5rem` so `--radius-sm`/`-md`/`-lg`/`-xl` resolve to 4/6/8/12px) and added `--radius-none`. Component CSS in kuat-react and kuat-vue now uses the radius tokens instead of hard-coded values: buttons and menu items use `--radius-md`, inputs/selects/toggles and card-style option fields use `--radius-sm`, and floating overlays (alert dialog, dropdown/select menus, toasts, header nav panel) are flattened to `rounded-none`.
- Added the `ContentCard` agent-docs component guide (kuat-core, kuat-react, kuat-vue) covering when to use it, variants, states, content guidance, and behaviour. The `ContentCard` component itself already shipped in 0.15.2 — this adds the missing agent-facing documentation and registry entry.
- Corrected the `tailwind.config.ts` radius-scale comment, which referenced a stale `0.3rem` base and outdated `rounded-lg` guidance for interactive elements.

## Multi-package release 0.15.1 - 2026-07-14

### Affected packages
- @equal-experts/kuat-core@0.15.1
- @equal-experts/kuat-react@0.15.1
- @equal-experts/kuat-vue@0.15.1

### Added
- **`StatusBadge` component** (`kuat:status-badge`) in both `@equal-experts/kuat-react` and
  `@equal-experts/kuat-vue`. Non-interactive status indicator: five semantic types
  (success/warning/error/info/neutral) with per-type icons, two sizes, solid fills, square
  corners. Import from the package root or the `/status-badge` subpath.
- **`Tag` component** (`kuat:tag`). Categorisation pill with nine colour categories from the
  extended Data/Digital palette, three interaction modes (display `<span>`, toggle and dismiss
  `<button>`s), `aria-pressed` toggle state, and a 44px invisible touch target. `/tag` subpath.
- **`TagGroup` component** (`kuat:tag-group`). Thin accessibility wrapper for Tag sets:
  `role="group"` + `aria-label`, flex-wrap layout, and an `aria-live` region announcing tag
  removal. `/tag-group` subpath.
- **`CounterBadge` component** (`kuat:counter-badge`). Digits-only count pill with `{max}+`
  overflow (99 by default) and `primary`/`attention` types. `/counter-badge` subpath.
- **`--tag-*` design tokens** in `kuat-core`: per-category background / background-hover /
  background-selected / foreground / border, with dedicated light and dark values mirroring the
  Figma "semantic colors" collection, mirrored as `--color-tag-*` Tailwind utilities.

### Changed
- **`Badge` is deprecated** in both packages (kept exported and functional, with a one-time dev
  console warning). Use `StatusBadge` (status), `Tag` (categorisation), or `CounterBadge`
  (counts). Removal target: next major — see `kuat-docs/DEPRECATIONS.md` for the variant
  migration map.
- Component registry, decision tree, and packaged `agent-docs/` updated with the four new
  components (lockstep with kuat-agent-rules#16).

## Pre-release 0.15.0-beta.1 - 2026-07-06

### Affected packages
- @equal-experts/kuat-core@0.15.0-beta.1
- @equal-experts/kuat-react@0.15.0-beta.1
- @equal-experts/kuat-vue@0.15.0-beta.1

### Added
- **`Callout` component**, in both `@equal-experts/kuat-react` and `@equal-experts/kuat-vue`.
  Inline banner for info/positive/warning/issue status messages with a required title, optional
  description, a per-type icon (shown by default, togglable), and an optional link-style action.
  Import from the package root or the `/callout` subpath.
- **`--callout-*` design tokens** in `kuat-core` (`--callout-info`, `--callout-positive`,
  `--callout-warning`, `--callout-issue`, each with a `-foreground` pair, plus `--callout-link`),
  light + dark, mirrored as `--color-callout-*` Tailwind utilities. Info and warning accent colours
  sit one palette step darker than the literal Figma value (`-600` instead of `-500`) to clear the
  3:1 WCAG floor enforced by `pnpm tokens:contrast-check` — see `token-contract.json`.

## Pre-release 0.15.0-beta.0 - 2026-07-03

### Affected packages
- @equal-experts/kuat-core@0.15.0-beta.0
- @equal-experts/kuat-react@0.15.0-beta.0
- @equal-experts/kuat-vue@0.15.0-beta.0

First beta synced from the upstream June 2026 colours lockdown (`kuat-agent-rules`
`colors.tokens.json`). react/vue are version-aligned only (no code changes; both re-import
`@equal-experts/kuat-core/variables.css`).

### Added
- **Extended colour palette.** 10 new brand scales (Index Indigo, Packet Plum, Runtime Red,
  Uptime Green, Server Slate, Logic Lime, Edge Blue, Signal Yellow, Cursor Coral, Patch Peach),
  each a full 50–950 scale plus a `--brand-*` alias, registered as `--color-<scale>-<step>`
  Tailwind utilities. Exception-only — see the upstream `colour-usage.md` for the tier model.
- **EE neutral scale.** `--neutral-50…950` (monotonic Byte White → Dark Data), plus
  `--brand-overcast` (`--neutral-600`). Distinct from Server Slate, which stays a separate brand
  grey.
- **Semantic/RAG layer.** `--error`, `--warning`, `--success`, `--info`, `--link`,
  `--interaction-state` (light + dark), each mirrored as a `--color-*` Tailwind utility and added
  to `token-contract.json`'s `semanticVocabulary`. `--link` is **WIP** — a deliberately
  just-under-AA accessible EE Blue (`#0080be`), flagged for validation; consumers should reference
  the token, not hard-code the hex.

### Changed
- **`--destructive` is now Runtime Red** (`#a3152b`), replacing the old Tailwind `red-600`
  (`#dc2626`), in both light and dark.
- **shadcn semantic roles backed by the new neutral scale, not the internal `slate` support
  scale**, for every role that previously resolved through `slate-*`
  (`foreground`, `muted`/`muted-foreground`, `accent-foreground`, `card-foreground`, `border`,
  `input` (dark), `sidebar-accent`/`sidebar-border`/`sidebar-ring`, `kuat-header-*`). Values shift
  slightly (e.g. dark-mode `background` now resolves to Dark Data, the brand's canonical dark
  surface, rather than an intermediate slate); `muted-foreground` was bumped a neutral step over a
  straight rank-swap to keep `muted`/`muted-foreground` at 4.5:1+ AA (5.56:1) instead of
  regressing below the 3:1 floor. Full contrast reverified via `pnpm tokens:contrast-check` — no
  pair sits below the 3:1 hard floor after this change.
- `token-contract.json`'s `semanticVocabulary` now includes Kuat's own semantic roles alongside
  the shadcn v4 set (see Added, above).

### Fixed
- **`--brand-dark-data` colour drift.** The old hand-authored value
  (`oklch(0.208 0.010 240.0)`) actually rendered `#14191c`, not the `#212526` its comment
  claimed. Now aliased to `--neutral-950`, which resolves exactly to `#212526`.
- **`--brand-the-cloud` colour drift.** Previously aliased to `slate-100` (`#f1f5f9`) as a
  stand-in; now aliased to `--neutral-100`, the real The Cloud value (`#f5f5f5`).

## 0.14.0 - 2026-07-01

First stable release of the 0.14 line (promotes 0.14.0-beta.0 → beta.3 to the `latest`
dist-tag). Highlights since 0.13.1:

### Added
- **shadcn token contract.** `@equal-experts/kuat-core` ships `token-contract.json` (exported at
  `@equal-experts/kuat-core/token-contract.json`): the generated, drift-checked list of the shadcn
  semantic tokens Kuat defines in light and dark, the `--color-*` utility each backs, and the full
  authored kuat-core vocabulary. Backs the shadcn/third-party token-coverage + theme-integrity audits.

### Fixed
- **shadcn theme override (cascade layers).** kuat-core's semantic `:root`/`.dark` tokens are now
  **unlayered**, so importing `@equal-experts/kuat-core/variables.css` last reliably wins over a third
  party's unlayered `:root` (e.g. what `shadcn init` generates). Previously they sat in `@layer base`
  and lost the cascade regardless of import order, silently rendering shadcn's theme.
- **Dark-mode contrast.** Foreground/surface tokens that rendered invisible text in dark mode were
  corrected, with a WCAG AA contrast guardrail added to the contributor gate.

### Changed
- Tailwind v4 CSS-first is the documented/recommended setup; the JS preset is deprecated.

## Pre-release 0.14.0-beta.3 - 2026-07-01

### Affected packages
- @equal-experts/kuat-core@0.14.0-beta.3
- @equal-experts/kuat-react@0.14.0-beta.3
- @equal-experts/kuat-vue@0.14.0-beta.3

### Fixed
- **shadcn theme override.** kuat-core's semantic `:root`/`.dark` tokens were wrapped in `@layer base`; a third party's unlayered `:root` (e.g. what `shadcn init` generates) silently won the cascade — unlayered rules always beat layered ones regardless of import order — so the app rendered shadcn's theme instead of Kuat's. The semantic token block is now **unlayered**, so importing `@equal-experts/kuat-core/variables.css` last wins. (`@theme inline`, base `body`/`*` rules, and the brand scales stay layered.)

### Notes
- Third-and-a-half beta under the `beta` tag; `latest` remains 0.13.1. react/vue are version-aligned only (no code changes since beta.1).

## Pre-release 0.14.0-beta.2 - 2026-07-01

### Affected packages
- @equal-experts/kuat-core@0.14.0-beta.2
- @equal-experts/kuat-react@0.14.0-beta.2
- @equal-experts/kuat-vue@0.14.0-beta.2

### Notes
- Third beta under the npm `beta` dist-tag; `latest` remains 0.13.1. Cut to test the new shadcn token contract in a real npm install. react/vue are version-aligned only (no code changes since beta.1).

### Added
- `@equal-experts/kuat-core` now ships `token-contract.json` (exported at `@equal-experts/kuat-core/token-contract.json`) — the generated, drift-checked list of the shadcn semantic tokens Kuat defines in light and dark, the `--color-*` utility each backs, and the full authored kuat-core vocabulary. Backs the shadcn/third-party token-coverage audit.

## Pre-release 0.14.0-beta.1 - 2026-06-25

### Affected packages
- @equal-experts/kuat-core@0.14.0-beta.1
- @equal-experts/kuat-react@0.14.0-beta.1
- @equal-experts/kuat-vue@0.14.0-beta.1

### Notes
- Second beta under the npm `beta` dist-tag; `latest` remains 0.13.1. Hardening from the consumer beta-setup field report.

### Fixed
- Dark-mode foreground/surface tokens that rendered invisible text (card, accent, muted, and sidebar accent/primary). Added a WCAG AA contrast guardrail (`pnpm tokens:contrast-check`) to the contributor gate.
- `CarouselProps['opts']` was typed as the Embla viewport ref instead of the options object, breaking `opts={{ loop: true }}`.
- Build warning from the Google Fonts `@import` inside `variables.css` — fonts moved to `@equal-experts/kuat-core/fonts.css` (loaded first; component packages still ship fonts out of the box).

### Changed
- Tailwind v4 CSS-first is now the documented/recommended setup across the package READMEs, agent-docs, and `kuat-docs/setup` guides; the JS preset (`presets: [kuatPreset]`) is deprecated.
- kuat-react README gains an accurate per-component peer-dependency matrix.

## Pre-release 0.14.0-beta.0 - 2026-06-24

### Affected packages
- @equal-experts/kuat-core@0.14.0-beta.0
- @equal-experts/kuat-react@0.14.0-beta.0
- @equal-experts/kuat-vue@0.14.0-beta.0

### Notes
- Beta published under the npm `beta` dist-tag for consumer testing. The `latest` tag remains 0.13.1; testers opt in with `@beta` or the exact version.

### Changed
- Regenerated consumer `agent-docs/` bundles to the new upstream `reference/` layout (Phase 1b).
- kuat-core: brand-colour block in `variables.css` regenerated from the token source-of-truth (Phase 7).

## Multi-package release - 2026-05-18

### Affected packages
- @equal-experts/kuat-core@0.13.0
- @equal-experts/kuat-react@0.13.0
- @equal-experts/kuat-vue@0.13.0

### Changed
- KuatHeader app switcher with nested account and lockup API
- IconButton component (React and Vue)
- Header demo logo lockup support

## Unreleased

### Changed
- Reorganized Storybook navigation in both `apps/storybook-react` and `apps/storybook-vue` into intent-based groups (`Form Components`, `Actions`, `Navigation`, `Feedback`, `Data Display`, `Overlays`, and `Blocks`), replacing the legacy `Kuat Blocks` sidebar label.

## Multi-package release - 2026-04-24

### Affected packages
- @equal-experts/kuat-core@0.12.0
- @equal-experts/kuat-react@0.12.0
- @equal-experts/kuat-vue@0.12.0

### Changed
- Updated Header to support demo logo lockup

## Multi-package release - 2026-04-24

### Affected packages
- @equal-experts/kuat-core@0.11.0
- @equal-experts/kuat-react@0.11.0
- @equal-experts/kuat-vue@0.11.0

### Changed
- Carousel responsive basis via API

## Multi-package release - 2026-04-24

### Affected packages
- @equal-experts/kuat-core@0.10.0
- @equal-experts/kuat-react@0.10.0
- @equal-experts/kuat-vue@0.10.0

### Changed
- Support variable widths on content cards

## Multi-package release - 2026-04-22

### Affected packages
- @equal-experts/kuat-core@0.9.2
- @equal-experts/kuat-react@0.9.2
- @equal-experts/kuat-vue@0.9.2

### Fixed
- Build errors

## Multi-package release - 2026-04-22

### Affected packages
- @equal-experts/kuat-core@0.9.1
- @equal-experts/kuat-react@0.9.1
- @equal-experts/kuat-vue@0.9.1

### Notes
- Release prepared via shorthand script.

### Changed
- agent guardrails added to consumer setup.

## Multi-package release - 2026-04-22

### Affected packages
- @equal-experts/kuat-core@0.9.0
- @equal-experts/kuat-react@0.9.0
- @equal-experts/kuat-vue@0.9.0

### Changed
- Improvements to installation guidance for agents

## Multi-package release - 2026-04-22

### Affected packages
- @equal-experts/kuat-core@0.8.0
- @equal-experts/kuat-react@0.8.0
- @equal-experts/kuat-vue@0.8.0

### Added
- Release workflow

## Multi-package release - 2026-04-22

### Affected packages
- @equal-experts/kuat-core@0.7.0
- @equal-experts/kuat-react@0.7.0
- @equal-experts/kuat-vue@0.7.0

### Added
- Documentation for agents, new release workflow

## 0.6.0 - 2026-04-21

### Package Changes

#### Added
- New `Sonner` toast components in both `@equal-experts/kuat-react` and `@equal-experts/kuat-vue`, including shared positioning constants and toast helpers.

#### Changed
- Updated carousel implementations across React and Vue packages to the latest internal Kuat version and behavior.
- Aligned package versioning and release metadata across all published Kuat packages.

### Repository and Tooling

- Vendored upstream agent guidance under `external/kuat-agent-rules` with deterministic sync tooling and local entrypoint generation templates.
- Standardized local agent entrypoints so `AGENTS.md` is the canonical source, with `.cursorrules` as a generated bootstrap pointer and `CLAUDE.md` linked to `AGENTS.md`.

### Consumer Notes
- This is a backwards-compatible minor release with new component surface (`Sonner`) and carousel updates; no breaking API changes were introduced.

## 0.5.0 - 2026-04-16

### Added
- New form primitives across `@equal-experts/kuat-react` and `@equal-experts/kuat-vue`: `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Toggle`, and `ToggleGroup`.
- Field-oriented companion components to support labelled and grouped form controls, including `CheckboxField`, `RadioField`, and `SwitchField`.
- Expanded package subpath exports for tree-shakeable imports of the new form components in both published UI packages.
- Storybook coverage for the new controls and related field compositions in both React and Vue packages.
- Consumer documentation covering setup, component selection guidance, and public API inventory.

### Changed
- Refreshed package READMEs and top-level docs to better explain what ships from Kuat versus what consumers should install from `shadcn` or `shadcn-vue`.
- Updated `@equal-experts/kuat-core` design token styling, including focus ring colour adjustments and variables used by the newer form components.

### Consumer Notes
- Recommended install targets remain `@equal-experts/kuat-core` plus either `@equal-experts/kuat-react` or `@equal-experts/kuat-vue`.
- This release is intended as a backwards-compatible minor update with new components and docs; no breaking API changes were identified during release preparation.
