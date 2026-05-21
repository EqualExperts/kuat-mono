# ButtonGroup (`kuat:button-group`)

## Overview

Groups related buttons with consistent spacing and optional text labels. Exported from `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`.

## When to use

- Segmented controls, toolbar groups, related actions shown together

## When not to use

- Single primary action → `shadcn:button` alone
- Exclusive selection across many options → `RadioGroup` or tabs

## Accessibility

- Ensure each child button remains focusable
- Provide a group label when the set has a shared purpose (`aria-label` on group or visible legend)

## API

Import from `@equal-experts/kuat-react` (or vue). Compose with shadcn `Button` children. See Storybook for current props.

## Related components

- `shadcn:button`
