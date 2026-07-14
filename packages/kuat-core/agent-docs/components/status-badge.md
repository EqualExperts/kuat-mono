# StatusBadge (`kuat:status-badge`)

## Overview

Non-interactive status indicator: five semantic types (success, warning, error, info, neutral), two sizes, a built-in per-type icon, and a solid fill. Reuses Callout's bar colour vocabulary (the raw brand ramps) plus a server-slate neutral. Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`. Supersedes the deprecated `Badge` for status indication.

## When to use

- RAG/status states on rows, cards, or progress trackers — one per item
- Success = completed/positive, Warning = needs attention, Error = failure/destructive, Info = neutral informational
- Neutral = non-semantic metadata (e.g. "Archived") where no status colour applies

## When not to use

- Decorative or promotional labels ("New feature", "Popular") — status colour is reserved for status, per the Figma Do/Don't guidance
- Categorisation a user filters by, or zero-to-many labels per item — use `Tag`
- Numeric counts — use `CounterBadge`
- Anything interactive — StatusBadge never takes an `onClick`; that is the dividing line from `Tag`

## Variants

Five semantic `type` values, each a solid fill with white text (neutral: dark text):

- `success` (default) — uptime-green fill, `CheckCircle2` icon
- `warning` — equal-ember fill, `AlertCircle` icon
- `error` — runtime-red fill, `XCircle` icon
- `info` — ee-blue fill, `BadgeInfo` icon
- `neutral` — server-slate-200 fill, dark text, no icon

Solid fill only — no subtle/tint mode exists, by design.

## States

- **Size** — `base` (12px text) or `large` (14px text); icon is 12px in both.
- Non-interactive: no hover, focus, or pressed states.

## Content guidance

- Label is a single short word or phrase stating the status ("Complete", "Failed", "Needs attention").
- Status is never conveyed by colour alone: the icon shape and the label wording both carry the meaning.

## Behaviour

- Renders a `<span>`; the per-type icon is chosen automatically and cannot be swapped.
- Renders identically in light and dark mode — the fills are raw brand ramps, not mode-flipping aliases, because no dark-mode spec exists yet.

## Accessibility

- Icon is `aria-hidden="true"` — decorative reinforcement of the label text.
- Colour is always paired with icon + label (WCAG 1.4.1); neutral has no icon but also no status semantics.
- Note: white text on the warning (equal-ember) and info (ee-blue-500) fills follows the Figma spec and matches the existing primary Button pairing, but sits below 4.5:1 at Base size — flagged upstream as a design-token question, not deviated from in code.

## API

Import from `@equal-experts/kuat-react` (subpath: `@equal-experts/kuat-react/status-badge`) or `@equal-experts/kuat-vue` (subpath: `@equal-experts/kuat-vue/status-badge`).

- `type?: "success" | "warning" | "error" | "info" | "neutral"` — default `"success"`
- `size?: "base" | "large"` — default `"base"`
- Label is the child content

See Storybook (`Data Display/StatusBadge`) for every type and size.

## Related components

- `kuat:tag` — categorisation (zero-to-many per item, interactive, tint fill)
- `kuat:counter-badge` — numeric counts
- `kuat:callout` — status messages with title/description tied to a content section
- `kuat:badge` — deprecated predecessor; see `kuat-docs/DEPRECATIONS.md`
