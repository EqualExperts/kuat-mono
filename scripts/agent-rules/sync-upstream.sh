#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${1:-https://github.com/EqualExperts/kuat-agent-rules.git}"
BRANCH="${2:-main}"
PREFIX="${3:-external/kuat-agent-rules}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This script must be run inside a git repository." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean; continuing sync anyway." >&2
fi

if git subtree --help >/dev/null 2>&1; then
  echo "Using git subtree sync strategy..."
  if git ls-tree -d --name-only HEAD "$PREFIX" | rg -q "^${PREFIX}$"; then
    echo "Pulling latest upstream rules into ${PREFIX}..."
    git subtree pull --prefix="$PREFIX" "$REPO_URL" "$BRANCH" --squash
  else
    echo "Adding upstream rules into ${PREFIX}..."
    git subtree add --prefix="$PREFIX" "$REPO_URL" "$BRANCH" --squash
  fi
else
  echo "git subtree is unavailable; using clone-and-copy fallback strategy..."

  tmp_dir="$(mktemp -d)"
  trap 'rm -rf "$tmp_dir"' EXIT

  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$tmp_dir/repo"

  mkdir -p "$(dirname "$PREFIX")"
  rm -rf "$PREFIX"

  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete --exclude ".git" "$tmp_dir/repo/" "$PREFIX/"
  else
    mkdir -p "$PREFIX"
    cp -R "$tmp_dir/repo/." "$PREFIX/"
    rm -rf "$PREFIX/.git"
  fi
fi

echo "Upstream rules synced to ${PREFIX}."

echo "Checking published docs bundle for @equal-experts/kuat-core..."
node ./scripts/agent-docs/bundle-for-core.mjs

bundle_status="$(git status --porcelain -- packages/kuat-core/agent-docs)"
if [[ -n "$bundle_status" ]]; then
  echo "Published docs bundle has updates. Review add/remove/update below:"
  echo "$bundle_status"

  added_files="$(printf "%s\n" "$bundle_status" | rg '^\?\? ' || true)"
  removed_files="$(printf "%s\n" "$bundle_status" | rg '^[ MARC][D] ' || true)"

  if [[ -n "$added_files" ]]; then
    echo ""
    echo "Files to add:"
    echo "$added_files"
  fi

  if [[ -n "$removed_files" ]]; then
    echo ""
    echo "Files to remove:"
    echo "$removed_files"
  fi
else
  echo "Published docs bundle is up to date (no add/remove changes)."
fi
