# Rules Source of Truth

Defines where agents and humans should get guidance when similar topics exist in both local `kuat-docs` and synced upstream rules.

## Audience split

- **Contributor context (inside `kuat-mono`)**: use local implementation and contribution guidance.
- **Consumer context (apps using Kuat)**: use published package docs and upstream foundations for generic design/content guidance.

## Duplication audit outcome

| Topic | Upstream canonical | Local canonical | Decision |
|---|---|---|---|
| Brand/design/content foundations | `external/kuat-agent-rules/kuat-docs/rules/foundations/**` | [`kuat-docs/rules/README.md`](../rules/README.md) | Upstream is canonical. This repo uses one index file plus `external/` links; no per-topic stubs under `rules/design/` or `rules/content/` except README pointers. |
| Web marketing/product design/content scenarios | `external/kuat-agent-rules/kuat-docs/rules/types/web/**` | `kuat-docs/rules/scenarios/**` | Keep local scenarios only when they add Kuat-specific implementation context; otherwise reference upstream task loading. |
| Component implementation patterns | Not authoritative for this monorepo | `kuat-docs/rules/components/**`, `contribution-docs/**`, `.cursor/agents/**` | Local is canonical. |
| Agent load order and conflict policy | `external/kuat-agent-rules/kuat-docs/rules/LOADING.md` | `AGENTS.md` (generated from template) | Use both: upstream first, local overlay second. |

## Authoring policy

When editing local rules:

1. If guidance is generic EE design/content doctrine, update upstream first and reference upstream here.
2. If guidance is specific to Kuat package implementation, keep it local.
3. If a local file repeats upstream content without Kuat-specific value, replace repeated sections with a short pointer.

## Reference links

- Upstream loading index: `external/kuat-agent-rules/kuat-docs/rules/LOADING.md`
- Upstream rules index: `external/kuat-agent-rules/kuat-docs/rules/README.md`
- Local canonical agent rules: `AGENTS.md`
