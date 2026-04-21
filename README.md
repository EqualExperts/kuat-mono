# Kuat Design System

A comprehensive design system for Equal Experts, providing React and Vue component libraries built on shadcn/ui and shadcn-vue, with centralized design tokens for brand consistency across applications.

## What is Kuat?

Kuat is Equal Experts' design system that:
- **Provides ready-to-use component libraries** for React and Vue applications
- **Ensures brand consistency** through centralized design tokens and CSS variables
- **Accelerates development** with pre-built, accessible components
- **Built on industry standards** using shadcn/ui, shadcn-vue, and Tailwind CSS v4
- **Published to npm** as `@equal-experts/kuat-react` and `@equal-experts/kuat-vue`

The design system includes brand color palettes (EE Blue, Tech Blue, Transform Teal, Equal Ember), typography scales, spacing systems, and a growing library of accessible UI components.

## Structure

```
packages/
├── kuat-core/     # Shared CSS variables and Tailwind configuration
├── kuat-react/    # React component library using shadcn/ui
└── kuat-vue/      # Vue component library using shadcn-vue

apps/
├── storybook-react/  # Interactive component documentation for React
└── storybook-vue/    # Interactive component documentation for Vue
```

## Getting Started

### For Application Developers

If you want to **use** the Kuat Design System in your React or Vue application:

- **Setup (tokens + imports):** [Consumer setup](./kuat-docs/setup/consumer-setup.md) and [Choosing components (Kuat vs shadcn)](./kuat-docs/setup/choosing-components.md)
- **React**: [@equal-experts/kuat-react README](./packages/kuat-react/README.md)
- **Vue**: [@equal-experts/kuat-vue README](./packages/kuat-vue/README.md)

### For Contributors

If you want to **develop** components for the Kuat Design System:

1. **Prerequisites**
   - Node.js >= 18
   - pnpm >= 8

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd kuat-mono
   pnpm install
   ```

3. **Start Development**
   ```bash
   # Start React Storybook (http://localhost:6006)
   pnpm --filter storybook-react dev
   
   # Start Vue Storybook (http://localhost:6007)
   pnpm --filter storybook-vue dev
   ```

4. **Read the Contributor Guide**
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Complete development workflow guide

### Quick Commands

```bash
# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Run all packages in development mode
pnpm dev
```

## Project status

**Current workspace / package version:** 0.6.0 (see `package.json` in the repo root and under `packages/*`).

Published libraries combine **`@equal-experts/kuat-core`** (tokens), **`@equal-experts/kuat-react`** or **`@equal-experts/kuat-vue`** (primitives and blocks), and **shadcn** / **shadcn-vue** in your app for components Kuat does not ship (for example Dialog, DropdownMenu).

**Illustrative coverage in `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`:** actions and grouping (`Button`, `ButtonGroup`, `Badge`), form controls (`Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Toggle`), surfaces (`Accordion`, `AlertDialog`, `Breadcrumb`, `Sonner`), blocks (`KuatHeader`, `KuatCarousel`, `KuatLogoLockup`, `KuatRadialProgress`, `ContentCard`), and more. See each package README and [public API inventory](./kuat-docs/setup/public-api-inventory.md) for the authoritative list.

**Storybook** in this repo documents interactive behaviour and is the primary reference for component API details.

## Packages

### @equal-experts/kuat-core

Shared CSS variables and Tailwind configuration for consistent theming across React and Vue packages.

**Key Features**:
- Brand color palettes (EE Blue, Tech Blue, Transform Teal, Equal Ember)
- Typography system (Lexend, Lora, JetBrains Mono)
- Spacing and layout utilities
- Dark mode support

### @equal-experts/kuat-react

React component library built with shadcn/ui, Radix UI primitives, and Tailwind CSS v4.

**Install:** `pnpm add @equal-experts/kuat-core @equal-experts/kuat-react`

**Usage:** [packages/kuat-react/README.md](./packages/kuat-react/README.md), [consumer setup](./kuat-docs/setup/consumer-setup.md)

### @equal-experts/kuat-vue

Vue component library built with shadcn-vue, Radix Vue primitives, and Tailwind CSS v4.

**Install:** `pnpm add @equal-experts/kuat-core @equal-experts/kuat-vue`

**Usage:** [packages/kuat-vue/README.md](./packages/kuat-vue/README.md), [consumer setup](./kuat-docs/setup/consumer-setup.md)

## Tech Stack

- **Monorepo**: Turborepo
- **Package Manager**: pnpm workspaces
- **Styling**: Tailwind CSS v4
- **React**: shadcn/ui
- **Vue**: shadcn-vue
- **Build Tool**: Vite
- **Documentation**: Storybook 8

## Documentation

### For users

- [Consumer setup](./kuat-docs/setup/consumer-setup.md) — install order, Tailwind, imports
- [Choosing components](./kuat-docs/setup/choosing-components.md) — Kuat packages vs shadcn vs custom
- [@equal-experts/kuat-react README](./packages/kuat-react/README.md)
- [@equal-experts/kuat-vue README](./packages/kuat-vue/README.md)
- [Design system documentation](./kuat-docs/README.md) — index of rules and examples

### For Contributors

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development workflow and component guidelines
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Monorepo architecture and design decisions
- [Component Guidelines](./kuat-docs/rules/components/patterns.md) - Component development patterns

### For Maintainers

- [PUBLISHING.md](./PUBLISHING.md) - Publishing packages to npm
- Version management and release process

### For AI Agents

- [Agent Documentation](./kuat-docs/README.md) - Navigation index for AI agent documentation
- Local canonical agent rules: [`AGENTS.md`](./AGENTS.md) (generated from `scripts/agent-rules/templates/`)
- Cursor agents under [`.cursor/agents/`](./.cursor/agents/) — **kuat-qa**, **kuat-component-dev**, **kuat-verify**, **kuat-documentation** (see [CONTRIBUTING.md](./CONTRIBUTING.md) Development Workflow)
- [Design Rules](./kuat-docs/rules/) - Pure design language (no code)
- [Integration Guide](./kuat-docs/setup/integration.md) - How to integrate docs into your project

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development environment setup
- Adding new components
- Creating Storybook stories
- Submitting pull requests

## License

[License information to be added]

