# Contributing to Kuat Design System

Guide for contributing to the Kuat Design System packages.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Setup

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm build`
4. Start Storybook: `pnpm --filter storybook-react dev` or `pnpm --filter storybook-vue dev`

---

## Agent Rules Sync (Deterministic)

This repo vendors upstream agent guidance from `EqualExperts/kuat-agent-rules` and generates local entrypoint files from templates.

### Canonical files

- Local canonical rules: `AGENTS.md` (generated)
- Cursor entrypoint: `.cursorrules` (generated pointer)
- Claude entrypoint: `CLAUDE.md` (symlink to `AGENTS.md`)
- Templates: `scripts/agent-rules/templates/`
- Generator: `scripts/agent-rules/generate-entrypoints.mjs`
- Upstream sync script: `scripts/agent-rules/sync-upstream.sh`

### Commands

- `pnpm agent-rules:sync:upstream` - sync upstream repo into `external/kuat-agent-rules` via `git subtree` when available, otherwise a deterministic clone-and-copy fallback
- `pnpm agent-rules:generate` - regenerate `AGENTS.md` and `.cursorrules` from templates
- `pnpm agent-rules:check` - verify generated files are up to date
- `pnpm agent-rules:sync` - run sync + generate

### Workflow

1. Run `pnpm agent-rules:sync`
2. Review upstream changes in `external/kuat-agent-rules`
3. Update templates under `scripts/agent-rules/templates/` if local overlay needs changes
4. Run `pnpm agent-rules:generate`
5. Validate with `pnpm agent-rules:check`

---

## Architecture Overview

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system documentation.

**Repository Structure:**

| Directory | Purpose |
|-----------|---------|
| `packages/kuat-core` | Design tokens, CSS variables, Tailwind preset |
| `packages/kuat-react` | Custom React components and blocks |
| `packages/kuat-vue` | Custom Vue components and blocks |
| `apps/storybook-react` | React component documentation |
| `apps/storybook-vue` | Vue component documentation |
| `kuat-docs/` | Consumer-facing design documentation |

---

## Component Decision Tree

Before creating a component, determine where it belongs:

```
Need a UI element?
    │
    ├─ Exists in Kuat (local version)? ─── YES ──→ Use from Kuat package
    │
    └─ NO
        │
        ├─ Exists in shadcn? ─── YES ──→ Prefer adding local version to Kuat
        │                                when needed across consumers;
        │                                otherwise consumer installs via shadcn CLI
        │
        └─ NO
            │
            ├─ Composition of multiple components? ─── YES ──→ Create Kuat Block
            │                                                  (e.g., KuatHeader)
            │
            └─ NO
                │
                └─ Unique behavior / reused across projects? ─── YES ──→ Create Kuat Component
                                                                         (e.g., ButtonGroup)
                    │
                    └─ NO ──→ Build custom in consumer app
```

**Key Rules:**
- Prefer adding local versions of UI components to Kuat when they are needed across consumers; otherwise consumers use the shadcn registry
- kuat-core automatically themes both Kuat local components and shadcn-installed components

---

## Using shadcn MCP

The shadcn MCP tools help discover existing components before creating new ones.

**Before creating a component:**
1. Check if Kuat already has a local version of the component
2. Use `search_items_in_registries` to check if it exists in the shadcn registry
3. Use `view_items_in_registries` to see component implementation details
4. Use `get_item_examples_from_registries` for usage patterns

If not in Kuat, either add a local version to Kuat or recommend installing from the shadcn registry. Prefer using the Kuat local version when it exists; when adding new components, you can add a local version to Kuat or use the shadcn registry.

---

## Creating New Components or Blocks

### Requirements

1. **Design Reference Required**
   - Obtain Figma design or design specification before implementation
   - Reference design rules in `kuat-docs/rules/design/`
   - Follow spacing, color, and typography guidelines

2. **Check Kuat first, then shadcn registry**
   - Check whether Kuat already has a local version of the component
   - If not, check the shadcn registry via shadcn MCP tools or [ui.shadcn.com](https://ui.shadcn.com)
   - If the component exists in shadcn but not in Kuat, you can add a local version to Kuat or document registry usage

3. **Create Both Framework Versions**
   - React version in `packages/kuat-react`
   - Vue version in `packages/kuat-vue`
   - See framework-specific guides below

4. **Add Storybook Stories**
   - React: `apps/storybook-react/stories/`
   - Vue: `apps/storybook-vue/stories/`
   - Story meta must include `parameters.a11y.test = "error"` (or a documented per-story override where needed)

5. **Document in kuat-docs**
   - Add usage documentation describing when and how to use the component
   - Include examples in `kuat-docs/examples/react/` and `kuat-docs/examples/vue/`

When the Kuat agents are available in your environment (e.g. Cursor with `.cursor/agents/`), prefer the test-driven flow: run **kuat-qa** to generate tests and specs, then **kuat-component-dev** to implement and add stories, then **kuat-verify** to run tests. Optionally run **kuat-documentation** afterward (or before release) to align Storybook, `kuat-docs`, and READMEs with the implementation. See [Development Workflow](#development-workflow) above for details.

### Framework-Specific Guides

Detailed implementation guides with code examples:

- **React**: [contribution-docs/react.md](./contribution-docs/react.md)
- **Vue**: [contribution-docs/vue.md](./contribution-docs/vue.md)

---

## Development Workflow

1. **Start Storybook** for your target framework
2. **Create/edit components** following framework-specific guide
3. **Test in Storybook** - verify all variants, light/dark mode, and accessibility checks
4. **Run Storybook accessibility tests**: `pnpm --filter storybook-react test-storybook` and/or `pnpm --filter storybook-vue test-storybook`
5. **Build**: `pnpm build`
6. **Lint**: `pnpm lint`

We encourage using the Kuat agents when they are available (e.g. in Cursor with `.cursor/agents/`). For new or changed components, prefer this test-driven flow: the **Kuat QA agent** (`.cursor/agents/kuat-qa.md`) plans test specs and generates runnable test code; the **component development agent** (`.cursor/agents/kuat-component-dev.md`) implements the component and adds Storybook stories; **kuat-verify** (`.cursor/agents/kuat-verify.md`) runs the tests and reports pass/fail. Optionally use **kuat-documentation** (`.cursor/agents/kuat-documentation.md`) to audit or refresh consumer-facing documentation.

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

1. Run `pnpm lint`
2. Run `pnpm build`
3. Verify components work in light and dark themes
4. Ensure both React and Vue versions exist (for components)

### Pull Request Process

1. Create PR with clear title and description
2. Link related issues if applicable
3. Provide screenshots for UI changes
4. Include Figma/design reference
5. Wait for review and address feedback

---

## New Component Checklist

- [ ] Figma design or design spec obtained
- [ ] Verified component does NOT exist in shadcn
- [ ] Reviewed design rules in `kuat-docs/rules/design/`
- [ ] Created React version
- [ ] Created Vue version
- [ ] Added Storybook stories (both frameworks)
- [ ] Storybook story meta includes `parameters.a11y.test = "error"` (or documented exception)
- [ ] Added documentation to `kuat-docs/`
- [ ] Tested light and dark mode
- [ ] PR includes screenshots
- [ ] (If using Kuat agents) Used kuat-qa → kuat-component-dev → kuat-verify for test-driven implementation
- [ ] (Optional) Used kuat-documentation for Storybook / `kuat-docs` / README updates when the change is documentation-heavy or pre-release

---

## Resources

### Internal

- [Architecture](./ARCHITECTURE.md) - System overview
- [React Guide](./contribution-docs/react.md) - React-specific contribution guide
- [Vue Guide](./contribution-docs/vue.md) - Vue-specific contribution guide
- [Design Rules](./kuat-docs/rules/design/) - Colors, spacing, typography
- [Component Patterns](./kuat-docs/rules/components/patterns.md) - Naming, accessibility

### External

- [shadcn/ui](https://ui.shadcn.com) - React component registry
- [shadcn-vue](https://www.shadcn-vue.com) - Vue component registry
- [Tailwind CSS](https://tailwindcss.com) - Utility framework
- [Storybook](https://storybook.js.org) - Component documentation
