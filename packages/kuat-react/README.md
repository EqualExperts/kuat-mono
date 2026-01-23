# @equal-experts/kuat-react

Custom React components and blocks for the Kuat Design System.

---

## Architecture

This package provides **custom components** and **blocks** that are unique to Kuat. For standard UI components (Button, Dialog, etc.), install them directly via shadcn CLI with kuat-core theming.

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat Blocks (from this package)                    │
├─────────────────────────────────────────────────────┤
│  Kuat Components (from this package)                │
├─────────────────────────────────────────────────────┤
│  shadcn Components (installed directly)             │
├─────────────────────────────────────────────────────┤
│  @equal-experts/kuat-core (design tokens)           │
└─────────────────────────────────────────────────────┘
```

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add @equal-experts/kuat-react

# Using npm
npm install @equal-experts/kuat-react

# Using yarn
yarn add @equal-experts/kuat-react
```

### Peer Dependencies

```bash
pnpm add react react-dom @radix-ui/react-slot
```

---

## What's Included

### Custom Components

Components unique to Kuat, not available in shadcn:

| Component | Description |
|-----------|-------------|
| `ButtonGroup` | Groups buttons together with proper styling |
| `ButtonGroupText` | Text element within a button group |
| `ButtonGroupSeparator` | Separator between button group items |

### Blocks (Coming Soon)

Pre-built compositions for common patterns:

| Block | Description |
|-------|-------------|
| `KuatHeader` | Brand header with logo, navigation, actions |
| `KuatFooter` | Brand footer with links and legal |
| `KuatSearchPattern` | Search input with suggestions |

### Utilities

| Utility | Description |
|---------|-------------|
| `cn()` | Class name merger using clsx + tailwind-merge |

---

## Recommended Setup

For the best experience, combine this package with kuat-core and shadcn:

### Step 1: Install Dependencies

```bash
pnpm add @equal-experts/kuat-core @equal-experts/kuat-react
```

### Step 2: Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import kuatPreset from '@equal-experts/kuat-core';

export default {
  presets: [kuatPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@equal-experts/kuat-react/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
```

### Step 3: Import Styles

```typescript
// main.tsx
import '@equal-experts/kuat-core/variables.css';
```

### Step 4: Install shadcn Components

```bash
npx shadcn@latest init
npx shadcn@latest add button dialog dropdown-menu
```

### Step 5: Use Components Together

```tsx
// Kuat custom components from this package
import { ButtonGroup, ButtonGroupText } from '@equal-experts/kuat-react';

// shadcn components from your local installation
import { Button } from '@/components/ui/button';

function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Edit</Button>
      <Button variant="outline">Save</Button>
      <Button variant="destructive">Delete</Button>
    </ButtonGroup>
  );
}
```

---

## Component Examples

### ButtonGroup

Groups buttons together with seamless borders:

```tsx
import { ButtonGroup } from '@equal-experts/kuat-react';
import { Button } from '@/components/ui/button';

// Horizontal (default)
<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>

// Vertical
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>

// With text label
<ButtonGroup>
  <ButtonGroupText>Filter:</ButtonGroupText>
  <Button variant="outline">All</Button>
  <Button variant="outline">Active</Button>
  <Button variant="outline">Completed</Button>
</ButtonGroup>
```

### cn() Utility

Merge class names with Tailwind conflict resolution:

```tsx
import { cn } from '@equal-experts/kuat-react';

function MyComponent({ className, ...props }) {
  return (
    <div
      className={cn(
        'bg-background text-foreground p-4',
        className
      )}
      {...props}
    />
  );
}
```

---

## Migration Guide

If you were importing standard components from this package, migrate to direct shadcn installation:

### Before (Deprecated)

```tsx
import { Button, Dialog, Badge } from '@equal-experts/kuat-react';
```

### After (Recommended)

```tsx
// Standard components from your local shadcn installation
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Kuat-specific components from this package
import { ButtonGroup } from '@equal-experts/kuat-react';
```

### Migration Steps

1. Ensure `@equal-experts/kuat-core` is installed
2. Initialize shadcn: `npx shadcn@latest init`
3. Install needed components: `npx shadcn@latest add button dialog badge`
4. Update imports to use local components
5. Keep imports for Kuat-specific components (ButtonGroup, etc.)

---

## Deprecated Exports

The following exports are deprecated and will be removed in the next major version. Install them directly via shadcn CLI instead:

| Component | Replacement |
|-----------|-------------|
| `Button` | `npx shadcn@latest add button` |
| `Accordion` | `npx shadcn@latest add accordion` |
| `AlertDialog` | `npx shadcn@latest add alert-dialog` |
| `Badge` | `npx shadcn@latest add badge` |

These components are still exported for backward compatibility but will be themed correctly only when using kuat-core.

---

## TypeScript Support

All components are fully typed:

```tsx
import { ButtonGroup } from '@equal-experts/kuat-react';
import type { ComponentProps } from 'react';

type ButtonGroupProps = ComponentProps<typeof ButtonGroup>;
```

---

## Dark Mode

Dark mode is supported via the `.dark` class on your root element:

```tsx
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

Components automatically adapt when using kuat-core design tokens.

---

## Related Documentation

- [Consumer Setup Guide](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/consumer-setup.md)
- [kuat-core Integration](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/kuat-core-integration.md)
- [Component Patterns](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/rules/components/patterns.md)
- [shadcn/ui Documentation](https://ui.shadcn.com)
