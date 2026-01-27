# Kuat Design System Rules

Pure design language documentation - technology-agnostic rules for building consistent user interfaces and content.

---

## Quick Navigation

| Category | Description | Key Files |
|----------|-------------|-----------|
| [Design](./design/) | Visual design rules | colours, typography, spacing, borders, layouts, logo |
| [Accessibility](./accessibility/) | WCAG 2.2 AA requirements | design, content, technical |
| [Content](./content/) | Content writing rules | voice, tone, marketing, UX writing |
| [Components](./components/) | Component pattern rules | naming, variants, accessibility |
| [Scenarios](./scenarios/) | Applied layout patterns | authentication, dashboards, forms, docs, marketing |

---

## How to Use These Rules

**These files contain design principles and specifications only - no code examples.**

For implementation code, see:
- [examples/react/](../examples/react/) - React/JSX examples
- [examples/vue/](../examples/vue/) - Vue SFC examples
- [examples/css/](../examples/css/) - Vanilla CSS examples

---

## Design Rules

Visual design specifications for the Kuat Design System:

- **[colours.md](./design/colours.md)** - Brand colors, semantic tokens, accessibility
- **[typography.md](./design/typography.md)** - Fonts, type scale, hierarchy
- **[spacing.md](./design/spacing.md)** - 8-point grid, spacing scale, patterns
- **[borders.md](./design/borders.md)** - Border philosophy, radius, colors
- **[logo.md](./design/logo.md)** - Logo usage, sizing, variants
- **[layouts.md](./design/layouts.md)** - Layout primitives and building blocks
- **[overview.md](./design/overview.md)** - Design system principles

---

## Accessibility Rules

WCAG 2.2 Level AA requirements for the Kuat Design System:

- **[README.md](./accessibility/README.md)** - Overview, WCAG principles, testing tools
- **[design.md](./accessibility/design.md)** - Visual accessibility (contrast, color, motion)
- **[content.md](./accessibility/content.md)** - Content accessibility (plain language, structure)
- **[technical.md](./accessibility/technical.md)** - Implementation (keyboard, focus, ARIA, forms)

---

## Content Rules

Content writing guidelines for consistent voice and messaging:

- **[foundations.md](./content/foundations.md)** - Universal voice and tone principles
- **[marketing-sales.md](./content/marketing-sales.md)** - Marketing and sales content
- **[product-ux.md](./content/product-ux.md)** - Product interface content

---

## Component Rules

Component development patterns (framework-agnostic):

- **[patterns.md](./components/patterns.md)** - Naming, variants, accessibility, testing

---

## Scenario Patterns

Applied layout and design patterns for specific use cases:

- **[README.md](./scenarios/README.md)** - Overview and when to use scenarios
- **[authentication.md](./scenarios/authentication.md)** - Login, registration, password flows
- **[dashboards.md](./scenarios/dashboards.md)** - Analytics, data tables, metrics
- **[forms.md](./scenarios/forms.md)** - Settings, multi-step forms, data entry
- **[documentation.md](./scenarios/documentation.md)** - Docs sites, knowledge bases
- **[marketing-pages.md](./scenarios/marketing-pages.md)** - Landing pages, pricing, features

---

## For AI Agents

**Recommended context loading:**

1. **Minimum context**: Load only the specific rule file needed for the task
2. **Design tasks**: Load `rules/design/` directory
3. **Content tasks**: Load `rules/content/` directory  
4. **Component tasks**: Load `rules/components/` + relevant `examples/` directory
5. **Accessibility tasks**: Load `rules/accessibility/` directory
6. **Page building**: Load relevant `rules/scenarios/` file + `rules/design/layouts.md`

**File size targets**: Each file is optimized to be under 200-400 lines for efficient context usage.
