# Kuat Design System Spacing

A guide to using spacing in the Kuat Design System. This document helps ensure consistent, accessible, and harmonious spacing across all digital products built with shadcn/ui and shadcn-vue.

---

## Overview

The Kuat Design System uses **Tailwind CSS's spacing scale**, which is based on a **4px base unit** (0.25rem). This creates a consistent, predictable spacing system that promotes visual harmony and maintainability across all components.

**Key Principle:** Use Tailwind spacing utility classes consistently. Spacing is the primary tool for creating visual hierarchy and separation between elements—prefer spacing over borders when possible.

---

## Spacing Scale

The design system uses Tailwind's default spacing scale, where each unit represents **0.25rem (4px)**:

| Tailwind Class | Value | Pixels | Usage |
|----------------|-------|--------|-------|
| `0` | `0` | `0px` | No spacing |
| `0.5` | `0.125rem` | `2px` | Tight spacing, fine adjustments |
| `1` | `0.25rem` | `4px` | Minimal spacing, tight groups |
| `1.5` | `0.375rem` | `6px` | Small spacing |
| `2` | `0.5rem` | `8px` | Small spacing, compact layouts |
| `2.5` | `0.625rem` | `10px` | Small-medium spacing |
| `3` | `0.75rem` | `12px` | Medium spacing, form fields |
| `4` | `1rem` | `16px` | Standard spacing, default padding |
| `5` | `1.25rem` | `20px` | Medium-large spacing |
| `6` | `1.5rem` | `24px` | Large spacing, section separation |
| `8` | `2rem` | `32px` | Extra large spacing, major sections |
| `10` | `2.5rem` | `40px` | Very large spacing |
| `12` | `3rem` | `48px` | Maximum spacing, page sections |
| `16` | `4rem` | `64px` | Hero spacing, large sections |
| `20` | `5rem` | `80px` | Maximum hero spacing |
| `24` | `6rem` | `96px` | Ultra large spacing |

**Note:** The scale continues beyond these values, but these are the most commonly used in the design system.

---

## Spacing Utilities

Tailwind provides several spacing utility classes for different use cases:

### Padding

Padding adds space inside an element:

- **All sides:** `p-{size}` (e.g., `p-4`)
- **Horizontal:** `px-{size}` (e.g., `px-4`)
- **Vertical:** `py-{size}` (e.g., `py-4`)
- **Top:** `pt-{size}` (e.g., `pt-4`)
- **Right:** `pr-{size}` (e.g., `pr-4`)
- **Bottom:** `pb-{size}` (e.g., `pb-4`)
- **Left:** `pl-{size}` (e.g., `pl-4`)

### Margin

Margin adds space outside an element:

- **All sides:** `m-{size}` (e.g., `m-4`)
- **Horizontal:** `mx-{size}` (e.g., `mx-4`)
- **Vertical:** `my-{size}` (e.g., `my-4`)
- **Top:** `mt-{size}` (e.g., `mt-4`)
- **Right:** `mr-{size}` (e.g., `mr-4`)
- **Bottom:** `mb-{size}` (e.g., `mb-4`)
- **Left:** `ml-{size}` (e.g., `ml-4`)

### Gap

Gap adds space between flex or grid children:

- **All directions:** `gap-{size}` (e.g., `gap-4`)
- **Horizontal:** `gap-x-{size}` (e.g., `gap-x-4`)
- **Vertical:** `gap-y-{size}` (e.g., `gap-y-4`)

### Space Between

Space between adds vertical spacing between child elements:

- **Vertical:** `space-y-{size}` (e.g., `space-y-4`)
- **Horizontal:** `space-x-{size}` (e.g., `space-x-4`)

---

## Common Spacing Patterns

### Component Padding

**Cards and Containers:**
- **Small cards:** `p-4` (16px) - Compact content
- **Standard cards:** `p-6` (24px) - Default card padding
- **Large cards:** `p-8` (32px) - Spacious content

```tsx
// React - Standard card padding
<div className="bg-card border border-border rounded-lg p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Form Spacing

**Form Elements:**
- **Input padding:** `px-3 py-2` (12px horizontal, 8px vertical)
- **Form group spacing:** `space-y-4` (16px between form fields)
- **Form section spacing:** `space-y-6` (24px between sections)

```tsx
// React - Form with consistent spacing
<form className="space-y-4">
  <div>
    <label className="block mb-2">Label</label>
    <input className="w-full px-3 py-2 border border-input rounded-[4px]" />
  </div>
  <div>
    <label className="block mb-2">Another Label</label>
    <input className="w-full px-3 py-2 border border-input rounded-[4px]" />
  </div>
</form>
```

### Section Spacing

**Page Sections:**
- **Tight sections:** `space-y-4` (16px) - Related content
- **Standard sections:** `space-y-6` (24px) - Default section spacing
- **Large sections:** `space-y-8` (32px) - Major content blocks
- **Page sections:** `space-y-12` (48px) - Top-level page sections

```tsx
// React - Page with section spacing
<div className="space-y-8">
  <section>
    <h2>Section Title</h2>
    <p>Content</p>
  </section>
  <section>
    <h2>Another Section</h2>
    <p>More content</p>
  </section>
</div>
```

### Button Spacing

**Buttons:**
- **Small buttons:** `px-3 py-1.5` (12px horizontal, 6px vertical)
- **Standard buttons:** `px-4 py-2` (16px horizontal, 8px vertical)
- **Large buttons:** `px-6 py-3` (24px horizontal, 12px vertical)

```tsx
// React - Button with standard spacing
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-[6px]">
  Click me
</button>
```

### List Spacing

**Lists:**
- **List item spacing:** `space-y-2` (8px) - Tight lists
- **Standard list spacing:** `space-y-4` (16px) - Default lists
- **Spacious lists:** `space-y-6` (24px) - Comfortable reading

```tsx
// React - List with spacing
<ul className="space-y-4">
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
```

---

## Best Practices

### ✅ Do's

1. **Use consistent spacing values**
   - ✅ Stick to the spacing scale (4px, 8px, 12px, 16px, 24px, etc.)
   - ✅ Use common values: 4, 6, 8, 12, 16, 24, 32, 48
   - ✅ Maintain visual rhythm by using related spacing values

2. **Prefer spacing over borders**
   - ✅ Use spacing to create separation before adding borders
   - ✅ Let spacing create visual hierarchy
   - ✅ Use borders only when spacing is insufficient

3. **Use semantic spacing utilities**
   - ✅ Use `space-y-*` for vertical spacing between children
   - ✅ Use `gap-*` for flex and grid layouts
   - ✅ Use `p-*` and `m-*` for component padding and margins

4. **Maintain spacing relationships**
   - ✅ Use smaller spacing (2-4) for related elements
   - ✅ Use medium spacing (6-8) for component groups
   - ✅ Use large spacing (12-16) for major sections

5. **Consider responsive spacing**
   - ✅ Use responsive utilities when needed (`sm:`, `md:`, `lg:`)
   - ✅ Adjust spacing for mobile vs. desktop
   - ✅ Maintain readability across screen sizes

### ❌ Don'ts

1. **Don't use arbitrary spacing values**
   - ❌ Don't use arbitrary values like `p-[13px]` or `m-[7px]`
   - ❌ Don't mix spacing systems
   - ❌ Always use the spacing scale

2. **Don't overuse spacing**
   - ❌ Don't add excessive spacing that breaks visual flow
   - ❌ Don't use spacing to fix layout issues (fix the layout instead)
   - ❌ Don't create inconsistent spacing patterns

3. **Don't ignore spacing relationships**
   - ❌ Don't mix unrelated spacing values (e.g., 5px and 13px)
   - ❌ Don't create spacing that doesn't follow the scale
   - ❌ Don't use spacing that breaks visual rhythm

4. **Don't hardcode spacing**
   - ❌ Don't use inline styles for spacing
   - ❌ Don't create custom CSS for spacing
   - ❌ Always use Tailwind utility classes

5. **Don't forget accessibility**
   - ❌ Don't use spacing so tight that content is hard to read
   - ❌ Don't use spacing so large that it breaks content flow
   - ❌ Ensure spacing supports readability and usability

---

## Spacing Guidelines by Context

### Component Internal Spacing

**Card Components:**
- Padding: `p-6` (24px) - Standard card padding
- Content spacing: `space-y-4` (16px) - Between card elements

**Form Components:**
- Input padding: `px-3 py-2` (12px/8px)
- Label spacing: `mb-2` (8px) - Between label and input
- Field spacing: `space-y-4` (16px) - Between form fields

**Button Components:**
- Standard: `px-4 py-2` (16px/8px)
- Small: `px-3 py-1.5` (12px/6px)
- Large: `px-6 py-3` (24px/12px)

### Layout Spacing

**Page Layout:**
- Container padding: `px-4 md:px-6 lg:px-8` (responsive)
- Section spacing: `space-y-8` (32px) - Between major sections
- Content spacing: `space-y-6` (24px) - Between content blocks

**Grid Layouts:**
- Grid gap: `gap-4` (16px) - Standard grid spacing
- Large grid gap: `gap-6` (24px) - Spacious grids
- Tight grid gap: `gap-2` (8px) - Compact grids

**Flex Layouts:**
- Flex gap: `gap-4` (16px) - Standard flex spacing
- Button groups: `gap-2` (8px) - Tight button spacing
- Navigation: `gap-6` (24px) - Navigation item spacing

### Content Spacing

**Text Content:**
- Paragraph spacing: `space-y-4` (16px) - Between paragraphs
- Heading spacing: `mb-4` (16px) - Below headings
- List spacing: `space-y-2` (8px) - Between list items

**Media Content:**
- Image spacing: `mb-6` (24px) - Below images
- Video spacing: `mb-8` (32px) - Below videos
- Media groups: `gap-4` (16px) - Between media items

---

## Examples

### ✅ Good: Consistent Spacing

```tsx
// React - Card with proper spacing
<div className="bg-card border border-border rounded-lg p-6">
  <h3 className="mb-4">Card Title</h3>
  <p className="mb-4">Card content with consistent spacing.</p>
  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
    Action
  </button>
</div>

// React - Form with consistent spacing
<form className="space-y-4">
  <div>
    <label className="block mb-2">Email</label>
    <input className="w-full px-3 py-2 border border-input rounded-[4px]" />
  </div>
  <div>
    <label className="block mb-2">Password</label>
    <input type="password" className="w-full px-3 py-2 border border-input rounded-[4px]" />
  </div>
  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
    Submit
  </button>
</form>
```

### ❌ Bad: Inconsistent Spacing

```tsx
// Don't do this - arbitrary spacing values
<div className="bg-card p-[13px] mb-[7px]">
  <h3 className="mb-[11px]">Title</h3>
  <p className="mb-[9px]">Content</p>
</div>

// Don't do this - inconsistent spacing relationships
<div className="space-y-5">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### ✅ Good: Using Spacing for Separation

```tsx
// React - Using spacing instead of borders
<div className="space-y-8">
  <section>
    <h2 className="text-2xl font-bold mb-4">Section Title</h2>
    <p>Content here</p>
  </section>
  <section>
    <h2 className="text-2xl font-bold mb-4">Another Section</h2>
    <p>More content</p>
  </section>
</div>
```

### ✅ Good: Responsive Spacing

```tsx
// React - Responsive spacing
<div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
  <h1>Responsive Container</h1>
  <p>Spacing adapts to screen size</p>
</div>
```

---

## Vue Examples

```vue
<!-- Card with proper spacing -->
<template>
  <div class="bg-card border border-border rounded-lg p-6">
    <h3 class="mb-4">Card Title</h3>
    <p class="mb-4">Card content with consistent spacing.</p>
    <button class="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
      Action
    </button>
  </div>
</template>

<!-- Form with consistent spacing -->
<template>
  <form class="space-y-4">
    <div>
      <label class="block mb-2">Email</label>
      <input class="w-full px-3 py-2 border border-input rounded-[4px]" />
    </div>
    <div>
      <label class="block mb-2">Password</label>
      <input type="password" class="w-full px-3 py-2 border border-input rounded-[4px]" />
    </div>
    <button class="px-4 py-2 bg-primary text-primary-foreground rounded-[6px]">
      Submit
    </button>
  </form>
</template>

<!-- Page with section spacing -->
<template>
  <div class="space-y-8">
    <section>
      <h2 class="text-2xl font-bold mb-4">Section Title</h2>
      <p>Content here</p>
    </section>
    <section>
      <h2 class="text-2xl font-bold mb-4">Another Section</h2>
      <p>More content</p>
    </section>
  </div>
</template>
```

---

## Spacing in shadcn/ui Components

shadcn/ui components follow consistent spacing patterns:

### Card Component
- **Padding:** `p-6` (24px)
- **Content spacing:** `space-y-4` (16px)

### Button Component
- **Padding:** `px-4 py-2` (16px/8px)
- **Icon spacing:** `gap-2` (8px) when icons are present

### Input Component
- **Padding:** `px-3 py-2` (12px/8px)
- **Label spacing:** `mb-2` (8px)

### Dialog Component
- **Padding:** `p-6` (24px)
- **Content spacing:** `space-y-4` (16px)
- **Footer spacing:** `mt-6` (24px)

### Form Component
- **Field spacing:** `space-y-4` (16px)
- **Section spacing:** `space-y-6` (24px)

---

## Integration with Design System

### Spacing Variables

The design system defines a base spacing unit in `@equal-experts/kuat-core/src/variables.css`:

```css
--spacing: 0.25rem; /* 4px base unit */
```

This aligns with Tailwind's spacing scale where `1` = `0.25rem` (4px).

### Tailwind Configuration

The spacing scale is built into Tailwind CSS and doesn't require custom configuration. All spacing utilities are available by default:

- Padding: `p-*`, `px-*`, `py-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*`
- Margin: `m-*`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`
- Gap: `gap-*`, `gap-x-*`, `gap-y-*`
- Space: `space-y-*`, `space-x-*`

---

## Additional Resources

- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Borders Guide:** See [borders.md](./borders.md) for spacing vs. borders guidance
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component spacing patterns
- **shadcn/ui Components:** [shadcn/ui Component Documentation](https://ui.shadcn.com/docs/components)
- **Tailwind Spacing:** [Tailwind CSS Spacing Documentation](https://tailwindcss.com/docs/padding)
- **8-Point Grid System:** Industry standard spacing methodology

---

## Notes

- **4px Base Unit:** All spacing is based on a 4px (0.25rem) unit for consistency
- **Consistency First:** Always use the spacing scale—avoid arbitrary values
- **Spacing Over Borders:** Prefer spacing to create separation before using borders
- **Visual Rhythm:** Maintain consistent spacing relationships throughout the interface
- **Responsive Design:** Adjust spacing appropriately for different screen sizes
- **Accessibility:** Ensure spacing supports readability and usability

