# ContentCard (`kuat:content-card`)

## Overview

Static, non-interactive container for a self-contained piece of content: badge + category label + title, optional media, optional body text, and optional custom-content/footer slots. Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`. This is the generic "card" for Kuat product UI — resolve here before reaching for a raw `shadcn:card` or hand-rolling a rounded box.

## When to use

- A content block that summarises one thing and links out to more of it — case studies, articles, resources, related-item lists, dashboard "learn more" tiles.
- Grid or list layouts of like items where each item needs a badge/category/title plus optional supporting media or text.
- Making the whole card a single click target: pass `asChild` with one child element (typically a link) and the card's classes and slots render onto that element instead of a wrapping `div`.

## When not to use

- KPI/metric summary tiles — use the dashboard pattern's KPI Card structure, not this component (ContentCard's fixed heading-row/badge layout isn't built for a large numeric value as the focal point).
- Anything interactive on its own (a clickable settings tile, a selectable option) — this is a static container; if the whole surface needs hover/focus/pressed states beyond the `asChild`-wrapped-link case, that's a different, interactive component.
- A simple text-plus-icon status message — use `Callout`.

## Variants

No `variant` prop — ContentCard has one visual form. What varies is which optional slots are populated:

- **With / without media** — pass `imageSrc` (a string URL) to show a 192px media area above the body; pass `imageSrc={null}` (the default) to remove the media area entirely, with no gap left behind.
- **Default / fluid / custom width** — `width="default"` (max 373px, the default), `width="fluid"` (no max-width, fills its container), or `width="custom"` with `maxWidth` set to any CSS max-width value.

## States

- **Basic content text shown / hidden** — `contentText` (default `null`); omit it to skip the content paragraph entirely rather than rendering an empty one.
- **Header accessory present / absent** — `headerAccessory` slot renders top-right of the heading row (e.g. a menu button or timestamp); absent by default.
- **Custom content / footer present / absent** — both are empty by default and only take up space when populated.
- **Root element / asChild** — by default renders a `div`; with `asChild` and a single child element, the card's classes, `data-slot="content-card"`, and internal slot markup render onto that child instead (see Behaviour).

## Content guidance

- **Category** is a short label above the title (e.g. "User experience", "Case study") — not a sentence, not a duplicate of the badge.
- **Title** should be a clear, descriptive headline on its own — a reader scanning a grid of cards should understand what each one is from the title alone, without needing the category or badge as a crutch.
- **Basic content text** (`contentText`) is for a short supporting summary, not the full body — if there's more to say, that's what the card links out to via `asChild`, not what belongs inside `content-card__content`.
- Real or realistic copy when validating a layout with these — a grid of "Lorem ipsum" cards doesn't validate whether the title/category/badge combination actually reads clearly at a glance.

## Behaviour

- **Static container, not a button or link by default.** ContentCard itself carries no interactive semantics — if the card should be a single click target, use `asChild` with one child element (typically `<a href>`); the card's styling and internal slot structure render onto that element, and it becomes the accessible interactive element, not a `div` wrapping a nested link.
- **`titleHeadingLevel` is a real heading level** (`1`–`6`, default `3` in the React API), not just a style — pick the level that's correct for the page's heading structure (e.g. `3` under a page's `h2` section heading), not automatically `3` regardless of context.
- **Badge is real content, not decoration** — in React it's a required prop typed to accept a rendered component (pass a real `Badge`/`StatusBadge`/`Tag`, not a plain string trying to look like one). In Vue it's the `badge` named slot.

## Accessibility

- The title renders as a real heading element at the level you specify — get the level right for the surrounding page structure so screen-reader users navigating by heading get an accurate outline.
- When used with `asChild` to make the whole card a link, the link's accessible name comes from its content (title, category, badge text all read together) — if that combination doesn't clearly describe the destination on its own, add visually-hidden text to the link rather than relying on surrounding context.
- No colour-only signal exists in this component — badge/category/title are all plain foreground text; any status meaning should come from the badge component passed in (e.g. `StatusBadge`), which carries its own accessibility guarantees.

## Design-language note

ContentCard is a static content container — per `design-language/borders.md`, static containers use `--radius-none` (0px), matching its own CSS (`content-card.css` has no `rounded-*` class at all). If a layout calls for a rounded "card," that is not this component's default look — check whether the request actually wants a clickable/interactive card (radius-md) before reaching for a generic rounded box.

## API

Import from `@equal-experts/kuat-react` (subpath: `@equal-experts/kuat-react/content-card`) or `@equal-experts/kuat-vue` (subpath: `@equal-experts/kuat-vue/content-card`).

**The React and Vue APIs differ in shape** — React passes slot content as props typed `KuatSlotContent` (a rendered node); Vue uses named `<template>` slots for the same regions. Don't assume prop-for-prop parity when porting a usage between frameworks.

React (`ContentCardProps`):

- `badge` — required, rendered node (e.g. a `Badge`/`StatusBadge`/`Tag` element)
- `category` — required, rendered node
- `title` — required, rendered node
- `titleHeadingLevel: 1 | 2 | 3 | 4 | 5 | 6` — required in the type, defaults to `3` in practice
- `contentText?: string | null` — default `null`
- `headerAccessory?`, `customContent?`, `footer?` — optional rendered nodes, default `null`
- `imageSrc?: string | null` — default `null`; `imageAlt?: string`
- `width?: "default" | "fluid" | "custom"` — default `"default"`; `maxWidth?` (used only when `width="custom"`) — default `"373px"`
- `asChild?: boolean` — default `false`; when `true`, provide exactly one child element
- Standard `div` HTML attributes pass through (`className`, etc.)

Vue (`ContentCardProps` + slots):

- Props: `category` (required, string), `title` (required, string), `titleHeadingLevel: 1 | 2 | 3 | 4 | 5 | 6` (required, no default — must be passed), `contentText?: string | null` (default `null`), `imageSrc?: string | null` (default `null`), `imageAlt?: string`, `width?` (default `"default"`), `maxWidth?` (default `"373px"`)
- Slots: `#badge`, `#header-accessory`, `#custom-content`, `#footer`
- `as` / `asChild` — inherited from Reka UI's `Primitive` (via `PrimitiveProps`); same single-child-element contract as React when `asChild` is used

## Related components

- `kuat:badge` / `kuat:status-badge` / `kuat:tag` — typical content for the `badge` slot/prop
- `kuat:callout` — status message, not a general content container
- `web-product/patterns/dashboard.md`'s KPI Card pattern — for metric-focused tiles, not this component
