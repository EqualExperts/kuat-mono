# Kuat consumer rules (bundled)

**Package:** @equal-experts/kuat-core (and mirrored in kuat-react / kuat-vue agent-docs)

**Snapshot:** d5faaaa02f5b

## Default load (web product / marketing UI)

1. `external/kuat-agent-rules/reference/` foundations — `brand/`, `design-language/`, `content/`, `accessibility/`
2. `external/kuat-agent-rules/reference/media-types/web-product/` — core files + patterns + content (examples excluded)
3. `external/kuat-agent-rules/reference/media-types/web-marketing/`
4. `kuat-docs/rules/design/layouts.md` — Kuat layout primitives
5. `kuat-docs/rules/scenarios/` — Kuat scenario overlays
6. Component guides on demand: `components/{slug}.md` via `components.manifest.json`

## Component IDs

Resolve `shadcn:button`, `kuat:button-group`, etc. using `components/components.manifest.json`.

## Full org taxonomy

Set `KUAT_RULES_PATH` to a `kuat-agent-docs` git clone for slides, graphics, and latest upstream.

## Related

- [README.md](../README.md)
- Upstream reference index [reference/README.md](../external/kuat-agent-rules/reference/README.md)
