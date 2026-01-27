# Accessibility Rules

Foundational accessibility requirements for the Kuat Design System. These rules ensure products and services deliver the best experience for all users.

**Target: WCAG 2.2 Level AA compliance.**

---

## Why Accessibility Matters

Accessibility is the practice of making information, activities, and environments sensible, meaningful, and usable for as many people as possible.

### The Case for Accessibility

- **16% of the global population** (1.3 billion people) live with a significant disability
- **Legal requirements** - UK Public Sector organisations must create accessible products, websites, and services
- **Better UX for everyone** - Accessible design benefits older people, non-native English speakers, those with temporary disabilities, and situational limitations (bright sunlight, noisy environments)
- **Extended reach** - Accessible content reaches more users and improves overall satisfaction

### Equal Experts Commitment

If we want clients to trust us on accessibility, we must lead by example. All content we produce—websites, documents, applications—should reflect our commitment to accessibility.

---

## WCAG Principles (POUR)

The Web Content Accessibility Guidelines are built on four principles:

| Principle | Description |
|-----------|-------------|
| **Perceivable** | Information must be presented in ways users can perceive using their senses |
| **Operable** | All users must be able to interact with interface components |
| **Understandable** | Users must be able to understand information and how to operate the UI |
| **Robust** | Content must work with assistive technologies and user agents |

### Conformance Levels

| Level | Description |
|-------|-------------|
| A | Minimum conformance (bare minimum) |
| **AA** | Mid-range conformance (our target) |
| AAA | Highest conformance level |

**Equal Experts targets AA compliance** - this is the standard for most legal requirements.

---

## Quick Reference

| Area | Key File | Covers |
|------|----------|--------|
| Visual design | [design.md](./design.md) | Contrast, typography, color, motion, icons |
| Content/writing | [content.md](./content.md) | Plain language, structure, alt text, links |
| Implementation | [technical.md](./technical.md) | Keyboard, focus, ARIA, landmarks, forms |

---

## Testing Tools

### Colour Contrast

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Text contrast
- [Contrast Checker](https://contrastchecker.com/) - Images
- [Brandwood A11y](https://www.brandwood.com/a11y/) - Text over images

### Automated Testing

- [WAVE Browser Extension](https://wave.webaim.org/extension/) - Page accessibility evaluation
- [Axe DevTools](https://www.deque.com/axe/devtools/) - Comprehensive accessibility testing

### Content Readability

- [WebFX Readability Test](https://www.webfx.com/tools/read-able/)
- [Hemingway Editor](https://hemingwayapp.com/)

---

## Further Reading

- [Introduction to Web Accessibility (W3C)](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [UK Government Accessibility Guidelines](https://gcs.civilservice.gov.uk/guidance/digital-communication/planning-creating-and-publishing-accessible-website-content/)

---

## Related Documentation

- [Design Accessibility](./design.md) - Visual design rules
- [Content Accessibility](./content.md) - Writing rules
- [Technical Accessibility](./technical.md) - Implementation rules
- [Component Patterns](../components/patterns.md) - Component-level accessibility
