# Kuat Design System – Claude / AI agent reference

This file ensures the CSS-first component architecture is applied when building or changing Kuat components.

## Component architecture – CSS-first

When adding or modifying components in Kuat packages, use a CSS-first structure so variants and state are defined by classes, not by JS maps of CSS variable names.

**React:** A component is a **directory** under `packages/kuat-react/src/components/ui/` with:
- `ComponentName.tsx` – logic and class composition only (e.g. `className={cn("base", `base--${size}`, `base--${color}`)}`).
- `ComponentName.css` – all styles and variants (BEM-style or `componentName--variant`). Prefer Tailwind utilities via `@apply`; add `@reference "../../../styles.css";` at the top so Tailwind v4 has utility scope. Use design tokens from kuat-core in the CSS file; do not define or reference token names in JS maps. Keep vanilla CSS only where Tailwind has no equivalent (e.g. `color-mix`, `@keyframes`).
- Optional `index.ts` that re-exports the component and imports the CSS.

**Vue:** Use a **single .vue file** per component (or per subcomponent). Put variant/state styles in `<style>` (scoped or BEM). Prefer Tailwind `@apply`; add `@reference "../../../styles.css";` at the top of the style block for Tailwind v4. Do not use JS objects that map prop values to CSS variable names or `var(...)` strings; the template composes class names from props, and the style block defines what those classes do.

**New components:** Follow this structure by default. Variants and states are expressed as **class names**; the CSS file (or SFC `<style>`) defines what those classes do.

When adding or changing components, prefer the Kuat component workflow agents when available (`.cursor/agents/`): **kuat-qa** (plan and write test specs and test code), **kuat-component-dev** (implement and add Storybook stories), **kuat-verify** (run tests and report pass/fail). See `.cursor/agents/kuat-qa.md`, `.cursor/agents/kuat-component-dev.md`, and `.cursor/agents/kuat-verify.md`.

For full project structure, contributing, and verification, see `.cursorrules` and `AGENTS.md`.
