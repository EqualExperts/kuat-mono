# Kuat Design System Documentation

This directory contains documentation for the Kuat Design System monorepo.

## Structure

- [`agent/`](./agent/) - AI-friendly documentation
  - [`rules/`](./agent/rules/) - Design language (no code)
    - [`design/`](./agent/rules/design/) - Colors, typography, spacing, borders, layouts, logo
    - [`content/`](./agent/rules/content/) - Voice, tone, UX writing
    - [`components/`](./agent/rules/components/) - Component patterns
  - [`examples/`](./agent/examples/) - Framework code (react/, vue/, css/)
  - [`setup/`](./agent/setup/) - Integration guides

## For AI Agents

**Start here:** [`agent/README.md`](./agent/README.md)

**Load docs based on task:**

| Task | Load |
|------|------|
| Design decisions | `agent/rules/design/{topic}.md` |
| Layout creation | `agent/rules/design/layouts.md` + `agent/examples/{framework}/layouts.md` |
| Component creation | `agent/rules/components/patterns.md` + `agent/examples/{framework}/components.md` |
| Content writing | `agent/rules/content/` |
| Framework setup | `agent/setup/kuat-core-integration.md` |

## For Application Developers

Using the Kuat Design System in your application:

- **React Applications**: See [@equal-experts/kuat-react README](../packages/kuat-react/README.md)
- **Vue Applications**: See [@equal-experts/kuat-vue README](../packages/kuat-vue/README.md)
- **Any Framework**: See [`agent/setup/kuat-core-integration.md`](./agent/setup/kuat-core-integration.md)

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
