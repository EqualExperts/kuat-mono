---
name: add-kuat-component
description: Scaffold a new Kuat design-system component end-to-end in kuat-mono — React + Vue implementations, the React Figma Code Connect mapping, Storybook stories, tests, the component doc, the manifest entry, the regenerated component registry, and the agent-docs bundle. Use when a DS-team contributor is adding (or renaming) a component to @equal-experts/kuat-react / kuat-vue. Repo-local contributor skill — never packaged or distributed.
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

### 3. Figma Code Connect (React) — `packages/kuat-react/src/components/ui/<slug>/<slug>.figma.tsx`
- Create `<slug>.figma.tsx` next to the component, mapping it to its Figma node. Mirror the
  patterns already in the repo — `button/button.figma.tsx` for `figma.enum`/`figma.boolean`/
  `figma.instance`, `input/input.figma.tsx` for `figma.nestedProps`, `button-group/button-group.figma.tsx`
  for a case where the Figma node's shape doesn't match the container component 1:1.
- Add an entry to the root [`figma.config.json`](../../../figma.config.json) `codeConnect.importPaths`
  map for the new folder → its public import path (`@equal-experts/kuat-react/<slug>`, or the root
  barrel `@equal-experts/kuat-react` if the component has no package subpath export).
- **This step needs a human (or an agent with live Figma MCP access) — do not invent the mapping:**
  - Get the actual Figma node URL for the matching design component from the person who requested it.
  - Pull the real property/variant list for that node (e.g. via the Figma MCP `get_context_for_code_connect`
    tool) rather than guessing names — Figma property names are case-sensitive and must match exactly.
  - Only map a Figma variant/property to a code prop where a genuine correspondence exists. If the
    Figma component's shape doesn't match any code component closely enough (see `content-card.figma.tsx`
    for a partial-match example, or the intentionally-skipped `Alert` — it is *not* the same component
    as `Callout`), say so explicitly instead of forcing a mapping or skipping silently.
- Verify:
  ```bash
  npx figma connect publish --dry-run
  ```
  The new component should appear in "Files that would be published" with no `ParserError`.

### 4. Storybook
- `apps/storybook-react/stories/<Name>.stories.ts`
- `apps/storybook-vue/stories/<Name>.stories.ts`

### 5. Component doc
- `kuat-docs/components/<slug>.md` — copy `kuat-docs/components/_template.md` and fill every section.

### 6. Manifest — `kuat-docs/components/components.manifest.json`
Add an entry (all four fields are required by the registry check):
```json
"kuat:<slug>": {
  "slug": "<slug>",
  "displayName": "<Pascal>",
  "path": "components/<slug>.md",
  "sources": ["@equal-experts/kuat-react", "@equal-experts/kuat-vue"]
}
```

### 7. Registry (generated — never hand-edit the table)
```bash
pnpm components:registry:generate
```
This writes `scripts/components/registry.generated.md`. The authoritative
`component-registry.md` is **upstream** (kuat-agent-rules) — paste your new row from the
generated file into it, then fill the curated **Source** prose and **Upstream refs** links by
hand. (When the upstream tree is synced into `external/`, re-running the bundle in step 8 brings
the updated registry back down.)

### 8. Bundle
```bash
node scripts/agent-docs/bundle-for-core.mjs
```
Propagates the manifest + doc into all three packages' `agent-docs/`.

### 9. Verify (definition of done)
```bash
pnpm build            # 5/5 turbo tasks green
pnpm test:run         # new component tests pass
pnpm contributor:check  # registry drift check + no-skill-leak guard both green
npx figma connect publish --dry-run  # new Code Connect file parses, no ParserError
```

## Definition of done

- Component exported from both packages, with a story, tests, a filled doc.
- `<slug>.figma.tsx` added for the React component and wired into `figma.config.json`
  `importPaths` — or, if no matching Figma node exists yet or the shapes genuinely don't
  correspond, that gap is called out explicitly rather than skipped silently.
- Manifest entry added; `registry.generated.md` regenerated and the row reconciled into the
  upstream registry.
- `pnpm build`, `pnpm test:run`, `pnpm contributor:check` all green.
- `npx figma connect publish --dry-run` shows the new component with no `ParserError`.
- Nothing under `.claude/skills/` reached a package or the bundle (the guard enforces this).

## Related

- Part of the [contribution model](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md) — this is the **Light/Medium · component** path ([proposing a component](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/proposing-a-component.md)).

---
_Phase 7 Run B · contributor skill · v2 — added Figma Code Connect step (2026-07-07)_
