# Kuat Design System Typography

A guide to using typography in the Kuat Design System. This document helps ensure consistent, accessible typography across all digital products built with shadcn/ui and shadcn-vue.

---

## Overview

The Kuat Design System follows shadcn/ui patterns, which means **typography is handled through Tailwind CSS utility classes** rather than predefined typography components. This approach provides flexibility while maintaining consistency through design tokens.

**Key Principle:** Use Tailwind utility classes for typography styling. All typography values are defined in `@equalexperts/kuat-core` and accessible via Tailwind classes.

---

## Font Families

Font families are defined in `@equalexperts/kuat-core/src/variables.css` and available via Tailwind utilities.

### Sans Serif (Default)
- **Font Family:** `Lexend`
- **CSS Variable:** `--font-sans`
- **Tailwind Class:** `font-sans`
- **Fallback Stack:** `Lexend, ui-sans-serif, sans-serif, system-ui`
- **Usage:** Primary font for all UI elements, body text, headings, and interface copy

### Serif
- **Font Family:** `Lora`
- **CSS Variable:** `--font-serif`
- **Tailwind Class:** `font-serif`
- **Usage:** Decorative text, special emphasis (use sparingly)

### Monospace
- **Font Family:** `JetBrains Mono`
- **CSS Variable:** `--font-mono`
- **Tailwind Class:** `font-mono`
- **Usage:** Code blocks, technical content, data display
- **Why JetBrains Mono:** A professional monospace font designed specifically for developers, with excellent readability and clear character distinction optimized for coding

### Usage Examples

```tsx
// React
<p className="font-sans">Primary text using Lexend</p>
<code className="font-mono">Code example</code>
```

```vue
<!-- Vue -->
<p class="font-sans">Primary text using Lexend</p>
<code class="font-mono">Code example</code>
```

---

## Typography Scale

The design system uses Tailwind's default typography scale. All sizes are relative and responsive by default.

### Text Sizes (Tailwind Utilities)

| Size | Class | Font Size | Line Height | Usage |
|------|-------|-----------|-------------|-------|
| XS | `text-xs` | 0.75rem (12px) | 1rem (16px) | Labels, captions, metadata |
| SM | `text-sm` | 0.875rem (14px) | 1.25rem (20px) | Secondary text, form inputs |
| Base | `text-base` | 1rem (16px) | 1.5rem (24px) | Body text (default) |
| LG | `text-lg` | 1.125rem (18px) | 1.75rem (28px) | Large body text, subheadings |
| XL | `text-xl` | 1.25rem (20px) | 1.75rem (28px) | Section headings |
| 2XL | `text-2xl` | 1.5rem (24px) | 2rem (32px) | Page headings |
| 3XL | `text-3xl` | 1.875rem (30px) | 2.25rem (36px) | Large headings |
| 4XL | `text-4xl` | 2.25rem (36px) | 2.5rem (40px) | Display text |
| 5XL | `text-5xl` | 3rem (48px) | 1 | Hero headings |
| 6XL | `text-6xl` | 3.75rem (60px) | 1 | Large hero text |
| 7XL | `text-7xl` | 4.5rem (72px) | 1 | Extra large display |
| 8XL | `text-8xl` | 6rem (96px) | 1 | Maximum display |
| 9XL | `text-9xl` | 8rem (128px) | 1 | Ultra large display |

### Usage Examples

```tsx
// React
<h1 className="text-4xl font-bold">Page Title</h1>
<p className="text-base">Body text content</p>
<span className="text-sm text-muted-foreground">Secondary information</span>
```

```vue
<!-- Vue -->
<h1 class="text-4xl font-bold">Page Title</h1>
<p class="text-base">Body text content</p>
<span class="text-sm text-muted-foreground">Secondary information</span>
```

---

## Font Weights

Font weights use Tailwind's standard weight scale:

| Weight | Class | Value | Usage |
|--------|-------|-------|-------|
| Thin | `font-thin` | 100 | Rarely used |
| Extra Light | `font-extralight` | 200 | Rarely used |
| Light | `font-light` | 300 | Large display text, subtle emphasis |
| Normal | `font-normal` | 400 | Default body text |
| Medium | `font-medium` | 500 | Form inputs, UI labels, subtle emphasis |
| Semi Bold | `font-semibold` | 600 | Headings, important labels |
| Bold | `font-bold` | 700 | Strong emphasis, primary headings |
| Extra Bold | `font-extrabold` | 800 | Maximum emphasis (use sparingly) |
| Black | `font-black` | 900 | Maximum emphasis (use sparingly) |

### Recommended Weight Usage

- **Body Text:** `font-normal` (400) - Default for paragraphs and content
- **Headings:** `font-semibold` (600) or `font-bold` (700)
- **Form Inputs:** `font-medium` (500) or `font-semibold` (600)
- **UI Labels:** `font-medium` (500)
- **Display Text:** `font-light` (300) for large sizes, `font-bold` (700) for impact

---

## Text Colors

Text colors use the design system's semantic color tokens from `@equalexperts/kuat-core`. All colors support light and dark modes automatically.

### Primary Text Colors

| Color | Class | Usage |
|-------|-------|-------|
| Foreground | `text-foreground` | Primary text color (default) |
| Muted | `text-muted-foreground` | Secondary text, hints, metadata |
| Primary | `text-primary` | Brand color text |
| Primary Foreground | `text-primary-foreground` | Text on primary backgrounds |
| Secondary | `text-secondary` | Secondary brand color |
| Secondary Foreground | `text-secondary-foreground` | Text on secondary backgrounds |
| Accent | `text-accent` | Accent color text |
| Accent Foreground | `text-accent-foreground` | Text on accent backgrounds |
| Destructive | `text-destructive` | Error text, warnings |
| Destructive Foreground | `text-destructive-foreground` | Text on destructive backgrounds |

### Usage Examples

```tsx
// React
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<h2 className="text-primary">Brand heading</h2>
<span className="text-destructive">Error message</span>
```

```vue
<!-- Vue -->
<p class="text-foreground">Primary text</p>
<p class="text-muted-foreground">Secondary text</p>
<h2 class="text-primary">Brand heading</h2>
<span class="text-destructive">Error message</span>
```

### Accessibility

All text color combinations are designed to meet WCAG AA contrast standards:
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold):** Minimum 3:1 contrast ratio

Always use semantic color tokens rather than hardcoded colors to ensure accessibility.

---

## Letter Spacing

Letter spacing is controlled via CSS variables and Tailwind utilities.

### Available Classes

| Class | Value | Usage |
|------|-------|-------|
| `tracking-tighter` | `calc(var(--tracking-normal) - 0.05em)` | Tighter spacing |
| `tracking-tight` | `calc(var(--tracking-normal) - 0.025em)` | Slightly tighter |
| `tracking-normal` | `var(--tracking-normal)` (0.01em) | Default spacing |
| `tracking-wide` | `calc(var(--tracking-normal) + 0.025em)` | Slightly wider |
| `tracking-wider` | `calc(var(--tracking-normal) + 0.05em)` | Wider spacing |
| `tracking-widest` | `calc(var(--tracking-normal) + 0.1em)` | Maximum spacing |

**Default:** Body text uses `tracking-normal` automatically via CSS variables.

---

## Line Height

Line heights are built into Tailwind's typography scale. Use Tailwind's `leading-*` utilities for custom line heights when needed.

### Common Line Height Classes

| Class | Value | Usage |
|------|-------|-------|
| `leading-none` | 1 | Tight spacing (headings) |
| `leading-tight` | 1.25 | Compact text |
| `leading-snug` | 1.375 | Slightly tight |
| `leading-normal` | 1.5 | Default body text |
| `leading-relaxed` | 1.625 | Comfortable reading |
| `leading-loose` | 2 | Generous spacing |

---

## Typography in Components

### Using Typography with shadcn/ui Components

shadcn/ui components use Tailwind utility classes for typography. You can customize typography by adding classes:

```tsx
// React - Button component
<Button className="text-lg font-semibold">
  Click me
</Button>

// React - Card component
<Card>
  <CardHeader>
    <CardTitle className="text-2xl font-bold">Card Title</CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Card description
    </CardDescription>
  </CardHeader>
</Card>
```

```vue
<!-- Vue - Button component -->
<Button class="text-lg font-semibold">
  Click me
</Button>

<!-- Vue - Card component -->
<Card>
  <CardHeader>
    <CardTitle class="text-2xl font-bold">Card Title</CardTitle>
    <CardDescription class="text-sm text-muted-foreground">
      Card description
    </CardDescription>
  </CardHeader>
</Card>
```

### Creating Typography Utilities

For reusable typography patterns, create utility classes or use the `cn()` helper:

```tsx
// React
import { cn } from "@/lib/utils"

const headingStyles = cn(
  "text-2xl font-bold text-foreground",
  "tracking-tight"
)

<h1 className={headingStyles}>Heading</h1>
```

```vue
<!-- Vue -->
<script setup>
import { cn } from "@/lib/utils"

const headingStyles = cn(
  "text-2xl font-bold text-foreground",
  "tracking-tight"
)
</script>

<template>
  <h1 :class="headingStyles">Heading</h1>
</template>
```

---

## Typography Hierarchy

Establish clear visual hierarchy using size, weight, and color:

1. **Primary Heading (H1):** `text-4xl` or `text-5xl` with `font-bold`
2. **Secondary Heading (H2):** `text-3xl` or `text-2xl` with `font-semibold` or `font-bold`
3. **Tertiary Heading (H3):** `text-xl` or `text-2xl` with `font-semibold`
4. **Body Text:** `text-base` with `font-normal`
5. **Supporting Text:** `text-sm` with `font-normal` or `font-medium`
6. **Labels/Captions:** `text-xs` or `text-sm` with `text-muted-foreground`

### Example Hierarchy

```tsx
// React
<div>
  <h1 className="text-5xl font-bold text-foreground mb-4">
    Main Page Title
  </h1>
  <h2 className="text-3xl font-semibold text-foreground mb-3">
    Section Heading
  </h2>
  <p className="text-base font-normal text-foreground mb-2">
    Body text content goes here. This is the primary content.
  </p>
  <p className="text-sm text-muted-foreground">
    Supporting information or metadata.
  </p>
</div>
```

```vue
<!-- Vue -->
<template>
  <div>
    <h1 class="text-5xl font-bold text-foreground mb-4">
      Main Page Title
    </h1>
    <h2 class="text-3xl font-semibold text-foreground mb-3">
      Section Heading
    </h2>
    <p class="text-base font-normal text-foreground mb-2">
      Body text content goes here. This is the primary content.
    </p>
    <p class="text-sm text-muted-foreground">
      Supporting information or metadata.
    </p>
  </div>
</template>
```

---

## Best Practices

### ✅ Do's

1. **Use Tailwind utility classes**
   - ✅ Use `text-*` classes for font sizes
   - ✅ Use `font-*` classes for font weights
   - ✅ Use semantic color tokens (`text-foreground`, `text-muted-foreground`, etc.)

2. **Maintain consistency**
   - ✅ Use the same typography scale across components
   - ✅ Follow the hierarchy guidelines
   - ✅ Use design tokens from `@equalexperts/kuat-core`

3. **Ensure accessibility**
   - ✅ Use semantic HTML elements (`<h1>`, `<h2>`, `<p>`, etc.)
   - ✅ Apply visual styles with classes, not semantic meaning
   - ✅ Verify contrast ratios meet WCAG AA standards
   - ✅ Use proper heading hierarchy (h1 → h2 → h3, etc.)

4. **Use semantic colors**
   - ✅ Prefer `text-foreground` over hardcoded colors
   - ✅ Use `text-muted-foreground` for secondary text
   - ✅ Leverage color tokens for automatic dark mode support

5. **Combine utilities effectively**
   - ✅ Use the `cn()` utility for conditional classes
   - ✅ Create reusable typography patterns
   - ✅ Keep class lists readable and maintainable

### ❌ Don'ts

1. **Don't hardcode typography values**
   - ❌ Don't use inline styles for font sizes or weights
   - ❌ Don't create custom CSS for typography (use Tailwind)
   - ❌ Don't use pixel values directly in components

2. **Don't break semantic structure**
   - ❌ Don't use heading levels based on appearance
   - ❌ Don't use `<h1>` through `<h6>` for styling non-headings
   - ❌ Don't skip heading levels (h1 → h3 is invalid)

3. **Don't ignore accessibility**
   - ❌ Don't use low-contrast text colors
   - ❌ Don't use font sizes smaller than 12px for body text
   - ❌ Don't rely solely on color to convey information

4. **Don't mix font families unnecessarily**
   - ❌ Don't use multiple font families in the same component
   - ❌ Don't override font-family without a good reason
   - ❌ Stick to `font-sans` for most UI elements

5. **Don't create custom typography components**
   - ❌ Don't create wrapper components for typography (shadcn/ui pattern)
   - ❌ Use Tailwind utilities directly
   - ❌ Keep typography styling at the element level

---

## Responsive Typography

Tailwind's responsive modifiers work with typography utilities:

```tsx
// React
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>
```

```vue
<!-- Vue -->
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>
```

---

## Dark Mode

Typography automatically adapts to dark mode through color tokens:

```tsx
// React - Colors automatically switch in dark mode
<p className="text-foreground">This text adapts to dark mode</p>
<p className="text-muted-foreground">Secondary text also adapts</p>
```

The `text-foreground` and `text-muted-foreground` classes automatically use the appropriate colors based on the `dark` class on the root element.

---

## Integration with Design System

Typography integrates seamlessly with other design system elements:

- **Colors:** Use semantic color tokens (`text-foreground`, `text-primary`, etc.)
- **Spacing:** Combine with Tailwind spacing utilities (`mb-4`, `mt-2`, etc.)
- **Components:** All shadcn/ui components accept typography classes
- **Tokens:** All values come from `@equalexperts/kuat-core/src/variables.css`

---

## Additional Resources

- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component development patterns
- **Usage Guide:** See [../usage-guide.md](../usage-guide.md) for quick reference
- **shadcn/ui Typography:** [shadcn/ui Typography Documentation](https://ui.shadcn.com/docs/components/typography)
- **Tailwind Typography:** [Tailwind CSS Typography Documentation](https://tailwindcss.com/docs/font-size)

---

## Notes

- **Consistency is key:** Always use Tailwind utility classes for typography
- **Semantic HTML first:** Use proper HTML elements, then style with classes
- **Design tokens:** All typography values reference tokens from `@equalexperts/kuat-core`
- **Flexibility:** shadcn/ui's utility-first approach allows customization while maintaining consistency
- **Accessibility:** Always verify contrast ratios and use semantic HTML structure
