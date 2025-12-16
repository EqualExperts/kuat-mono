# Kuat Design System - Agent Documentation

## Overview

The Kuat Design System is a monorepo containing component libraries for both React and Vue, sharing a common design token system through `@equal-experts/kuat-core`.

## Design Tokens

All design tokens are centralized in `@equal-experts/kuat-core/src/variables.css`:

### Color System
- Uses HSL color format for better manipulation
- Supports light and dark modes via CSS variables
- Semantic color names: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`
- Chart colors: `chart-1` through `chart-5`

### Spacing & Layout
- Border radius: `--radius` (default: 0.5rem)
- Responsive breakpoints follow Tailwind defaults

### Usage in Components

```tsx
// React example
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

```vue
<!-- Vue example -->
<template>
  <div class="bg-background text-foreground border-border">
    <button class="bg-primary text-primary-foreground">
      Click me
    </button>
  </div>
</template>
```

## Component Patterns

### React Components (shadcn/ui)

Components follow shadcn/ui patterns:
- Built on Radix UI primitives
- Styled with Tailwind CSS
- Use `cn()` utility for className merging
- Support variants via `class-variance-authority`

Example structure:
```tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        // ...
      }
    }
  }
)
```

### Vue Components (shadcn-vue)

Components follow shadcn-vue patterns:
- Built on Radix Vue primitives
- Styled with Tailwind CSS
- Use `cn()` utility for className merging
- Support variants via `class-variance-authority`

Example structure:
```vue
<script setup lang="ts">
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(/* ... */)
</script>

<template>
  <button :class="cn(buttonVariants({ variant }), $attrs.class)">
    <slot />
  </button>
</template>
```

## Theming

The design system supports light and dark modes through CSS variables:

```css
:root {
  /* Light mode variables */
}

.dark {
  /* Dark mode variables */
}
```

To enable dark mode, add the `dark` class to the root element.

## Accessibility

All components should:
- Use semantic HTML elements
- Support keyboard navigation
- Include proper ARIA attributes
- Follow WCAG 2.1 AA standards
- Work with screen readers

Radix UI/Vue primitives provide accessibility features out of the box.

## Best Practices

1. **Always use design tokens** - Don't hardcode colors or spacing
2. **Use the `cn()` utility** - For conditional and merged classNames
3. **Follow component patterns** - Maintain consistency with existing components
4. **Export from index.ts** - Make components available via package exports
5. **Type everything** - Use TypeScript for all components
6. **Document props** - Use JSDoc comments for component APIs

## Common Utilities

### `cn()` Function
Located in `src/lib/utils.ts` in each package:
```ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This utility:
- Merges classNames conditionally
- Resolves Tailwind class conflicts (last one wins)
- Handles undefined/null values gracefully

