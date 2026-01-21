# Kuat Design System - Agent Documentation

Technology-agnostic design language documentation optimized for AI agents and LLMs.

---

## Quick Start

**For design rules only (recommended):**
Load `rules/` directory

**For framework examples:**
Also load `examples/react/` or `examples/vue/`

**For setup/integration:**
See `setup/integration.md`

---

## Documentation Structure

### Rules (Pure Design Language - No Code)

Technology-agnostic design specifications:

| Directory | Description |
|-----------|-------------|
| [rules/design/](./rules/design/) | Colors, typography, spacing, borders, layouts, logo |
| [rules/content/](./rules/content/) | Voice, tone, marketing, UX writing |
| [rules/components/](./rules/components/) | Naming, variants, accessibility patterns |

**Key files:**
- `rules/design/colours.md` - Brand colors and semantic tokens
- `rules/design/typography.md` - Fonts and type scale
- `rules/design/spacing.md` - 8-point grid system
- `rules/design/borders.md` - Border philosophy and radius
- `rules/design/layouts.md` - Page layouts and navigation
- `rules/design/logo.md` - Logo usage guidelines
- `rules/content/foundations.md` - Universal content principles
- `rules/components/patterns.md` - Component development rules

### Examples (Framework-Specific Code)

Implementation code for specific frameworks:

| Directory | Description |
|-----------|-------------|
| [examples/react/](./examples/react/) | React/JSX implementation examples |
| [examples/vue/](./examples/vue/) | Vue SFC implementation examples |
| [examples/css/](./examples/css/) | Vanilla CSS examples |

### Setup (Integration Guides)

How to integrate into your environment:

| File | Description |
|------|-------------|
| [setup/integration.md](./setup/integration.md) | Integration patterns for IDEs and agents |
| [setup/verification.md](./setup/verification.md) | Testing your setup |
| [setup/kuat-core-integration.md](./setup/kuat-core-integration.md) | Framework setup code |

---

## For AI Agents

### Context Loading Strategies

**Minimal (design decisions):**
```
Load: rules/design/{topic}.md
Size: ~150 lines per file
```

**Standard (design + examples):**
```
Load: rules/ + examples/{framework}/
Size: ~2000 lines total
```

**Full context:**
```
Load: docs/agent/
Size: ~4000 lines total
```

### Task-Based Loading

| Task | Load |
|------|------|
| Color decisions | `rules/design/colours.md` |
| Typography | `rules/design/typography.md` |
| Layout creation | `rules/design/layouts.md` + `examples/{framework}/layouts.md` |
| Component creation | `rules/components/patterns.md` + `examples/{framework}/components.md` |
| Content writing | `rules/content/` |

### Verification Prompts

Test your setup with these prompts:

- "What is the primary brand color?" → EE Blue (#0066CC)
- "What border radius for a button?" → 6px
- "What font for code?" → JetBrains Mono
- "What spacing between form fields?" → space-y-4 (16px)

---

## Quick Reference

### Brand Colors

| Color | Value | Usage |
|-------|-------|-------|
| EE Blue | `#0066CC` | Primary actions, brand |
| Transform Teal | `oklch(0.645 0.120 185.0)` | Secondary actions |
| Tech Blue | `oklch(0.435 0.090 240.0)` | Sidebar, navigation |
| Equal Ember | `oklch(0.625 0.200 65.0)` | Warnings, highlights |

### Typography

| Element | Specification |
|---------|---------------|
| Sans | Lexend (`font-sans`) |
| Mono | JetBrains Mono (`font-mono`) |
| Serif | Lora (`font-serif`) |

### Spacing

4px base unit (0.25rem). Use scale: 4, 8, 12, 16, 24, 32, 48px.

### Border Radius

| Element | Radius |
|---------|--------|
| Static content | 0px |
| Interactive (buttons) | 6px |
| Form inputs | 4px |

---

## Package Reference

| Package | Description |
|---------|-------------|
| `@equal-experts/kuat-core` | CSS variables and Tailwind preset |
| `@equal-experts/kuat-react` | React components |
| `@equal-experts/kuat-vue` | Vue components |

---

## Related Documentation

- [Setup Guide](./setup/integration.md) - Integration instructions
- [Verification Guide](./setup/verification.md) - Test your setup
- [Rules](./rules/) - Design language documentation
- [Examples](./examples/) - Framework-specific code
