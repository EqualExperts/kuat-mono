# Visual Accessibility

Design rules ensuring visual content is perceivable by all users.

---

## Overview

Visual accessibility ensures that design choices don't exclude users with visual impairments, colour blindness, or other conditions that affect how they perceive content.

**Key principle:** Design should never rely solely on visual characteristics to convey meaning.

---

## Colour Contrast

Sufficient contrast between text and background is essential for readability.

### Minimum Contrast Ratios

| Content Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Body text | 4.5:1 | Standard paragraphs, labels |
| Large text (18pt+ or 14pt bold) | 3:1 | Headings, large buttons |
| UI components | 3:1 | Borders, icons, focus indicators |
| Print materials | 7:1 | Higher due to printing variables |

### Testing Contrast

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify ratios.

### Kuat Design Tokens

Kuat's colour tokens are designed to meet contrast requirements:

- `--foreground` on `--background` meets 4.5:1
- `--primary-foreground` on `--primary` meets 4.5:1
- `--sidebar-foreground` on `--sidebar` meets 4.5:1

Always use semantic tokens rather than hardcoding colours.

---

## Colour Usage

### Never Use Colour Alone

Colour should never be the only means of conveying information.

| Bad | Good |
|-----|------|
| Red text for errors | Red text + error icon + "Error:" prefix |
| Green for success | Green + checkmark icon + success message |
| Link only distinguished by colour | Link with underline + colour |

### Status Indicators

When using colour for status (red/amber/green):

1. **Add shapes** - Different shapes for each status (circle, triangle, square)
2. **Add labels** - Text labels alongside colours
3. **Include legend** - Always explain what colours mean
4. **Consider colour blindness** - Red/green are commonly confused

### Charts and Data Visualisation

- Use patterns or textures in addition to colours
- Ensure adjacent colours have sufficient contrast
- Provide data tables as alternatives to charts

---

## Typography

### Minimum Sizes

| Context | Minimum Size |
|---------|--------------|
| Body text | 11pt (14px) |
| Small text (captions, labels) | 10pt (12px) - use sparingly |
| Touch device body | 16px recommended |

### Line Spacing

| Content Type | Line Height |
|--------------|-------------|
| Body copy | 1.5x font size |
| Headings | 1.2x font size |
| Dense UI (tables) | 1.3x minimum |

### Text Scaling

- Text must be scalable to 200% without loss of content or functionality
- Use relative units (rem, em) not fixed pixels for font sizes
- Test layouts at 200% zoom

### Typeface Selection

- Prefer sans-serif fonts for screen readability
- Avoid decorative fonts for body text
- Ensure consistent character spacing
- Kuat uses Lexend (sans), which has excellent readability characteristics

### Text Alignment

- **Left-align** body text (default)
- **Avoid justified** text - uneven spacing hinders readability
- **Centre-align** sparingly - only for short headings or CTAs

---

## Motion and Animation

### Risks

- Flashing content can trigger epileptic seizures
- Excessive motion causes nausea/disorientation for some users
- Auto-playing content is distracting

### Requirements

| Requirement | Implementation |
|-------------|----------------|
| No flashing | Never use content that flashes more than 3 times per second |
| Pause controls | All auto-playing content must have pause/stop controls |
| Reduced motion | Respect `prefers-reduced-motion` media query |
| Duration limits | Auto-playing content longer than 5 seconds needs controls |

### Implementation

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### GIFs and Animated Content

- Limit excessive movement
- Provide static fallback images where possible
- Never use GIFs for essential information

---

## Icons

### Size Requirements

| Context | Minimum Size |
|---------|--------------|
| Touch targets | 44x44px minimum tap area |
| Visual icon | 24x24px minimum visible size |
| Dense UI | 20x20px with adequate spacing |

### Accessibility Requirements

- **High contrast** - Icons must meet 3:1 contrast ratio
- **Universal symbols** - Use well-understood icons (magnifying glass for search)
- **Consistent style** - Same visual style throughout application
- **Text alternatives** - Provide labels or aria-labels for meaningful icons
- **Decorative icons** - Use `aria-hidden="true"` for purely decorative icons

---

## Images

### Background Images

- **Never place text on busy backgrounds**
- Use colour overlays to improve contrast when text over images is necessary
- Test text legibility across the full image area

### Inclusive Imagery

- Represent diverse ages, backgrounds, and perspectives
- Prioritise diversity year-round, not just during awareness events
- Avoid stereotypical representations

### Decorative vs Meaningful Images

| Type | Alt Text | Example |
|------|----------|---------|
| Decorative | `alt=""` | Background patterns, visual flourishes |
| Meaningful | Descriptive text | Photos, diagrams, charts |
| Functional | Describes action | Icons in buttons |

---

## Related Documentation

- [Accessibility Overview](./README.md)
- [Content Accessibility](./content.md) - Alt text guidelines
- [Technical Accessibility](./technical.md) - Implementation details
- [Colours](../design/colours.md) - Kuat colour tokens
- [Typography](../design/typography.md) - Kuat type scale
