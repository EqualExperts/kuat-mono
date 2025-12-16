# Component Development Guidelines

## Adding New Components

### React Components

1. **Install via CLI** (recommended):
   ```bash
   cd packages/kuat-react
   npx shadcn@latest add button
   ```

2. **Manual Installation**:
   - Copy component files to `src/components/ui/[component-name]/`
   - Ensure all dependencies are installed
   - Export from `src/index.ts`

### Vue Components

1. **Install via CLI** (recommended):
   ```bash
   cd packages/kuat-vue
   npx shadcn-vue@latest add button
   ```

2. **Manual Installation**:
   - Copy component files to `src/components/ui/[component-name]/`
   - Ensure all dependencies are installed
   - Export from `src/index.ts`

## Component Structure

### React Component Example

```tsx
// src/components/ui/button.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // ...
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Vue Component Example

```vue
<!-- src/components/ui/button/Button.vue -->
<script setup lang="ts">
import { computed } from "vue"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(/* same as React */)

interface Props extends VariantProps<typeof buttonVariants> {
  // additional props
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
})

const classes = computed(() => 
  cn(buttonVariants({ variant: props.variant, size: props.size }))
)
</script>

<template>
  <button :class="classes" v-bind="$attrs">
    <slot />
  </button>
</template>
```

## Component Requirements

### 1. TypeScript Types
- All props must be typed
- Use `VariantProps` for variant-based props
- Export component types for consumers

### 2. Styling
- Use Tailwind CSS classes
- Reference design tokens via CSS variables
- Use `cn()` for className merging
- Support variants via `class-variance-authority`

### 3. Accessibility
- Use semantic HTML
- Include proper ARIA attributes
- Support keyboard navigation
- Test with screen readers

### 4. Exports
- Export component from package `index.ts`
- Export types and variants if needed
- Document component usage

## Variant Patterns

### Using class-variance-authority

```ts
import { cva } from "class-variance-authority"

const componentVariants = cva(
  "base-classes", // Always applied
  {
    variants: {
      variant: {
        default: "variant-classes",
        alternative: "other-classes",
      },
      size: {
        sm: "size-sm-classes",
        md: "size-md-classes",
        lg: "size-lg-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
```

## Testing Components

When creating components, ensure:
1. ✅ All variants work correctly
2. ✅ Types are properly exported
3. ✅ Component builds without errors
4. ✅ Styles match design tokens
5. ✅ Accessibility features work

## Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `Card`, `Dialog`)
- **Files**: Match component name (e.g., `Button.tsx`, `Button.vue`)
- **Variants**: camelCase (e.g., `default`, `destructive`, `outline`)
- **Props**: camelCase (e.g., `variant`, `size`, `disabled`)

## Common Patterns

### Forwarding Refs (React)
```tsx
const Component = React.forwardRef<HTMLElement, Props>(
  ({ className, ...props }, ref) => {
    return <element ref={ref} className={cn(classes, className)} {...props} />
  }
)
Component.displayName = "Component"
```

### Slot Usage (Vue)
```vue
<template>
  <div>
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>
```

### Conditional Rendering
```tsx
// React
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

```vue
<!-- Vue -->
<Component v-if="condition" />
<ComponentA v-if="condition" />
<ComponentB v-else />
```

