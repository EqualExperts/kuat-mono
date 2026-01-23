# React Contribution Guide

Guide for contributing React components to `@equal-experts/kuat-react`.

---

## Architecture

### File Structure

```
packages/kuat-react/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button-group.tsx    # Component file
│   │       └── kuat-header.tsx     # Block file
│   ├── lib/
│   │   └── utils.ts                # cn() utility
│   ├── index.ts                    # Package exports
│   └── styles.css                  # Global styles
├── components.json                 # shadcn CLI config
├── tailwind.config.ts
└── vite.config.ts
```

### Naming Conventions

| Type | File Name | Component Name |
|------|-----------|----------------|
| Component | `button-group.tsx` | `ButtonGroup` |
| Block | `kuat-header.tsx` | `KuatHeader` |

---

## Coding Standards

### TypeScript

- Use strict TypeScript
- Export prop types alongside components
- Use `VariantProps` for CVA variants

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

### Step 1: Create Component File

Create `packages/kuat-react/src/components/ui/my-component.tsx`:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const myComponentVariants = cva(
  // Base classes
  "inline-flex items-center justify-center rounded-[6px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(myComponentVariants({ variant, size, className }))}
      {...props}
    />
  )
);
MyComponent.displayName = "MyComponent";

export { MyComponent, myComponentVariants };
```

### Step 2: Export from Index

Edit `packages/kuat-react/src/index.ts`:

```tsx
// KUAT CUSTOM COMPONENTS
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

---

## Creating a Block

Blocks are compositions that combine multiple components.

### Step 1: Create Block File

Create `packages/kuat-react/src/components/ui/kuat-header.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface KuatHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
}

const KuatHeader = React.forwardRef<HTMLElement, KuatHeaderProps>(
  ({ className, logo, navigation, actions, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "bg-sidebar text-sidebar-foreground border-b",
        className
      )}
      {...props}
    >
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          {logo}
          <nav className="flex items-center gap-4">{navigation}</nav>
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </header>
  )
);
KuatHeader.displayName = "KuatHeader";

export { KuatHeader };
```

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

### Build Test

```bash
pnpm build
```

---

## Related Documentation

- [Component Patterns](../kuat-docs/rules/components/patterns.md) - Naming, accessibility
- [Design Rules](../kuat-docs/rules/design/) - Colors, spacing, typography
- [React Examples](../kuat-docs/examples/react/components.md) - Additional patterns
