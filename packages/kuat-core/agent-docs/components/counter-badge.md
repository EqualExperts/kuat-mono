# CounterBadge (`kuat:counter-badge`)

## Overview

Digits-only count pill designed to overlay the top-right of an icon or avatar: solid fill, white text, "{max}+" overflow above the cap (99 by default). Two types — `primary` (brand blue) and `attention` (destructive red). Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`.

## When to use

- Unread/notification counts on icons, tabs, or navigation items
- `attention` when the count demands action; `primary` for routine counts

## When not to use

- Text labels of any kind — use `StatusBadge` or `Tag`
- Counts the user needs exactly beyond the cap — show the full number in content instead

## Variants

- `primary` (default) — `--primary` fill (brand ee-blue)
- `attention` — `--destructive` fill (brand runtime-red)

Solid fill only. The published Figma component ships these two Type variants; a possible future solid/outlined axis is logged upstream but not designed, so it is deliberately not in this API.

## States

None — non-interactive, digits only.

## Content guidance

- Digits only; the component renders `count`, never child content.
- Counts above `max` render as "{max}+" (default "99+").

## Behaviour

- Renders a `<span>` with tabular numerals; `min-width` keeps single digits circular.
- Overlay anchoring is the consumer's job (absolute positioning over the anchor icon/avatar) — see the Storybook `OverlayAnchoring` story.

## Accessibility

- The count renders as real text, so it is announced as-is; when the badge overlays an icon, give the anchor an accessible name that includes the count context (e.g. `aria-label="Notifications, 3 unread"`).
- Fills use the same semantic tokens as primary/destructive Buttons, so the white-text pairing matches the established DS pairing in both modes.

## API

Import from `@equal-experts/kuat-react` (subpath: `@equal-experts/kuat-react/counter-badge`) or `@equal-experts/kuat-vue` (subpath: `@equal-experts/kuat-vue/counter-badge`).

- `count: number` — required
- `max?: number` — default `99`
- `type?: "primary" | "attention"` — default `"primary"`

See Storybook (`Data Display/CounterBadge`) for overflow and overlay-anchoring examples.

## Related components

- `kuat:status-badge` — status indication with a text label
- `kuat:tag` — categorisation labels
- `kuat:badge` — deprecated predecessor; see `kuat-docs/DEPRECATIONS.md`
