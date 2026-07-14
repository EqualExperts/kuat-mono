# Tag (`kuat:tag`)

## Overview

Categorisation pill on the extended Data/Digital palette: nine colour categories, full pill radius, and three interaction modes — display (non-interactive), toggle (multi-select filter), and dismiss (removable). Colours come from per-category `--tag-*` semantic tokens in `@equal-experts/kuat-core` (mirroring the Figma "semantic colors" collection) with dedicated light and dark values. Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`.

## When to use

- Zero-to-many category labels per item (skills, technologies, topics)
- Multi-select filter chips (`mode="toggle"`)
- Applied-filter chips the user can remove (`mode="dismiss"`)

## When not to use

- Status indication — use `StatusBadge` (one per item, status colours)
- Mixing toggle and dismiss tags within the same group — pick one interaction model per group
- More than 8–10 tags per item without curation — collapse or curate instead

## Variants

Nine `color` categories: `base` (EE neutral scale) plus the eight extended Data/Digital ramps — `index-indigo`, `transform-teal`, `packet-plum`, `server-slate`, `logic-lime`, `signal-yellow`, `cursor-coral`, `patch-peach`.

## States

Each state uses its category's semantic token (light value → dark value in ramp steps):

- **Default** — `--tag-{category}-background` (`/50` → `/700`), text `--tag-{category}-foreground` (`/700` → `/100`)
- **Hover** (interactive modes) — `--tag-{category}-background-hover` (`/100` → `/600`) + 1px `--tag-{category}-border` (`/700` → `/100`)
- **Selected Toggle** — `--tag-{category}-background-selected` (`/200` → `/500`) + trailing check icon
- **Selected Dismiss** — same selected background + trailing x icon (dismiss tags always render this visual)
- **Disabled** — 50% opacity, no pointer events

`base` maps to the EE neutral ramp with the same steps (white background in light mode).

## Content guidance

- One or two words per tag; the label names the category, not the action.
- For dismiss tags, consider passing `aria-label="Remove {label}"` when the surrounding context doesn't already make the action obvious.

## Behaviour

- `mode="display"` renders a `<span>`; `toggle` and `dismiss` render a `<button type="button">` — a conditional element choice built into Tag, not a polymorphic base.
- Toggle: clicking calls `onSelectedChange(next)` (React) / emits `update:selected` (Vue); the consumer owns the state.
- Dismiss: clicking calls `onDismiss` (React) / emits `dismiss` (Vue) and, inside a `TagGroup`, announces "{label} removed" via the group's live region.
- Full light/dark support: the `--tag-*` semantic tokens flip with the `.dark` class, so tags invert (dark `/700` fills with `/100` text) without any component-level changes.

## Accessibility

- 44px-tall invisible hit area extends beyond the 37px visual pill (WCAG 2.5.8 touch target).
- Toggle tags expose `aria-pressed`; check/dismiss icons are `aria-hidden="true"`.
- WCAG AA contrast confirmed per colour in the Figma spec (tightest: Transform Teal selected, 4.67:1).
- Keyboard-operable: real `<button>` semantics, visible focus ring.

## API

Import from `@equal-experts/kuat-react` (subpath: `@equal-experts/kuat-react/tag`) or `@equal-experts/kuat-vue` (subpath: `@equal-experts/kuat-vue/tag`).

- `color?: TagColor` — default `"base"`
- `mode?: "display" | "toggle" | "dismiss"` — default `"display"`
- `selected?: boolean` — toggle mode only, default `false`
- `onSelectedChange?: (selected: boolean) => void` (React) / `@update:selected` (Vue)
- `onDismiss?: () => void` (React) / `@dismiss` (Vue)
- `disabled?: boolean`
- Label is the child content

See Storybook (`Data Display/Tag`) for all colours, modes, and states.

## Related components

- `kuat:tag-group` — wrap every set of Tags in one for the group role, label, and dismissal announcements
- `kuat:status-badge` — status indication (one per item, status colours)
- `kuat:badge` — deprecated predecessor; see `kuat-docs/DEPRECATIONS.md`
