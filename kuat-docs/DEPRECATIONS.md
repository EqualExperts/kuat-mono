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
