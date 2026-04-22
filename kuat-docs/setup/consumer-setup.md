# Consumer Setup Guide

How to set up a new project using the Kuat Design System with the recommended architecture: **`kuat-core` for theming**, **`@equal-experts/kuat-react` or `@equal-experts/kuat-vue` for design-system components**, and **shadcn** only for primitives the packages do not publish.

For **what to import from where**, read [choosing-components.md](./choosing-components.md) and [public-api-inventory.md](./public-api-inventory.md).

---

## Overview

The Kuat Design System uses a layered architecture:

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat blocks (KuatHeader, KuatCarousel, …)         │  ← From kuat-react / kuat-vue
├─────────────────────────────────────────────────────┤
│  Kuat primitives (Button, Field, Select, …)        │  ← From kuat-react / kuat-vue
├─────────────────────────────────────────────────────┤
│  shadcn-only UI (Dialog, DropdownMenu, …)           │  ← Installed in your repo via CLI
├─────────────────────────────────────────────────────┤
│  kuat-core (design tokens, Tailwind preset)         │  ← Foundation
└─────────────────────────────────────────────────────┘
```

**Decision priority:** See [choosing-components.md](./choosing-components.md) (blocks → Kuat package → shadcn for gaps → custom).

---

## Quick Start (React)

### Step 1: Install kuat-core and kuat-react

```bash
pnpm add @equal-experts/kuat-core @equal-experts/kuat-react
```

### Step 2: Configure Tailwind CSS

Include Kuat package paths in `content` so Tailwind sees component classes.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@equal-experts/kuat-react/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
```

### Step 3: Import design tokens

```typescript
// main.tsx or App.tsx
import '@equal-experts/kuat-core/variables.css';
import './styles.css'; // Your app styles
```

### Step 4: Initialize shadcn (recommended for gaps)

Use the shadcn CLI for components **not** shipped by Kuat (e.g. Dialog, DropdownMenu, Tabs). You can initialize early or when you first need a gap component.

```bash
npx shadcn@latest init
```

When prompted, use settings that match your stack, for example:

- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: `tailwind.config.ts`
- Components path: `src/components`
- Utils path: `src/lib/utils`

### Step 5: Add shadcn components as needed

Install only what Kuat does not provide, for example:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

See [public-api-inventory.md](./public-api-inventory.md) for typical Kuat vs shadcn split.

### Step 6: Import from Kuat vs your shadcn folder

**Prefer Kuat** for primitives that exist in the package (Button, Field, Select, Switch, Accordion, Alert Dialog, Badge, Input, Textarea, ButtonGroup, blocks, etc.):

```tsx
import { Button, ButtonGroup, Field } from '@equal-experts/kuat-react';
// or tree-shake via subpaths:
import { Switch } from '@equal-experts/kuat-react/switch';
```

**Use your local shadcn copy** for components Kuat does not publish:

```tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';
```

**Example combining both:**

```tsx
import { Button, ButtonGroup } from '@equal-experts/kuat-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function Example() {
  return (
    <Dialog>
      <ButtonGroup>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <Button>Option B</Button>
      </ButtonGroup>
      <DialogContent>Hello</DialogContent>
    </Dialog>
  );
}
```

---

## Quick Start (Vue)

### Step 1: Install kuat-core and kuat-vue

```bash
pnpm add @equal-experts/kuat-core @equal-experts/kuat-vue
```

### Step 2: Configure Tailwind CSS

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './src/**/*.{vue,js,ts}',
    './node_modules/@equal-experts/kuat-vue/**/*.{vue,js,ts}',
  ],
} satisfies Config;
```

### Step 3: Import design tokens

```typescript
// main.ts
import '@equal-experts/kuat-core/variables.css';
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

### Step 4: Initialize shadcn-vue

```bash
npx shadcn-vue@latest init
```

### Step 5: Install shadcn-vue components as needed

```bash
npx shadcn-vue@latest add dialog
npx shadcn-vue@latest add dropdown-menu
```

### Step 6: Import from Kuat vs your shadcn folder

```vue
<script setup lang="ts">
import { Button, ButtonGroup, Field } from '@equal-experts/kuat-vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';
// or: import { Switch } from '@equal-experts/kuat-vue/switch'
</script>

<template>
  <ButtonGroup>
    <Button>Option A</Button>
    <Button>Option B</Button>
  </ButtonGroup>
</template>
```

---

## Project structure

After setup, a typical project looks like:

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn CLI: components Kuat does not ship (e.g. dialog)
│   ├── lib/
│   │   └── utils.ts         # cn() from shadcn init
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts       # kuatPreset
├── components.json          # shadcn CLI config
└── package.json             # includes @equal-experts/kuat-core and kuat-react or kuat-vue
```

You **do not** need a local `button.tsx` if you import `Button` from Kuat only—but many teams still keep shadcn Dialog/Tabs/etc. under `components/ui/`.

---

## What goes where

| Need | Source | Examples |
|------|--------|----------|
| Design tokens | `@equal-experts/kuat-core` | `variables.css`, Tailwind preset |
| Kuat primitives and blocks | `@equal-experts/kuat-react` / `@equal-experts/kuat-vue` | `Button`, `Field`, `Select`, `KuatHeader`, `ButtonGroup`, … |
| shadcn-only UI | CLI into your repo | `Dialog`, `DropdownMenu`, `Tabs`, … |
| App-specific | Your code | Business views, routes |

---

## Theming

Components stay on-brand when you:

1. Import `@equal-experts/kuat-core/variables.css` before app styles.
2. Use the Kuat Tailwind preset.

Applies to Kuat components and to shadcn copies that use the same CSS variables.

### Dark mode

Apply the `.dark` class on the root (or toggle it):

```tsx
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

```tsx
document.documentElement.classList.toggle('dark');
```

---

## Import paths (barrel vs subpath)

- **Barrel:** `import { Checkbox } from '@equal-experts/kuat-react'`
- **Subpath:** `import { Checkbox } from '@equal-experts/kuat-react/checkbox'` — matches `package.json` `exports` and can help bundlers.

See [public-api-inventory.md](./public-api-inventory.md) for subpath list.

---

## Migration from older guidance

Some projects were told to put **all** “standard” UI in shadcn and use Kuat only for `ButtonGroup`. Kuat now ships many localized primitives **from the package**.

**Recommended today**

- Import **Button**, **Field**, **Select**, and other published primitives from `@equal-experts/kuat-react` or `@equal-experts/kuat-vue`.
- Use **shadcn** for components Kuat does not export (check [public-api-inventory.md](./public-api-inventory.md)).

**If you already have shadcn copies** of components that Kuat also ships, migrate gradually: switch imports to Kuat and remove duplicates when practical to avoid two buttons with different behaviour.

---

## Troubleshooting

### Components not styled correctly

1. Import `@equal-experts/kuat-core/variables.css` before other styles.
2. Ensure `kuatPreset` is in Tailwind `presets`.
3. Ensure both `src/**` and `node_modules/@equal-experts/kuat-react/**` (or `kuat-vue`) are in `content`.
4. For shadcn files under `src/components/ui`, keep those paths in `content`.

### TypeScript errors

1. Install `@types/react` (React) or use Vue’s types.
2. Set `moduleResolution` to `bundler` or `node16` in `tsconfig`.

### Dark mode not working

1. Apply `.dark` on `<html>` or an ancestor.
2. Confirm CSS variables are loaded.

---

## Related documentation

- [Choosing components (Kuat vs shadcn)](./choosing-components.md)
- [Public API inventory](./public-api-inventory.md)
- [kuat-core integration](./kuat-core-integration.md)
- [Verification](./verification.md)
- [Agent docs integration](./integration.md)
- Bundled agent docs path: `node_modules/@equal-experts/kuat-core/agent-docs/README.md`
