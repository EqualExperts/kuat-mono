# Changelog

All notable changes to the published Kuat packages are documented in this file.

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
