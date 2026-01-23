# Contributing to Kuat Design System

Guide for contributing to the Kuat Design System packages.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Setup

```bash
git clone <repository-url>
cd kuat-mono
pnpm install
pnpm build
```

### Start Development

```bash
# React Storybook (localhost:6006)
pnpm --filter storybook-react dev

# Vue Storybook (localhost:6007)
pnpm --filter storybook-vue dev
```

---

## Before Adding Components

Follow the Component Decision Framework:

| Priority | Source | When to Use |
|----------|--------|-------------|
| 1 | Kuat Blocks | Pre-built compositions (KuatHeader, KuatFooter) |
| 2 | Kuat Components | Custom components not in shadcn (ButtonGroup) |
| 3 | shadcn | Standard UI - consumers install directly |
| 4 | Custom | Only when none of the above fit |

**Do NOT add shadcn components to Kuat packages.** Consumers install them directly via CLI and kuat-core themes them automatically.

### When to Create a Kuat Component

Only create a new component when:

- The component **doesn't exist in shadcn** (e.g., ButtonGroup)
- The component is a **composition/block** of multiple shadcn components
- The component has **specific behavior** beyond styling
- The component is **reused across multiple projects**

---

## Development Workflow

1. **Start Storybook** for the framework you're working with
2. **Edit components** in `packages/kuat-react/src/` or `packages/kuat-vue/src/`
3. **Update stories** in `apps/storybook-react/stories/` or `apps/storybook-vue/stories/`
4. **Build to verify**: `pnpm build`

### Testing in a Real Application

```bash
# Build packages
pnpm build

# Link globally
cd packages/kuat-react
pnpm link --global

# In your test app
pnpm link --global @equal-experts/kuat-react
```

---

## Adding Custom Components

For components that belong in Kuat (see decision framework above):

### 1. Create the Component

- React: `packages/kuat-react/src/components/ui/{component}.tsx`
- Vue: `packages/kuat-vue/src/components/ui/{component}/`

See `kuat-docs/examples/react/components.md` and `kuat-docs/examples/vue/components.md` for code patterns.

### 2. Export from Package Index

Edit `packages/kuat-{react,vue}/src/index.ts`:

```typescript
// KUAT CUSTOM COMPONENTS
export { MyComponent } from "./components/ui/my-component";
```

### 3. Create Storybook Story

- React: `apps/storybook-react/stories/{Component}.stories.tsx`
- Vue: `apps/storybook-vue/stories/{Component}.stories.ts`

### 4. Test in Both Frameworks

Create both React and Vue versions for any new custom component.

---

## Code Style

- Use **TypeScript** with strict types
- Use **Tailwind** utility classes with design tokens
- Use **cn()** utility for className merging
- Follow patterns in `kuat-docs/rules/components/patterns.md`

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

```bash
pnpm lint
pnpm build
```

Verify components work in both light and dark themes.

### Pull Request Process

1. Create PR with clear title and description
2. Link related issues if applicable
3. Provide screenshots for UI changes
4. Wait for review and address feedback

---

## Resources

- [Architecture](./ARCHITECTURE.md) - System overview
- [Component Patterns](./kuat-docs/rules/components/patterns.md) - Naming, variants, accessibility
- [Consumer Setup](./kuat-docs/setup/consumer-setup.md) - How consumers use Kuat
- [React Examples](./kuat-docs/examples/react/components.md) - React code patterns
- [Vue Examples](./kuat-docs/examples/vue/components.md) - Vue code patterns

### External

- [shadcn/ui](https://ui.shadcn.com)
- [shadcn-vue](https://www.shadcn-vue.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Storybook](https://storybook.js.org)
