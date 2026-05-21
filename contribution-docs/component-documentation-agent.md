# Component documentation agent (contributors)

Maintain consumer-facing component guides under `kuat-docs/components/`.

## Targets

- One shared markdown per public component (`button.md`, `button-group.md`, …)
- Register IDs in `kuat-docs/components/components.manifest.json` (align with upstream [component-registry](https://github.com/equalexperts/kuat-agent-docs/blob/main/kuat-docs/rules/types/web/product/component-registry.md))
- Use [kuat-docs/rules/components/documentation-template.md](../kuat-docs/rules/components/documentation-template.md)

## Sources of truth

Storybook stories, package exports, tests — not invented APIs.

## Publish path

`node scripts/agent-docs/bundle-for-core.mjs` copies guides into `packages/*/agent-docs/components/`.

## Related

- [.cursor/agents/kuat-documentation.md](../.cursor/agents/kuat-documentation.md) (if present)
- [kuat-docs/DEPRECATIONS.md](../kuat-docs/DEPRECATIONS.md)
