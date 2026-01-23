# Contributing to Kuat Design System

Guide for contributing to the Kuat Design System packages.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Setup

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm build`
4. Start Storybook: `pnpm --filter storybook-react dev` or `pnpm --filter storybook-vue dev`

---

## Architecture Overview

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system documentation.

**Repository Structure:**

| Directory | Purpose |
|-----------|---------|
| `packages/kuat-core` | Design tokens, CSS variables, Tailwind preset |
| `packages/kuat-react` | Custom React components and blocks |
| `packages/kuat-vue` | Custom Vue components and blocks |
| `apps/storybook-react` | React component documentation |
| `apps/storybook-vue` | Vue component documentation |
| `kuat-docs/` | Consumer-facing design documentation |

---

## Component Decision Tree

Before creating a component, determine where it belongs:

```
Need a UI element?
    │
    ├─ Exists in shadcn? ─── YES ──→ Consumer installs directly
    │                                (Do NOT add to Kuat packages)
    │
    └─ NO
        │
        ├─ Composition of multiple components? ─── YES ──→ Create Kuat Block
        │                                                  (e.g., KuatHeader)
        │
        └─ NO
            │
            └─ Unique behavior / reused across projects? ─── YES ──→ Create Kuat Component
                                                                     (e.g., ButtonGroup)
                │
                └─ NO ──→ Build custom in consumer app
```

**Key Rules:**
- Do NOT add shadcn components to Kuat packages
- Consumers install shadcn components directly via CLI
- kuat-core automatically themes shadcn components

---

## Using shadcn MCP

The shadcn MCP tools help discover existing components before creating new ones.

**Before creating a component:**
1. Use `search_items_in_registries` to check if it exists in shadcn
2. Use `view_items_in_registries` to see component implementation details
3. Use `get_item_examples_from_registries` for usage patterns

Only create a Kuat component if the component does NOT exist in shadcn.

---

## Creating New Components or Blocks

### Requirements

1. **Design Reference Required**
   - Obtain Figma design or design specification before implementation
   - Reference design rules in `kuat-docs/rules/design/`
   - Follow spacing, color, and typography guidelines

2. **Check shadcn Registry**
   - Verify component does NOT exist in shadcn
   - Use shadcn MCP tools or browse [ui.shadcn.com](https://ui.shadcn.com)

3. **Create Both Framework Versions**
   - React version in `packages/kuat-react`
   - Vue version in `packages/kuat-vue`
   - See framework-specific guides below

4. **Add Storybook Stories**
   - React: `apps/storybook-react/stories/`
   - Vue: `apps/storybook-vue/stories/`

5. **Document in kuat-docs**
   - Add usage documentation describing when and how to use the component
   - Include examples in `kuat-docs/examples/react/` and `kuat-docs/examples/vue/`

### Framework-Specific Guides

Detailed implementation guides with code examples:

- **React**: [contribution-docs/react.md](./contribution-docs/react.md)
- **Vue**: [contribution-docs/vue.md](./contribution-docs/vue.md)

---

## Development Workflow

1. **Start Storybook** for your target framework
2. **Create/edit components** following framework-specific guide
3. **Test in Storybook** - verify all variants, light/dark mode
4. **Build**: `pnpm build`
5. **Lint**: `pnpm lint`

---

## Submitting Changes

### Branch Naming

```
feature/add-button-group
fix/button-hover-state
docs/update-contributing
chore/upgrade-dependencies
```

### Commit Messages

Follow conventional commits:

```
feat: add ButtonGroup component
fix: correct hover state in dark mode
docs: update component guidelines
chore: upgrade Tailwind to v4.1
```

### Before Submitting

1. Run `pnpm lint`
2. Run `pnpm build`
3. Verify components work in light and dark themes
4. Ensure both React and Vue versions exist (for components)

### Pull Request Process

1. Create PR with clear title and description
2. Link related issues if applicable
3. Provide screenshots for UI changes
4. Include Figma/design reference
5. Wait for review and address feedback

---

## New Component Checklist

- [ ] Figma design or design spec obtained
- [ ] Verified component does NOT exist in shadcn
- [ ] Reviewed design rules in `kuat-docs/rules/design/`
- [ ] Created React version
- [ ] Created Vue version
- [ ] Added Storybook stories (both frameworks)
- [ ] Added documentation to `kuat-docs/`
- [ ] Tested light and dark mode
- [ ] PR includes screenshots

---

## Resources

### Internal

- [Architecture](./ARCHITECTURE.md) - System overview
- [React Guide](./contribution-docs/react.md) - React-specific contribution guide
- [Vue Guide](./contribution-docs/vue.md) - Vue-specific contribution guide
- [Design Rules](./kuat-docs/rules/design/) - Colors, spacing, typography
- [Component Patterns](./kuat-docs/rules/components/patterns.md) - Naming, accessibility

### External

- [shadcn/ui](https://ui.shadcn.com) - React component registry
- [shadcn-vue](https://www.shadcn-vue.com) - Vue component registry
- [Tailwind CSS](https://tailwindcss.com) - Utility framework
- [Storybook](https://storybook.js.org) - Component documentation
