# Integration Guide

How to integrate the Kuat Design System documentation into your tools, IDEs, and agent pipelines.

> **Note for npm consumers:** These paths refer to the [kuat-mono repository](https://github.com/equal-experts/kuat-mono). If you installed `@equal-experts/kuat-react` or `@equal-experts/kuat-vue` via npm, clone the docs separately using the instructions in the package README.

---

## Overview

The design rules are structured for maximum flexibility:

- **`rules/`** - Pure design language (technology-agnostic, no code)
- **`examples/`** - Framework-specific code examples
- **`setup/`** - Integration and verification guides

**Load only what you need** for optimal context usage.

---

## Directory Structure

```
kuat-docs/
├── rules/                 # Pure design language
│   ├── design/            # Visual design rules
│   ├── content/           # Content writing rules
│   └── components/        # Component patterns
├── examples/              # Code examples
│   ├── react/             # React/JSX
│   ├── vue/               # Vue SFC
│   └── css/               # Vanilla CSS
└── setup/                 # This directory
```

---

## Context Loading Strategies

### Minimal (Rules Only)

**Best for:** Design reviews, content writing, general guidance

**Load:** `kuat-docs/rules/` directory only (~1500 lines)

**What you get:**
- All design specifications
- Content guidelines
- Component patterns
- No framework-specific code

### Framework-Specific

**Best for:** Development tasks in a specific framework

**Load:** `rules/` + `examples/{framework}/`

| Framework | Additional Load |
|-----------|-----------------|
| React | `examples/react/` (~800 lines) |
| Vue | `examples/vue/` (~800 lines) |
| CSS | `examples/css/` (~400 lines) |

### Task-Specific

**Best for:** Focused tasks

| Task | Load |
|------|------|
| Color decisions | `rules/design/colours.md` |
| Typography | `rules/design/typography.md` |
| Layout decisions | `rules/design/layouts.md` |
| Content writing | `rules/content/` |
| Component creation | `rules/components/` + `examples/{framework}/components.md` |

---

## Integration Patterns

### Cursor IDE

**Option 1: Project Rules (.cursorrules)**

Add to your `.cursorrules` file:

```
# Kuat Design System

When working on UI, follow the design rules in kuat-docs/rules/

Key principles:
- Use semantic color tokens (bg-primary, text-foreground)
- Follow 8-point spacing grid (p-4, p-6, gap-4)
- Border radius: 0px static, 6px interactive, 4px inputs
- Use Lexend font for UI, JetBrains Mono for code
```

**Option 2: Include Documentation**

Reference specific files in your rules:

```
When creating components, reference:
- kuat-docs/rules/design/colours.md
- kuat-docs/rules/design/spacing.md
- kuat-docs/rules/components/patterns.md
```

### GitHub Copilot

**Workspace Instructions**

Create `.github/copilot-instructions.md`:

```markdown
# Design System Instructions

This project uses the Kuat Design System. Reference documentation in kuat-docs/rules/.

Key design tokens:
- Colors: Use semantic tokens (primary, secondary, background, foreground)
- Spacing: 8-point grid (4px base unit)
- Typography: Lexend (sans), JetBrains Mono (mono)
- Border radius: 0px default, 6px interactive, 4px inputs
```

### Claude Projects

**Knowledge Base Upload**

Upload these files to your Claude Project knowledge base:

**Essential (for design tasks):**
- `kuat-docs/rules/design/` (all files)
- `kuat-docs/rules/components/patterns.md`

**For content tasks:**
- `kuat-docs/rules/content/` (all files)

**For development:**
- Add `kuat-docs/examples/{framework}/` as needed

### Custom Agents / API

**Context Injection Pattern**

```python
def get_design_context(task_type: str, framework: str = None) -> str:
    """Load appropriate design context for a task."""
    
    base_path = "kuat-docs/"
    files = []
    
    # Always load relevant rules
    if task_type == "design":
        files.extend([
            f"{base_path}rules/design/colours.md",
            f"{base_path}rules/design/typography.md",
            f"{base_path}rules/design/spacing.md",
            f"{base_path}rules/design/borders.md",
        ])
    elif task_type == "content":
        files.extend([
            f"{base_path}rules/content/foundations.md",
        ])
    elif task_type == "component":
        files.extend([
            f"{base_path}rules/components/patterns.md",
        ])
    
    # Add framework examples if specified
    if framework:
        files.append(f"{base_path}examples/{framework}/")
    
    return load_files(files)
```

### CLI Tools

**Context File Generation**

Create a script to bundle docs for your use case:

```bash
#!/bin/bash
# generate-context.sh

OUTPUT="design-context.md"

echo "# Kuat Design System Context" > $OUTPUT
echo "" >> $OUTPUT

# Add rules
for file in kuat-docs/rules/design/*.md; do
  echo "## $(basename $file)" >> $OUTPUT
  cat "$file" >> $OUTPUT
  echo "" >> $OUTPUT
done

echo "Context generated: $OUTPUT"
```

---

## Selective Loading

### By Task Type

| Task | Required Files |
|------|----------------|
| UI Design | `rules/design/` |
| Component Creation | `rules/design/` + `rules/components/` + `examples/{framework}/` |
| Content Writing | `rules/content/` |
| Layout Design | `rules/design/layouts.md` + `examples/{framework}/layouts.md` |
| Color Decisions | `rules/design/colours.md` |
| Typography | `rules/design/typography.md` |

### By Audience

| Audience | Files |
|----------|-------|
| Developers | `rules/design/` + `rules/components/` + `examples/` |
| Designers | `rules/design/` |
| Content Writers | `rules/content/` |
| Full-stack | All files |

---

## Context Size Optimization

### File Sizes (Approximate)

| Directory | Lines | Tokens (~) |
|-----------|-------|------------|
| `rules/design/` | 900 | 7,000 |
| `rules/content/` | 500 | 4,000 |
| `rules/components/` | 200 | 1,500 |
| `examples/react/` | 800 | 6,000 |
| `examples/vue/` | 800 | 6,000 |
| `examples/css/` | 400 | 3,000 |

### Optimization Tips

1. **Load rules, not examples** - Rules contain the essential information
2. **Load task-specific files** - Don't load typography when working on layouts
3. **Use examples as reference** - Load examples only when generating code
4. **Chunk large files** - If context is limited, load sections

---

## Keeping Updated

### Sync Strategy

1. **Pin to version** - Reference a specific release tag
2. **Regular sync** - Pull latest docs periodically
3. **Watch for changes** - Monitor changelog for breaking changes

### Version Compatibility

These docs are designed for:
- `@equal-experts/kuat-core` >= 0.3.0
- `@equal-experts/kuat-react` >= 0.1.0
- `@equal-experts/kuat-vue` >= 0.1.0

---

## Troubleshooting

### Context Too Large

**Solution:** Load only the files relevant to your current task

### Agent Not Following Rules

**Solution:**
1. Verify files are loaded correctly
2. Add explicit instructions referencing specific rules
3. Use verification prompts (see [verification.md](./verification.md))

### Outdated Information

**Solution:**
1. Check you're using the latest docs
2. Verify package versions match doc requirements
3. Report issues to the design system team

---

## Related Documentation

- [Verification Guide](./verification.md) - Test your setup
- [Rules](../rules/) - Design language documentation
- [Examples](../examples/) - Framework-specific code
