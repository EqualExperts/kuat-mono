# TagGroup (`kuat:tag-group`)

## Overview

Thin accessibility wrapper for a set of `Tag`s: a labelled `role="group"`, flex-wrap layout (8px gap in both axes), and a polite `aria-live` region that announces tag removal. Layout is plain CSS — the component exists for the behaviour a flex container doesn't give you for free. Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`.

## When to use

- Any set of related Tags — especially dismissible (applied filters) or toggle (filter) groups

## When not to use

- A single standalone Tag
- Grouping anything other than Tags

## Variants

None — a single presentation.

## States

None of its own; tags inside carry their own states.

## Content guidance

- `label` names what the group is, e.g. "Technology filters", "Applied filters" — it's the group's accessible name, read by screen readers on entry.

## Behaviour

- Wrapping, spacing, and reflow after dismissal are plain `flex-wrap` — no layout logic.
- When a `Tag` with `mode="dismiss"` inside the group is dismissed, the group's live region announces "{label} removed".
- For 8–10+ tags, the Figma exploration recommends a "+N more" collapse — not built into this component; curate or collapse in the consumer.

## Accessibility

- `role="group"` + `aria-label` from the required `label` prop.
- Dismissals are announced via a visually hidden `aria-live="polite"` region inside the group.
- Per-tag semantics (`aria-pressed`, hidden icons, touch targets) live on `Tag` itself.

## API

Import from `@equal-experts/kuat-react` (subpath: `@equal-experts/kuat-react/tag-group`) or `@equal-experts/kuat-vue` (subpath: `@equal-experts/kuat-vue/tag-group`).

- `label: string` — required accessible name
- Children are the Tags

No Figma component mapping: TagGroup is a documented exception — the upstream exploration concluded "no component needed" for layout, so only this code wrapper exists (for the accessibility behaviour), with the Figma exploration frame as its design reference.

See Storybook (`Data Display/TagGroup`) for wrapping and dismissal examples.

## Related components

- `kuat:tag` — the tags inside the group
