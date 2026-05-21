# Button (`shadcn:button`)

## Overview

Primary action control for forms, dialogs, and toolbars. In Kuat apps, use the **shadcn Button** installed in your app (`@/components/ui/button`), themed by `@equal-experts/kuat-core` CSS variables.

## When to use

- Submitting forms, confirming dialogs, navigation CTAs
- One clear primary action per section (see upstream form scenarios)

## When not to use

- Navigation to another route → prefer `<Link>` styled as needed
- Toggle on/off state → `Switch` or `Toggle`
- Group of related exclusive options → `ButtonGroup` (`kuat:button-group`)

## Variants

| Variant | Use |
|---------|-----|
| `default` | Primary action |
| `destructive` | Irreversible or dangerous actions |
| `outline` / `ghost` | Secondary or cancel |
| `secondary` | Alternative emphasis |
| `link` | Inline text actions |

## States

- **Disabled:** use `disabled` or `aria-disabled` with visible reason; do not disable submit on forms (validate on submit per form scenario rules)
- **Loading:** show busy state; keep label or `aria-busy`

## Content guidance

See upstream `actions.md` for label copy. Verb-driven, 1–3 words, sentence case.

## Accessibility

- Native `<button>` or `asChild` with appropriate role
- Visible focus ring (`ring` tokens)
- Icon-only buttons require `aria-label`

## API

Install via `npx shadcn@latest add button`. Props follow shadcn/Radix: `variant`, `size`, `className`, `asChild`.

## Related components

- `kuat:button-group` — grouped actions
- Form scenarios — placement and validation timing
