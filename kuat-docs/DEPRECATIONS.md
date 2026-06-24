# kuat-mono — deprecations (rules and docs)

Audit for redundant guides after multi-entry rules architecture.

---

| Asset | Action | Replacement |
|-------|--------|-------------|
| `kuat-docs/examples/react/components.md`, vue twin | Deprecated | `kuat-docs/components/*.md` + Storybook |
| `external/.../types/web/product/examples/` in bundle | Excluded from npm bundle | Component IDs + `agent-docs/components/` |
| `cursorrules.old.md` | Remove when confirmed unused | Root `.cursorrules` / `AGENTS.md` |
| Duplicate consumer setup across `contribution-docs` and package READMEs | Consolidate | `packages/kuat-react/README.md` + `agent-docs/AGENTS.md` |
| Per-component markdown only in Storybook strings | Supplement | `kuat-docs/components/{slug}.md` |

---

## Package / API deprecations

| API | Deprecated in | Removal target | Replacement |
|-----|---------------|----------------|-------------|
| `@equal-experts/kuat-core` default export — the Tailwind JS preset (`tailwind.config.ts`, also exported as `./tailwind-preset`) | 0.14.0-beta (2026-06-24) | Next major (`1.0.0`) | CSS-first: `@import "tailwindcss"; @import "@equal-experts/kuat-core/variables.css";` — the `@theme` block in `variables.css` registers the token utilities |

**Why:** the JS preset predates the move to OKLCH color tokens. It wrapped tokens in `hsl(var(--token))`, which is invalid against OKLCH values and is silently dropped by the browser. Tailwind v4 also does not auto-load JS configs. The preset now references `var(--token)` directly so it still works for consumers loading it via Tailwind's `@config` directive, and stays exported for backward compatibility until the next major.

**Keep in sync (remove together when the export is dropped):**
- `@deprecated` JSDoc in `packages/kuat-core/tailwind.config.ts`
- README "Usage Patterns" / "Extending the Theme" / "API Reference" deprecation notes in `packages/kuat-core/README.md`
- this row

---

## Intentional mirrors (not deprecated)

| Path | Role |
|------|------|
| `external/kuat-agent-rules/` | Pinned upstream; edit via submodule bump |
| `packages/*/agent-docs/` | Generated consumer bundle — do not hand-edit |
| `kuat-docs/rules/scenarios/` | Kuat overlays (differ from upstream) |

---

## Related

- [setup/rules-source-of-truth.md](./setup/rules-source-of-truth.md)
- [kuat-agent-docs consumption architecture](https://github.com/equalexperts/kuat-agent-docs/blob/main/kuat-docs/setup/consumption-architecture.md)
