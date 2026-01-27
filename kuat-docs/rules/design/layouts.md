# Layout Primitives

Reusable layout building blocks for the Kuat Design System. This document defines layout types, content regions, and structural guidelines - independent of framework.

For scenario-specific guidance (dashboards, authentication, marketing pages), see [Scenarios](../scenarios/).

---

## Overview

Layouts are the structural foundation of every page. Kuat provides five layout primitives that can be combined and configured for different use cases.

**Key principle:** Choose the layout primitive that best supports your content and navigation needs, then configure it for your specific scenario.

---

## Layout Types

### 1. Horizontal Navigation Layout

Header bar with navigation, full-width content below.

```
┌─────────────────────────────────────────┐
│ Header Bar                              │
│ [Logo]    [Nav Items]    [Actions]      │
├─────────────────────────────────────────┤
│                                         │
│           Main Content Area             │
│           (Full width)                  │
│                                         │
├─────────────────────────────────────────┤
│ Footer (optional)                       │
└─────────────────────────────────────────┘
```

**Use when:**
- Limited navigation items (5-7 max)
- Content is the primary focus
- Simple information architecture

**Specifications:**

| Property | Value |
|----------|-------|
| Header height | 64-80px |
| Header padding | 16-24px horizontal, 16px vertical |
| Content max-width | 1200-1400px (or full width) |
| Content padding | 24-32px |

**Variants:**
- Light header (`bg-background`) - Marketing, public-facing
- Dark header (`bg-sidebar`) - Applications, dashboards

---

### 2. Sidebar Navigation Layout

Fixed or collapsible sidebar with content area.

```
┌──────┬──────────────────────────────────┐
│      │ Top Bar (optional)               │
│ Side │ [Breadcrumbs]      [Actions]     │
│ bar  │──────────────────────────────────┤
│      │                                  │
│ [Logo│       Main Content Area          │
│ Nav  │                                  │
│ Items│                                  │
│     ]│                                  │
└──────┴──────────────────────────────────┘
```

**Use when:**
- Complex navigation (8+ items)
- Hierarchical structure
- Persistent navigation needed
- Application interfaces

**Specifications:**

| Property | Value |
|----------|-------|
| Sidebar width | 240-280px expanded |
| Sidebar collapsed | 64px (icons only) |
| Top bar height | 48-64px |
| Content padding | 24-32px |

**Variants:**
- Dark sidebar (`bg-sidebar`) - Standard for apps
- Light sidebar (`bg-muted`) - Documentation sites

---

### 3. Single Column Layout

Centered content with no persistent navigation.

```
┌─────────────────────────────────────────┐
│              [Logo] (optional)          │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────────┐         │
│     │                         │         │
│     │    Centered Content     │         │
│     │    (max-width card)     │         │
│     │                         │         │
│     └─────────────────────────┘         │
│                                         │
├─────────────────────────────────────────┤
│         Footer (minimal/optional)       │
└─────────────────────────────────────────┘
```

**Use when:**
- Focused single task (login, registration)
- Error pages (404, 500)
- Confirmation/success pages
- Minimal distraction needed

**Specifications:**

| Property | Value |
|----------|-------|
| Content max-width | 400-480px |
| Content padding | 24-32px |
| Vertical alignment | Centered (min-height: 100vh) |
| Background | `bg-background` or `bg-muted` |

---

### 4. Multi-Column Layout

Grid-based content regions for complex pages.

```
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Column  │ │ Column  │ │ Column  │    │
│ │   1     │ │   2     │ │   3     │    │
│ └─────────┘ └─────────┘ └─────────┘    │
│                                         │
│ ┌───────────────────┐ ┌───────────────┐│
│ │    Column 1       │ │   Column 2    ││
│ └───────────────────┘ └───────────────┘│
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

**Use when:**
- Dashboard overviews
- Feature/comparison pages
- Card-based content displays

**Column Configurations:**

| Configuration | Use Case |
|---------------|----------|
| 2 columns (50/50) | Comparison, side-by-side |
| 2 columns (66/33) | Main content + sidebar info |
| 3 columns (equal) | Feature grids, card displays |
| 4 columns (equal) | KPI dashboards, metrics |

**Specifications:**

| Property | Value |
|----------|-------|
| Column gap | 16-24px |
| Row gap | 16-24px |
| Container max-width | 1200-1400px |

---

### 5. Split Layout

Two-panel layout for focused comparison or workflow.

```
┌────────────────────┬────────────────────┐
│                    │                    │
│    Left Panel      │    Right Panel     │
│                    │                    │
│                    │                    │
│                    │                    │
└────────────────────┴────────────────────┘
```

**Use when:**
- Side-by-side comparison
- Code editor + preview
- List + detail view
- Documentation with table of contents

**Split Ratios:**

| Ratio | Use Case |
|-------|----------|
| 50/50 | Equal comparison |
| 60/40 | Primary + secondary |
| 70/30 | Main content + table of contents |
| 33/67 | Navigation + main content |

**Specifications:**

| Property | Value |
|----------|-------|
| Divider | 1px border or resizable handle |
| Min panel width | 240px |
| Panel padding | 16-24px |

---

## Content Regions

### Header Region

| Property | Light Variant | Dark Variant |
|----------|---------------|--------------|
| Background | `bg-background` | `bg-sidebar` |
| Text | `text-foreground` | `text-sidebar-foreground` |
| Logo | Full-color | White monochrome |
| Height | 64-80px | 64-72px |

### Footer Region

| Property | Value |
|----------|-------|
| Background | `bg-muted` or `bg-background` |
| Padding | 32-48px vertical |
| Content | Logo, links, legal text |

### Main Content Region

| Property | Value |
|----------|-------|
| Background | `bg-background` |
| Padding | 24-32px |
| Max-width | Varies by layout (1200-1400px typical) |

### Sidebar Region

| Property | Value |
|----------|-------|
| Background | `bg-sidebar` (dark) or `bg-muted` (light) |
| Width | 240-280px expanded, 64px collapsed |
| Padding | 16px |
| Scroll | Independent scroll from main content |

---

## Navigation Color Tokens

For dark navigation (horizontal bar or sidebar):

| Token | Purpose |
|-------|---------|
| `--sidebar` | Navigation background (Tech Blue) |
| `--sidebar-foreground` | Text color (White) |
| `--sidebar-primary` | Primary accent (EE Blue) |
| `--sidebar-primary-foreground` | Text on primary |
| `--sidebar-accent` | Hover/active background |
| `--sidebar-accent-foreground` | Text on accent |
| `--sidebar-border` | Border color |
| `--sidebar-ring` | Focus ring color |

---

## Spacing Guidelines

Follow the 8-point grid system:

| Element | Spacing |
|---------|---------|
| Navigation height | 64-80px (multiples of 8) |
| Sidebar width | 240-280px (multiples of 8) |
| Padding | 16px, 24px, 32px (multiples of 8) |
| Content gap | 16px, 24px (multiples of 8) |

---

## Layout Accessibility

**Reference:** [accessibility/technical.md](../accessibility/technical.md)

### Landmark Roles

Every layout must include proper landmarks:

| Region | HTML Element | Role |
|--------|--------------|------|
| Header | `<header>` | banner |
| Navigation | `<nav>` | navigation |
| Main content | `<main>` | main |
| Sidebar | `<aside>` | complementary |
| Footer | `<footer>` | contentinfo |

### Skip Links

For layouts with significant navigation, include a skip link:

```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Focus Order

- Focus order must follow visual order
- Sidebar navigation focuses before main content
- Modal/drawer navigation traps focus when open

### Keyboard Navigation

- All navigation items reachable via Tab
- Arrow keys for navigating within menus
- Escape closes mobile/overlay navigation

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Typical Use |
|------------|-------|-------------|
| Mobile | < 640px | Single column, overlay nav |
| Tablet | 640-1024px | Collapsed sidebar, simplified nav |
| Desktop | > 1024px | Full layout with all features |

### Horizontal Navigation

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Collapse to hamburger menu |
| Tablet | Show primary nav, hide secondary |
| Desktop | Full navigation visible |

### Sidebar Navigation

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Overlay/drawer, hidden by default |
| Tablet | Collapsible (default collapsed) |
| Desktop | Full sidebar visible (240-280px) |

### Content Grids

| Breakpoint | Columns |
|------------|---------|
| Mobile | 1 column (stacked) |
| Tablet | 2 columns |
| Desktop | 3-4 columns |

---

## Applied Patterns

For scenario-specific guidance on how to use these layout primitives:

| Scenario | Recommended Layout | Reference |
|----------|-------------------|-----------|
| Authentication | Single Column | [scenarios/authentication.md](../scenarios/authentication.md) |
| Dashboards | Sidebar Navigation | [scenarios/dashboards.md](../scenarios/dashboards.md) |
| Forms & Settings | Sidebar or Single Column | [scenarios/forms.md](../scenarios/forms.md) |
| Documentation | Sidebar + Split | [scenarios/documentation.md](../scenarios/documentation.md) |
| Marketing Pages | Horizontal Navigation | [scenarios/marketing-pages.md](../scenarios/marketing-pages.md) |

---

## Implementation Examples

For code examples implementing these layouts:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/layouts.md](../../examples/react/layouts.md) |
| Vue | [examples/vue/layouts.md](../../examples/vue/layouts.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

---

## Related Documentation

- [Spacing](./spacing.md) - 8-point grid system
- [Colours](./colours.md) - Color tokens
- [Logo](./logo.md) - Logo usage and variants
- [Accessibility](../accessibility/technical.md) - Technical accessibility
