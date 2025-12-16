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

### @kuat/core

Shared CSS variables and Tailwind configuration for consistent theming across React and Vue packages.

### @kuat/react

React component library built with shadcn/ui, Radix UI primitives, and Tailwind CSS v4.

### @kuat/vue

Vue component library built with shadcn-vue, Radix Vue primitives, and Tailwind CSS v4.

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
- [Agent Guidelines](./docs/agent/usage-guide.md) - Quick reference for AI agents

