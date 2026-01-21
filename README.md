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

- **React**: See [@equal-experts/kuat-react README](./packages/kuat-react/README.md) for installation and usage
- **Vue**: See [@equal-experts/kuat-vue README](./packages/kuat-vue/README.md) for installation and usage

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

## Project Status

**Current Version**: 0.2.x

**Available Components**:
- Button (with variants: default, destructive, outline, secondary, ghost, link)
- Accordion (single and multiple selection modes)
- Alert Dialog (with customizable actions)

**Coming Soon**:
- Form components (Input, Select, Checkbox, Radio)
- Navigation components (Tabs, Menu, Breadcrumb)
- Feedback components (Toast, Alert, Progress)
- And more...

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

**Installation**: `pnpm add @equal-experts/kuat-react`

**Usage Guide**: See [packages/kuat-react/README.md](./packages/kuat-react/README.md) for integration instructions.

### @equal-experts/kuat-vue

Vue component library built with shadcn-vue, Radix Vue primitives, and Tailwind CSS v4.

**Installation**: `pnpm add @equal-experts/kuat-vue`

**Usage Guide**: See [packages/kuat-vue/README.md](./packages/kuat-vue/README.md) for integration instructions.

## Tech Stack

- **Monorepo**: Turborepo
- **Package Manager**: pnpm workspaces
- **Styling**: Tailwind CSS v4
- **React**: shadcn/ui
- **Vue**: shadcn-vue
- **Build Tool**: Vite
- **Documentation**: Storybook 8

## Documentation

### For Users

- **[@equal-experts/kuat-react README](./packages/kuat-react/README.md)** - How to use the React library in your application
- **[@equal-experts/kuat-vue README](./packages/kuat-vue/README.md)** - How to use the Vue library in your application
- [Complete Documentation](./docs/README.md) - Full documentation index

### For Contributors

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development workflow and component guidelines
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Monorepo architecture and design decisions
- [Component Guidelines](./kuat-docs/rules/components/patterns.md) - Component development patterns

### For Maintainers

- [PUBLISHING.md](./PUBLISHING.md) - Publishing packages to npm
- Version management and release process

### For AI Agents

- [Agent Documentation](./kuat-docs/README.md) - Navigation index for AI agent documentation
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

