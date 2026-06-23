---
name: add-kuat-component
description: Scaffold a new Kuat design-system component end-to-end in kuat-mono — React + Vue implementations, Storybook stories, tests, the component doc, the manifest entry, the regenerated component registry, and the agent-docs bundle. Use when a DS-team contributor is adding (or renaming) a component to @equal-experts/kuat-react / kuat-vue. Repo-local contributor skill — never packaged or distributed.
---

# Add a Kuat component

Repo-local skill for **Kuat design-system contributors** (the DS team). It walks you through
adding a component so nothing drifts: code in both frameworks, a story, tests, the doc, the
manifest, the registry, and the published bundle. The registry stays honest via a deterministic
generator + drift check — no more hand-maintained component log going stale.

> **This skill is repo-local.** It lives in `kuat-mono/.claude/skills/` (project scope), is
> discovered automatically when you work in this repo, and is **never** bundled into a package,
> the `agent-docs/` payload, or the marketplace. Keep it that way.

## When to use

- Adding a brand-new Kuat component or block to `@equal-experts/kuat-react` / `@equal-experts/kuat-vue`.
- Renaming or re-homing an existing component (update the same touch-points).

## When NOT to use

- Editing reference *guidelines* or *patterns* — that is upstream (`kuat-agent-rules`, the
  `author-reference` skill), not here.
- Changing design tokens / colours — that flows from the upstream token SoT (`generate-tokens`),
  not by hand.

## Canonical template

Model new work on **`button-group`** — the simplest component present in both frameworks:

- React: `packages/kuat-react/src/components/ui/button-group/`
- Vue: `packages/kuat-vue/src/components/ui/button-group/`

Read those first and copy their structure, idioms, and test style.

## Naming

| Thing | Form | Example |
|-------|------|---------|
| slug | kebab-case | `status-badge` |
| React/Vue symbol | PascalCase | `StatusBadge` |
| Vue SFC file | PascalCase | `StatusBadge.vue` |
| registry/manifest ID | `kuat:<slug>` (or `kuat:kuat-<slug>` for blocks; `shadcn:<slug>` for themed primitives) | `kuat:status-badge` |

## Checklist

Work top to bottom. Substitute `<slug>` / `<Pascal>` / `<Name>` throughout.

### 1. React implementation — `packages/kuat-react/src/`
- `components/ui/<slug>/<slug>.tsx` — `"use client"`; import `cn` from `@/lib/utils`; `import "./<slug>.css"`; `forwardRef`; set `.displayName`; export the component, its `Props` type, and any `*_VARIANTS`/`variants()` helpers (mirror `button-group.tsx`).
- `components/ui/<slug>/<slug>.css` — component styles (use kuat-core tokens, not raw values).
- `components/ui/<slug>/index.ts` — re-export the component + types from `./<slug>`.
- `components/ui/<slug>/<slug>.test.tsx` — `vitest` + `@testing-library/react` (mirror `button-group.test.tsx`: rendering, className passthrough, ref forwarding, variants).
- `<slug>.ts` (top-level re-export, mirror `src/badge.ts`).
- `index.ts` — add an `export { … } from "./components/ui/<slug>"` block (+ `export type`).
- **Build wiring (don't skip):**
  - `vite.config.ts` → add `"<slug>": resolve(__dirname, "src/<slug>.ts")` to `build.lib.entry` (gives the component its own import sub-path).
  - `src/components-bundles/bundle-*.css` → add `@import "../components/ui/<slug>/<slug>.css";` so the component's CSS ships in the concatenated bundle.

### 2. Vue implementation — `packages/kuat-vue/src/`
- `components/ui/<slug>/<Pascal>.vue` (+ `constants.ts` when you have shared option arrays).
- `components/ui/<slug>/<slug>.css`.
- `components/ui/<slug>/index.ts` — re-export.
- `components/ui/<slug>/<Pascal>.spec.ts` — `vitest` (mirror `ButtonGroup.spec.ts`).
- `<slug>.ts` top-level re-export + add to `index.ts`.
- **Build wiring (don't skip):** add the entry to `vite.config.ts` `build.lib.entry` and the CSS `@import` to `src/components-bundles/bundle-*.css` (same as React).

### 3. Storybook
- `apps/storybook-react/stories/<Name>.stories.ts`
- `apps/storybook-vue/stories/<Name>.stories.ts`

### 4. Component doc
- `kuat-docs/components/<slug>.md` — copy `kuat-docs/components/_template.md` and fill every section.

### 5. Manifest — `kuat-docs/components/components.manifest.json`
Add an entry (all four fields are required by the registry check):
```json
"kuat:<slug>": {
  "slug": "<slug>",
  "displayName": "<Pascal>",
  "path": "components/<slug>.md",
  "sources": ["@equal-experts/kuat-react", "@equal-experts/kuat-vue"]
}
```

### 6. Registry (generated — never hand-edit the table)
```bash
pnpm components:registry:generate
```
This writes `scripts/components/registry.generated.md`. The authoritative
`component-registry.md` is **upstream** (kuat-agent-rules) — paste your new row from the
generated file into it, then fill the curated **Source** prose and **Upstream refs** links by
hand. (When the upstream tree is synced into `external/`, re-running the bundle in step 7 brings
the updated registry back down.)

### 7. Bundle
```bash
node scripts/agent-docs/bundle-for-core.mjs
```
Propagates the manifest + doc into all three packages' `agent-docs/`.

### 8. Verify (definition of done)
```bash
pnpm build            # 5/5 turbo tasks green
pnpm test:run         # new component tests pass
pnpm contributor:check  # registry drift check + no-skill-leak guard both green
```

## Definition of done

- Component exported from both packages, with a story, tests, a filled doc.
- Manifest entry added; `registry.generated.md` regenerated and the row reconciled into the
  upstream registry.
- `pnpm build`, `pnpm test:run`, `pnpm contributor:check` all green.
- Nothing under `.claude/skills/` reached a package or the bundle (the guard enforces this).

## Related

- Part of the [contribution model](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md) — this is the **Light/Medium · component** path ([proposing a component](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/proposing-a-component.md)).

---
_Phase 7 Run B · contributor skill · v1 (2026-06-17)_
