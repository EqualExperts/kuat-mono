# Integration Guide

How to integrate the Kuat Design System documentation into your AI agent or IDE.

> **Note for npm consumers:** Consumer agent docs are bundled in `@equal-experts/kuat-core` under `agent-docs/`. You can load them directly from `node_modules` without cloning this repository.

---

## Quick Start: Add to Your Existing Rules

Most developers already have `.cursorrules`, `CLAUDE.md`, or similar agent configuration. **Copy this snippet** into your existing file:

```markdown
## Kuat Design System

This project uses the Kuat Design System for all UI work.

**What it provides:**
Design tokens, component patterns, layout guidance, and content guidelines for building consistent, accessible interfaces.

**When to use it:**
You MUST reference the Kuat documentation when:
- Creating or modifying UI components
- Making color, typography, spacing, or layout decisions
- Writing user-facing content

**How to use it:**
1. Check the documentation before making design decisions
2. Follow existing patterns; do not invent new ones
3. If the documentation doesn't cover your case, ask before proceeding

## Kuat UI Component Selection Rules
Before any UI implementation:
1. Load bundled rules entrypoints from `@equal-experts/kuat-core`:
   - `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/README.md`
   - `node_modules/@equal-experts/kuat-core/agent-docs/external/kuat-agent-rules/kuat-docs/rules/LOADING.md`
2. Ensure decisions reference both bundled Equal Experts foundations and web rules (`.../external/kuat-agent-rules/.../foundations/*` and `.../types/web/*`).
3. Read `kuat-docs/setup/choosing-components.md`.
4. Select component sources in this order:
   - Kuat blocks
   - Kuat components (`@equal-experts/kuat-react` / `@equal-experts/kuat-vue`)
   - shadcn / shadcn-vue components for gaps
   - custom build (last resort)
5. Verify package exports before implementation.
6. In implementation notes or PR description, record:
   - chosen component source
   - why higher-priority options were not used (if applicable)

Failure conditions:
- custom implementation created when a Kuat equivalent exists
- shadcn chosen when Kuat already provides the capability
- no recorded decision path

**Documentation index** (single entry point in installed package):
- `node_modules/@equal-experts/kuat-core/agent-docs/README.md` - bundled entrypoint
- `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/README.md` - EE canonical paths + Kuat implementation
- `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/design/layouts.md` - Kuat layout primitives
- Optional (repo docs): `rules/components/patterns.md`, `examples/react/`, `examples/vue/`

**Quick reference (when docs unavailable):**
Semantic tokens only (`bg-primary` not `bg-blue-500`), 8-point spacing grid, 6px radius for interactive elements, WCAG AA contrast.

**Documentation:** https://github.com/equalexperts/kuat-mono/tree/master/kuat-docs
```

This tells your agent **when** to use the design system and **how** to behave when making UI decisions.

### Non-agent fallback

If your team does not use `AGENTS.md`, copy the same snippet into `.cursorrules` (or your IDE-equivalent rules file) and add this PR checklist item:

- [ ] Component source documented (Kuat block/component, shadcn gap, or custom with justification)

---

## Alternative: Generation Prompt

If you prefer your agent to customize the integration, use this prompt:

```
I'm using the Kuat Design System. Add a section to my agent rules that:
- Defines when the agent must reference Kuat documentation
- Specifies behavioral expectations (check docs first, follow patterns)
- Includes a fallback reference for when docs are unavailable
- Links to the full documentation

Reference: https://github.com/equalexperts/kuat-mono/tree/master/kuat-docs

**Documentation index** (same bundle model as above):
- `node_modules/@equal-experts/kuat-core/agent-docs/README.md` - bundled entrypoint
- `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/README.md` - EE canonical paths + Kuat implementation
- `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/design/layouts.md` - Kuat layout primitives
- Optional (repo docs): `rules/components/patterns.md` and `examples/{react|vue|css}/`
```

---

## For Deeper Integration

If you need the agent to reference foundations and scenarios with zero repo-clone step, install `@equal-experts/kuat-core` and point your agent at the bundled docs path:

```bash
pnpm add @equal-experts/kuat-core
```

Then update your rules snippet to reference installed-package files:

```markdown
## Kuat Design System

When working on UI, load:
- `node_modules/@equal-experts/kuat-core/agent-docs/README.md`
- `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/design/layouts.md`

Then follow links in the bundle for foundations, product, and marketing scenarios.
```

---

## Directory Structure

```
kuat-docs/
├── rules/                 # Pure design language (no code)
│   ├── design/            # Colors, typography, spacing, borders, layouts
│   ├── content/           # Voice, tone, marketing, UX writing
│   └── components/        # Naming, variants, accessibility patterns
├── examples/              # Framework-specific code
│   ├── react/             # React/JSX examples
│   ├── vue/               # Vue SFC examples
│   └── css/               # Vanilla CSS examples
└── setup/                 # Integration guides (this directory)
```

---

## Context Loading Strategies

### Minimal (Snippet Only)

**Best for:** Most projects

Use the snippet above. Your agent has the key values and can reference the GitHub docs when needed.

### Standard (Local Rules)

**Best for:** Heavy design system usage

Clone `kuat-docs/` and `external/kuat-agent-rules/` from the monorepo so [`rules/README.md`](../rules/README.md) links resolve. The index is one file; follow links into the vendored EE rules as needed.

### Full (Rules + Examples)

**Best for:** Component development

Clone `kuat-docs/` and load `rules/` + `examples/{framework}/` (~2500 lines).

### Task-Specific Loading

| Task | Load |
|------|------|
| Colour / typography / spacing / borders / logo / content voice | `node_modules/@equal-experts/kuat-core/agent-docs/README.md` then follow bundled links |
| Layout design | `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/design/layouts.md` + bundle README |
| Content writing | bundle README + bundled product/marketing content docs |
| Component creation | Use bundled docs for layout/content decisions; add repo docs (`rules/components/patterns.md` + `examples/{framework}/components.md`) if needed |

---

## IDE-Specific Instructions

### Cursor IDE

Add the snippet to your `.cursorrules` file in the project root.

### Claude Code / CLAUDE.md

Add the snippet to your `CLAUDE.md` file in the project root.

### GitHub Copilot

Add the snippet to `.github/copilot-instructions.md`.

### Claude Projects

Upload the snippet as a knowledge file, or upload specific rule files from `kuat-docs/rules/`.

### Windsurf / Other IDEs

Add the snippet to your IDE's agent configuration file.

---

## Advanced: Custom Agents / API

For programmatic access:

```python
def get_kuat_context(task: str, framework: str = None) -> str:
    """Load Kuat design context for a task."""
    base = "kuat-docs/"
    files = {
        "design": [
            "node_modules/@equal-experts/kuat-core/agent-docs/README.md",
            "node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/design/layouts.md"
        ],
        "content": ["node_modules/@equal-experts/kuat-core/agent-docs/README.md"],
        "component": ["rules/components/patterns.md"],
    }
    result = [load(f"{base}{f}") for f in files.get(task, [])]
    if framework:
        result.append(load(f"{base}examples/{framework}/"))
    return "\n".join(result)
```

---

## Context Size Reference

| What | Lines | Tokens (~) |
|------|-------|------------|
| Snippet only | 15 | 150 |
| `node_modules/@equal-experts/kuat-core/agent-docs/README.md` | varies | varies |
| `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/design/layouts.md` | 400 | 3,000 |
| `rules/components/` | 200 | 1,500 |
| `examples/{framework}/` | 800 | 6,000 |

**Tip:** Start with the snippet. Only clone full docs if your agent needs detailed component patterns or content guidelines.

---

## Verification

Test your setup with these prompts:

- "Create a card component" → Agent should reference Kuat docs
- "What color for the primary button?" → Agent should check docs or use semantic tokens
- "Add spacing between form fields" → Agent should reference spacing rules
- "Fix this JavaScript bug" → Agent should NOT invoke Kuat rules (not UI work)

See [verification.md](./verification.md) for comprehensive tests.

---

## Troubleshooting

**Agent not following rules?**
1. Verify snippet is in the correct config file for your IDE
2. Test with verification prompts above
3. For detailed rules, clone docs locally

**Need more detail?**
Load `node_modules/@equal-experts/kuat-core/agent-docs/README.md` and follow links inside that bundle.

---

## Related

- [Verification Guide](./verification.md) - Full test suite
- [Rules](../rules/) - Design specifications
- [Examples](../examples/) - Code examples
