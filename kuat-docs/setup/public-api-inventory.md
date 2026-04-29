# Public API and documentation inventory

This file maps **published package exports** to **documentation surfaces** (Storybook, narrative docs in `kuat-docs/rules/components/`). Use it when auditing or updating consumer docs. Package versions follow `packages/*/package.json` (currently **0.6.0**).

---

## React (`@equal-experts/kuat-react`)

### `package.json` subpath exports

| Subpath | Notes |
|---------|--------|
| `.` | Main barrel — most symbols |
| `./button` | Tree-shakable entry |
| `./accordion` | |
| `./alert-dialog` | |
| `./badge` | |
| `./button-group` | |
| `./kuat-radial-progress` | |
| `./textarea` | |
| `./input` | |
| `./field` | |
| `./select` | |
| `./checkbox` | |
| `./radio` | |
| `./switch` | |
| `./sonner` | |
| `./toggle` | |
| `./toggle-group` | |
| `./carousel` | Tree-shakable carousel primitives |
| `./kuat-carousel` | Tree-shakable Kuat carousel block entry |
| `./styles` | Bundled global CSS entry (`dist/styles.css`) |

Symbols exported only from the main barrel (no dedicated subpath): e.g. `KuatHeader`, `KuatLogoLockup`, `EELogoIcon`, `ContentCard`, `ButtonGroup`, `cn`, etc. See `packages/kuat-react/src/index.ts`.

Carousel can be imported from either:
- `@equal-experts/kuat-react` (root barrel), or
- `@equal-experts/kuat-react/carousel` and `@equal-experts/kuat-react/kuat-carousel` (subpaths).

### Storybook (`apps/storybook-react/stories/`)

Sidebar grouping uses intent-first navigation:
- `Form Components`: Field, Input, Textarea, Select, Checkbox, CheckboxField, Radio, RadioField, Switch, SwitchField
- `Actions`: Button, ButtonGroup, Toggle, ToggleGroup
- `Navigation`: Accordion, Breadcrumb
- `Feedback`: Sonner
- `Data Display`: Badge
- `Overlays`: AlertDialog
- `Blocks`: KuatHeader, KuatLogoLockup, KuatCarousel, ContentCard, KuatRadialProgress

| Story file | Covered areas |
|------------|----------------|
| `Accordion.stories.tsx` | Accordion |
| `AlertDialog.stories.tsx` | AlertDialog |
| `Badge.stories.tsx` | Badge |
| `Breadcrumb.stories.tsx` | Breadcrumb |
| `Button.stories.tsx` | Button |
| `ButtonGroup.stories.tsx` | ButtonGroup |
| `Checkbox.stories.tsx`, `CheckboxField.stories.tsx` | Checkbox, CheckboxField |
| `ContentCard.stories.tsx` | ContentCard |
| `Field.stories.tsx` | Field |
| `Input.stories.tsx` | Input |
| `KuatCarousel.stories.tsx` | KuatCarousel |
| `KuatHeader.stories.tsx` | KuatHeader |
| `KuatLogoLockup.stories.tsx` | KuatLogoLockup |
| `KuatRadialProgress.stories.tsx` | KuatRadialProgress |
| `Radio.stories.tsx`, `RadioField.stories.tsx` | RadioGroup, RadioField |
| `Select.stories.tsx` | Select, KuatSelect |
| `Sonner.stories.tsx` | Sonner |
| `Switch.stories.tsx`, `SwitchField.stories.tsx` | Switch, SwitchField |
| `Textarea.stories.tsx` | Textarea |
| `Toggle.stories.tsx`, `ToggleGroup.stories.tsx` | Toggle, ToggleGroup |

---

## Vue (`@equal-experts/kuat-vue`)

### `package.json` subpath exports

Same pattern as React, except **no** `./kuat-radial-progress` subpath in `package.json` (radial progress is still on the main barrel — verify `package.json` if this changes). Includes `./styles` as bundled global CSS entry (`dist/styles.css`). Barrel: `packages/kuat-vue/src/index.ts`.

Carousel can be imported from either:
- `@equal-experts/kuat-vue` (root barrel), or
- `@equal-experts/kuat-vue/carousel` and `@equal-experts/kuat-vue/kuat-carousel` (subpaths).

### Storybook (`apps/storybook-vue/stories/`)

Mirror of React coverage and sidebar groups (same component names, `.stories.ts`).

---

## Narrative docs (`kuat-docs/rules/components/`)

| File | Component / topic |
|------|-------------------|
| [carousel.md](../rules/components/carousel.md) | KuatCarousel |
| [logo-lockup.md](../rules/components/logo-lockup.md) | KuatLogoLockup |
| [patterns.md](../rules/components/patterns.md) | Contributor patterns; links to consumer [choosing-components.md](./choosing-components.md) |

Other Kuat components are documented primarily in **Storybook** (see `parameters.docs` on each story).

---

## Typical shadcn-only components (not in Kuat packages)

Install via **shadcn** / **shadcn-vue** when you need them, with `kuat-core` theming:

- Dialog (modal content distinct from Alert Dialog)
- Dropdown menu, Context menu, Popover, Tooltip
- Tabs, Navigation menu, Sheet, Drawer
- Avatar, Calendar, Command, etc.

This list is **not exhaustive** — if a primitive is not exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`, add it from the registry.
