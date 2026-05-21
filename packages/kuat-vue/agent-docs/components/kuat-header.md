# KuatHeader (`kuat:kuat-header`)

## Overview

Application header block with logo and navigation slots. Kuat block — use when you need the standard EE product chrome.

## When to use

- Product apps using dark horizontal navigation per product design rules

## When not to use

- Marketing pages → marketing layout rules
- Fully custom chrome → compose lower-level primitives

## Accessibility

- Landmark `header` with clear structure
- Logo has appropriate alt text; nav uses list semantics

## API

Import from `@equal-experts/kuat-react` / `kuat-vue`. See Storybook and package exports for slots and props.

## Related components

- Product [design.md](../rules/design.md) — navigation patterns
