# Vue Contribution Guide

Guide for contributing Vue components to `@equal-experts/kuat-vue`.

---

## Architecture

### File Structure (CSS-first)

Each component lives in a **directory** under `packages/kuat-vue/src/components/ui/`. Variants and state are expressed as **class names** in the template; the SFC `<style>` block (or a shared CSS file) defines what those classes do. Prefer Tailwind `@apply` in styles and add `@reference "../../../styles.css";` at the top for Tailwind v4. Do not use CVA or JS maps from props to CSS variable names.

```
packages/kuat-vue/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── badge/
│   │       │   ├── Badge.vue        # Template + script + <style>
│   │       │   ├── constants.ts    # Variant types/arrays
│   │       │   └── index.ts        # Re-exports, optional badgeVariants()
│   │       ├── button-group/
│   │       └── kuat-header/
│   ├── lib/
│   │   └── utils.ts                # cn() utility
│   └── index.ts                    # Package exports
├── components.json                 # shadcn-vue CLI config
└── ...
```

### Naming Conventions

| Type | Directory | Component Name |
|------|-----------|----------------|
| Component | `badge/` | `Badge.vue` |
| Block | `kuat-header/` | `KuatHeader.vue` |

---

## Coding Standards

### TypeScript

- Use `<script setup lang="ts">`
- Define props with `defineProps<T>()`
- Export types from index.ts

### Component Patterns

- Use Composition API with `<script setup>`
- Use `useForwardExpose` for ref forwarding
- Use `cn()` for className merging

### Linting

The project uses ESLint. Run before committing:

```bash
pnpm lint
```

---

## Creating a Component

### Step 1: Create Component Directory (CSS-first)

Create `packages/kuat-vue/src/components/ui/my-component/`.

**constants.ts:**

```ts
export const MY_COMPONENT_VARIANTS = ["default", "outline"] as const
export const MY_COMPONENT_SIZES = ["default", "sm", "lg"] as const
export type MyComponentVariant = (typeof MY_COMPONENT_VARIANTS)[number]
export type MyComponentSize = (typeof MY_COMPONENT_SIZES)[number]
```

**MyComponent.vue:**

```vue
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { MyComponentVariant, MyComponentSize } from "./constants"
import { cn } from "@/lib/utils"

interface Props {
  variant?: MyComponentVariant
  size?: MyComponentSize
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
})
</script>

<template>
  <div
    :class="cn(
      'my-component',
      `my-component--${props.variant}`,
      `my-component--size-${props.size}`,
      props.class
    )"
  >
    <slot />
  </div>
</template>

<style scoped>
@reference "../../../styles.css";

.my-component {
  @apply inline-flex items-center justify-center rounded-md;
}

.my-component--default {
  @apply bg-primary text-primary-foreground;
}

.my-component--outline {
  @apply border border-input bg-background;
}

.my-component--size-default { @apply h-10 px-4; }
.my-component--size-sm { @apply h-9 px-3; }
.my-component--size-lg { @apply h-11 px-6; }
</style>
```

**index.ts:** Export the component, constants, types, and optionally a `myComponentVariants()` helper for backward compatibility.

**index.ts:**

```ts
export { default as MyComponent } from "./MyComponent.vue";
```

### Step 2: Export from Package Index

Edit `packages/kuat-vue/src/index.ts`:

```ts
// KUAT CUSTOM COMPONENTS
export { MyComponent } from "./components/ui/my-component";
```

### Step 3: Create Storybook Story

Create `apps/storybook-vue/stories/MyComponent.stories.ts`:

```ts
import type { Meta, StoryObj } from "@storybook/vue3";
import { MyComponent } from "@equal-experts/kuat-vue";

const meta: Meta<typeof MyComponent> = {
  title: "Kuat Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  render: (args) => ({
    components: { MyComponent },
    setup() {
      return { args };
    },
    template: '<MyComponent v-bind="args">My Component</MyComponent>',
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { MyComponent },
    template: '<MyComponent variant="outline">Outline Variant</MyComponent>',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { MyComponent },
    template: `
      <div class="flex gap-4 items-center">
        <MyComponent size="sm">Small</MyComponent>
        <MyComponent size="default">Default</MyComponent>
        <MyComponent size="lg">Large</MyComponent>
      </div>
    `,
  }),
};
```

### Using Kuat agents (optional)

When the Kuat agents are available in your environment (e.g. Cursor with `.cursor/agents/`), you are encouraged to use **kuat-qa** to plan and generate test specs and test code, **kuat-component-dev** to implement the component and add Storybook stories, and **kuat-verify** to run the tests. See [CONTRIBUTING.md](../CONTRIBUTING.md) Development Workflow for the full flow.

---

## Creating a Block

Blocks are compositions that combine multiple components.

### Step 1: Create Block Directory

Create `packages/kuat-vue/src/components/ui/kuat-header/`:

**KuatHeader.vue:**

```vue
<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: string;
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn("bg-sidebar text-sidebar-foreground border-b", props.class)
);
</script>

<template>
  <header :class="classes">
    <div class="container flex items-center justify-between py-4">
      <div class="flex items-center gap-6">
        <slot name="logo" />
        <nav class="flex items-center gap-4">
          <slot name="navigation" />
        </nav>
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
```

**index.ts:**

```ts
export { default as KuatHeader } from "./KuatHeader.vue";
```

### Step 2: Export and Create Story

Same process as components - export from index.ts and create a Storybook story.

---

## Slot Patterns

Vue components use slots for composition:

```vue
<!-- Default slot -->
<slot />

<!-- Named slots -->
<slot name="header" />
<slot name="footer" />

<!-- Scoped slots -->
<slot name="item" :item="item" :index="index" />
```

Usage in stories:

```ts
template: `
  <KuatHeader>
    <template #logo>
      <img src="/logo.svg" alt="Logo" />
    </template>
    <template #navigation>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </template>
    <template #actions>
      <Button>Sign In</Button>
    </template>
  </KuatHeader>
`,
```

---

## Design Token Usage

Always use semantic tokens from kuat-core:

```vue
<!-- ✅ Good - semantic tokens -->
<div class="bg-primary text-primary-foreground" />
<div class="border-border rounded-[6px]" />
<div class="p-4 space-y-2" />

<!-- ❌ Bad - hardcoded values -->
<div class="bg-blue-500 text-white" />
<div class="border-gray-200 rounded-md" />
<div class="p-[17px]" />
```

### Border Radius Reference

| Element | Radius | Class |
|---------|--------|-------|
| Static content | 0px | `rounded-none` |
| Interactive | 6px | `rounded-[6px]` |
| Form inputs | 4px | `rounded-[4px]` |

---

## Testing

### Verify in Storybook

```bash
pnpm --filter storybook-vue dev
```

Check:
- [ ] All variants render correctly
- [ ] Light and dark mode work
- [ ] Keyboard navigation works
- [ ] Focus states are visible

### Build Test

```bash
pnpm build
```

---

## Related Documentation

- [Component Patterns](../kuat-docs/rules/components/patterns.md) - Naming, accessibility
- [Design Rules](../kuat-docs/rules/design/) - Colors, spacing, typography
- [Vue Examples](../kuat-docs/examples/vue/components.md) - Additional patterns
