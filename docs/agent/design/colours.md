# Kuat Design System Color Guide

A guide to using colors in the Kuat Design System. This document helps ensure consistent, accessible, and brand-compliant color usage across all digital products built with shadcn/ui and shadcn-vue.

---

## Brand Colors

The Kuat Design System is built around four core brand color palettes, each with a specific purpose and meaning. Understanding when and how to use these colors is essential for maintaining brand consistency.

### Primary Brand Color: EE Blue

**EE Blue** (`--brand-ee-blue`) is the primary brand color, representing trust, professionalism, and technology. It's used for:

- **Primary actions:** Main buttons, links, and call-to-action elements
- **Brand identity:** Logos, headers, and key brand elements
- **Navigation:** Active states, selected items, and primary navigation
- **Focus states:** Focus rings and active indicators

**Color Value:** `oklch(0.645 0.163 237.5)` - A vibrant, professional blue

**Usage Guidelines:**
- Use as the `primary` semantic token for main actions
- Always pair with `primary-foreground` (white) for text on EE Blue backgrounds
- Use lighter shades (50-200) for subtle backgrounds and accents
- Use darker shades (700-950) for depth and contrast in dark mode

### Secondary Brand Color: Transform Teal

**Transform Teal** (`--brand-transform-teal`) represents transformation, growth, and innovation. It's used for:

- **Secondary actions:** Alternative buttons and secondary call-to-actions
- **Accent elements:** Highlights, badges, and secondary information
- **Progressive states:** Success indicators, positive feedback, and growth metrics

**Color Value:** `oklch(0.645 0.120 185.0)` - A fresh, modern teal

**Usage Guidelines:**
- Use as the `secondary` semantic token for secondary actions
- Always pair with `secondary-foreground` (white) for text on Transform Teal backgrounds
- Works well for data visualization and chart elements
- Use sparingly to maintain visual hierarchy

### Supporting Brand Color: Tech Blue

**Tech Blue** (`--brand-tech-blue`) is a deeper, more technical blue used for:

- **Sidebar navigation:** Primary sidebar backgrounds and navigation elements
- **Technical interfaces:** Developer tools, technical documentation, and code-related UI
- **Depth and structure:** Cards and containers in dark mode

**Color Value:** `oklch(0.435 0.090 240.0)` - A sophisticated, technical blue

**Usage Guidelines:**
- Primarily used for sidebar components (`--sidebar`)
- Works well in dark mode for card backgrounds (`--card` in dark mode)
- Use darker shades (700-950) for depth and contrast
- Maintains technical, professional aesthetic

### Accent Brand Color: Equal Ember

**Equal Ember** (`--brand-equal-ember`) is a warm, energetic orange used for:

- **Special highlights:** Important notices, warnings, and attention-grabbing elements
- **Energy and warmth:** Adding personality and warmth to the interface
- **Status indicators:** Warning states and special notifications

**Color Value:** `oklch(0.625 0.200 65.0)` - A vibrant, energetic orange

**Usage Guidelines:**
- Use sparingly for maximum impact
- Best for warning states and special highlights
- Not used in default semantic tokens, but available for custom use cases
- Maintains brand warmth and energy

### Brand Color Palette Structure

Each brand color palette includes a full scale from 50 (lightest) to 950 (darkest), providing flexibility for various use cases:

- **50-200:** Light backgrounds, subtle accents, and hover states
- **300-500:** Primary brand colors and main actions
- **600-800:** Darker variants for depth and contrast
- **900-950:** Maximum depth for dark mode and high contrast

All brand colors are available as CSS variables: `--ee-blue-*`, `--tech-blue-*`, `--transform-teal-*`, `--equal-ember-*`

---

## Color Specification

### Semantic Color Tokens

The design system uses **semantic color tokens** that map brand colors to UI purposes. This abstraction allows for consistent theming while maintaining brand identity.

| Token | CSS Variable | Brand Color Source | Tailwind Class | Usage |
|-------|-------------|-------------------|----------------|-------|
| Background | `--background` | White (light) / Slate-900 (dark) | `bg-background` | Page and component backgrounds |
| Foreground | `--foreground` | Slate-950 (light) / White (dark) | `text-foreground` | Primary text color |
| Primary | `--primary` | EE Blue 500 | `bg-primary`, `text-primary` | Primary brand color, main actions |
| Primary Foreground | `--primary-foreground` | White | `text-primary-foreground` | Text on primary backgrounds |
| Secondary | `--secondary` | Transform Teal 500 | `bg-secondary`, `text-secondary` | Secondary brand color |
| Secondary Foreground | `--secondary-foreground` | White | `text-secondary-foreground` | Text on secondary backgrounds |
| Muted | `--muted` | Slate-100 | `bg-muted` | Subtle backgrounds, disabled states |
| Muted Foreground | `--muted-foreground` | Slate-500 (light) / Slate-300 (dark) | `text-muted-foreground` | Secondary text, hints, metadata |
| Accent | `--accent` | EE Blue 50 (light) / EE Blue 800 (dark) | `bg-accent`, `text-accent` | Accent color for highlights |
| Accent Foreground | `--accent-foreground` | Slate-950 | `text-accent-foreground` | Text on accent backgrounds |
| Destructive | `--destructive` | Red-600 | `bg-destructive`, `text-destructive` | Error states, destructive actions |
| Destructive Foreground | `--destructive-foreground` | White | `text-destructive-foreground` | Text on destructive backgrounds |
| Border | `--border` | Slate-200 (light) / Slate-700 (dark) | `border-border` | Borders, dividers, outlines |
| Input | `--input` | White (light) / Slate-600 (dark) | `border-input` | Input field borders |
| Ring | `--ring` | Slate-300 | `ring-ring` | Focus rings, active states |

### Component-Specific Colors

#### Card Colors
- **Card:** `--card` - White (light) / Tech Blue 800 (dark)
- **Card Foreground:** `--card-foreground` - Slate-950

#### Popover Colors
- **Popover:** `--popover` - Black
- **Popover Foreground:** `--popover-foreground` - White

#### Sidebar Colors
- **Sidebar:** `--sidebar` - Tech Blue 500 (light) / Tech Blue 700 (dark)
- **Sidebar Foreground:** `--sidebar-foreground` - White
- **Sidebar Primary:** `--sidebar-primary` - EE Blue 500
- **Sidebar Primary Foreground:** `--sidebar-primary-foreground` - EE Blue 50
- **Sidebar Accent:** `--sidebar-accent` - Slate-200 (light) / EE Blue 700 (dark)
- **Sidebar Accent Foreground:** `--sidebar-accent-foreground` - Tech Blue 500
- **Sidebar Border:** `--sidebar-border` - Slate-200
- **Sidebar Ring:** `--sidebar-ring` - Slate-100

#### Chart Colors
- **Chart 1:** `--chart-1` - Blue (`#1f77b4`)
- **Chart 2:** `--chart-2` - Orange (`#ff7f0e`)
- **Chart 3:** `--chart-3` - Green (`#2ca02c`)
- **Chart 4:** `--chart-4` - Red (`#d62728`)
- **Chart 5:** `--chart-5` - Purple (`#9467bd`)

### Color Format

All colors in the design system use the **oklch** color space for better color manipulation and consistency. OKLCH provides:

- **Perceptual uniformity:** Equal changes in values correspond to equal changes in perception
- **Better color manipulation:** Easier to create consistent color scales
- **Future-proof:** Modern CSS color format with excellent browser support

**Example:**
```css
--primary: oklch(0.645 0.163 237.5);
/* Lightness: 0.645, Chroma: 0.163, Hue: 237.5° */
```

### Light and Dark Mode

All semantic tokens automatically adapt to light and dark modes. The system uses:

- **Light Mode:** Defined in `:root` selector
- **Dark Mode:** Defined in `.dark` selector

Color values switch automatically when the `.dark` class is applied to the root element.

---

## Usage Guidelines

### Using Colors in Components

#### React Components

```tsx
// Using Tailwind classes (recommended)
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Primary Action
  </button>
  <button className="bg-secondary text-secondary-foreground">
    Secondary Action
  </button>
  <p className="text-muted-foreground">Secondary text</p>
  <div className="border-destructive text-destructive">Error message</div>
</div>
```

#### Vue Components

```vue
<template>
  <div class="bg-background text-foreground border-border">
    <button class="bg-primary text-primary-foreground hover:bg-primary/90">
      Primary Action
    </button>
    <button class="bg-secondary text-secondary-foreground">
      Secondary Action
    </button>
    <p class="text-muted-foreground">Secondary text</p>
    <div class="border-destructive text-destructive">Error message</div>
  </div>
</template>
```

#### Using CSS Variables Directly

```css
.custom-element {
  background-color: var(--background);
  color: var(--foreground);
  border-color: var(--border);
}
```

**Note:** Colors are defined in oklch format, so they work directly with CSS variables. No conversion needed.

### Component-Specific Color Usage

#### Buttons

**Primary Button:**
- Background: `bg-primary` (EE Blue)
- Text: `text-primary-foreground` (White)
- Hover: `hover:bg-primary/90` (90% opacity)
- Active: `active:bg-primary/80` (80% opacity)
- Disabled: `disabled:opacity-50`

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
  Primary Button
</button>
```

**Secondary Button:**
- Background: `bg-secondary` (Transform Teal)
- Text: `text-secondary-foreground` (White)
- Hover: `hover:bg-secondary/90`

```tsx
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
  Secondary Button
</button>
```

**Destructive Button:**
- Background: `bg-destructive` (Red-600)
- Text: `text-destructive-foreground` (White)
- Hover: `hover:bg-destructive/90`

```tsx
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</button>
```

#### Links

**Default Link:**
- Color: `text-primary` (EE Blue)
- Hover: `hover:underline` or `hover:text-primary/80`

```tsx
<a href="#" className="text-primary hover:underline">
  Link text
</a>
```

#### Form Inputs

**Input Field:**
- Background: `bg-background`
- Border: `border-input`
- Focus Ring: `ring-ring`
- Text: `text-foreground`

```tsx
<input className="bg-background border-input text-foreground focus:ring-ring" />
```

#### Cards

**Card Component:**
- Background: `bg-card`
- Text: `text-card-foreground`
- Border: `border-border`

```tsx
<div className="bg-card text-card-foreground border-border rounded-lg p-4">
  Card content
</div>
```

#### Status Indicators

**Error:**
- Color: `text-destructive`
- Background: `bg-destructive/10` (10% opacity)

```tsx
<div className="bg-destructive/10 text-destructive border-destructive">
  Error message
</div>
```

**Info:**
- Color: `text-primary`
- Background: `bg-primary/10`

```tsx
<div className="bg-primary/10 text-primary border-primary">
  Information
</div>
```

### Dark Mode

All colors automatically adapt to dark mode when the `.dark` class is applied to the root element.

**Enabling Dark Mode:**

```tsx
// Add dark class to root element
<html className="dark">
  {/* content */}
</html>
```

**Dark Mode Behavior:**
- Background switches from white to slate-900
- Foreground switches from slate-950 to white
- Brand colors (primary, secondary) remain consistent
- Supporting colors (muted, border) adapt for better contrast
- All semantic tokens automatically switch

### Accessibility

The design system adheres to **WCAG AA accessibility standards** for color contrast:

- **Normal text (14px and below):** Minimum contrast ratio of **4.5:1**
- **Large text (18px+ or 14px+ bold):** Minimum contrast ratio of **3:1**

**Approved Color Combinations:**

✅ **Text on Backgrounds:**
- `text-foreground` on `bg-background` - Meets WCAG AA
- `text-primary-foreground` on `bg-primary` - Meets WCAG AA
- `text-secondary-foreground` on `bg-secondary` - Meets WCAG AA
- `text-muted-foreground` on `bg-muted` - Meets WCAG AA
- `text-destructive-foreground` on `bg-destructive` - Meets WCAG AA

✅ **Borders:**
- `border-border` provides sufficient contrast on `bg-background`
- `border-input` provides sufficient contrast for form fields

**Testing Contrast:**

Always test color combinations to ensure they meet accessibility standards. Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools accessibility features
- Automated accessibility testing tools

### Best Practices

#### ✅ Do's

1. **Use semantic color tokens**
   - ✅ Always use CSS variables or Tailwind classes (`bg-primary`, `text-foreground`)
   - ✅ Use `-foreground` variants for text on colored backgrounds
   - ✅ Leverage automatic dark mode support

2. **Maintain brand consistency**
   - ✅ Use `primary` (EE Blue) for main brand actions
   - ✅ Use `secondary` (Transform Teal) for secondary actions
   - ✅ Use brand colors consistently across the application
   - ✅ Respect the brand color hierarchy

3. **Ensure accessibility**
   - ✅ Always use foreground variants on colored backgrounds
   - ✅ Test contrast ratios meet WCAG AA standards
   - ✅ Don't rely solely on color to convey information

4. **Use opacity modifiers**
   - ✅ Use Tailwind opacity utilities (`/90`, `/50`, `/10`) for hover states
   - ✅ Example: `hover:bg-primary/90` for 90% opacity

5. **Follow component patterns**
   - ✅ Use shadcn/ui component color patterns
   - ✅ Maintain consistent color relationships across states

#### ❌ Don'ts

1. **Don't hardcode colors**
   - ❌ Don't use hex values directly (`#1795d4`)
   - ❌ Don't use RGB values directly
   - ❌ Don't create custom color values outside the token system

2. **Don't ignore semantic tokens**
   - ❌ Don't use `text-foreground` on `bg-primary` (use `text-primary-foreground`)
   - ❌ Don't mix color systems (don't combine tokens with hardcoded colors)

3. **Don't break accessibility**
   - ❌ Don't use low-contrast combinations
   - ❌ Don't rely solely on color to convey information
   - ❌ Don't ignore dark mode considerations

4. **Don't misuse brand colors**
   - ❌ Don't use brand colors in ways that conflict with their meaning
   - ❌ Don't create custom variations of brand colors
   - ❌ Don't use brand colors for non-brand purposes

5. **Don't create custom color variations**
   - ❌ Don't modify color tokens without updating `@kuat/core`
   - ❌ Don't create new color tokens outside the system

### Examples

#### ✅ Good: Using Semantic Tokens

```tsx
// React
<div className="bg-background text-foreground">
  <h1 className="text-primary">Heading</h1>
  <p className="text-muted-foreground">Secondary text</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Action
  </button>
</div>
```

```vue
<!-- Vue -->
<template>
  <div class="bg-background text-foreground">
    <h1 class="text-primary">Heading</h1>
    <p class="text-muted-foreground">Secondary text</p>
    <button class="bg-primary text-primary-foreground hover:bg-primary/90">
      Action
    </button>
  </div>
</template>
```

#### ❌ Bad: Hardcoded Colors

```tsx
// Don't do this
<div style={{ backgroundColor: '#ffffff', color: '#020617' }}>
  <button style={{ backgroundColor: '#1795d4', color: '#ffffff' }}>
    Action
  </button>
</div>
```

#### ✅ Good: Accessible Color Combinations

```tsx
// Proper foreground/background pairing
<button className="bg-primary text-primary-foreground">
  Primary Action
</button>

<div className="bg-destructive text-destructive-foreground">
  Error Message
</div>
```

#### ❌ Bad: Inaccessible Combinations

```tsx
// Wrong - using foreground on primary background
<button className="bg-primary text-foreground">
  Action
</button>

// Should be:
<button className="bg-primary text-primary-foreground">
  Action
</button>
```

---

## Modifying Colors

To modify colors in the design system:

1. **Edit `@kuat/core/src/variables.css`**
   - Update the oklch values in `:root` (light mode)
   - Update the oklch values in `.dark` (dark mode)
   - Maintain brand color relationships

2. **Rebuild packages**
   ```bash
   pnpm build
   ```

3. **Test accessibility**
   - Verify contrast ratios meet WCAG AA standards
   - Test in both light and dark modes
   - Ensure brand consistency is maintained

4. **Update documentation**
   - Update this file if color meanings change
   - Update component examples if needed

---

## Additional Resources

- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Typography Guide:** See [typography.md](./typography.md) for text color usage
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component color patterns
- **shadcn/ui Colors:** [shadcn/ui Theming Documentation](https://ui.shadcn.com/docs/theming)
- **Tailwind Colors:** [Tailwind CSS Color Documentation](https://tailwindcss.com/docs/customizing-colors)

---

## Notes

- **Color Format:** Colors use oklch format for better color manipulation and consistency
- **CSS Variables:** All colors are available as CSS variables in `@kuat/core/src/variables.css`
- **Tailwind Integration:** Colors are exposed via Tailwind utility classes
- **Dark Mode:** All colors automatically adapt when `.dark` class is applied
- **Accessibility:** All color combinations are designed to meet WCAG AA standards
- **Semantic Tokens:** Always use semantic color names rather than specific color values
- **Brand First:** Brand colors guide the system; semantic tokens provide the implementation layer
