# Migration Log

Dated record of design-system migration work in kuat-mono.

## 2026-06-16 — Phase 1b: `reference/` path sync-update

- Branched `migration/phase-1b-reference-paths` off `master`.
- Authored `docs/migration/` scaffolding (this log, `phase-1b-reference-paths.md` plan,
  `EXECUTION-REPORT-TEMPLATE.md`, `report-phase-1b.md`).
- Confirmed upstream Phase-1 layout already vendored in `external/kuat-agent-rules/`
  (`reference/` + `_to-skills/`; old `kuat-docs/rules/` reduced to redirect tombstones).
  Decision: do NOT re-run `sync-upstream.sh` — build/test against the vendored tree.
- Remapped bundler source (`core-bundle.manifest.json`, `bundle-for-core.mjs`) and overlay/agent
  docs from `…/kuat-docs/rules/…` to `…/reference/…` per `reference/MIGRATION-MAP.md`.
- Regenerated `packages/{kuat-core,kuat-react,kuat-vue}/agent-docs/`.
- Verification + flags recorded in `report-phase-1b.md`.
