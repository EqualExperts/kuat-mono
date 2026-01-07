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

### Primary (Default) Logos

The primary logos are the **preferred and default** versions for all digital applications. Choose the correct logo based on background color to ensure contrast ratio compliance.

**Primary Logo Files:**
- **[logo-colour.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg)** - Full color logo with blue brand mark and dark wordmark
  - **Use on**: Light backgrounds (white, light gray, light-colored backgrounds)
  - **Brand mark**: Blue (#1A9FD9 or similar)
  - **Wordmark**: Dark gray/charcoal
  - **Usage**: Default choice for most digital interfaces

- **[logo-white-text.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg)** - Full color logo with blue brand mark and white wordmark
  - **Use on**: Dark backgrounds that have enough contrast with the blue brand mark
  - **Brand mark**: Blue (#1A9FD9 or similar)
  - **Wordmark**: White
  - **Usage**: Preferred option for dark backgrounds when the blue brand mark maintains sufficient contrast. If there is not enough copntrast, use a monchrome version.

**Key Principle:** Always prefer primary logos over monochrome versions. Primary logos provide maximum brand recognition and should be used whenever possible.

### Monochrome Versions (Secondary)

Monochrome versions are **secondary** and should only be used when necessary. These are available for specific use cases where primary logos cannot be used.

**Use monochrome versions only when:**
1. **Contrast requirements**: Background colors would compromise legibility of the primary logo versions
2. **Partner requests**: Partner organizations specifically request monochrome usage
3. **Technical limitations**: Platform or technical constraints prevent full-color usage

**Monochrome Logo Files:**
- **[logo-monochrome-white.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg)** - White monochrome logo
  - **Use on**: Dark backgrounds (dark blue, black, dark gray) when primary logo contrast is insufficient
  - **Usage**: Secondary option for dark backgrounds

- **[logo-monochrome-black.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-black.svg)** - Black monochrome logo
  - **Use on**: Very light backgrounds when primary logo isn't available and monochrome is required
  - **Usage**: Secondary option for light backgrounds when monochrome is specifically needed

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

The brand mark is the Equal Experts logo without the company name (bracket-equals symbol only, without text). Brand mark variants should **only** be used when:

1. **Space constraints**: Space is severely limited (e.g., favicons, small icons)
2. **Shape requirements**: The logo must fit within a square or circular shape
3. **Decorative use**: Used as a decorative design element in presentations
4. **Context clarity**: The context makes it clear this represents Equal Experts

**Brand Mark Files:**
All brand mark variants are available in the [GitHub brand-assets repository](https://github.com/EqualExperts/brand-assets/tree/master/logo) with filenames starting with `brand-mark-...`. 
These include:
- [White in a blue circle](https://github.com/EqualExperts/brand-assets/blob/master/logo/brand-mark-blue-circle.svg)
- [Blue in a white circle](https://github.com/EqualExperts/brand-assets/blob/master/logo/brand-mark-blue-over-white-circle.svg)
- [Blue without circle](https://github.com/EqualExperts/brand-assets/blob/master/logo/brand-mark-blue.svg)
- [White without circle](https://github.com/EqualExperts/brand-assets/blob/master/logo/brand-mark-monochrome-white.svg)

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
   - ✅ Use primary logos (`logo-colour.svg` or `logo-white-text.svg`) by default
   - ✅ Choose logo based on background color to ensure contrast compliance
   - ✅ Use monochrome versions only when necessary for contrast or when specifically requested
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
// Header with primary logo on light background
<header className="bg-white p-6">
  <img 
    src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg" 
    alt="Equal Experts" 
    className="w-[120px] min-w-[100px] h-auto" 
  />
</header>

// Footer with primary logo on dark background (white text version)
<footer className="bg-slate-900 p-8">
  <div className="p-4"> {/* Clear space */}
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg" 
      alt="Equal Experts" 
      className="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>

// Monochrome logo on dark background (when primary logo contrast is insufficient)
<footer className="bg-black p-8">
  <div className="p-4">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
      alt="Equal Experts" 
      className="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>

// Brand mark only (when space is limited)
<div className="w-8 h-8">
  <img 
    src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/brand-mark-colour.svg" 
    alt="Equal Experts" 
    className="w-full h-full" 
  />
</div>
```

### Vue Components

```vue
<!-- Header with primary logo on light background -->
<header class="bg-white p-6">
  <img 
    src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg" 
    alt="Equal Experts" 
    class="w-[120px] min-w-[100px] h-auto" 
  />
</header>

<!-- Footer with primary logo on dark background (white text version) -->
<footer class="bg-slate-900 p-8">
  <div class="p-4"> <!-- Clear space -->
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg" 
      alt="Equal Experts" 
      class="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>

<!-- Monochrome logo on dark background (when primary logo contrast is insufficient) -->
<footer class="bg-black p-8">
  <div class="p-4">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
      alt="Equal Experts" 
      class="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>

<!-- Brand mark only (when space is limited) -->
<div class="w-8 h-8">
  <img 
    src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/brand-mark-colour.svg" 
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
   - Use **[logo-colour.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg)** (primary logo with dark text)
   - Ensure adequate contrast
   - Test readability
   - Only use monochrome black if specifically required

2. **Dark Backgrounds**
   - **First choice**: Use **[logo-white-text.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg)** (primary logo with white text) when the blue brand mark maintains sufficient contrast
   - **Secondary choice**: Use **[logo-monochrome-white.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg)** (monochrome white) when primary logo contrast is insufficient
   - Verify contrast meets accessibility standards (WCAG AA)
   - Test in both light and dark modes

3. **Colored Backgrounds**
   - Assess contrast before choosing variant
   - Prefer primary logos (`logo-colour.svg` or `logo-white-text.svg`) when possible
   - Use monochrome versions only when primary logos lack sufficient contrast
   - Never compromise legibility
   - Always ensure contrast ratio compliance

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

The logo must maintain sufficient contrast against its background. Choose the correct logo variant to ensure WCAG AA contrast compliance:

- **Primary logos**: 
  - `logo-colour.svg` - Works on white and light backgrounds
  - `logo-white-text.svg` - Works on dark backgrounds when blue brand mark maintains sufficient contrast
- **Monochrome logos** (secondary, use only when necessary):
  - `logo-monochrome-white.svg` - Use on dark backgrounds when primary logo contrast is insufficient (WCAG AA contrast)
  - `logo-monochrome-black.svg` - Use on very light backgrounds when monochrome is specifically required

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

All logo files are publicly available in the [Equal Experts brand-assets GitHub repository](https://github.com/EqualExperts/brand-assets/tree/master/logo).

#### Primary Logos (Default)

- **[logo-colour.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg)** - Full color logo with blue brand mark and dark wordmark (for light backgrounds)
- **[logo-white-text.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg)** - Full color logo with blue brand mark and white wordmark (for dark backgrounds)

#### Monochrome Logos (Secondary)

- **[logo-monochrome-white.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg)** - White monochrome logo (for dark backgrounds when primary logo contrast is insufficient)
- **[logo-monochrome-black.svg](https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-black.svg)** - Black monochrome logo (for light backgrounds when monochrome is specifically required)

#### Brand Marks

All brand mark variants are available in the [logo directory](https://github.com/EqualExperts/brand-assets/tree/master/logo) with filenames starting with `brand-mark-...`. These include:
- `brand-mark-colour.svg` - Color brand mark
- `brand-mark-white-text.svg` - Brand mark with white text
- `brand-mark-monochrome-white.svg` - White monochrome brand mark
- `brand-mark-monochrome-black.svg` - Black monochrome brand mark

### GitHub Repository

- **Repository**: [EqualExperts/brand-assets](https://github.com/EqualExperts/brand-assets)
- **Logo Directory**: [logo/](https://github.com/EqualExperts/brand-assets/tree/master/logo)
- **Direct File Access**: Use `raw.githubusercontent.com` URLs for direct file access in code

### Implementation Notes

1. **Asset Format**: Prefer SVG for digital use (scalable, crisp at all sizes)
2. **File Naming**: Use official file names from the brand-assets repository
3. **Storage**: Store logo assets in project `public/` or `assets/` directory, or reference directly from GitHub
4. **Version Control**: Include logo assets in version control or reference from GitHub raw URLs
5. **CDN Usage**: GitHub raw URLs can be used directly as CDN links in production applications

---

## Integration with Design System

### Spacing

Logo clear space should align with the design system's 8-point grid:

- Calculate clear space based on bracket+equals width
- Round to nearest 8px increment for consistency
- Use design system spacing utilities when possible

### Color Tokens

When placing logos on design system backgrounds:

- **Light backgrounds**: Use `bg-background` or `bg-card` with `logo-colour.svg` (primary logo)
- **Dark backgrounds**: Use `bg-slate-900` or `bg-slate-950` with `logo-white-text.svg` (primary logo) or `logo-monochrome-white.svg` (if contrast requires)
- **Brand backgrounds**: Use EE Blue (`bg-primary`) with `logo-white-text.svg` (primary logo) or `logo-monochrome-white.svg` (if contrast requires)

---

## Additional Resources

- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Color Guide:** See [colours.md](./colours.md) for brand color specifications
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component patterns
- **Equal Experts Brand Guidelines:** Refer to official brand documentation for complete logo specifications

---

## Notes

- **Brand Asset Protection:** The Equal Experts logo is a valuable brand asset—always use official files from the [brand-assets repository](https://github.com/EqualExperts/brand-assets)
- **Consistency First:** When in doubt, use the primary logo (`logo-colour.svg` or `logo-white-text.svg`) with adequate clear space
- **Primary Over Monochrome:** Always prefer primary logos over monochrome versions for maximum brand recognition
- **Background-Based Selection:** Choose the correct logo variant based on background color to ensure contrast compliance
- **Size Priority:** Never compromise minimum size requirements—use brand mark only if space is constrained
- **Accessibility Always:** Ensure logo contrast meets WCAG AA standards in all contexts
- **Official Assets Only:** Never recreate or modify the logo—always use official brand resources from the GitHub repository