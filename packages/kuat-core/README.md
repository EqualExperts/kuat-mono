# @equal-experts/kuat-core

Core design tokens and CSS variables for the Kuat Design System by Equal Experts.

## Overview

`@equal-experts/kuat-core` provides framework-agnostic design tokens that can be used with any JavaScript framework or vanilla CSS. It includes:

- **CSS Variables** - All design tokens as CSS custom properties
- **Tailwind v4 `@theme` tokens** - Design-token utilities (`bg-primary`, `rounded-lg`, …) via a single CSS import
- **Dark Mode Support** - Automatic light/dark mode via the `.dark` class

### Bundled agent docs

`@equal-experts/kuat-core` includes consumer-facing AI agent docs under:

- `node_modules/@equal-experts/kuat-core/agent-docs/README.md`

This bundle covers Kuat layout/scenario guidance and canonical Equal Experts foundations needed for consistent layout/content decisions. Contributor docs are intentionally excluded.

### When to Use kuat-core

| Use Case | Package |
|----------|---------|
| Need design tokens only (any framework) | `@equal-experts/kuat-core` |
| Building React apps with components | `@equal-experts/kuat-react` |
| Building Vue apps with components | `@equal-experts/kuat-vue` |
| Using Svelte, Angular, Astro, etc. | `@equal-experts/kuat-core` |

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add @equal-experts/kuat-core

# Using npm
npm install @equal-experts/kuat-core

# Using yarn
yarn add @equal-experts/kuat-core
```

### Peer Dependencies

For the Tailwind v4 setup, you'll need Tailwind CSS v4 and its build plugin:

```bash
pnpm add -D tailwindcss@^4.0.0 @tailwindcss/vite
```

(Use `@tailwindcss/postcss` instead of `@tailwindcss/vite` for PostCSS-based builds.)

---

## Usage Patterns

### 1. With Tailwind CSS v4 (Recommended)

kuat-core is built for Tailwind v4's CSS-first config. Import the tokens into
your Tailwind entry CSS — the `@theme` block in `variables.css` registers the
design-token utilities (`bg-primary`, `text-foreground`, `rounded-lg`, …). No
JavaScript `tailwind.config` or preset is required.

#### Step 1: Add the Tailwind plugin to your build

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

(For PostCSS-based setups, use `@tailwindcss/postcss` instead.)

#### Step 2: Import Tailwind and the Kuat tokens in your CSS

```css
/* src/index.css — your Tailwind entry, processed by the plugin above */
@import "@equal-experts/kuat-core/fonts.css"; /* Lexend/Lora/JetBrains Mono — first, or use a <link> */
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";
```

> Import the tokens **through Tailwind** (a CSS `@import`), not as a JS
> side-effect `import "...variables.css"`. The `@theme` block only registers
> utilities when Tailwind processes the file.

#### Step 3: Use Design Tokens

```html
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2">
    Click me
  </button>
</div>
```

> **Deprecated:** earlier versions documented a JS preset
> (`presets: [kuatPreset]`). Tailwind v4 does not auto-load JS configs and the
> tokens are now OKLCH values, so the preset is deprecated — prefer the
> CSS-first setup above. See
> [DEPRECATIONS](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/DEPRECATIONS.md).

### 2. CSS Variables Only (Vanilla JS / Any Framework)

If you're not using Tailwind CSS, you can use the CSS variables directly.

#### Import the Variables

```typescript
// main.ts
import '@equal-experts/kuat-core/variables.css';
```

#### Use in CSS

```css
.my-button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  padding: 0.5rem 1rem;
}

.my-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
}
```

#### Access via JavaScript

```typescript
// Get computed value of a CSS variable
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');

// Set a CSS variable dynamically
document.documentElement.style.setProperty('--primary', 'your-value');
```

---

## Fonts

The Kuat type stack (Lexend / Lora / JetBrains Mono) ships as a separate
import so its remote `@import` can sit at the very top of your bundle:

- **Using `@equal-experts/kuat-react` or `@equal-experts/kuat-vue`?** Fonts load
  automatically via the package stylesheet — nothing to do.
- **Using `kuat-core` only?** Add `@import "@equal-experts/kuat-core/fonts.css"`
  **first** (before `@import "tailwindcss"`), as in the Vite recipe above, or
  drop a `<link>` to the same Google Fonts URL in your HTML `<head>`.

`variables.css` deliberately carries no remote `@import`, so importing it
through Tailwind never triggers an `@import`-ordering warning.

---

## Framework Integration Examples

All frameworks use the same CSS-first wiring: add the Tailwind v4 plugin to
your build, then `@import` Tailwind and the Kuat tokens in your entry CSS
(plus the fonts import — see [Fonts](#fonts)).

### Next.js (App Router)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";
```

```tsx
// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

### Vite + Any Framework

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* src/style.css — imported from your entry (e.g. main.ts) */
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";
```

### SvelteKit

```css
/* src/app.css */
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
</script>

<div class="bg-background text-foreground min-h-screen">
  <slot />
</div>
```

### Astro

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";
```

```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body class="bg-background text-foreground">
    <slot />
  </body>
</html>
```

### Angular

```css
/* src/styles.css */
@import 'tailwindcss';
@import '@equal-experts/kuat-core/variables.css';
```

---

## Design Token Reference

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | White | Slate 900 | Page background |
| `--foreground` | Slate 950 | White | Primary text |
| `--primary` | EE Blue | EE Blue | Primary actions |
| `--primary-foreground` | White | White | Text on primary |
| `--secondary` | Transform Teal | Transform Teal | Secondary actions |
| `--secondary-foreground` | White | White | Text on secondary |
| `--muted` | Slate 100 | Slate 100 | Muted backgrounds |
| `--muted-foreground` | Slate 500 | Slate 300 | Muted text |
| `--accent` | EE Blue 50 | EE Blue 800 | Accent highlights |
| `--destructive` | Red 600 | Red 600 | Destructive actions |
| `--border` | Slate 200 | Slate 700 | Borders |
| `--input` | White | Slate 600 | Input backgrounds |
| `--ring` | Indigo 300 | Indigo 300 | Focus rings |

### Brand Colors

The following brand color palettes are available as CSS variables:

- **EE Blue** (`--ee-blue-50` through `--ee-blue-950`) - Primary brand color
- **Tech Blue** (`--tech-blue-50` through `--tech-blue-950`) - Technical contexts
- **Transform Teal** (`--transform-teal-50` through `--transform-teal-950`) - Growth themes
- **Equal Ember** (`--equal-ember-50` through `--equal-ember-950`) - Energy accents

### Typography

```css
--font-sans: Lexend, ui-sans-serif, sans-serif, system-ui;
--font-serif: Lora, serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Spacing & Layout

```css
--radius: 0.3rem;        /* Base border radius */
--spacing: 0.25rem;      /* Base spacing unit */
--tracking-normal: 0.01em; /* Letter spacing */
```

---

## Dark Mode

Dark mode is enabled by adding the `dark` class to a parent element (typically `<html>` or `<body>`).

### Manual Toggle

```typescript
// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

// Check current mode
const isDark = document.documentElement.classList.contains('dark');
```

### System Preference Detection

```typescript
// Detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply based on system preference
if (prefersDark) {
  document.documentElement.classList.add('dark');
}

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    document.documentElement.classList.toggle('dark', e.matches);
  });
```

### CSS-only (Tailwind)

```css
/* In your CSS */
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode is handled automatically by variables.css */
  }
}
```

---

## Customization

### Overriding CSS Variables

Override any design token in your own CSS:

```css
:root {
  /* Override primary color */
  --primary: oklch(0.6 0.2 250);
  --primary-foreground: white;
  
  /* Override border radius */
  --radius: 0.5rem;
}

.dark {
  /* Dark mode overrides */
  --primary: oklch(0.7 0.18 250);
}
```

### Extending the Theme

Add your own tokens alongside Kuat's in your Tailwind entry CSS using a
`@theme` block:

```css
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";

@theme {
  --color-custom: var(--custom-color);
  --spacing-18: 4.5rem;
}
```

> **Deprecated:** the JS preset (`presets: [kuatPreset]`) is deprecated in
> favour of the CSS-first setup above. It is still exported for backward
> compatibility (load it via Tailwind's `@config` directive) but will be
> removed in a future major release.

---

## Component Libraries

For pre-built React or Vue components using these design tokens:

- **React**: [`@equal-experts/kuat-react`](https://www.npmjs.com/package/@equal-experts/kuat-react)
- **Vue**: [`@equal-experts/kuat-vue`](https://www.npmjs.com/package/@equal-experts/kuat-vue)

These packages include kuat-core internally, so you don't need to install it separately when using them.

---

## API Reference

### Exports

| Export Path | Description |
|-------------|-------------|
| `@equal-experts/kuat-core/variables.css` | CSS variables + Tailwind v4 `@theme` tokens — **import this** |
| `@equal-experts/kuat-core` | Tailwind CSS preset (default export) — **deprecated**, prefer the CSS-first setup |
| `@equal-experts/kuat-core/tailwind-preset` | Alias for the deprecated Tailwind preset |

### CSS Variables

All CSS variables are defined in the `:root` selector and scoped dark mode variants under `.dark`. See the [Design Token Reference](#design-token-reference) for the complete list.

> **Base tokens vs `--color-*`:** in hand-written CSS, reference the **base**
> tokens (`var(--foreground)`, `var(--card)`, …) — those are what the `.dark`
> selector redefines, so they flip with the theme. The `--color-*` names (e.g.
> `--color-foreground`) are the Tailwind `@theme` registrations that back the
> utility classes (`text-foreground`); don't use them directly in custom CSS.

---

## Troubleshooting

### Styles Not Applying

1. **Import tokens through Tailwind**: `@import "@equal-experts/kuat-core/variables.css"` must live in the CSS that Tailwind processes (the file with `@import "tailwindcss"`), not a JS `import`. Otherwise the `@theme` block never registers the token utilities.
2. **Check the Tailwind plugin**: ensure `@tailwindcss/vite` (or `@tailwindcss/postcss`) is wired into your build.
3. **Not using the JS preset?** The `presets: [kuatPreset]` approach is deprecated and not auto-loaded by Tailwind v4 — use the CSS-first setup.

### Dark Mode Not Working

1. **Check class application**: Ensure `.dark` class is on an ancestor element
2. **Verify CSS import**: Make sure `variables.css` is imported
3. **Check specificity**: Your custom styles might be overriding the dark mode values

### TypeScript Errors

1. **Install types**: Ensure `tailwindcss` is installed for type definitions
2. **Check import syntax**: Use `import kuatPreset from '@equal-experts/kuat-core'`

---

## License

MIT - Equal Experts
