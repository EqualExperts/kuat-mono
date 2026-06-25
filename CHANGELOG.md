# Changelog

All notable changes to the published Kuat packages are documented in this file.

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
