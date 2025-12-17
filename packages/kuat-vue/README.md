# @equal-experts/kuat-vue

A guide for integrating the Kuat Design System Vue component library into your application.

---

## Installation

### Prerequisites

- Vue 3.4.0 or higher
- Node.js 18 or higher
- A package manager (npm, pnpm, or yarn)

### Install the Package

```bash
# Using pnpm (recommended)
pnpm add @equal-experts/kuat-vue

# Using npm
npm install @equal-experts/kuat-vue

# Using yarn
yarn add @equal-experts/kuat-vue
```

### Install Peer Dependencies

The library requires Vue, Radix Vue, and Reka UI as peer dependencies:

```bash
# Required peer dependencies
pnpm add vue radix-vue reka-ui

# Optional: Install lucide-vue-next for icons (or use your preferred icon library)
pnpm add lucide-vue-next
```

**Note:** `@equal-experts/kuat-core` is bundled with this package - you don't need to install it separately.

---

## Setup

### 1. Configure Tailwind CSS

The Kuat Design System uses Tailwind CSS v4. You'll need to configure Tailwind in your project.

#### Install Tailwind CSS v4

```bash
pnpm add -D tailwindcss@next @tailwindcss/vite
```

#### Create `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/@equal-experts/kuat-vue/**/*.{js,ts,vue}", // Include Kuat components
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        // ... other color tokens from @equal-experts/kuat-core
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
```

#### Configure Vite (if using Vite)

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
```

### 2. Import Styles

Import the Kuat Design System styles in your application's entry point:

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "@equal-experts/kuat-vue/styles";

createApp(App).mount("#app");
```

This imports the bundled CSS file which includes all design tokens from `@equal-experts/kuat-core` (no need to install `@equal-experts/kuat-core` separately).

**Note:** The styles include:
- Design tokens from `@equal-experts/kuat-core` (colors, spacing, typography)
- Tailwind CSS base styles
- Component-specific styles

### 3. (Optional) Configure Fonts

The Kuat Design System uses Lexend (sans-serif), Lora (serif), and JetBrains Mono (monospace) fonts. These are loaded via Google Fonts in the core package.

If you want to use different fonts or load them differently, you can override the CSS variables:

```css
:root {
  --font-sans: 'Your Sans Font', sans-serif;
  --font-serif: 'Your Serif Font', serif;
  --font-mono: 'Your Mono Font', monospace;
}
```

---

## Basic Usage

### Import Components

```typescript
import { Button } from "@equal-experts/kuat-vue";
```

### Use in Your App

```vue
<template>
  <div>
    <Button>Click me</Button>
    <Button variant="outline">Outline button</Button>
    <Button variant="destructive">Delete</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
</script>
```

---

## Component Examples

### Button

The Button component supports multiple variants and sizes:

```vue
<template>
  <div class="space-x-4">
    <!-- Variants -->
    <Button variant="default">Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>

    <!-- Sizes -->
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">🚀</Button>
    <Button size="icon-sm">📱</Button>
    <Button size="icon-lg">💻</Button>

    <!-- With click handler -->
    <Button @click="handleClick">
      Click me
    </Button>

    <!-- Disabled -->
    <Button disabled>Disabled</Button>

    <!-- As child (for composition) -->
    <Button as-child>
      <a href="/link">Link Button</a>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";

function handleClick() {
  alert("Clicked!");
}
</script>
```

### TypeScript Support

All components are fully typed:

```vue
<script setup lang="ts">
import { Button, type ButtonVariants } from "@equal-experts/kuat-vue";

const variant: ButtonVariants["variant"] = "outline";
const size: ButtonVariants["size"] = "lg";
</script>

<template>
  <Button :variant="variant" :size="size">
    Typed Button
  </Button>
</template>
```

---

## Styling and Theming

### Using Design Tokens

The Kuat Design System provides CSS variables for all design tokens. Use them in your custom components:

```vue
<template>
  <div class="custom-component">
    Custom styled component
  </div>
</template>

<style scoped>
.custom-component {
  background-color: var(--background);
  color: var(--foreground);
  padding: var(--spacing);
  border-color: var(--border);
  border-radius: var(--radius);
}
</style>
```

Or with Tailwind classes:

```vue
<template>
  <div class="bg-background text-foreground p-4 rounded-lg border border-border">
    Custom styled component
  </div>
</template>
```

### Dark Mode

Dark mode is supported via the `.dark` class. Apply it to your root element:

```vue
<!-- In your root component -->
<template>
  <div :class="{ dark: isDark }">
    <App />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDark = ref(false);
</script>
```

Or toggle dynamically:

```vue
<template>
  <div :class="{ dark: isDark }">
    <button @click="isDark = !isDark">
      Toggle theme
    </button>
    <!-- Your app -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDark = ref(false);
</script>
```

### Customizing Colors

Override CSS variables to customize the theme:

```css
/* In your global CSS file */
:root {
  --primary: oklch(0.645 0.163 237.5); /* Your primary color */
  --primary-foreground: oklch(1.0 0.0 0.0); /* White */
}

.dark {
  --primary: oklch(0.585 0.145 237.5); /* Darker primary for dark mode */
  --primary-foreground: oklch(1.0 0.0 0.0); /* White */
}
```

---

## Advanced Usage

### Composing Components

Use the `as-child` prop to compose components:

```vue
<template>
  <Button as-child variant="ghost">
    <router-link to="/dashboard">Dashboard</router-link>
  </Button>
</template>

<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
</script>
```

### Using Variants Programmatically

Import and use variant functions:

```vue
<template>
  <button :class="buttonClass">
    Custom Button
  </button>
</template>

<script setup lang="ts">
import { buttonVariants } from "@equal-experts/kuat-vue";
import { cn } from "@equal-experts/kuat-vue";

const buttonClass = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "custom-class"
);
</script>
```

### Global Component Registration

Register components globally if preferred:

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import * as KuatComponents from "@equal-experts/kuat-vue";

const app = createApp(App);

// Register all components globally
Object.entries(KuatComponents).forEach(([name, component]) => {
  if (name !== "default" && typeof component === "object") {
    app.component(name, component);
  }
});

app.mount("#app");
```

Then use without importing:

```vue
<template>
  <Button>No import needed</Button>
</template>
```

---

## Troubleshooting

### Styles Not Loading

1. **Check import order**: Ensure you import `@equal-experts/kuat-vue/styles` before your own styles
2. **Verify Tailwind config**: Make sure `@equal-experts/kuat-vue` is included in your `content` paths
3. **Check build output**: Ensure the CSS file is being included in your build
4. **Vue SFC**: If using Single File Components, ensure styles are processed correctly

### TypeScript Errors

1. **Install types**: Ensure Vue TypeScript support is configured
2. **Check TypeScript version**: Requires TypeScript 5.3 or higher
3. **Verify imports**: Use named imports, not default imports
4. **Vue TSConfig**: Ensure your `tsconfig.json` includes Vue file types

### Components Not Rendering

1. **Check Vue version**: Requires Vue 3.4.0 or higher
2. **Verify peer dependencies**: Ensure `vue` is installed
3. **Check console**: Look for runtime errors in the browser console
4. **Build mode**: Ensure you're using the correct build mode (ES modules)

---

## Package Structure

```
@equal-experts/kuat-vue
├── dist/
│   ├── index.js          # Compiled JavaScript
│   ├── index.d.ts        # TypeScript definitions
│   └── index.css         # Compiled styles
└── src/
    ├── components/       # Component source files
    ├── lib/             # Utilities
    └── styles.css        # Style source
```

---

## Additional Resources

- **shadcn-vue Documentation**: [https://www.shadcn-vue.com](https://www.shadcn-vue.com)
- **Tailwind CSS v4**: [https://tailwindcss.com](https://tailwindcss.com)
- **Vue 3 Documentation**: [https://vuejs.org](https://vuejs.org)
- **Radix Vue Documentation**: [https://www.radix-vue.com](https://www.radix-vue.com)

---

## AI Agent Documentation

This package includes AI-friendly documentation in the `docs/` directory, optimized for LLM consumption.

### Included Documentation

- **[Design System](./docs/design/)** - Colors, typography, spacing, borders, and design tokens
- **[Component Guidelines](./docs/components/guidelines.md)** - Component development patterns and best practices
- **[Content Guidelines](./docs/content/)** - Content writing guidelines for marketing and product UX

### Accessing Documentation

The documentation is available in your `node_modules` after installation:

```
node_modules/@equal-experts/kuat-vue/docs/
├── design/              # Design system guidelines
├── components/          # Component patterns
└── content/             # Content writing guidelines
```

### For AI Agents

You can reference this documentation in your `.cursorrules` or similar configuration:

```
# Kuat Design System Documentation
- Design tokens: node_modules/@equal-experts/kuat-vue/docs/design/
- Component patterns: node_modules/@equal-experts/kuat-vue/docs/components/
- Brand colors available: EE Blue, Tech Blue, Transform Teal, Equal Ember
```

---

## Support

For issues, questions, or contributions, please refer to the main repository documentation or open an issue in the project repository.

