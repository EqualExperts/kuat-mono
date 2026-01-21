# Kuat Design System Documentation

This directory contains supplementary documentation for the Kuat Design System monorepo.

## AI-Friendly Documentation

**Moved to:** [`../kuat-docs/`](../kuat-docs/)

The AI-friendly documentation has been moved to the repository root as `kuat-docs/` to make it easier for consumers to clone into their projects without conflicts.

| Resource | Location |
|----------|----------|
| Design Rules | [`kuat-docs/rules/`](../kuat-docs/rules/) |
| Framework Examples | [`kuat-docs/examples/`](../kuat-docs/examples/) |
| Integration Guide | [`kuat-docs/setup/`](../kuat-docs/setup/) |

## For Application Developers

Using the Kuat Design System in your application:

- **React Applications**: See [@equal-experts/kuat-react README](../packages/kuat-react/README.md)
- **Vue Applications**: See [@equal-experts/kuat-vue README](../packages/kuat-vue/README.md)
- **Any Framework**: See [`kuat-docs/setup/kuat-core-integration.md`](../kuat-docs/setup/kuat-core-integration.md)

## For Contributors

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Development workflow
  - Environment setup
  - Adding components
  - Creating Storybook stories
  - Testing and submission process
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - Monorepo architecture
  - Package structure
  - Dependency graph
  - Build system details

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

- **[PUBLISHING.md](../PUBLISHING.md)** - npm publishing guide
  - Pre-publish checklist
  - Version management
  - Publishing process
  - Troubleshooting

## Architecture

See [`../ARCHITECTURE.md`](../ARCHITECTURE.md) for detailed monorepo architecture documentation.
