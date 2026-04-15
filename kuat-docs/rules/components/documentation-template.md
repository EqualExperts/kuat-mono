# Component documentation template

Default structure for **consumer-facing** component documentation in the Kuat monorepo. Use this when adding or refreshing narrative docs (e.g. `kuat-docs/rules/components/<name>.md`) or when structuring Storybook docs where no stronger convention exists.

Not every component needs every section; skip sections that do not apply. Prefer improving existing docs over inventing a new layout.

---

# Component name

## Overview

A short explanation of what the component is and the problem it solves.

## When to use

Clear guidance on appropriate use cases.

## When not to use

Explain when another component or pattern is more appropriate.

## Anatomy

Describe the main parts of the component, if relevant.

## Variants

List supported variants and explain when to use each one.

## States

Document interactive, visual, validation, loading, empty, disabled, selected, focus, hover, and error states where relevant.

## Content guidance

Explain best practices for labels, helper text, placeholder text, actions, and microcopy.

## Behaviour

Describe interaction patterns, defaults, edge cases, and important functional details.

## Accessibility

Document semantic expectations, keyboard behaviour, screen reader considerations, focus management, contrast requirements, labels, roles, and any ARIA usage that consumers need to understand.

## API

Document the public props, slots, events, tokens, and composition points.

Prefer concise tables where appropriate.

## Examples

Provide practical examples that represent real usage.

## Related components

Link to adjacent or alternative components.

## Notes

Include migration advice, caveats, or implementation constraints only if useful to consumers.
