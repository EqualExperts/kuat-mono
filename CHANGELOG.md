# Changelog

All notable changes to the published Kuat packages are documented in this file.

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
