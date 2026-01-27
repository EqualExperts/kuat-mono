# Scenario Patterns

Applied layout and design patterns for specific use cases.

Each scenario combines the foundational rules from `rules/design/` and `rules/accessibility/` into actionable guidance for building complete page types.

---

## When to Use Scenarios

Load a scenario guide when:

- Building a specific page type (login, dashboard, pricing page)
- Need composition guidance beyond foundational design rules
- Want consistent patterns for common UI challenges

---

## Available Scenarios

| Scenario | Use For | Base Layout |
|----------|---------|-------------|
| [authentication.md](./authentication.md) | Login, registration, password flows, MFA | Single Column |
| [dashboards.md](./dashboards.md) | Analytics, data tables, metrics, reporting | Sidebar Navigation |
| [forms.md](./forms.md) | Settings, multi-step forms, data entry | Varies |
| [documentation.md](./documentation.md) | Docs sites, knowledge bases, API reference | Sidebar + Split |
| [marketing-pages.md](./marketing-pages.md) | Landing pages, pricing, features, case studies | Horizontal Navigation |

---

## Scenario Structure

Each scenario file follows a consistent structure:

| Section | Purpose |
|---------|---------|
| **Principles** | Core UX principles, user goals, success metrics |
| **Layout** | Which base layout to use, page structure, regions |
| **Design** | Color tokens, typography, spacing, components |
| **Content** | Content hierarchy, microcopy, error messaging |
| **Accessibility** | Scenario-specific a11y requirements (references base docs) |
| **Implementation** | Component composition, state patterns, responsive behavior |
| **Best Practices** | Do's/Don'ts, common mistakes, edge cases |

---

## How Scenarios Reference Foundations

Scenarios build on foundational documentation:

```
┌─────────────────────────────────────────┐
│             SCENARIOS                   │
│  (authentication, dashboards, etc.)     │
├─────────────────────────────────────────┤
│  References:                            │
│  ├── rules/design/layouts.md           │
│  ├── rules/design/colours.md           │
│  ├── rules/design/typography.md        │
│  ├── rules/accessibility/*.md          │
│  └── rules/content/*.md                │
└─────────────────────────────────────────┘
```

---

## For AI Agents

When building a specific page type:

1. Load the relevant scenario file
2. Follow the recommended base layout from `rules/design/layouts.md`
3. Reference accessibility requirements from `rules/accessibility/`
4. Use design tokens from `rules/design/colours.md` and `rules/design/typography.md`

---

## Related Documentation

- [Layout Primitives](../design/layouts.md) - Base layout building blocks
- [Accessibility](../accessibility/) - WCAG requirements
- [Design Rules](../design/) - Visual design specifications
- [Content Rules](../content/) - Writing guidelines
