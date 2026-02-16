# Kuat Design System – Claude / AI agent reference

This file ensures the CSS-first component architecture is applied when building or changing Kuat components.

## Component architecture – CSS-first

When adding or modifying components in Kuat packages, use a CSS-first structure so variants and state are defined by classes, not by JS maps of CSS variable names.

**React:** A component is a **directory** under `packages/kuat-react/src/components/ui/` with:
- `ComponentName.tsx` – logic and class composition only (e.g. `className={cn("base", `base--${size}`, `base--${color}`)}`).
- `ComponentName.css` – all styles and variants (BEM-style or `componentName--variant`). Use design tokens (`var(--...)`) from kuat-core in the CSS file; do not define or reference token names in JS maps.
- Optional `index.ts` that re-exports the component and imports the CSS.

**Vue:** Use a **single .vue file** per component (or per subcomponent). Put variant/state styles in `<style>` (scoped or BEM). Do not use JS objects that map prop values to CSS variable names or `var(...)` strings; the template composes class names from props, and the style block defines what those classes do.

**New components:** Follow this structure by default. Variants and states are expressed as **class names**; the CSS file (or SFC `<style>`) defines what those classes do.

For full project structure, contributing, and verification, see `.cursorrules` and `AGENTS.md`.
