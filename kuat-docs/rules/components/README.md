# Component Rules

Component development patterns for the Kuat Design System. These rules define how to structure, name, and build accessible components - independent of framework.

---

## Files

| File | Description |
|------|-------------|
| [patterns.md](./patterns.md) | Naming conventions, variant architecture, accessibility, testing |
| [documentation-template.md](./documentation-template.md) | Default section structure for consumer-facing component docs (Storybook/narrative markdown) |
| [carousel.md](./carousel.md) | Kuat Carousel block: when to use, API, packages |
| [logo-lockup.md](./logo-lockup.md) | Kuat Logo Lockup block: Service/Demo use, mode, props |

**Consumers:** [Choosing components (Kuat vs shadcn)](../../setup/choosing-components.md) · [Public API inventory](../../setup/public-api-inventory.md). Most primitives use Storybook (`parameters.docs` + shared `component-docs` in each Storybook app) rather than a markdown file per component.

---

## Key Principles

1. **Consistency** - Follow established patterns across all components
2. **Accessibility** - Built-in a11y, not bolted on
3. **Type safety** - Full TypeScript support
4. **Flexibility** - Variant-based customization

---

## For Implementation Examples

See framework-specific component guides:
- [React Components](../../examples/react/components.md)
- [Vue Components](../../examples/vue/components.md)

---

## Quick Reference

**Naming**:
- Components: PascalCase (`Button`, `Card`, `AlertDialog`)
- Props/Variants: camelCase (`variant`, `size`, `isDisabled`)
- Files: Match component name (`Button.tsx`, `Button.vue`)

**Variants**:
- Use `class-variance-authority` for variant logic
- Required variants: `variant`, `size`
- Always specify `defaultVariants`

**Accessibility**:
- Semantic HTML elements
- Keyboard navigation support
- ARIA attributes where needed
- WCAG 2.1 AA compliance
