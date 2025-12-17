# Kuat Design System Documentation

This directory contains documentation for the Kuat Design System monorepo.

## Structure

- [`agent/`](./agent/) - Documentation for AI agents and automated tools
  - [`README.md`](./agent/README.md) - Navigation index for all agent documentation
  - [`usage-guide.md`](./agent/usage-guide.md) - Quick reference and common tasks
  - [`design/`](./agent/design/) - Design system documentation
    - [`design-system.md`](./agent/design/design-system.md) - Design system overview and patterns
    - [`colours.md`](./agent/design/colours.md) - Brand colors and color usage guidelines
    - [`typography.md`](./agent/design/typography.md) - Typography scale and text styling
    - [`spacing.md`](./agent/design/spacing.md) - Spacing scale and patterns
    - [`borders.md`](./agent/design/borders.md) - Border usage and specifications
  - [`content/`](./agent/content/) - Content and writing guidelines
    - [`content-guidelines.md`](./agent/content/content-guidelines.md) - Writing principles, voice and tone, content patterns
  - [`technical/`](./agent/technical/) - Technical guidelines and coding standards
    - [`component-guidelines.md`](./agent/technical/component-guidelines.md) - Component development guidelines

## For Application Developers

Using the Kuat Design System in your application:

- **React Applications**: See [@equal-experts/kuat-react README](../packages/kuat-react/README.md) - Installation and usage guide for React
- **Vue Applications**: See [@equal-experts/kuat-vue README](../packages/kuat-vue/README.md) - Installation and usage guide for Vue

## For Contributors

Contributing to the Kuat Design System:

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Complete development workflow guide
  - Environment setup
  - Adding components
  - Creating Storybook stories
  - Testing and submission process
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - Monorepo architecture and design decisions
  - Package structure
  - Dependency graph
  - Build system details
- **Component Guidelines** - See [technical/component-guidelines.md](./agent/technical/component-guidelines.md)

### Quick Start for Contributors

```bash
# Clone and install
git clone <repository-url>
cd kuat-mono
pnpm install

# Start Storybook
pnpm --filter storybook-react dev  # React on :6006
pnpm --filter storybook-vue dev    # Vue on :6007

# Add a component
cd packages/kuat-react
npx shadcn@latest add dialog

# Export it
# Edit src/index.ts to export the new component

# Create a story
# Add stories/Dialog.stories.tsx in storybook-react
```

## For Maintainers

Publishing packages to npm:

- **[PUBLISHING.md](../PUBLISHING.md)** - npm publishing guide
  - Pre-publish checklist
  - Version management
  - Publishing process
  - Troubleshooting
- **Monorepo Management**: See [README.md](../README.md) for workspace commands

## For AI Agents

**Start here:** [`agent/README.md`](./agent/README.md) - Complete navigation index

**Quick start:** [`agent/usage-guide.md`](./agent/usage-guide.md) - Quick reference and common tasks

**Design system:**
- [`agent/design/design-system.md`](./agent/design/design-system.md) - Design system overview
- [`agent/design/colours.md`](./agent/design/colours.md) - Color tokens and usage
- [`agent/design/typography.md`](./agent/design/typography.md) - Typography guidelines
- [`agent/design/spacing.md`](./agent/design/spacing.md) - Spacing system
- [`agent/design/borders.md`](./agent/design/borders.md) - Border guidelines

**Technical:**
- [`agent/technical/component-guidelines.md`](./agent/technical/component-guidelines.md) - Component patterns

## Architecture

See [`../ARCHITECTURE.md`](../ARCHITECTURE.md) for detailed monorepo architecture documentation.

