# Kuat Design System Logo Usage

A guide to using the Equal Experts logo in the Kuat Design System. This document helps ensure proper logo usage, brand consistency, and accessibility across all digital products built with shadcn/ui and shadcn-vue.

---

## Overview

The Equal Experts logo is a core brand asset that must be used consistently and correctly. This guide provides specifications for logo usage in digital interfaces, ensuring brand recognition and maintaining visual integrity.

**Key Principle:** Always use official logo assets. Never recreate, modify, or distort the logo. When in doubt, use the full-color version with adequate clear space.

---

## Logo Composition

The Equal Experts logo consists of two elements that work together:

- **Brand mark**: Square brackets containing an equals sign `[=]` in blue
- **Wordmark**: "EQUAL EXPERTS" text in dark gray/charcoal

These elements should **always** be used together unless space constraints require the brand mark only.

---

## Logo Specifications

### Minimum Size Requirements

The logo must maintain readability and visual impact:

- **Digital**: 100px wide minimum
- **Print**: 26.5mm wide minimum

**Never scale the logo below these minimums.** If space is constrained, use the brand mark only rather than shrinking the full logo.

### Clear Space

The logo requires adequate breathing room to maintain visual prominence and brand recognition.

**Clear space requirement:** Equal to the width of one bracket and the equals sign from the brand mark on all sides.

```tsx
// React - Logo with adequate clear space
<div className="p-[clear-space-width]">
  <img src="/logo.svg" alt="Equal Experts" className="w-[100px] min-w-[100px]" />
</div>
```

```vue
<!-- Vue - Logo with adequate clear space -->
<div class="p-[clear-space-width]">
  <img src="/logo.svg" alt="Equal Experts" class="w-[100px] min-w-[100px]" />
</div>
```

### Aspect Ratio

The logo maintains a specific aspect ratio. **Never distort or stretch** the logo to fit different dimensions.

---

## Color Variants

### Primary (Full Color) - Default

The full-color logo is the **preferred and default** version for all digital applications.

- **Brand mark**: Blue (#1A9FD9 or similar)
- **Wordmark**: Dark gray/charcoal
- **Background**: White or light-colored backgrounds

**Usage:**
- Use by default in all digital interfaces
- Works on white, light gray, and light-colored backgrounds
- Provides maximum brand recognition

### Monochrome Versions

White and black monochrome versions are available for specific use cases.

**Use monochrome versions only when:**
1. **Contrast requirements**: Background colors would compromise legibility of the full-color version
2. **Partner requests**: Partner organizations specifically request monochrome usage
3. **Technical limitations**: Platform or technical constraints prevent full-color usage

**Monochrome Usage Guidelines:**
- **White logo**: Use on dark backgrounds (dark blue, black, dark gray)
- **Black logo**: Use on very light backgrounds when full-color isn't available

---

## Logo Variations

### Full Logo (Preferred)

The complete logo with both brand mark and wordmark is the **standard and preferred** version.

**Use the full logo:**
- In headers and navigation
- On landing pages and marketing materials
- In documentation and presentations
- Anywhere brand recognition is important

### Brand Mark Only

The brand mark (bracket-equals symbol only, without text) should **only** be used when:

1. **Space constraints**: Space is severely limited (e.g., favicons, small icons)
2. **Shape requirements**: The logo must fit within a square or circular shape
3. **Decorative use**: Used as a decorative design element in presentations
4. **Context clarity**: The context makes it clear this represents Equal Experts

**Never use the wordmark alone** (text without the brand mark).

---

## Usage Guidelines

### ✅ Do's

1. **Use official assets**
   - ✅ Always use official logo files from brand resources
   - ✅ Reference proper logo files rather than recreating
   - ✅ Download SVG format for digital use when available

2. **Maintain size requirements**
   - ✅ Ensure minimum size requirements are met (100px/26.5mm)
   - ✅ Scale proportionally when resizing
   - ✅ Use brand mark only if space is constrained below minimum

3. **Provide adequate spacing**
   - ✅ Include clear space equal to bracket+equals width on all sides
   - ✅ Place logo prominently where it can be easily recognized
   - ✅ Avoid placing in corners or edges without adequate padding

4. **Choose appropriate variants**
   - ✅ Use full-color version by default
   - ✅ Use monochrome versions only when necessary for contrast
   - ✅ Assess background contrast before choosing variant

5. **Ensure accessibility**
   - ✅ Maintain sufficient contrast between logo and background
   - ✅ Never place on busy backgrounds where legibility is compromised
   - ✅ Test logo visibility in both light and dark modes

### ❌ Don'ts

1. **Don't transform the logo**
   - ❌ Never rotate any part of the logo
   - ❌ Never distort or skew the logo
   - ❌ Never change the layout or spatial relationship between mark and wordmark
   - ❌ Never change transparency or opacity

2. **Don't modify colors**
   - ❌ Never use different colors than specified (except approved monochrome)
   - ❌ Never recreate the logo with different fonts
   - ❌ Never add shadows, gradients, or other effects

3. **Don't alter composition**
   - ❌ Never add extra words or taglines to the logo
   - ❌ Never use the wordmark alone (text without the brand mark)
   - ❌ Never separate elements unnecessarily

4. **Don't compromise visibility**
   - ❌ Never place on busy backgrounds where legibility is compromised
   - ❌ Never scale below minimum size requirements
   - ❌ Never overlay on complex imagery or patterns without proper contrast

5. **Don't create variations**
   - ❌ Never create custom color variations
   - ❌ Never add decorative elements or modifications
   - ❌ Never recreate the logo programmatically

---

## Implementation Examples

### React Components

```tsx
// Header with full-color logo
<header className="bg-white p-6">
  <img 
    src="/logo.svg" 
    alt="Equal Experts" 
    className="w-[120px] min-w-[100px] h-auto" 
  />
</header>

// Footer with logo (adequate spacing)
<footer className="bg-slate-900 p-8">
  <div className="p-4"> {/* Clear space */}
    <img 
      src="/logo-white.svg" 
      alt="Equal Experts" 
      className="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>

// Brand mark only (when space is limited)
<div className="w-8 h-8">
  <img 
    src="/logo-mark-only.svg" 
    alt="Equal Experts" 
    className="w-full h-full" 
  />
</div>
```

### Vue Components

```vue
<!-- Header with full-color logo -->
<header class="bg-white p-6">
  <img 
    src="/logo.svg" 
    alt="Equal Experts" 
    class="w-[120px] min-w-[100px] h-auto" 
  />
</header>

<!-- Footer with logo (adequate spacing) -->
<footer class="bg-slate-900 p-8">
  <div class="p-4"> <!-- Clear space -->
    <img 
      src="/logo-white.svg" 
      alt="Equal Experts" 
      class="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>

<!-- Brand mark only (when space is limited) -->
<div class="w-8 h-8">
  <img 
    src="/logo-mark-only.svg" 
    alt="Equal Experts" 
    class="w-full h-full" 
  />
</div>
```

---

## Best Practices

### Layout Placement

1. **Headers and Navigation**
   - Place logo prominently in the top-left or top-center
   - Ensure adequate padding from edges
   - Maintain consistent placement across pages

2. **Footers**
   - Use appropriate variant based on background color
   - Maintain clear space requirements
   - Consider smaller size if space is limited

3. **Marketing Materials**
   - Use full-color logo by default
   - Ensure prominent placement
   - Maintain brand recognition

### Background Considerations

1. **Light Backgrounds**
   - Use full-color logo (default)
   - Ensure adequate contrast
   - Test readability

2. **Dark Backgrounds**
   - Use white monochrome version
   - Verify contrast meets accessibility standards
   - Test in both light and dark modes

3. **Colored Backgrounds**
   - Assess contrast before choosing variant
   - Use monochrome if full-color lacks contrast
   - Never compromise legibility

### Size Considerations

1. **Desktop Interfaces**
   - Use 120px-150px width for headers
   - Maintain minimum 100px width
   - Provide adequate clear space

2. **Mobile Interfaces**
   - May use brand mark only if space is constrained
   - Never go below 100px for full logo
   - Ensure touch target sizes are maintained

3. **Icons and Favicons**
   - Use brand mark only
   - Maintain recognizable shape
   - Test at various sizes

---

## Accessibility

### Contrast Requirements

The logo must maintain sufficient contrast against its background:

- **Full-color logo**: Works on white and light backgrounds
- **White monochrome**: Use on dark backgrounds (WCAG AA contrast)
- **Black monochrome**: Use on very light backgrounds

### Alt Text

Always provide descriptive alt text for logo images:

```tsx
// React
<img src="/logo.svg" alt="Equal Experts" />

// Vue
<img src="/logo.svg" alt="Equal Experts" />
```

### Responsive Considerations

- Ensure logo remains readable at all screen sizes
- Consider using brand mark only on very small screens if necessary
- Never sacrifice minimum size requirements for responsive design

---

## Resources

### Official Logo Assets

- **Primary Logo (SVG)**: [Equal Experts Logo](https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg)
- **Brand Guidelines**: Refer to official Equal Experts brand guidelines for complete specifications

### Implementation Notes

1. **Asset Format**: Prefer SVG for digital use (scalable, crisp at all sizes)
2. **File Naming**: Use descriptive names (e.g., `logo-full-color.svg`, `logo-white.svg`, `logo-mark-only.svg`)
3. **Storage**: Store logo assets in project `public/` or `assets/` directory
4. **Version Control**: Include logo assets in version control or reference from CDN

---

## Integration with Design System

### Spacing

Logo clear space should align with the design system's 8-point grid:

- Calculate clear space based on bracket+equals width
- Round to nearest 8px increment for consistency
- Use design system spacing utilities when possible

### Color Tokens

When placing logos on design system backgrounds:

- **Light backgrounds**: Use `bg-background` or `bg-card` with full-color logo
- **Dark backgrounds**: Use `bg-slate-900` or `bg-slate-950` with white monochrome logo
- **Brand backgrounds**: Use EE Blue (`bg-primary`) with white monochrome logo

---

## Additional Resources

- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Color Guide:** See [colours.md](./colours.md) for brand color specifications
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component patterns
- **Equal Experts Brand Guidelines:** Refer to official brand documentation for complete logo specifications

---

## Notes

- **Brand Asset Protection:** The Equal Experts logo is a valuable brand asset—always use official files
- **Consistency First:** When in doubt, use the full-color logo with adequate clear space
- **Size Priority:** Never compromise minimum size requirements—use brand mark only if space is constrained
- **Accessibility Always:** Ensure logo contrast meets WCAG standards in all contexts
- **Official Assets Only:** Never recreate or modify the logo—always use official brand resources