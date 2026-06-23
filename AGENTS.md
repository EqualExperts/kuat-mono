# Kuat monorepo — agent entry (library contributors)

## Load order

1. **Upstream:** `external/kuat-agent-rules` (or `KUAT_RULES_PATH` → `kuat-agent-docs` clone) — passive reference library at [reference/README.md](external/kuat-agent-rules/reference/README.md)
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

## Contributing

How to propose, build, review, and release changes to Kuat — the hybrid model, the four sizes (Fix/Light/Medium/Heavy), and a per-surface "Proposing a…" page for each contributor skill + gate — starts at this repo's [CONTRIBUTING.md](CONTRIBUTING.md) (front door; component + token focus) and the canonical [contribute/overview.md](https://github.com/EqualExperts/kuat-agent-rules/blob/main/contribute/overview.md) in kuat-agent-rules (full model). The `contribute/` docs are governance/how-to and sit **outside** the passive `reference/` library, so they are never bundled into a consumer plugin. In this repo the component path is the [`add-kuat-component`](.claude/skills/add-kuat-component/SKILL.md) skill and the downstream token path is [`generate-tokens`](.claude/skills/generate-tokens/SKILL.md).

---

## Design-system migration (active)

We are migrating the upstream rules from `kuat-docs/rules/` to a `reference/` layout (reference guidelines + activity skills + Enterprise plugin). This repo's job in that migration is **Phase 1b**: update everything that consumes the upstream rules to the new paths, **in lockstep with the kuat-agent-rules Phase 1 PR**. Run it with `/kuat-phase 1b`. Plan: `docs/migration/phase-1b-sync-update.md`.

### What this repo must keep working
- `pnpm agent-rules:sync` + `pnpm agent-rules:generate` (and `:check`) against the new `reference/` layout.
- `scripts/agent-docs/bundle-for-core.mjs` producing package `agent-docs/` snapshots with no dangling old `rules/` paths.
- All three packages (`@equal-experts/kuat-core|react|vue`) building; component docs resolving via the registry.

### Conventions
- Branch `migration/phase-1b-reference-paths`; one PR; merge **together** with the upstream Phase 1 PR.
- Use the upstream `reference/MIGRATION-MAP.md` as the authoritative old→new path lookup.
- Keep a dated `docs/migration/LOG.md`; end with `docs/migration/report-phase-1b.md` from the template.
- Plan mode before edits.

### Conflict policy (unchanged)
Design/content intent → upstream `reference/`. Implementation/API/component usage → this repo's overlay + package component docs.
