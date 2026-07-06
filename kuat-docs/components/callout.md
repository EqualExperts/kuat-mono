# Callout (`kuat:callout`)

## Overview

Inline banner for surfacing a status message tied to a section of content: info, positive, warning, or issue. Supports a required title, an optional description, a per-type icon (shown by default, can be hidden), and an optional link-style action. Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`.

## When to use

- Persistent, in-page status messages tied to a section of content (e.g. explaining what a view shows, or that a save failed)
- Confirmations, warnings, or errors that should stay visible until the user navigates away or dismisses them via the action link

## When not to use

- Transient, self-dismissing notifications — use `Sonner`
- Form field-level validation — use `Field`'s error slot
- A single inline icon+label with no message — use `Badge`

## Variants

Four semantic `type` values, each with its own background tint and left border/icon accent:

- `info` (default) — ee-blue tint, `Info` icon
- `positive` — uptime-green tint, `CheckCircle2` icon
- `warning` — equal-ember tint, `AlertTriangle` icon
- `issue` — runtime-red tint, `XCircle` icon

## States

- **Icon shown / hidden** — `icon` prop, default `true`. The icon glyph is chosen automatically from `type`; consumers cannot swap it independently.
- **With / without description** — omit `description` to render title only.
- **With / without action** — omit `action` to render no link. Only a link-style action ships in this release; additional action kinds (e.g. a button) may be added in future without changing the `title`/`description`/`icon` API.

## Content guidance

- Title should be a short, complete statement of the status — it's the only text guaranteed to be read, since colour is never the sole signal (icon shape + title wording both carry the meaning, independent of the accent colour).
- Description is for supporting detail, not another restatement of the title.
- Action label should describe the action's effect (e.g. "Close message"), not just "Click here".

## Behaviour

- Root element renders `role="status"` (polite live region) — appropriate for a persistent banner already present in the page, as opposed to a toast that should interrupt.
- The action renders as a real `<a href>` (with optional `target` and `onClick`), not a button — it's always a navigation/link affordance in this release.

## Accessibility

- Status is never conveyed by colour alone: the icon shape (circle-i / check / triangle / x) and the title wording both signal the type independent of colour (WCAG 1.4.1).
- The icon and title text share the same neutral `--foreground` token — only the left border stripe and background use the per-type accent colour, so the icon remains legible regardless of type.
- All four `background`/`foreground` token pairs (`--callout-info`, `--callout-positive`, `--callout-warning`, `--callout-issue`, each with a `-foreground` counterpart) are covered by `pnpm tokens:contrast-check` in both light and dark mode.
- Icon is `aria-hidden="true"` — it's decorative reinforcement of the title text, not a separate accessible element.

## API

Import from `@equal-experts/kuat-react` (subpath: `@equal-experts/kuat-react/callout`) or `@equal-experts/kuat-vue` (subpath: `@equal-experts/kuat-vue/callout`).

- `type?: "info" | "positive" | "warning" | "issue"` — default `"info"`
- `title` — required
- `description?` — optional
- `icon?: boolean` — default `true`
- `action?: { label: string; href: string; target?: string; onClick?: (event) => void }` — optional

See Storybook (`Feedback/Callout`) for live examples of every type and combination.

## Related components

- `shadcn:sonner` (Kuat `Sonner`) — transient, self-dismissing toast notifications
- `kuat:field` — inline form-field validation messages
