# Usage Guide for AI Agents

## Quick Reference

### Package Imports

**React:**
```tsx
import { Button } from "@equal-experts/kuat-react"
import "@equal-experts/kuat-react/styles"
```

**Vue:**
```vue
<script setup>
import { Button } from "@equal-experts/kuat-vue"
import "@equal-experts/kuat-vue/styles"
</script>
```

**Core (CSS Variables):**
```css
@import "@equal-experts/kuat-core/variables.css";
```

### Common Tasks

#### Adding a Component to React Package
1. Navigate to `packages/kuat-react`
2. Run: `npx shadcn@latest add [component-name]`
3. Export from `src/index.ts`
4. Component is available via `@equal-experts/kuat-react`

#### Adding a Component to Vue Package
1. Navigate to `packages/kuat-vue`
2. Run: `npx shadcn-vue@latest add [component-name]`
3. Export from `src/index.ts`
4. Component is available via `@equal-experts/kuat-vue`

#### Modifying Design Tokens
1. Edit `packages/kuat-core/src/variables.css`
2. Changes automatically apply to React and Vue packages
3. Rebuild packages if needed: `pnpm build`

## File Locations

### Key Configuration Files

- **Root**: `turbo.json`, `pnpm-workspace.yaml`, `.cursorrules`
- **Core**: `packages/kuat-core/src/variables.css`
- **React**: `packages/kuat-react/components.json`, `packages/kuat-react/src/index.ts`
- **Vue**: `packages/kuat-vue/components.json`, `packages/kuat-vue/src/index.ts`

### Component Directories

- **React**: `packages/kuat-react/src/components/ui/`
- **Vue**: `packages/kuat-vue/src/components/ui/`

### Utility Files

- **React**: `packages/kuat-react/src/lib/utils.ts`
- **Vue**: `packages/kuat-vue/src/lib/utils.ts`

## Build Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development mode (watch)
pnpm dev

# Build specific package
cd packages/kuat-react && pnpm build
```

## Design Token Reference

### Color Variables

```css
--background
--foreground
--primary / --primary-foreground
--secondary / --secondary-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--destructive / --destructive-foreground
--border
--input
--ring
```

### Usage in Tailwind

```tsx
// These work automatically via Tailwind config
<div className="bg-background text-foreground">
<div className="border-border">
<button className="bg-primary text-primary-foreground">
```

## Troubleshooting

### Component Not Found
- Check if component is exported from `src/index.ts`
- Verify component was installed correctly
- Ensure package is built: `pnpm build`

### Styles Not Applying
- Verify CSS is imported: `import "@equal-experts/kuat-react/styles"`
- Check that `@equal-experts/kuat-core/variables.css` is imported
- Ensure Tailwind is configured correctly

### Type Errors
- Run `pnpm build` to generate type definitions
- Check TypeScript configuration
- Verify all dependencies are installed

### Build Errors
- Clear `.turbo` cache: `rm -rf .turbo`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check for circular dependencies

## Best Practices for AI Agents

1. **Always check existing patterns** before creating new components
2. **Use design tokens** - never hardcode colors or spacing
3. **Follow naming conventions** - match existing component patterns
4. **Export properly** - add to package `index.ts` files
5. **Type everything** - use TypeScript for all code
6. **Test builds** - ensure packages build successfully
7. **Reference documentation** - check `docs/agent/` for guidelines

## Common Patterns

### Creating a New Component Variant

```tsx
// Add to buttonVariants
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        // ... existing variants
        newVariant: "bg-new-color text-new-foreground",
      },
    },
  }
)
```

### Adding a New Design Token

```css
/* packages/kuat-core/src/variables.css */
:root {
  /* ... existing tokens */
  --new-token: value;
}
```

Then add to Tailwind config:
```ts
// tailwind.config.ts
theme: {
  extend: {
    newProperty: "hsl(var(--new-token))",
  },
}
```

## Design System Documentation

### Design Tokens
- **[Colors](./design/colours.md)** - Brand colors and color tokens
- **[Typography](./design/typography.md)** - Font families and text styling
- **[Spacing](./design/spacing.md)** - Spacing scale and patterns
- **[Borders](./design/borders.md)** - Border usage and specifications
- **[Logo](./design/logo.md)** - Equal Experts logo usage and brand guidelines
- **[Layouts](./design/layouts.md)** - Layout templates for marketing and product applications

### Complete Documentation
- **[Design System Overview](./design/design-system.md)** - Complete design system guide
- **[Component Guidelines](./technical/component-guidelines.md)** - Component development patterns

### Creating New Applications
When creating a new Equal Experts application:
1. **Choose layout type**: See [Layouts Guide](./design/layouts.md) to determine marketing vs. product layout
2. **Include logo**: Always place Equal Experts logo correctly (see [Logo Guide](./design/logo.md))
3. **Use design tokens**: Reference [Colors](./design/colours.md) and [Spacing](./design/spacing.md) guides
4. **Follow templates**: Use provided React/Vue layout templates from [Layouts Guide](./design/layouts.md)

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn-vue Documentation](https://www.shadcn-vue.com)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [Turborepo Documentation](https://turbo.build/repo/docs)

