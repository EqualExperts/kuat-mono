# @equalexperts/kuat-react

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
pnpm add @equalexperts/kuat-react

# Using npm
npm install @equalexperts/kuat-react

# Using yarn
yarn add @equalexperts/kuat-react
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

**Note:** `@equalexperts/kuat-core` is bundled with this package - you don't need to install it separately. Only install the Radix UI packages for the components you actually use.

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
    "./node_modules/@equalexperts/kuat-react/**/*.{js,ts,jsx,tsx}", // Include Kuat components
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
        // ... other color tokens from @equalexperts/kuat-core
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
import "@equalexperts/kuat-react/styles";
```

This imports the bundled CSS file which includes all design tokens from `@equalexperts/kuat-core` (no need to install `@equalexperts/kuat-core` separately).

**Note:** The styles include:
- Design tokens from `@equalexperts/kuat-core` (colors, spacing, typography)
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
import { Button } from "@equalexperts/kuat-react";
```

### Use in Your App

```tsx
import { Button } from "@equalexperts/kuat-react";

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
import { Button } from "@equalexperts/kuat-react";

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
import { Button, type ButtonProps } from "@equalexperts/kuat-react";

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
import { Button } from "@equalexperts/kuat-react";
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
import { buttonVariants } from "@equalexperts/kuat-react";
import { cn } from "@equalexperts/kuat-react";

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

1. **Check import order**: Ensure you import `@equalexperts/kuat-react/styles` before your own styles
2. **Verify Tailwind config**: Make sure `@equalexperts/kuat-react` is included in your `content` paths
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
@equalexperts/kuat-react
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

- **Design System Documentation**: See [../../docs/agent/design/design-system.md](../../docs/agent/design/design-system.md)
- **Component Guidelines**: See [../../docs/agent/technical/component-guidelines.md](../../docs/agent/technical/component-guidelines.md)
- **shadcn/ui Documentation**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Tailwind CSS v4**: [https://tailwindcss.com](https://tailwindcss.com)

---

## Support

For issues, questions, or contributions, please refer to the main repository documentation or open an issue in the project repository.

