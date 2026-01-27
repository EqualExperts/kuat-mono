# Kuat Design System - Agent Guidelines

## Project Structure

Monorepo with three packages:
- `@equal-experts/kuat-core` - CSS variables, Tailwind preset (foundation)
- `@equal-experts/kuat-react` - Custom React components and blocks
- `@equal-experts/kuat-vue` - Custom Vue components and blocks

## Architecture

Kuat is a **design decision layer**, not a full component library:
- **kuat-core**: Design tokens for any framework
- **kuat-react/vue**: Custom components (ButtonGroup) and blocks
- **shadcn**: Standard UI components installed directly by consumers

## Component Decision Priority

| Priority | Source | When to Use |
|----------|--------|-------------|
| 1 | Kuat Blocks | Pre-built compositions (header, footer, search) |
| 2 | Kuat Components | Custom components not in shadcn (ButtonGroup) |
| 3 | shadcn | Standard UI (Button, Dialog) - installed directly |
| 4 | Custom | Only when none of the above fit |

## Documentation (`kuat-docs/`)

| Task | Load |
|------|------|
| Project setup | `setup/consumer-setup.md` |
| Design decisions | `rules/design/{topic}.md` |
| Accessibility | `rules/accessibility/{area}.md` |
| Component patterns | `rules/components/patterns.md` |
| Scenario patterns | `rules/scenarios/{scenario}.md` |
| Content review | `rules/content/foundations.md` + specific guide below |
| Product/UX content | `rules/content/product-ux.md` |
| Marketing content | `rules/content/marketing-sales.md` |

### Scenario Files

| Scenario | Use For |
|----------|---------|
| `authentication.md` | Login, registration, password flows |
| `dashboards.md` | Analytics, data tables, metrics |
| `forms.md` | Settings, multi-step forms, data entry |
| `documentation.md` | Docs sites, knowledge bases |
| `marketing-pages.md` | Landing pages, pricing, features |

## Quick Reference

- **Colors:** EE Blue (#0066CC), Tech Blue, Transform Teal, Equal Ember
- **Fonts:** Lexend (sans), JetBrains Mono (mono), Lora (serif)
- **Spacing:** 8-point grid (4px base unit)
- **Border radius:** 0px static | 6px interactive | 4px inputs

## Import Patterns

```ts
// Design tokens (any framework)
import "@equal-experts/kuat-core/variables.css"

// Kuat custom components
import { ButtonGroup } from "@equal-experts/kuat-react"

// shadcn components (consumer's local installation)
import { Button } from "@/components/ui/button"
```

## For Consumer Projects

Guide consumers to:
1. Install `@equal-experts/kuat-core` for design tokens
2. Install shadcn components directly: `npx shadcn@latest add button`
3. Import Kuat custom components only when needed

## Contributing to Kuat

For adding components to Kuat packages:

1. Read `CONTRIBUTING.md` for high-level process and decision tree
2. Use shadcn MCP tools to verify component doesn't exist in shadcn
3. Follow framework guides in `contribution-docs/`:
   - `contribution-docs/react.md` - React implementation
   - `contribution-docs/vue.md` - Vue implementation

**Key rules:**
- Do NOT add shadcn components to Kuat packages
- Require Figma design before implementation
- Create both React and Vue versions
- Add documentation to `kuat-docs/` for new components

## Verification

- "Primary brand color?" → EE Blue (#0066CC)
- "Border radius for buttons?" → 6px
- "Where do Button components come from?" → shadcn (installed directly)
- "Review content guidelines?" → Load `rules/content/foundations.md` first
