# @equal-experts/kuat-vue

Custom Vue components and blocks for the Kuat Design System.

---

## Architecture

This package provides **custom components** and **blocks** that are unique to Kuat. For standard UI components (Button, Dialog, etc.), install them directly via shadcn-vue CLI with kuat-core theming.

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat Blocks (from this package)                    │
├─────────────────────────────────────────────────────┤
│  Kuat Components (from this package)                │
├─────────────────────────────────────────────────────┤
│  shadcn-vue Components (installed directly)         │
├─────────────────────────────────────────────────────┤
│  @equal-experts/kuat-core (design tokens)           │
└─────────────────────────────────────────────────────┘
```

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add @equal-experts/kuat-vue

# Using npm
npm install @equal-experts/kuat-vue

# Using yarn
yarn add @equal-experts/kuat-vue
```

### Peer Dependencies

```bash
pnpm add vue radix-vue reka-ui
```

---

## What's Included

### Custom Components

Components unique to Kuat, not available in shadcn-vue:

| Component | Description |
|-----------|-------------|
| `ButtonGroup` | Groups buttons together with proper styling |
| `ButtonGroupText` | Text element within a button group |
| `ButtonGroupSeparator` | Separator between button group items |

### Blocks (Coming Soon)

Pre-built compositions for common patterns:

| Block | Description |
|-------|-------------|
| `KuatHeader` | Brand header with logo, navigation, actions |
| `KuatFooter` | Brand footer with links and legal |
| `KuatSearchPattern` | Search input with suggestions |

### Utilities

| Utility | Description |
|---------|-------------|
| `cn()` | Class name merger using clsx + tailwind-merge |

---

## Recommended Setup

For the best experience, combine this package with kuat-core and shadcn-vue:

### Step 1: Install Dependencies

```bash
pnpm add @equal-experts/kuat-core @equal-experts/kuat-vue
```

### Step 2: Configure Tailwind

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

### Step 3: Import Styles

```typescript
// main.ts
import { createApp } from 'vue';
import '@equal-experts/kuat-core/variables.css';
import App from './App.vue';

createApp(App).mount('#app');
```

### Step 4: Install shadcn-vue Components

```bash
npx shadcn-vue@latest init
npx shadcn-vue@latest add button dialog dropdown-menu
```

### Step 5: Use Components Together

```vue
<script setup lang="ts">
// Kuat custom components from this package
import { ButtonGroup, ButtonGroupText } from '@equal-experts/kuat-vue';

// shadcn-vue components from your local installation
import { Button } from '@/components/ui/button';
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Edit</Button>
    <Button variant="outline">Save</Button>
    <Button variant="destructive">Delete</Button>
  </ButtonGroup>
</template>
```

---

## Component Examples

### ButtonGroup

Groups buttons together with seamless borders:

```vue
<script setup lang="ts">
import { ButtonGroup, ButtonGroupText } from '@equal-experts/kuat-vue';
import { Button } from '@/components/ui/button';
</script>

<template>
  <!-- Horizontal (default) -->
  <ButtonGroup>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>

  <!-- Vertical -->
  <ButtonGroup orientation="vertical">
    <Button variant="outline">Top</Button>
    <Button variant="outline">Middle</Button>
    <Button variant="outline">Bottom</Button>
  </ButtonGroup>

  <!-- With text label -->
  <ButtonGroup>
    <ButtonGroupText>Filter:</ButtonGroupText>
    <Button variant="outline">All</Button>
    <Button variant="outline">Active</Button>
    <Button variant="outline">Completed</Button>
  </ButtonGroup>
</template>
```

### cn() Utility

Merge class names with Tailwind conflict resolution:

```vue
<script setup lang="ts">
import { cn } from '@equal-experts/kuat-vue';

const props = defineProps<{
  class?: string;
}>();

const containerClass = cn(
  'bg-background text-foreground p-4',
  props.class
);
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
```

---

## Migration Guide

If you were importing standard components from this package, migrate to direct shadcn-vue installation:

### Before (Deprecated)

```vue
<script setup lang="ts">
import { Button, Dialog, Badge } from '@equal-experts/kuat-vue';
</script>
```

### After (Recommended)

```vue
<script setup lang="ts">
// Standard components from your local shadcn-vue installation
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Kuat-specific components from this package
import { ButtonGroup } from '@equal-experts/kuat-vue';
</script>
```

### Migration Steps

1. Ensure `@equal-experts/kuat-core` is installed
2. Initialize shadcn-vue: `npx shadcn-vue@latest init`
3. Install needed components: `npx shadcn-vue@latest add button dialog badge`
4. Update imports to use local components
5. Keep imports for Kuat-specific components (ButtonGroup, etc.)

---

## Deprecated Exports

The following exports are deprecated and will be removed in the next major version. Install them directly via shadcn-vue CLI instead:

| Component | Replacement |
|-----------|-------------|
| `Button` | `npx shadcn-vue@latest add button` |
| `Accordion` | `npx shadcn-vue@latest add accordion` |
| `AlertDialog` | `npx shadcn-vue@latest add alert-dialog` |
| `Badge` | `npx shadcn-vue@latest add badge` |

These components are still exported for backward compatibility but will be themed correctly only when using kuat-core.

---

## TypeScript Support

All components are fully typed:

```vue
<script setup lang="ts">
import { ButtonGroup } from '@equal-experts/kuat-vue';
import type { ButtonGroupVariants } from '@equal-experts/kuat-vue';

const orientation: ButtonGroupVariants['orientation'] = 'horizontal';
</script>
```

---

## Dark Mode

Dark mode is supported via the `.dark` class on your root element:

```vue
<template>
  <div :class="{ dark: isDark }">
    <App />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isDark = ref(false);
</script>
```

Components automatically adapt when using kuat-core design tokens.

---

## Related Documentation

- [Consumer Setup Guide](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/consumer-setup.md)
- [kuat-core Integration](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/kuat-core-integration.md)
- [Component Patterns](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/rules/components/patterns.md)
- [shadcn-vue Documentation](https://www.shadcn-vue.com)
