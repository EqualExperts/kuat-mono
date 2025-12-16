# Kuat Design System Borders

A guide to using borders in the Kuat Design System. This document helps ensure consistent, accessible, and purposeful border usage across all digital products built with shadcn/ui and shadcn-vue.

---

## Overview

The Kuat Design System follows a **minimal border philosophy**—borders should only be used when necessary to create clear separation between components or sections. When possible, prefer spacing and visual hierarchy over borders to create a cleaner, more modern interface.

**Key Principle:** Use borders sparingly and purposefully. Spacing and visual hierarchy should be the primary tools for creating separation.

---

## Border Usage Principles

### When to Use Borders

Borders should only be used when:

1. **Creating separation between distinct sections** of content that need clear visual boundaries
2. **Distinguishing interactive elements** from static content (e.g., form inputs, clickable cards)
3. **Defining component boundaries** where spacing alone is insufficient
4. **Indicating state changes** (e.g., focus states, error states)

### When NOT to Use Borders

Avoid using borders when:

- ❌ Spacing alone can create sufficient separation
- ❌ Visual hierarchy (size, color, weight) can distinguish elements
- ❌ The border would create visual clutter or noise
- ❌ The separation is already clear through other design elements

### Prefer Spacing Over Borders

**✅ Good: Using spacing for separation**

```tsx
// React
<div className="space-y-6">
  <section className="py-6">
    <h2>Section Title</h2>
    <p>Content here</p>
  </section>
  <section className="py-6">
    <h2>Another Section</h2>
    <p>More content</p>
  </section>
</div>
```

**❌ Avoid: Unnecessary borders**

```tsx
// Don't do this - spacing is sufficient
<div>
  <section className="border-b pb-6">
    <h2>Section Title</h2>
  </section>
  <section className="pt-6">
    <h2>Another Section</h2>
  </section>
</div>
```

---

## Border Specifications

### Border Width

Borders should be between **1px and 4px** in width:

- **1px:** Default borders for most UI elements (cards, inputs, dividers)
- **2px:** Emphasized borders for important separations or active states
- **3-4px:** Reserved for special cases like focus rings or high-contrast separations

**Usage:**

```tsx
// React - 1px default border
<div className="border border-border">Content</div>

// React - 2px emphasized border
<div className="border-2 border-primary">Important content</div>

// React - 4px for focus rings (use ring utilities)
<button className="focus:ring-4 focus:ring-ring">Button</button>
```

### Border Style

**Always use solid lines.** The design system does not use dashed, dotted, or other border styles.

```tsx
// ✅ Correct - solid border (default)
<div className="border border-border">Content</div>

// ❌ Avoid - dashed or dotted borders
<div className="border-dashed border-border">Content</div>
```

### Border Color

Borders use the semantic color token `--border` which adapts to light and dark modes:

- **Light Mode:** `var(--slate-200)` - Subtle, light gray
- **Dark Mode:** `var(--slate-700)` - Subtle, medium gray

**Usage:**

```tsx
// React - Using semantic border color
<div className="border border-border">Content</div>

// React - Using Tailwind class (recommended)
<div className="border-border">Content</div>
```

### Accessibility: Color Contrast

Borders must meet **minimum contrast ratio requirements for graphical objects** (WCAG 2.1 Level AA):

- **Non-text content (borders):** Minimum contrast ratio of **3:1** against adjacent colors
- This ensures borders are visible and distinguishable

The default `border-border` token is designed to meet these requirements against both light and dark backgrounds.

**Testing Contrast:**

Always verify border contrast meets accessibility standards:
- Test borders against their background colors
- Ensure borders are visible in both light and dark modes
- Use browser DevTools accessibility features to verify contrast ratios

---

## Border Radius

The Kuat Design System uses a **minimal border radius approach**—most elements have no border radius by default, with radius applied only to interactive elements for better usability and visual feedback.

### Default: No Radius (0px)

Most elements in the design system use **no border radius** (0px) by default. This creates a clean, modern, geometric aesthetic.

**Elements with no radius:**
- Cards
- Containers
- Sections
- Dividers
- Static content blocks

```tsx
// React - Default no radius
<div className="bg-card border border-border p-4">
  Card content (no radius)
</div>
```

### Interactive Elements: 6px Radius

**Interactive elements** that users can click or interact with should use a **6px border radius** to provide visual feedback and improve usability.

**Interactive elements that use 6px radius:**
- Buttons (all types)
- Clickable cards
- Interactive tiles
- Clickable list items
- Tabs
- Navigation items

```tsx
// React - Button with 6px radius
<button className="bg-primary text-primary-foreground rounded-[6px] px-4 py-2">
  Click me
</button>

// React - Clickable card with 6px radius
<div className="bg-card border border-border rounded-[6px] p-4 cursor-pointer hover:bg-muted">
  Clickable card
</div>
```

### Form Inputs: 4px Radius

**Form input elements** should use a **4px border radius** to provide subtle visual softening while maintaining a clean, professional appearance.

**Form elements that use 4px radius:**
- Text inputs
- Textareas
- Select dropdowns
- Search inputs
- Number inputs
- Date pickers

```tsx
// React - Form input with 4px radius
<input 
  type="text" 
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-ring"
  placeholder="Enter text"
/>

// React - Textarea with 4px radius
<textarea 
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-ring"
  rows={4}
/>
```

---

## Common Border Patterns

### Card Borders

Cards use subtle borders to define boundaries when spacing alone isn't sufficient.

```tsx
// React - Card with border
<div className="bg-card border border-border p-6">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

### Form Input Borders

Form inputs use borders to define their boundaries and indicate focus states.

```tsx
// React - Form input with border
<input 
  type="text"
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-2 focus:ring-ring"
/>
```

### Divider Borders

Use borders to create visual dividers between sections when spacing is insufficient.

```tsx
// React - Horizontal divider
<div className="border-t border-border my-6"></div>

// React - Vertical divider
<div className="border-l border-border pl-6"></div>
```

### Focus Rings

Focus rings use borders (via Tailwind's `ring` utilities) to indicate keyboard focus.

```tsx
// React - Focus ring
<button className="bg-primary text-primary-foreground rounded-[6px] px-4 py-2 focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Focusable Button
</button>
```

### Error States

Error states use colored borders to indicate validation issues.

```tsx
// React - Input with error border
<input 
  type="text"
  className="bg-background border-2 border-destructive rounded-[4px] px-3 py-2"
  aria-invalid="true"
/>
```

---

## Usage Guidelines

### React Components

```tsx
// Card with border (no radius)
<div className="bg-card border border-border p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

// Clickable card with 6px radius
<div className="bg-card border border-border rounded-[6px] p-6 cursor-pointer hover:bg-muted">
  <h3>Clickable Card</h3>
  <p>Click to interact</p>
</div>

// Form input with 4px radius
<input 
  type="text"
  className="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-2 focus:ring-ring"
/>

// Button with 6px radius
<button className="bg-primary text-primary-foreground rounded-[6px] px-4 py-2">
  Submit
</button>
```

### Vue Components

```vue
<!-- Card with border (no radius) -->
<div class="bg-card border border-border p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<!-- Clickable card with 6px radius -->
<div class="bg-card border border-border rounded-[6px] p-6 cursor-pointer hover:bg-muted">
  <h3>Clickable Card</h3>
  <p>Click to interact</p>
</div>

<!-- Form input with 4px radius -->
<input 
  type="text"
  class="bg-background border border-input rounded-[4px] px-3 py-2 focus:ring-2 focus:ring-ring"
/>

<!-- Button with 6px radius -->
<button class="bg-primary text-primary-foreground rounded-[6px] px-4 py-2">
  Submit
</button>
```

---

## Best Practices

### ✅ Do's

1. **Use borders purposefully**
   - ✅ Only when spacing alone is insufficient
   - ✅ To create clear separation between distinct sections
   - ✅ To define interactive element boundaries

2. **Follow border width guidelines**
   - ✅ Use 1px for most borders
   - ✅ Use 2px for emphasized borders
   - ✅ Use 3-4px only for special cases (focus rings)

3. **Apply border radius correctly**
   - ✅ Use 0px (no radius) for static content
   - ✅ Use 6px for interactive elements (buttons, clickable cards)
   - ✅ Use 4px for form inputs

4. **Ensure accessibility**
   - ✅ Verify border contrast meets WCAG 2.1 Level AA (3:1 ratio)
   - ✅ Test borders in both light and dark modes
   - ✅ Ensure borders are visible and distinguishable

5. **Use semantic color tokens**
   - ✅ Always use `border-border` for standard borders
   - ✅ Use `border-input` for form input borders
   - ✅ Use `border-destructive` for error states

### ❌ Don'ts

1. **Don't overuse borders**
   - ❌ Don't add borders when spacing creates sufficient separation
   - ❌ Don't use borders for decorative purposes
   - ❌ Don't create visual clutter with excessive borders

2. **Don't use non-solid borders**
   - ❌ Don't use dashed borders
   - ❌ Don't use dotted borders
   - ❌ Always use solid lines

3. **Don't ignore border radius guidelines**
   - ❌ Don't add radius to static content unnecessarily
   - ❌ Don't use inconsistent radius values
   - ❌ Don't use radius values outside the specified guidelines (0px, 4px, 6px)

4. **Don't break accessibility**
   - ❌ Don't use low-contrast borders
   - ❌ Don't rely solely on borders for information (use other indicators)
   - ❌ Don't ignore contrast requirements

5. **Don't hardcode border values**
   - ❌ Don't use hardcoded border colors
   - ❌ Don't use arbitrary border widths
   - ❌ Always use semantic tokens and Tailwind utilities

---

## Examples

### ✅ Good: Purposeful Border Usage

```tsx
// React - Card with border for clear separation
<div className="bg-card border border-border p-6 mb-6">
  <h3>Section Title</h3>
  <p>Content that needs clear boundaries</p>
</div>

// React - Form input with appropriate border and radius
<input 
  type="text"
  className="bg-background border border-input rounded-[4px] px-3 py-2"
/>

// React - Clickable card with border and 6px radius
<div className="bg-card border border-border rounded-[6px] p-6 cursor-pointer hover:bg-muted">
  <h3>Clickable Item</h3>
</div>
```

### ❌ Bad: Unnecessary or Incorrect Borders

```tsx
// Don't do this - unnecessary border when spacing is sufficient
<div className="space-y-4">
  <div className="border-b border-border pb-4">
    <h3>Section 1</h3>
  </div>
  <div className="pt-4">
    <h3>Section 2</h3>
  </div>
</div>

// Don't do this - wrong border radius for static content
<div className="bg-card border border-border rounded-[6px] p-6">
  <h3>Static Card</h3>
  <p>This should have no radius</p>
</div>

// Don't do this - wrong border radius for form input
<input 
  type="text"
  className="bg-background border border-input rounded-[6px] px-3 py-2"
/>
```

### ✅ Good: Using Spacing Instead of Borders

```tsx
// React - Using spacing for separation (preferred)
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

---

## Integration with Design System

### Color Tokens

Borders use the following semantic color tokens from `@kuat/core/src/variables.css`:

- **`--border`:** Default border color (slate-200 in light, slate-700 in dark)
- **`--input`:** Form input border color
- **`--ring`:** Focus ring color
- **`--destructive`:** Error state border color

### Tailwind Utilities

The design system provides the following Tailwind utilities for borders:

- **Border width:** `border`, `border-2`, `border-4`
- **Border color:** `border-border`, `border-input`, `border-destructive`
- **Border radius:** `rounded-[0px]`, `rounded-[4px]`, `rounded-[6px]`
- **Focus rings:** `focus:ring-2`, `focus:ring-ring`

---

## Additional Resources

- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Color Guide:** See [colours.md](./colours.md) for border color tokens and usage
- **Component Guidelines:** See [component-guidelines.md](./component-guidelines.md) for component border patterns
- **shadcn/ui Borders:** [shadcn/ui Component Documentation](https://ui.shadcn.com/docs/components)
- **Tailwind Borders:** [Tailwind CSS Border Documentation](https://tailwindcss.com/docs/border-width)

---

## Notes

- **Minimal Philosophy:** Borders should be used sparingly—prefer spacing and visual hierarchy
- **Consistent Radius:** Use 0px, 4px, or 6px only—no arbitrary values
- **Accessibility First:** Always verify border contrast meets WCAG 2.1 Level AA standards
- **Semantic Tokens:** Always use design system color tokens for borders
- **Purpose-Driven:** Every border should have a clear purpose for separation or definition

