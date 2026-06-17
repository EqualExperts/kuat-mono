# kuat-mono overlay loading index

Load **after** the upstream `external/kuat-agent-rules/reference/` library (see its [README](../external/kuat-agent-rules/reference/README.md)).

---

## Contributor (this repo)

| Path | When |
|------|------|
| `kuat-docs/rules/design/layouts.md` | Layout primitives |
| `kuat-docs/rules/scenarios/` | Kuat-flavoured scenario overlays |
| `kuat-docs/rules/components/` | Patterns, templates (authoring) |
| `kuat-docs/components/{slug}.md` | Per-component usage (on demand via manifest) |
| `contribution-docs/` | Maintainer workflow — not for npm bundle |

## Component manifest

`kuat-docs/components/components.manifest.json` — published to `agent-docs/components.manifest.json` on bundle.

## Consumer (npm)

See `packages/kuat-core/agent-docs/rules/LOADING-consumer.md` (generated).

---

## Related

- [DEPRECATIONS.md](./DEPRECATIONS.md)
- [setup/rules-source-of-truth.md](./setup/rules-source-of-truth.md)
