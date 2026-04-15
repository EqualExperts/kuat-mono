# @equal-experts/kuat-vue

Vue 3 components and blocks for the Kuat Design System: **localized primitives** and **composed blocks**. Use **`@equal-experts/kuat-core`** for tokens and **shadcn-vue** only for UI that Kuat does not ship (for example Dialog, DropdownMenu).

**When to import from here vs shadcn-vue:** [Choosing components](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/choosing-components.md) · [Public API inventory](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/public-api-inventory.md)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat blocks (KuatHeader, KuatCarousel, …)         │  ← This package
├─────────────────────────────────────────────────────┤
│  Kuat primitives (Button, Field, Select, …)        │  ← This package
├─────────────────────────────────────────────────────┤
│  shadcn-vue-only (Dialog, DropdownMenu, …)          │  ← Installed in your app
├─────────────────────────────────────────────────────┤
│  @equal-experts/kuat-core                            │
└─────────────────────────────────────────────────────┘
```

---

## Installation

```bash
pnpm add @equal-experts/kuat-core @equal-experts/kuat-vue
```

### Peer dependencies

See this package’s `package.json` `peerDependencies` (for example `vue`, `radix-vue` / `reka-ui` as appropriate to your stack).

---

## What’s included

### Utilities

| Export | Description |
|--------|-------------|
| `cn` | Class name merger |

### Blocks

| Area | Examples |
|------|----------|
| Header / brand | `KuatHeader`, `EELogo` |
| Carousel | `KuatCarousel`, `KuatCarouselContent`, `KuatCarouselItem`, `KuatCarouselPrevious`, `KuatCarouselNext` |
| Logo lockup | `KuatLogoLockup`, `EELogoIcon` |
| Progress | `KuatRadialProgress` |
| Cards | `ContentCard` |

### Form and actions

`Button`, `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`, `Badge`, `Input`, `Textarea`, `Field` (+ subcomponents), `KuatSelect` / `Select` (+ primitives), `Checkbox` / `CheckboxField`, `RadioGroup` / `RadioField`, `Switch` / `SwitchField`, `Toggle`, `ToggleGroup`.

### Content and navigation

`Accordion`, `AlertDialog`, `Breadcrumb` (Vue API may differ slightly from React—see Storybook: `apps/storybook-vue`).

### Tree-shakable subpath imports

Example:

```vue
<script setup lang="ts">
import { Switch } from '@equal-experts/kuat-vue/switch';
</script>
```

See `package.json` `exports` and [public-api-inventory.md](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/public-api-inventory.md).

---

## Recommended setup

### 1. Tailwind

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

### 2. Design tokens

```typescript
// main.ts
import '@equal-experts/kuat-core/variables.css';
```

### 3. shadcn-vue for gaps

```bash
npx shadcn-vue@latest init
npx shadcn-vue@latest add dialog dropdown-menu
```

### 4. Use Kuat + shadcn-vue together

```vue
<script setup lang="ts">
import { Button, ButtonGroup } from '@equal-experts/kuat-vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Edit</Button>
    <Button variant="destructive">Delete</Button>
  </ButtonGroup>
</template>
```

---

## Component examples

### ButtonGroup

```vue
<script setup lang="ts">
import { ButtonGroup, ButtonGroupText, Button } from '@equal-experts/kuat-vue';
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>

  <ButtonGroup orientation="vertical">
    <Button variant="outline">Top</Button>
    <Button variant="outline">Bottom</Button>
  </ButtonGroup>

  <ButtonGroup>
    <ButtonGroupText>Filter:</ButtonGroupText>
    <Button variant="outline">All</Button>
  </ButtonGroup>
</template>
```

### `cn()` utility

```vue
<script setup lang="ts">
import { cn } from '@equal-experts/kuat-vue';

const containerClass = cn('bg-background text-foreground p-4', props.class);
</script>
```

---

## Migration (legacy projects)

**Prefer** imports from `@equal-experts/kuat-vue` for primitives this package publishes. Use **shadcn-vue** under `@/components/ui` for components **not** in Kuat (for example Dialog).

Do **not** move `Button` to a local shadcn-vue copy unless you have a deliberate fork—prefer Kuat’s `Button` for consistency with tokens and variants.

---

## TypeScript

```vue
<script setup lang="ts">
import { ButtonGroup } from '@equal-experts/kuat-vue';
import type { ButtonGroupVariants } from '@equal-experts/kuat-vue';

const orientation: ButtonGroupVariants['orientation'] = 'horizontal';
</script>
```

---

## Dark mode

Apply `.dark` on the root (or toggle a class on `<html>` / layout). Tokens come from `kuat-core`.

---

## Related documentation

- [Consumer setup](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/consumer-setup.md)
- [Choosing components](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/choosing-components.md)
- [kuat-core integration](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/kuat-core-integration.md)
- [Component patterns (contributors)](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/rules/components/patterns.md)
- [shadcn-vue](https://www.shadcn-vue.com)
