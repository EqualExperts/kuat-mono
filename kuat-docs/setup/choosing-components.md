# Choosing components: Kuat packages vs shadcn vs custom

Consumer-facing decision guide. Contributors should also read [rules/components/patterns.md](../rules/components/patterns.md) for implementation rules.

---

## Priority order

| Priority | Source | When to use |
|----------|--------|-------------|
| 1 | **Kuat blocks** | Pre-built compositions (header, carousel, logo lockup, content cards where provided). |
| 2 | **Components from `@equal-experts/kuat-react` or `@equal-experts/kuat-vue`** | The design system ships localized primitives (Button, Field, Select, Switch, Accordion, etc.). **Import from Kuat** when the component is part of the package public API. |
| 3 | **shadcn registry** | UI primitives **not** published by Kuat (e.g. Dialog, DropdownMenu, Tabs). Install via CLI into your app; theme with `kuat-core`. |
| 4 | **Custom** | Only when nothing above fits; still use kuat-core tokens. |

**Rule of thumb:** Check [public-api-inventory.md](./public-api-inventory.md) and your package `exports` in `node_modules/@equal-experts/kuat-react/package.json`. If the component exists there, prefer Kuat.

---

## Import patterns

1. **Design tokens (required once per app):**  
   `import '@equal-experts/kuat-core/variables.css'`  
   plus the **Kuat Tailwind preset** in `tailwind.config` (see [consumer-setup.md](./consumer-setup.md)).

2. **Barrel import:**  
   `import { Button, Field } from '@equal-experts/kuat-react'`

3. **Subpath import (tree-shaking, clearer deps):**  
   `import { Switch } from '@equal-experts/kuat-react/switch'`  
   Subpaths match `package.json` `exports` (e.g. `./field`, `./select`).

4. **shadcn-installed copies:**  
   `import { Dialog } from '@/components/ui/dialog'` — only for components **not** provided by Kuat, unless you have a documented reason to fork.

---

## Anti-patterns

- **Duplicating a Kuat component** with a fresh shadcn install (two Buttons, two Fields) without a strong reason — you split theming fixes and risk inconsistent behaviour.
- **Skipping `kuat-core`** — components assume CSS variables from the preset.
- **Assuming “everything standard = shadcn”** — many “standard” controls are **already** in Kuat; see the inventory and Storybook.

---

## Related docs

- [Consumer setup](./consumer-setup.md) — step-by-step install and Tailwind.
- [Public API inventory](./public-api-inventory.md) — exports ↔ Storybook map.
- [kuat-core integration](./kuat-core-integration.md) — tokens without framework components.
