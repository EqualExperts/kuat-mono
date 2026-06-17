# Kuat monorepo — agent entry (library contributors)

## Load order

1. **Upstream:** `external/kuat-agent-rules` (or `KUAT_RULES_PATH` → `kuat-agent-docs` clone) — [reference/](external/kuat-agent-rules/reference/README.md)
2. **Overlay:** `kuat-docs/` — layout primitives, scenarios, component guides (`KUAT_RULES_OVERLAY_PATH`)
3. **Skills:** Symlink `kuat-review` / `kuat-create` from agent-docs repo — [skills/INSTALL.md](https://github.com/equalexperts/kuat-agent-docs/blob/main/skills/INSTALL.md)

```bash
export KUAT_RULES_OVERLAY_PATH="$(pwd)/kuat-docs"
./external/kuat-agent-rules/skills/scripts/ensure-rules.sh
# Expect RULES_SOURCE=git, OVERLAY_DIR set
```

## npm consumers (applications)

Published rules ship in `agent-docs/` inside `@equal-experts/kuat-core`, `@equal-experts/kuat-react`, and `@equal-experts/kuat-vue`. Entry: `agent-docs/AGENTS.md`.

Regenerate bundles: `node scripts/agent-docs/bundle-for-core.mjs`

## Architecture

- [kuat-docs/setup/rules-source-of-truth.md](kuat-docs/setup/rules-source-of-truth.md)
- [kuat-agent-docs consumption architecture](https://github.com/equalexperts/kuat-agent-docs/blob/main/kuat-docs/setup/consumption-architecture.md)
- [kuat-docs/DEPRECATIONS.md](kuat-docs/DEPRECATIONS.md)

## Conflict policy

Design/content intent → upstream. Implementation/API/component usage → mono overlay + package component docs.
