# Component Patterns

Component development rules for the Kuat Design System. This document defines naming conventions, variant architecture, accessibility requirements, and testing standards - independent of framework.

---

## Overview

These rules ensure consistent, accessible, maintainable components across React and Vue implementations.

**Key Principle:** Components should be consistent in behavior, accessible by default, and type-safe.

---

## Component Decision Framework

When building UI, follow this priority order:

| Priority | Source | When to Use |
|----------|--------|-------------|
| 1 | **Kuat Blocks** | Pre-built compositions (header, footer, search patterns) |
| 2 | **Kuat Components** | Local versions of UI components from Kuat packages (Button, Dialog, ButtonGroup, etc.) |
| 3 | **shadcn registry** | When no local version in Kuat (install via CLI in consumer project) |
| 4 | **Custom Build** | Only when none of the above fit your needs |

### When to use the shadcn registry

Use the shadcn CLI when the component **does not exist as a local version** in Kuat packages. When it does exist in Kuat, import from Kuat first.

- Install via shadcn CLI when the component is not provided by Kuat
- Theming is handled by kuat-core CSS variables for both Kuat local components and shadcn-installed components
- For app-specific customizations, you can use either a Kuat local component or a shadcn-installed copy

> **For contributors:** See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for when to add components to Kuat packages.

---

## Kuat Component Namespace

Components unique to Kuat use the "Kuat" namespace to distinguish them from shadcn components. Kuat may ship local versions of common UI components (shadcn-style); those count as Kuat local components for the decision order above.

### Naming Pattern

| Type | Naming | Example |
|------|--------|---------|
| Custom components | No prefix needed | `ButtonGroup`, `Separator` |
| Blocks (compositions) | `Kuat` prefix | `KuatHeader`, `KuatFooter`, `KuatSearchPattern` |
| Kuat-specific variants | `kuat-` prefix in variant name | `variant="kuat-cta"` |

### Custom Variants

When shadcn's default variants don't meet brand requirements, add kuat-namespaced variants:

```tsx
// Example: Adding a brand-specific CTA variant to Button
const buttonVariants = cva(
  "...", // base classes
  {
    variants: {
      variant: {
        // Standard shadcn variants
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        // Kuat-specific variant
        "kuat-cta": "bg-equal-ember-500 text-white font-bold uppercase tracking-wide",
      },
    },
  }
)
```

### Block Structure

Blocks are pre-built compositions that combine multiple components. Available blocks include **KuatHeader** and **KuatLogoLockup** (EE logo + service/demo title). See [logo-lockup.md](./logo-lockup.md) for the Logo Lockup block.

```tsx
// Example block structure
export function KuatHeader({ logo, navigation, actions }: KuatHeaderProps) {
  return (
    <header className="bg-sidebar text-sidebar-foreground">
      <div className="container flex items-center justify-between py-4">
        <Logo variant={logo} />
        <nav>{/* Navigation items */}</nav>
        <div className="flex gap-2">{actions}</div>
      </div>
    </header>
  );
}
```

### CSS-first component structure

Kuat components use a **CSS-first** structure so that variants and state are defined by classes in CSS, not by JS maps of CSS variable names.

- **React:** Each component lives in a **directory** with a `.tsx` file (logic and class composition only) and a `.css` file (all styles and variant classes, e.g. BEM-style `componentName--variant`). The component script maps props to class names; the CSS file defines what those classes do. Design tokens (`var(--...)`) from kuat-core are used in the CSS file, not in JS objects.
- **Vue:** Use a **single .vue file** per component. Put variant and state styles in `<style>` (scoped or BEM). The template composes class names from props; the style block defines what those classes do. Do not use JS objects that map prop values to CSS variable names or `var(...)` strings.

See `.cursorrules`, `CLAUDE.md`, and `AGENTS.md` in the repo root for the canonical implementation rules.

---

## Naming Conventions

### Components

| Element | Convention | Example |
|---------|------------|---------|
| Component names | PascalCase | `Button`, `AlertDialog`, `Card` |
| File names | Match component | `Button.tsx`, `Button.vue` |
| Compound components | Parent.Child | `Card.Header`, `Dialog.Content` |

### Props and Variants

| Element | Convention | Example |
|---------|------------|---------|
| Prop names | camelCase | `variant`, `size`, `isDisabled` |
| Variant values | camelCase | `default`, `destructive`, `outline` |
| Boolean props | is/has prefix | `isOpen`, `hasError`, `isLoading` |

### CSS Classes

| Element | Convention | Example |
|---------|------------|---------|
| Base classes | Descriptive | `inline-flex items-center` |
| Variant classes | Via CVA | Defined in variants object |
| Custom classes | kebab-case | `button-group`, `card-header` |

---

## Variant Architecture

### Using class-variance-authority (CVA)

All components with visual variants should use CVA:

**Structure:**

```
cva(baseClasses, {
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... }
})
```

### Required Variants

Most interactive components should support:

| Variant | Purpose | Common Values |
|---------|---------|---------------|
| `variant` | Visual style | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` |
| `size` | Dimension | `default`, `sm`, `lg`, `icon` |

### Default Variants

Always specify `defaultVariants`:

| Variant | Default Value |
|---------|---------------|
| `variant` | `default` |
| `size` | `default` |

---

## Accessibility Requirements

### Semantic HTML

- Use appropriate HTML elements (`<button>`, `<a>`, `<input>`)
- Don't use `<div>` for interactive elements
- Use proper heading hierarchy (`h1` → `h2` → `h3`)

### Keyboard Navigation

- All interactive elements must be focusable
- Focus order should be logical
- Escape key closes modals/dialogs
- Enter/Space activates buttons
- Arrow keys navigate within groups

### ARIA Attributes

| Scenario | Required Attributes |
|----------|---------------------|
| Loading state | `aria-busy="true"` |
| Disabled state | `aria-disabled="true"` or `disabled` |
| Expanded state | `aria-expanded="true/false"` |
| Modal dialogs | `role="dialog"`, `aria-modal="true"` |
| Error states | `aria-invalid="true"`, `aria-describedby` |

### Focus Management

- Visible focus indicators (use `ring` tokens)
- Focus trapped in modals
- Focus returned when modals close
- Skip links for complex layouts

### Screen Reader Support

- Meaningful labels for all interactive elements
- Descriptive link text (not "click here")
- Alt text for meaningful images
- Live regions for dynamic content

---

## TypeScript Requirements

### Typed Props

All component props must be typed:

- Use interface or type definitions
- Export prop types for consumers
- Use `VariantProps` for CVA variants
- Document complex props with JSDoc

### Type Exports

Components should export:
- Component itself
- Props interface/type
- Variants (if useful for consumers)

---

## Export Patterns

### Package Index

Components must be exported from package `index.ts`:

- Named exports (not default)
- Re-export types
- Group related exports

### Component Files

Each component file should export:
- Main component
- Props type
- Variants (optional)

---

## Styling Rules

### Design Tokens

- Use semantic color tokens (`bg-primary`, not `#0066CC`)
- Use spacing scale (`p-4`, not `padding: 17px`)
- Use border radius rules (0px/4px/6px)

### The cn() Utility

Always use `cn()` for className merging:

- Handles conditional classes
- Resolves Tailwind conflicts (last wins)
- Handles undefined/null gracefully

### State Styling

| State | Pattern |
|-------|---------|
| Hover | `hover:bg-{color}/90` |
| Focus | `focus:ring-2 focus:ring-ring` |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` |
| Active | `active:bg-{color}/80` |

---

## Testing Checklist

Before shipping a component, verify:

### Functionality
- [ ] All variants render correctly
- [ ] Default props work
- [ ] Custom className can be passed
- [ ] Component ref is forwarded (React)

### Types
- [ ] Props are properly typed
- [ ] Types are exported
- [ ] No TypeScript errors

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus visible and logical
- [ ] ARIA attributes present

### Styling
- [ ] Uses design tokens
- [ ] Works in light and dark mode
- [ ] Responsive if applicable
- [ ] Matches design specifications

### Edge Cases
- [ ] Long text handled
- [ ] Empty states handled
- [ ] Loading states (if applicable)
- [ ] Error states (if applicable)

---

## Common Patterns

### Ref Forwarding (React)

Components accepting refs should use `forwardRef`:

- Forward ref to DOM element
- Set `displayName` for DevTools

### Slot Usage (Vue)

- Default slot for main content
- Named slots for structured content (`header`, `footer`)
- Scoped slots for render customization

### Compound Components

For complex components (Dialog, Dropdown):

- Parent provides context
- Children consume context
- Named exports for all parts

---

## Implementation Examples

For code examples implementing these patterns:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/components.md](../../examples/react/components.md) |
| Vue | [examples/vue/components.md](../../examples/vue/components.md) |
| Setup | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

---

## Related Documentation

- [Consumer Setup Guide](../../setup/consumer-setup.md) - Recommended project setup
- [Design Overview](../design/overview.md) - Design system principles
- [Colours](../design/colours.md) - Color tokens
- [Typography](../design/typography.md) - Font specifications
- [Spacing](../design/spacing.md) - Spacing scale
- [Borders](../design/borders.md) - Border radius rules
