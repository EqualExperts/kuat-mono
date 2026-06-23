# Contributing to Kuat Design System

Guide for contributing to the Kuat Design System packages.

---

## How Kuat contributions work

Kuat is the Equal Experts design system, and anyone across the EE network can improve it. This
repo (`kuat-mono`) owns the **component library** and the **downstream token CSS**. The full
model, the per-surface "Proposing a…" pages, and the decision log live in the canonical
**[contribute/ section in `kuat-agent-rules`](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md)** — this section is the kuat-mono front door into it.

**Hybrid model.** A small **Kuat design system team** (custodians) owns the sources of truth and
maintains the tooling, gates, and release cadence. The **wider EE network** (consultants, product
engineers, designers) does the bulk of the fixes and light additions. Custodians don't build
everything — they curate, gate, and enable.

**Contribution vs participation.** A *contribution* is code, a design, a doc, or an asset released
through the system for others to reuse — a new/updated component, a token change, a reference
pattern. Asking which component to use or giving review feedback is valuable *participation*, but
not a contribution.

**Sizes** — contributions are sized so the small lane stays fast:

| Size | What | How |
|------|------|-----|
| **Fix** | A defect in code, design, doc, or asset | Fast, self-directed via the relevant skill + gate |
| **Light** | A non-breaking addition (e.g. a new component variant or state) | Mostly autonomous via skill + gate; light custodian touch |
| **Medium** | Extends an existing feature (e.g. a token-value change affecting consumers) | Proposal + custodian review |
| **Heavy** | A new component, a breaking change, or a foundational one (e.g. token *structure*) | Custodian-led; proposal kick-off |

**The process** (scales with size):

1. **Request** — start an open conversation in Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**: what problem are you solving? This avoids duplicate work and surfaces existing solutions.
2. **Proposal kick-off** *(Medium/Heavy only)* — agree scope and delivery with a custodian.
3. **Collaborate** — do the work **through the matching contributor skill**, not raw files. In this repo:
   - **Components** → the [`add-kuat-component`](.claude/skills/add-kuat-component/SKILL.md) skill (Light/Medium path) scaffolds React + Vue, a story, tests, the doc, the manifest, the regenerated registry, and the agent-docs bundle. The [Component Decision Tree](#component-decision-tree), [Creating New Components or Blocks](#creating-new-components-or-blocks), and [New Component Checklist](#new-component-checklist) below are the detailed "how" for this step.
   - **Tokens** → the [`generate-tokens`](.claude/skills/generate-tokens/SKILL.md) skill (Medium path) regenerates the kuat-core `variables.css` brand block from the upstream colour token source-of-truth and runs the drift gate. Colours change **upstream first**, then you sync and regenerate here.
4. **Review** — the **gates run automatically** (registry + token drift via `pnpm contributor:check`, plus `pnpm build` / `pnpm test:run`, and the upstream passive/link/token gates). Fix/Light can pass on green gates; Medium/Heavy add custodian sign-off. *(Launch posture: custodians review every contribution while the model matures — see the [overview](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md).)*
5. **Release** — pinned semver, `beta` → `stable` channels; regenerate the artifacts; communicate the change and log the decision.

**Other surfaces** — reference guidelines, slide assets, icons/imagery, and skills are contributed
**upstream** in `kuat-agent-rules`. See the full model and per-type pages:
[overview](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md) ·
[component](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/proposing-a-component.md) ·
[token change](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/proposing-a-token-change.md) ·
[reference change](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/proposing-a-reference-change.md).

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

## Documentation Audience Policy

- **Contributor docs are repo-internal:** `CONTRIBUTING.md`, `contribution-docs/`, `.cursor/agents/`, and local `AGENTS.md` are for contributors/maintainers working on Kuat itself.
- **Consumer docs are usage-facing:** package READMEs and `kuat-docs/setup/` are for application teams integrating Kuat.
- **Design/content source of truth:** generic EE foundations are upstream in `external/kuat-agent-rules`; local docs should focus on Kuat-specific implementation overlays. See `kuat-docs/setup/rules-source-of-truth.md`.

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
   - Reference design rules via `kuat-docs/rules/README.md` (canonical EE paths in `external/kuat-agent-rules`) and `kuat-docs/rules/design/layouts.md` when relevant
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
- [ ] Reviewed `kuat-docs/rules/README.md` (and linked upstream files as needed)
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
- [Design rules index](./kuat-docs/rules/README.md) - EE foundations (`external/kuat-agent-rules`) and Kuat notes
- [Component Patterns](./kuat-docs/rules/components/patterns.md) - Naming, accessibility

### External

- [shadcn/ui](https://ui.shadcn.com) - React component registry
- [shadcn-vue](https://www.shadcn-vue.com) - Vue component registry
- [Tailwind CSS](https://tailwindcss.com) - Utility framework
- [Storybook](https://storybook.js.org) - Component documentation
