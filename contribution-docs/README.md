# Contribution Guides

Framework-specific guides for contributing to Kuat Design System packages.

---

## Guides

| Guide | Package | Description |
|-------|---------|-------------|
| [react.md](./react.md) | `@equal-experts/kuat-react` | React component development |
| [vue.md](./vue.md) | `@equal-experts/kuat-vue` | Vue component development |

---

## Before You Start

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for high-level process
2. Check the [Component Decision Tree](../CONTRIBUTING.md#component-decision-tree)
3. Ensure you have a Figma design or design spec
4. Verify the component does NOT exist in shadcn

---

## Quick Reference

### File Locations

| Framework | Components | Stories |
|-----------|------------|---------|
| React | `packages/kuat-react/src/components/ui/` | `apps/storybook-react/stories/` |
| Vue | `packages/kuat-vue/src/components/ui/` | `apps/storybook-vue/stories/` |

### Commands

```bash
# Start React Storybook
pnpm --filter storybook-react dev

# Start Vue Storybook
pnpm --filter storybook-vue dev

# Build all packages
pnpm build

# Lint
pnpm lint
```

---

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - High-level contribution process
- [ARCHITECTURE.md](../ARCHITECTURE.md) - System architecture
- [Component Patterns](../kuat-docs/rules/components/patterns.md) - Naming and accessibility
- [Design Rules](../kuat-docs/rules/design/) - Colors, spacing, typography
