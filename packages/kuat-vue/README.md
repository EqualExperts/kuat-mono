# @equal-experts/kuat-vue

Vue 3 components and blocks for the Kuat Design System: **localized primitives** (including **IconButton**) and **composed blocks**. Use **`@equal-experts/kuat-core`** for tokens and **shadcn-vue** only for UI that Kuat does not ship (for example Dialog, DropdownMenu).

**IconButton:** `import { IconButton } from "@equal-experts/kuat-vue"` or `@equal-experts/kuat-vue/icon-button`.

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
pnpm add vue @equal-experts/kuat-core @equal-experts/kuat-vue
```

### Agent Guardrails

Add this to your project `AGENTS.md` (or `.cursorrules`) so agent workflows stay Kuat-first:

```markdown
## Kuat UX and UI Decision Rules
1. Load bundled rules entrypoints from `@equal-experts/kuat-core`:
   - `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/README.md`
   - `node_modules/@equal-experts/kuat-core/agent-docs/external/kuat-agent-rules/kuat-docs/rules/LOADING.md`
2. Use bundled Equal Experts foundations and web rules for wider UX/UI decisions (layout, navigation, hierarchy, spacing, typography, content, accessibility), not just component choice (`.../external/kuat-agent-rules/.../foundations/*` and `.../types/web/*`).
3. For implementation, read `kuat-docs/setup/choosing-components.md` before building UI.
4. Choose component sources in order: Kuat blocks -> Kuat components -> shadcn-vue gaps -> custom.
5. Verify exports in `@equal-experts/kuat-vue` before implementing.
6. Document both design decision rationale and chosen component source in PR notes.
```

### Peer dependencies

Install peers for the components you use before running `dev` or `build`.

| Components you use | Required peers |
|---|---|
| Core components (`Button`, `Field`, `Select`, `Switch`, `Accordion`) | `radix-vue`, `reka-ui`, `lucide-vue-next` |
| `Sonner` | `vue-sonner` |

Example peer install:

```bash
pnpm add radix-vue reka-ui lucide-vue-next vue-sonner
```

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

`KuatCarousel` is exported from both the root barrel and subpath:

```vue
<script setup lang="ts">
import { KuatCarousel } from '@equal-experts/kuat-vue';
// or
// import { KuatCarousel } from '@equal-experts/kuat-vue/kuat-carousel';
</script>
```

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

### 2. Tailwind runtime stylesheet (required for Tailwind v4)

Create a global stylesheet and load Tailwind:

```css
/* src/tailwind.css */
@import "tailwindcss";
```

### 3. Design tokens and Kuat styles

```typescript
// main.ts
import '@equal-experts/kuat-core/variables.css';
import '@equal-experts/kuat-vue/styles';
import './tailwind.css';
```

If you scaffolded from a starter template (for example Vite), remove or neutralize template CSS that resets fonts/layout globally (for example `src/style.css` with `:root { font: ... }`, `body { ... }`, `#app { ... }`). These rules can override Kuat typography and spacing.

### 4. shadcn-vue for gaps

```bash
npx shadcn-vue@latest init
npx shadcn-vue@latest add dialog dropdown-menu
```

### 5. Use Kuat + shadcn-vue together

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

## Verification test (human or agent)

Use this quick smoke test after installation to verify imports, styles, and Tailwind are wired correctly.

### 1. Add a smoke component

```vue
<script setup lang="ts">
import {
  Button,
  Field,
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
} from '@equal-experts/kuat-vue';
</script>

<template>
  <main class="mx-auto max-w-4xl space-y-8 p-8">
    <h1 class="text-4xl font-bold">Kuat install smoke test</h1>

    <Field>
      <label for="name">Name</label>
      <input id="name" placeholder="Test input" />
    </Field>

    <Button variant="primary">Primary action</Button>

    <KuatCarousel>
      <KuatCarouselContent>
        <KuatCarouselItem><div class="rounded border p-6">Slide 1</div></KuatCarouselItem>
        <KuatCarouselItem><div class="rounded border p-6">Slide 2</div></KuatCarouselItem>
      </KuatCarouselContent>
      <KuatCarouselPrevious />
      <KuatCarouselNext />
    </KuatCarousel>
  </main>
</template>
```

### 2. Run checks

```bash
pnpm build
pnpm dev
```

### 3. Pass/fail criteria

- Pass: no unresolved import errors for `@equal-experts/kuat-vue/styles` or component imports.
- Pass: heading renders visibly larger and bold (`text-4xl font-bold` applied).
- Pass: `Button`, `Field`, and `KuatCarousel` render with Kuat styles (not plain browser defaults).
- Pass: typography uses Kuat font stack (Lexend for sans) rather than template defaults.
- Fail: any need to import internal `dist/*.css` files manually.
- Fail: selecting custom/shadcn-vue carousel without documenting why `@equal-experts/kuat-vue` carousel exports were not used.

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
