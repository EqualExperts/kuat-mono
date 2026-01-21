# Kuat Design System

Equal Experts' design system for building consistent, accessible, and brand-aligned digital experiences.

## What is Kuat?

Kuat provides descriptive design language, design tokens, component, patterns, and content guidelines. Using these ensure visual and behavioral consistency across any web-based experiences. Kuat includes React and Vue framework packages

## Design Principles

When making decisions, apply these principles in order:

1. **Accessibility first** - WCAG AA minimum, keyboard navigable, screen reader compatible
2. **Consistency over creativity** - Use existing tokens and patterns before creating new ones
3. **Semantic over literal** - Use `bg-primary` not `bg-blue-500`; meaning over appearance
4. **Progressive enhancement** - Core functionality works without JS; enhance with interactivity
5. **Content-driven** - Design serves content; never decorate at the expense of clarity

## Decision Framework

| Question | Answer |
|----------|--------|
| Should I create a custom color? | No. Use semantic tokens (`primary`, `secondary`, `accent`) |
| Which border radius? | 0px static, 6px interactive, 4px inputs |
| How much spacing? | Use 8-point grid (multiples of 4px) |
| Which font? | Lexend (UI), JetBrains Mono (code), Lora (editorial) |
| Custom component or existing? | Check shadcn/ui first, then extend |

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

### Quick Setup: Add to Your Existing Rules

Most developers already have `.cursorrules`, `CLAUDE.md`, or similar agent configuration. **Copy this snippet** into your existing file:

```markdown
## Kuat Design System

This project uses the Kuat Design System. When working on UI:

**Design tokens:**
- Primary: EE Blue (#0066CC), Secondary: Transform Teal, Accent: Equal Ember
- Fonts: Lexend (UI), JetBrains Mono (code), Lora (editorial)
- Spacing: 8-point grid (4px base unit)
- Border radius: 0px static | 6px interactive | 4px inputs

**Principles (in priority order):**
1. Accessibility first (WCAG AA minimum)
2. Use semantic tokens (`bg-primary` not `bg-blue-500`)
3. Check shadcn/ui before creating custom components

**Full docs:** https://github.com/equal-experts/kuat-mono/tree/main/kuat-docs
```

### Alternative: Generation Prompt

If you prefer your agent to customize the integration:

```
I'm using the Kuat Design System. Add a section to my agent rules that includes
key design tokens, core principles, and a link to the full documentation.
Reference: https://github.com/equal-experts/kuat-mono/tree/main/kuat-docs
```

### Need More Detail?

For full documentation (component patterns, layouts, content guidelines), clone locally:

```bash
git clone --filter=blob:none --sparse https://github.com/equal-experts/kuat-mono.git
cd kuat-mono && git sparse-checkout set kuat-docs
cp -r kuat-docs /path/to/your-project/
```

Then add to your rules: `When working on UI, follow rules in kuat-docs/rules/`

### Context Loading Strategies

| Level | What | Size |
|-------|------|------|
| Minimal | Snippet above | ~15 lines |
| Standard | `rules/` directory | ~1500 lines |
| Full | `rules/` + `examples/{framework}/` | ~2500 lines |

### Verification Prompts

Test your setup:

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

## For Application Developers

Using the Kuat Design System in your application:

- **React Applications**: See [@equal-experts/kuat-react README](../packages/kuat-react/README.md)
- **Vue Applications**: See [@equal-experts/kuat-vue README](../packages/kuat-vue/README.md)
- **Any Framework**: See [kuat-core-integration.md](./setup/kuat-core-integration.md)

---

## For Contributors

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Development workflow
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - Monorepo architecture

### Quick Start

```bash
git clone <repository-url>
cd kuat-mono
pnpm install

# Start Storybook
pnpm --filter storybook-react dev  # React on :6006
pnpm --filter storybook-vue dev    # Vue on :6007
```

---

## For Maintainers

- **[PUBLISHING.md](../PUBLISHING.md)** - npm publishing guide

---

## Related Documentation

- [Setup Guide](./setup/integration.md) - Integration instructions
- [Verification Guide](./setup/verification.md) - Test your setup
- [Rules](./rules/) - Design language documentation
- [Examples](./examples/) - Framework-specific code
