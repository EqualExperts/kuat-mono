# Release Script

Interactive shorthand release workflow for npm publishing.

## Commands

- `pnpm release` - interactive release (defaults to all packages)
- `pnpm release:package` - interactive single-package path

## Optional flags

- `--package all|core|react|vue`
- `--bump patch|minor|major|x.y.z`
- `--notes-file <path>`
- `--yes`
- `--dry-run`
- `--skip-lint`

## Examples

```bash
# Default interactive flow (all packages by default)
pnpm release

# Single package with prompts
pnpm release:package

# Non-interactive single-package dry run
pnpm release -- --package react --bump patch --yes --dry-run
```

## Behavior summary

- Preflight npm auth check (`npm whoami`); runs `npm login` early if needed
- Runs `pnpm build`
- Optionally runs `pnpm lint`
- Runs `npm pack` sanity checks for selected package(s)
- Updates selected package versions independently
- Prepends a release entry in root `CHANGELOG.md`
- Publishes selected package(s) with `npm publish --access public` (unless `--dry-run`)
