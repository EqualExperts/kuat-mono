# Kuat Monorepo

A monorepo containing shared component libraries built with shadcn/ui (React) and shadcn-vue (Vue), sharing design tokens via `kuat-core`.

## Structure

```
packages/
├── kuat-core/     # Shared CSS variables and Tailwind configuration
├── kuat-react/   # React component library using shadcn/ui
└── kuat-vue/     # Vue component library using shadcn-vue
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all packages in development mode
pnpm dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint
```

## Packages

### @equalexperts/kuat-core

Shared CSS variables and Tailwind configuration for consistent theming across React and Vue packages.

### @equalexperts/kuat-react

React component library built with shadcn/ui, Radix UI primitives, and Tailwind CSS v4.

**Usage Guide**: See [packages/kuat-react/README.md](./packages/kuat-react/README.md) for integration instructions.

### @equalexperts/kuat-vue

Vue component library built with shadcn-vue, Radix Vue primitives, and Tailwind CSS v4.

**Usage Guide**: See [packages/kuat-vue/README.md](./packages/kuat-vue/README.md) for integration instructions.

## Tech Stack

- **Monorepo**: Turborepo
- **Package Manager**: pnpm workspaces
- **Styling**: Tailwind CSS v4
- **React**: shadcn/ui
- **Vue**: shadcn-vue
- **Build Tool**: Vite

## Documentation

- [Architecture](./ARCHITECTURE.md) - Detailed monorepo architecture
- [Documentation](./docs/README.md) - Complete documentation index
- **[@equalexperts/kuat-react README](./packages/kuat-react/README.md)** - How to use `@equalexperts/kuat-react` in your application
- **[@equalexperts/kuat-vue README](./packages/kuat-vue/README.md)** - How to use `@equalexperts/kuat-vue` in your application
- [Agent Documentation](./docs/agent/README.md) - Navigation index for AI agent documentation
- [Agent Quick Reference](./docs/agent/usage-guide.md) - Quick reference for AI agents

