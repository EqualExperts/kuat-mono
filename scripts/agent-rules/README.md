# Agent Rules Tooling

Deterministic sync and generation tools for agent entrypoint files.

Scope:
- These tools are for contributor/agent guidance inside this monorepo.
- Synced files under `external/kuat-agent-rules` are **not** part of published npm package payloads unless explicitly added to a package `files` field.

## Commands

- `pnpm agent-rules:sync:upstream` - syncs `EqualExperts/kuat-agent-rules` into `external/kuat-agent-rules` using `git subtree` (or a deterministic clone-and-copy fallback when subtree is unavailable)
- `pnpm agent-rules:generate` - regenerates `AGENTS.md` and `.cursorrules` from templates
- `pnpm agent-rules:check` - verifies generated files are up to date
- `pnpm agent-rules:sync` - sync upstream then regenerate local entrypoints

## Template files

- `templates/AGENTS.local.md` -> `AGENTS.md`
- `templates/cursorrules.local.md` -> `.cursorrules`

`CLAUDE.md` is expected to remain a symlink to `AGENTS.md` to avoid duplication drift.
