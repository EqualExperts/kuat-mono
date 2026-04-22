<!-- AUTO-GENERATED FILE. -->
<!-- Source: scripts/agent-rules/templates/AGENTS.local.md -->
<!-- Regenerate with: pnpm agent-rules:generate -->
# Kuat Mono Agent Rules (Canonical Local Source)

This is the single source of truth for local agent behavior in this repository.

## Audience boundary

- This file is for **contributors/maintainers** working inside `kuat-mono`.
- For **consumer usage guidance** (apps using published Kuat packages), use package READMEs plus `kuat-docs/setup/` docs and upstream foundations.

## Rule loading order

1. Load upstream Equal Experts design and structure guidance first:
   - https://github.com/EqualExperts/kuat-agent-rules
2. Then apply local implementation rules from this file and referenced local docs.

## Ownership split

- Upstream owns brand, foundations, content style, page and flow structure, and task-loading guidance.
- This repo owns component implementation architecture, package APIs, Storybook and testing conventions, and contributor workflow.

## Local implementation rules

When adding or changing Kuat components, follow CSS-first architecture: variants and state are expressed via class names, with styles defined in CSS or Vue `<style>`, not JS maps of CSS variable names.

- React component structure: `packages/kuat-react/src/components/ui/<name>/` with `ComponentName.tsx` + `ComponentName.css` (+ optional `index.ts`).
- Vue component structure: single `.vue` file under `packages/kuat-vue/src/components/ui/<name>/` with class-based variants and `<style>` rules.
- Prefer Tailwind `@apply` and include `@reference "../../../styles.css";` in component CSS or Vue style blocks for Tailwind v4 utility scope.
- Storybook rule: new or changed stories must include `parameters.a11y.test = "error"` (or stricter).

## Preferred component workflow agents

Use the local workflow agents in `.cursor/agents/`:

- `kuat-qa` for test specs and test files
- `kuat-component-dev` for implementation and stories
- `kuat-verify` for test execution
- `kuat-documentation` for consumer-facing documentation audits/updates

## Required local references

- `.cursor/agents/kuat-qa.md`
- `.cursor/agents/kuat-component-dev.md`
- `.cursor/agents/kuat-verify.md`
- `.cursor/agents/kuat-documentation.md`
- `kuat-docs/rules/README.md` (EE canonical paths in `external/kuat-agent-rules`; Kuat implementation)
- `kuat-docs/rules/components/patterns.md`
- `contribution-docs/react.md`
- `contribution-docs/vue.md`

## Conflict resolution

- Design, structure, and content conflicts: upstream wins.
- Implementation, API, testing, and build conflicts: local rules in this repo win.
- If still unclear, trust runtime truth in this order: tests, Storybook, package exports, source code.
