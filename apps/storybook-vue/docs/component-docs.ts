/**
 * Consumer-facing Storybook doc strings (Overview, when to use / not).
 * Align with kuat-docs/rules/components/documentation-template.md
 */

export const accordionDocs = `## Overview
Stacked headers that expand to show one section at a time (or multiple, depending on configuration).

## When to use
- FAQs, settings panels, or long forms split into sections
- When users only need one subsection open at a time

## When not to use
- Linear step-by-step flows that are not independent sections (consider a single page or wizard)
- Primary navigation (use tabs or a nav component)`;

export const alertDialogDocs = `## Overview
Modal dialog for **destructive or consequential** actions that need explicit confirmation.

## When to use
- Delete, discard, or irreversible operations
- When you must block the rest of the UI until the user chooses

## When not to use
- Simple information or passive content (use a non-blocking pattern)
- Frequent low-risk actions (avoid modal fatigue)`;

export const badgeDocs = `## Overview
Small label for status, category, or count next to other content.

## When to use
- Status chips (new, beta), counts, metadata beside titles

## When not to use
- The main title of a page (use heading styles)
- Sole control for critical actions (use a Button)`;

export const breadcrumbDocs = `## Overview
Shows the user’s place in a **hierarchy** of pages with links to ancestors.

## When to use
- Multi-level site or section structures
- When back navigation should follow the information hierarchy

## When not to use
- Flat apps with no hierarchy (omit or use a single home link)
- Primary navigation for many peers (use a nav menu)`;

export const buttonDocs = `## Overview
Primary interactive control for actions. Kuat ships opinionated variants and colours aligned to brand tokens.

## When to use
- Commit actions, submit, open dialogs (as trigger), icon actions

## When not to use
- Navigating to another URL as main content (often a link styled as needed)
- Toggling exclusive choices in a group (consider ToggleGroup or Radio)`;

export const buttonGroupDocs = `## Overview
Visually connects **multiple buttons** so they read as one control (filters, toolbars).

## When to use
- Segmented actions, filter chips that are buttons, tight toolbars

## When not to use
- A single isolated button
- Mutually exclusive options that are not buttons (use Radio or ToggleGroup)`;

export const checkboxDocs = `## Overview
Binary input for options that can be combined independently.

## When to use
- Multi-select lists, consent toggles, optional extras

## When not to use
- Exactly one choice from a set (use Radio)
- Simple on/off for a setting label (consider Switch if that matches product language)`;

export const checkboxFieldDocs = `## Overview
Checkbox with associated **label and optional description** for form layouts.

**Note:** Prefer composing \`Field\` + \`Checkbox\` for new work if your app has standardized on the Field API.

## When to use
- Form fields where helper text or errors sit with the control

## When not to use
- Data tables with compact cells (may use bare Checkbox)`;

export const contentCardDocs = `## Overview
Card pattern for **teaser or summary** content (title, meta, optional image).

## When to use
- Listing articles, resources, or items in a grid

## When not to use
- Dense data tables (use table primitives)
- Full-width hero sections (use layout blocks)`;

export const fieldDocs = `## Overview
Composable **Field** primitives for labels, descriptions, grouping, and errors (\`Field\`, \`FieldLabel\`, \`FieldError\`, …).

Prefer this API for new forms; legacy \`*Field\` wrappers may remain for migration.

## When to use
- Consistent spacing and semantics for form rows
- Grouped legend/description patterns

## When not to use
- Read-only display with no control
- Very custom layouts that fight the field grid (compose lower-level primitives carefully)`;

export const inputDocs = `## Overview
Single-line text input with Kuat sizing and tokens.

## When to use
- Short text, search fields, names, codes

## When not to use
- Long text (use Textarea)
- Numeric-only inputs with strict UX (consider specialized inputs)`;

export const kuatCarouselDocs = `## Overview
Carousel built with **Embla**. Use \`basis\` for visible item sizing, \`plugins\` for Embla plugins, and \`events\` for inline Embla event handlers.

## When to use
- Testimonials, image galleries, card rows that scroll horizontally

## When not to use
- Critical sequential steps (use a wizard or one page per step)
- Long vertical articles

Long-form product guidance: [carousel.md](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/rules/components/carousel.md) in this repo.`;

export const kuatHeaderDocs = `## Overview
Application **header** with brand logo slot, navigation area, and actions.

## When to use
- Product chrome at the top of every page

## When not to use
- Marketing-only landing heroes without app chrome
- Embedded widgets where full header chrome is wrong`;

export const kuatLogoLockupDocs = `## Overview
**Logo + service title** lockup for Equal Experts branded surfaces (modes and use cases per design review).

## When to use
- Service headers, demo banners where brand + title are required together

## When not to use
- Instances covered by pure logo rules without title (see brand guidelines)

See [logo-lockup.md](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/rules/components/logo-lockup.md) for service vs demo modes.`;

export const kuatRadialProgressDocs = `## Overview
Circular progress indicator with Kuat colour and size tokens.

## When to use
- Completion percentage, loading spinners with numeric feedback

## When not to use
- Indeterminate busy state only (a simple spinner may suffice)
- Large charts (use charting libraries)`;

export const radioDocs = `## Overview
**Radio group** for exactly one choice from a set.

## When to use
- Mutually exclusive options (2– ~7 visible choices)

## When not to use
- Multiple selections (Checkbox)
- Many options (consider Select)`;

export const radioFieldDocs = `## Overview
Radio group packaged with **Field** labelling and layout helpers. Must live inside \`RadioGroup\`.

**Note:** Prefer composing \`Field\` + \`RadioGroupItem\` for new work where possible.

## When to use
- Form questions with one answer and helper/error text

## When not to use
- Bare choices in tables or compact UIs (may use RadioGroup only)`;

export const selectDocs = `## Overview
Dropdown for choosing **one or more** values from a list (Kuat Select / KuatSelect).

## When to use
- Long option lists, space-constrained filters, optional search (if configured)

## When not to use
- Few visible options where all should be scannable (Radio or ToggleGroup)`;

export const switchDocs = `## Overview
Toggle for **on/off** settings that take effect immediately or map to a binary preference.

## When to use
- Feature toggles, binary preferences with clear labels

## When not to use
- Actions that need confirmation (use Checkbox in a form with submit)
- Multi-step wizard answers that are not instant (Radio may be clearer)`;

export const switchFieldDocs = `## Overview
Switch combined with **Field** label and description layout.

**Note:** Prefer composing \`Field\` + \`Switch\` for new work where possible.

## When to use
- Settings rows with helper text or validation

## When not to use
- Compact tables or icon-only toolbars (bare Switch)`;

export const textareaDocs = `## Overview
Multi-line text input for longer content.

## When to use
- Comments, descriptions, addresses

## When not to use
- Single-line values (Input)
- Rich text (use an editor component)`;

export const toggleDocs = `## Overview
Pressable toggle for binary state (icon or text), distinct from form Checkbox in typical usage.

## When to use
- Toolbar formatting, mute/unmute, show/hide panels

## When not to use
- Form submissions requiring explicit values (Checkbox/Radio)`;

export const toggleGroupDocs = `## Overview
**Group of toggles** for single or multiple selection in a segmented control pattern.

## When to use
- Filter bars, view switchers (list/grid), exclusive icons

## When not to use
- Destructive primary actions (use ButtonGroup)
- Long lists of options (Select)`;

export const sonnerDocs = `## Overview
Opinionated toast notifications built on Sonner with Kuat styling and API wrappers.

## When to use
- Non-blocking status updates (success, info, warning, error)
- Short confirmations after async user actions

## When not to use
- Critical flows that require user focus and immediate action (use dialog patterns)
- Replacing inline form validation or field-level guidance`;
