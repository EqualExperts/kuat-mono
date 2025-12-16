# Kuat Monorepo Architecture

## Overview

This monorepo uses Turborepo and pnpm workspaces to manage three packages that share design tokens and follow consistent patterns.

## Monorepo Structure

```
kuat-mono/
├── packages/
│   ├── kuat-core/     # Shared design tokens and CSS variables
│   ├── kuat-react/    # React component library
│   └── kuat-vue/      # Vue component library
├── turbo.json         # Turborepo pipeline configuration
└── pnpm-workspace.yaml # pnpm workspace definition
```

## Package Details

### @equal-experts/kuat-core

**Purpose**: Centralized design tokens and CSS variables shared across React and Vue packages.

**Key Files**:
- `src/variables.css` - CSS custom properties for theming (colors, spacing, etc.)
- `tailwind.config.ts` - Base Tailwind configuration

**Exports**:
- CSS variables via `@equal-experts/kuat-core/variables.css`
- Tailwind theme configuration

**Dependencies**: Minimal - only Tailwind CSS v4

### @equal-experts/kuat-react

**Purpose**: React component library built with shadcn/ui.

**Key Files**:
- `components.json` - shadcn/ui CLI configuration
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/styles.css` - Imports from @equal-experts/kuat-core and Tailwind
- `vite.config.ts` - Vite build configuration

**Dependencies**:
- React 18+
- Radix UI primitives
- shadcn/ui components (installed via CLI)
- `@equal-experts/kuat-core` (workspace dependency)

**Build**: Vite library mode with TypeScript

### @equal-experts/kuat-vue

**Purpose**: Vue component library built with shadcn-vue.

**Key Files**:
- `components.json` - shadcn-vue CLI configuration
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/styles.css` - Imports from @equal-experts/kuat-core and Tailwind
- `vite.config.ts` - Vite build configuration

**Dependencies**:
- Vue 3.4+
- Radix Vue primitives
- shadcn-vue components (installed via CLI)
- `@equal-experts/kuat-core` (workspace dependency)

**Build**: Vite library mode with TypeScript

## Design Token Flow

```
@equal-experts/kuat-core/src/variables.css
    ↓ (imported via CSS)
@equal-experts/kuat-react/src/styles.css
@equal-experts/kuat-vue/src/styles.css
    ↓ (used in components)
React/Vue Components
```

## Build Pipeline

Turborepo manages the build pipeline:
- `build`: Builds all packages in dependency order
- `dev`: Development mode with watch
- `lint`: Lints all packages

Dependencies are automatically resolved - `@equal-experts/kuat-react` and `@equal-experts/kuat-vue` depend on `@equal-experts/kuat-core`, so `@equal-experts/kuat-core` builds first.

## Technology Stack

- **Monorepo**: Turborepo
- **Package Manager**: pnpm workspaces
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Type System**: TypeScript
- **React Framework**: shadcn/ui
- **Vue Framework**: shadcn-vue

## Adding Components

### React Components
```bash
cd packages/kuat-react
npx shadcn@latest add button
```

### Vue Components
```bash
cd packages/kuat-vue
npx shadcn-vue@latest add button
```

Components are installed into `src/components/ui/` and should be exported from `src/index.ts`.

## Workspace Dependencies

Packages reference each other using workspace protocol:
```json
{
  "dependencies": {
    "@equal-experts/kuat-core": "workspace:*"
  }
}
```

This ensures local packages are used during development and proper linking.


