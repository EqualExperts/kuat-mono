# Kuat — consumer agent entry

Rules for this install live under `agent-docs/` in `@equal-experts/kuat-core`, `@equal-experts/kuat-react`, and `@equal-experts/kuat-vue`.

1. Run `ensure-rules.sh` from kuat-agent-docs skills (symlinked) — expect `RULES_SOURCE=package` when cwd has node_modules.
2. Load `agent-docs/rules/LOADING-consumer.md`.
3. Load component guides via `agent-docs/components.manifest.json`.
4. Skills: `kuat-review`, `kuat-create` from [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs).

**Version:** 0.13.0 · **Rules snapshot:** 07fc6874aff0
