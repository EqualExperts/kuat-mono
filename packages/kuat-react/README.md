# @equal-experts/kuat-react

A guide for integrating the Kuat Design System React component library into your application.

---

## Installation

### Prerequisites

- React 18.2.0 or higher
- Node.js 18 or higher
- A package manager (npm, pnpm, or yarn)

### Install the Package

```bash
# Using pnpm (recommended)
pnpm add @equal-experts/kuat-react

# Using npm
npm install @equal-experts/kuat-react

# Using yarn
yarn add @equal-experts/kuat-react
```

### Install Peer Dependencies

The library requires React, React DOM, and Radix UI packages as peer dependencies. Install only the packages you need based on which components you use:

```bash
# Required peer dependencies
pnpm add react react-dom

# Install Radix UI packages as needed (examples for common components)
pnpm add @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# Optional: Install lucide-react for icons (or use your preferred icon library)
pnpm add lucide-react
```

**Note:** `@equal-experts/kuat-core` is bundled with this package. You don't need to install it separately when using kuat-react. However, if you want to use design tokens without React components, you can install [`@equal-experts/kuat-core`](https://www.npmjs.com/package/@equal-experts/kuat-core) standalone. See the [kuat-core documentation](https://github.com/equalexperts/kuat-mono/tree/main/packages/kuat-core) for framework-agnostic usage.

### Using Design Tokens Without Components

If you only need design tokens (CSS variables, Tailwind preset) without React components, install `@equal-experts/kuat-core` instead:

```bash
pnpm add @equal-experts/kuat-core
```

Then import the CSS variables and optionally use the Tailwind preset:

```typescript
// Import CSS variables
import '@equal-experts/kuat-core/variables.css';

// Or use as a Tailwind preset
import kuatPreset from '@equal-experts/kuat-core';
```

See the [kuat-core documentation](https://github.com/equalexperts/kuat-mono/tree/main/packages/kuat-core) for detailed usage with Svelte, Angular, Astro, and other frameworks.

### Recommended: Use Subpath Imports

To avoid installing all peer dependencies when you only need specific components, use **subpath imports**. This allows you to import only the components you need and only install their required peer dependencies.

**Example: Only using Button**

```bash
# Only install peer dependencies for Button
pnpm add react react-dom @radix-ui/react-slot
```

```tsx
// Import from subpath - only Button and its dependencies are required
import { Button } from "@equal-experts/kuat-react/button";
```

**Component Peer Dependencies:**

- **Button**: `react`, `react-dom`, `@radix-ui/react-slot`
- **Accordion**: `react`, `react-dom`, `@radix-ui/react-accordion`, `lucide-react`
- **AlertDialog**: `react`, `react-dom`, `@radix-ui/react-alert-dialog`
- **Badge**: `react`, `react-dom` (no additional Radix UI dependencies)

**Using Main Export (All Components):**

If you import from the main package, you'll need all peer dependencies:

```tsx
// This requires ALL peer dependencies to be installed
import { Button, Accordion, AlertDialog } from "@equal-experts/kuat-react";
```

**lucide-react Version Support:**

The package supports `lucide-react` versions `^0.344.0 || >=0.400.0`, including the latest versions (0.562.0+).

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
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@equal-experts/kuat-react/**/*.{js,ts,jsx,tsx}", // Include Kuat components
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
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 2. Import Styles

Import the Kuat Design System styles in your application's entry point:

```typescript
// main.tsx or App.tsx
import "@equal-experts/kuat-react/styles";
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

You can import components in two ways:

**Option 1: Subpath Import (Recommended for single components)**

```typescript
// Import only Button - only requires Button's peer dependencies
import { Button } from "@equal-experts/kuat-react/button";
```

**Option 2: Main Package Import**

```typescript
// Import from main package - requires all peer dependencies
import { Button } from "@equal-experts/kuat-react";
```

### Use in Your App

```tsx
// Recommended: Subpath import
import { Button } from "@equal-experts/kuat-react/button";

// Or: Main package import
// import { Button } from "@equal-experts/kuat-react";

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="outline">Outline button</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

---

## Component Examples

### Button

The Button component supports multiple variants and sizes:

```tsx
import { Button } from "@equal-experts/kuat-react";

function ButtonExamples() {
  return (
    <div className="space-x-4">
      {/* Variants */}
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>

      {/* With onClick */}
      <Button onClick={() => alert("Clicked!")}>
        Click me
      </Button>

      {/* Disabled */}
      <Button disabled>Disabled</Button>

      {/* As child (for composition) */}
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>
    </div>
  );
}
```

### TypeScript Support

All components are fully typed:

```tsx
import { Button, type ButtonProps } from "@equal-experts/kuat-react";

// ButtonProps includes all standard button HTML attributes
const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## Styling and Theming

### Using Design Tokens

The Kuat Design System provides CSS variables for all design tokens. Use them in your custom components:

```tsx
function CustomComponent() {
  return (
    <div
      className="bg-background text-foreground p-4 rounded-lg"
      style={{
        borderColor: "var(--border)",
      }}
    >
      Custom styled component
    </div>
  );
}
```

### Dark Mode

Dark mode is supported via the `.dark` class. Apply it to your root element:

```tsx
// In your root component or HTML
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

Or toggle dynamically:

```tsx
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle theme
      </button>
      {/* Your app */}
    </div>
  );
}
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

Use the `asChild` prop to compose components:

```tsx
import { Button } from "@equal-experts/kuat-react";
import { Link } from "react-router-dom";

function NavigationButton() {
  return (
    <Button asChild variant="ghost">
      <Link to="/dashboard">Dashboard</Link>
    </Button>
  );
}
```

### Using Variants Programmatically

Import and use variant functions:

```tsx
import { buttonVariants } from "@equal-experts/kuat-react";
import { cn } from "@equal-experts/kuat-react";

function CustomButton({ className, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant: "outline", size: "lg" }), className)}
      {...props}
    />
  );
}
```

---

## Troubleshooting

### Styles Not Loading

1. **Check import order**: Ensure you import `@equal-experts/kuat-react/styles` before your own styles
2. **Verify Tailwind config**: Make sure `@equal-experts/kuat-react` is included in your `content` paths
3. **Check build output**: Ensure the CSS file is being included in your build

### TypeScript Errors

1. **Install types**: Ensure `@types/react` and `@types/react-dom` are installed
2. **Check TypeScript version**: Requires TypeScript 5.3 or higher
3. **Verify imports**: Use named imports, not default imports

### Components Not Rendering

1. **Check React version**: Requires React 18.2.0 or higher
2. **Verify peer dependencies**: Ensure `react` and `react-dom` are installed
3. **Check console**: Look for runtime errors in the browser console

---

## Package Structure

```
@equal-experts/kuat-react
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

- **shadcn/ui Documentation**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Tailwind CSS v4**: [https://tailwindcss.com](https://tailwindcss.com)
- **Radix UI Documentation**: [https://www.radix-ui.com](https://www.radix-ui.com)

---

## Documentation for AI Agents

The Kuat Design System includes LLM-optimized documentation for AI assistants.

### Quick Setup

Add this snippet to your existing `.cursorrules`, `CLAUDE.md`, or agent config:

```markdown
## Kuat Design System

This project uses the Kuat Design System for all UI work.

**What it provides:**
Design tokens, component patterns, layout guidance, and content guidelines for building consistent, accessible interfaces.

**When to use it:**
You MUST reference the Kuat documentation when:
- Creating or modifying UI components
- Making color, typography, spacing, or layout decisions
- Writing user-facing content

**How to use it:**
1. Check the documentation before making design decisions
2. Follow existing patterns; do not invent new ones
3. If the documentation doesn't cover your case, ask before proceeding

**Quick reference (when docs unavailable):**
Semantic tokens only (`bg-primary` not `bg-blue-500`), 8-point spacing grid, 6px radius for interactive elements, WCAG AA contrast.

**Documentation:** https://github.com/equal-experts/kuat-mono/tree/main/kuat-docs
```

### Need Full Documentation Locally?

For component patterns, layouts, or content guidelines, clone the docs:

```bash
git clone --filter=blob:none --sparse https://github.com/equal-experts/kuat-mono.git
cd kuat-mono && git sparse-checkout set kuat-docs
cp -r kuat-docs /path/to/your-project/
```

Then update your snippet: `Check the documentation in kuat-docs/rules/ before making design decisions`

### Verification

Test your setup with these prompts:
- "Create a card component" → Agent should reference Kuat docs
- "What color for the primary button?" → Agent should check docs or use semantic tokens
- "Add spacing between form fields" → Agent should reference spacing rules

---

## Support

For issues, questions, or contributions, please refer to the main repository documentation or open an issue in the project repository.

