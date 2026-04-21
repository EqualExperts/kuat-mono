# React Contribution Guide

Guide for contributing React components to `@equal-experts/kuat-react`.

---

## Architecture

### File Structure (CSS-first)

Each component lives in a **directory** under `packages/kuat-react/src/components/ui/`:

```
packages/kuat-react/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── badge/
│   │       │   ├── badge.tsx       # Logic and class composition
│   │       │   ├── badge.css       # All styles and variants (BEM)
│   │       │   └── index.ts        # Re-exports
│   │       ├── button-group/
│   │       ├── kuat-header/
│   │       └── ...
│   ├── lib/
│   │   └── utils.ts                # cn() utility
│   └── index.ts                    # Package exports
├── components.json                 # shadcn CLI config
├── tailwind.config.ts
└── vite.config.ts
```

- **ComponentName.tsx** – Logic and class composition only (e.g. `cn("base", \`base--${variant}\`, className)`). No inline Tailwind or style maps.
- **ComponentName.css** – All styles and variants. Prefer Tailwind utilities via `@apply`; add `@reference "../../../styles.css";` at the top for Tailwind v4. Use design tokens from kuat-core where needed; keep vanilla CSS only for things Tailwind doesn’t express (e.g. `color-mix`, `@keyframes`).
- **index.ts** – Re-exports the component, types, and optional helpers (e.g. `badgeVariants()` for backward compatibility).

### Naming Conventions

| Type | Directory | Main File | Component Name |
|------|-----------|-----------|----------------|
| Component | `badge/` | `badge.tsx` | `Badge` |
| Block | `kuat-header/` | `kuat-header.tsx` | `KuatHeader` |

---

## Coding Standards

### TypeScript

- Use strict TypeScript
- Export prop types alongside components
- Define variant types explicitly (e.g. `type BadgeVariant = "default" | "secondary" | ...`) or from a constants array; do not use CVA or `VariantProps`

### Component Patterns

- Use `forwardRef` for DOM element access
- Set `displayName` for DevTools
- Use `cn()` for className merging

### Linting

The project uses ESLint. Run before committing:

```bash
pnpm lint
```

---

## Creating a Component

### Step 1: Create Component Directory and Files

Create a directory and three files.

**packages/kuat-react/src/components/ui/my-component/my-component.tsx**

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "./my-component.css";

export const MY_COMPONENT_VARIANTS = ["default", "outline"] as const;
export const MY_COMPONENT_SIZES = ["default", "sm", "lg"] as const;
export type MyComponentVariant = (typeof MY_COMPONENT_VARIANTS)[number];
export type MyComponentSize = (typeof MY_COMPONENT_SIZES)[number];

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MyComponentVariant;
  size?: MyComponentSize;
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "my-component",
        `my-component--${variant}`,
        `my-component--size-${size}`,
        className
      )}
      {...props}
    />
  )
);
MyComponent.displayName = "MyComponent";

export function myComponentVariants(options?: { variant?: MyComponentVariant; size?: MyComponentSize }) {
  const v = options?.variant ?? "default";
  const s = options?.size ?? "default";
  return cn("my-component", `my-component--${v}`, `my-component--size-${s}`);
}

export { MyComponent };
```

**packages/kuat-react/src/components/ui/my-component/my-component.css**

```css
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
```

**packages/kuat-react/src/components/ui/my-component/index.ts**

```ts
export { MyComponent, myComponentVariants, MY_COMPONENT_VARIANTS, MY_COMPONENT_SIZES } from "./my-component";
export type { MyComponentProps, MyComponentVariant, MyComponentSize } from "./my-component";
```

### Step 2: Export from Package Index

Edit `packages/kuat-react/src/index.ts`:

```tsx
export { MyComponent, myComponentVariants } from "./components/ui/my-component";
export type { MyComponentProps } from "./components/ui/my-component";
```

### Step 3: Create Storybook Story

Create `apps/storybook-react/stories/MyComponent.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "@equal-experts/kuat-react";

const meta: Meta<typeof MyComponent> = {
  title: "Kuat Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  parameters: {
    a11y: { test: "error" },
  },
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
  args: {
    children: "My Component",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Variant",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <MyComponent size="sm">Small</MyComponent>
      <MyComponent size="default">Default</MyComponent>
      <MyComponent size="lg">Large</MyComponent>
    </div>
  ),
};
```

### Using Kuat agents (optional)

When the Kuat agents are available in your environment (e.g. Cursor with `.cursor/agents/`), you are encouraged to use **kuat-qa** to plan and generate test specs and test code, **kuat-component-dev** to implement the component and add Storybook stories, and **kuat-verify** to run the tests. Optionally use **kuat-documentation** to audit or update Storybook and `kuat-docs` after implementation or before release. See [CONTRIBUTING.md](../CONTRIBUTING.md) Development Workflow for the full flow.

---

## Creating a Block

Blocks are compositions that combine multiple components.

### Step 1: Create Block Directory and Files

Create `packages/kuat-react/src/components/ui/kuat-header/` with `kuat-header.tsx`, `kuat-header.css`, and `index.ts`. Use the same CSS-first pattern: class names in TS (e.g. `kuat-header`, `kuat-header--default`), and in the CSS file use Tailwind `@apply` with `@reference "../../../styles.css";` at the top; keep vanilla CSS only where Tailwind has no equivalent.

### Step 2: Export and Create Story

Same process as components - export from index.ts and create a Storybook story.

---

## Design Token Usage

Always use semantic tokens from kuat-core:

```tsx
// ✅ Good - semantic tokens
className="bg-primary text-primary-foreground"
className="border-border rounded-[6px]"
className="p-4 space-y-2"

// ❌ Bad - hardcoded values
className="bg-blue-500 text-white"
className="border-gray-200 rounded-md"
className="p-[17px]"
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
pnpm --filter storybook-react dev
```

Check:
- [ ] All variants render correctly
- [ ] Light and dark mode work
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Story accessibility checks pass (`parameters.a11y.test = "error"`)

Run automated Storybook accessibility checks:

```bash
pnpm --filter storybook-react test-storybook
```

### Build Test

```bash
pnpm build
```

---

## Related Documentation

- [Component Patterns](../kuat-docs/rules/components/patterns.md) - Naming, accessibility
- [Design Rules](../kuat-docs/rules/design/) - Colors, spacing, typography
- [React Examples](../kuat-docs/examples/react/components.md) - Additional patterns
