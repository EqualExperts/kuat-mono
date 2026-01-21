# @equal-experts/kuat-core

Core design tokens and CSS variables for the Kuat Design System by Equal Experts.

## Overview

`@equal-experts/kuat-core` provides framework-agnostic design tokens that can be used with any JavaScript framework or vanilla CSS. It includes:

- **CSS Variables** - All design tokens as CSS custom properties
- **Tailwind CSS Preset** - Pre-configured theme extensions for Tailwind CSS v4
- **Dark Mode Support** - Automatic light/dark mode via the `.dark` class

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

If using the Tailwind CSS preset, you'll need Tailwind CSS v4:

```bash
pnpm add -D tailwindcss@^4.0.0 @tailwindcss/vite
```

---

## Usage Patterns

### 1. With Tailwind CSS (Recommended)

The recommended approach is to use kuat-core as a Tailwind CSS preset.

#### Step 1: Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,vue,svelte}',
  ],
} satisfies Config;
```

#### Step 2: Import CSS Variables

```typescript
// main.ts or app entry point
import '@equal-experts/kuat-core/variables.css';
```

#### Step 3: Use Design Tokens

```html
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground rounded-lg px-4 py-2">
    Click me
  </button>
</div>
```

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

## Framework Integration Examples

### Next.js (App Router)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
```

```typescript
// app/layout.tsx
import '@equal-experts/kuat-core/variables.css';
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

```typescript
// main.ts
import '@equal-experts/kuat-core/variables.css';
import './style.css';
```

### SvelteKit

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{html,js,svelte,ts}'],
} satisfies Config;
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '@equal-experts/kuat-core/variables.css';
  import '../app.css';
</script>

<div class="bg-background text-foreground min-h-screen">
  <slot />
</div>
```

### Astro

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
} satisfies Config;
```

```astro
---
// src/layouts/Layout.astro
import '@equal-experts/kuat-core/variables.css';
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

```typescript
// angular.json - add to styles array
{
  "styles": [
    "node_modules/@equal-experts/kuat-core/src/variables.css",
    "src/styles.css"
  ]
}
```

```css
/* src/styles.css */
@import 'tailwindcss';

/* Your custom styles */
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
| `--ring` | Slate 300 | Slate 300 | Focus rings |

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

### Extending the Tailwind Preset

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Add your own extensions
      colors: {
        custom: 'var(--custom-color)',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
} satisfies Config;
```

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
| `@equal-experts/kuat-core` | Tailwind CSS preset (default export) |
| `@equal-experts/kuat-core/variables.css` | CSS variables file |
| `@equal-experts/kuat-core/tailwind-preset` | Alias for Tailwind preset |

### CSS Variables

All CSS variables are defined in the `:root` selector and scoped dark mode variants under `.dark`. See the [Design Token Reference](#design-token-reference) for the complete list.

---

## Troubleshooting

### Styles Not Applying

1. **Check CSS import order**: Import `variables.css` before your own styles
2. **Verify Tailwind config**: Ensure the preset is included in `presets` array
3. **Check content paths**: Make sure your files are included in Tailwind's `content` array

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
