# @equal-experts/kuat-react

React components and blocks for the Kuat Design System: **localized primitives** (forms, actions, feedback) and **composed blocks** (header, carousel, logo lockup, etc.). Use **`@equal-experts/kuat-core`** for tokens and the **shadcn CLI** only for UI that Kuat does not ship (for example Dialog, DropdownMenu, Tabs).

**When to import from here vs shadcn:** [Choosing components](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/choosing-components.md) · [Public API inventory](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/public-api-inventory.md)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat blocks (KuatHeader, KuatCarousel, …)         │  ← This package
├─────────────────────────────────────────────────────┤
│  Kuat primitives (Button, Field, Select, …)        │  ← This package
├─────────────────────────────────────────────────────┤
│  shadcn-only components (Dialog, DropdownMenu, …)     │  ← Installed in your app
├─────────────────────────────────────────────────────┤
│  @equal-experts/kuat-core                            │
└─────────────────────────────────────────────────────┘
```

---

## Installation

```bash
pnpm add @equal-experts/kuat-core @equal-experts/kuat-react
```

You need **both** packages: core supplies CSS variables and the Tailwind preset; this package supplies components.

### Peer dependencies

`react` and `react-dom` are required. Radix UI and other peers are listed in this package’s `package.json` under `peerDependencies`—install the primitives that match the components you use.

```bash
pnpm add react react-dom
# Add @radix-ui/* and lucide-react as needed for your components — see peerDependencies
```

---

## What’s included

### Utilities

| Export | Description |
|--------|-------------|
| `cn` | `clsx` + `tailwind-merge` helper |

### Blocks and layout

| Area | Examples |
|------|----------|
| Header / brand | `KuatHeader`, `EELogo`, `EELogoIcon` |
| Carousel | `KuatCarousel`, `KuatCarouselContent`, `KuatCarouselItem`, `KuatCarouselPrevious`, `KuatCarouselNext`, `useKuatCarousel` |
| Logo lockup | `KuatLogoLockup` |
| Progress | `KuatRadialProgress` |
| Cards | `ContentCard` |

### Form and actions

`Button`, `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`, `Badge`, `Input`, `Textarea`, `Field` (+ subcomponents), `Select` / `KuatSelect` (+ Select primitives), `Checkbox` / `CheckboxField`, `RadioGroup` / `RadioField`, `Switch` / `SwitchField`, `Toggle`, `ToggleGroup`.

### Content and navigation

`Accordion`, `AlertDialog` (+ primitives), `Breadcrumb`.

Interactive API details live in **Storybook** in this repo (`apps/storybook-react`).

### Tree-shakable subpath imports

`package.json` exposes subpaths such as `./button`, `./field`, `./switch`, `./kuat-radial-progress`, etc. Example:

```tsx
import { KuatRadialProgress } from '@equal-experts/kuat-react/kuat-radial-progress';
```

See [public-api-inventory.md](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/public-api-inventory.md) for the full subpath list.

---

## Recommended setup

### 1. Tailwind

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

### 2. Design tokens (once per app)

```typescript
// main.tsx
import '@equal-experts/kuat-core/variables.css';
```

### 3. shadcn for gaps only

```bash
npx shadcn@latest init
npx shadcn@latest add dialog dropdown-menu   # examples — skip `button` if you use Kuat Button
```

### 4. Use Kuat + shadcn together

```tsx
import { Button, ButtonGroup, Field } from '@equal-experts/kuat-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function Example() {
  return (
    <ButtonGroup>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <Button>Save</Button>
    </ButtonGroup>
  );
}
```

---

## Component examples

### ButtonGroup

```tsx
import { ButtonGroup, ButtonGroupText, Button } from '@equal-experts/kuat-react';

<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>

<ButtonGroup>
  <ButtonGroupText>Filter:</ButtonGroupText>
  <Button variant="outline">All</Button>
</ButtonGroup>
```

### `cn()` utility

```tsx
import { cn } from '@equal-experts/kuat-react';

export function Box({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('bg-background p-4', className)} {...props} />;
}
```

---

## Migration (legacy projects)

Older docs suggested installing **all** primitives via shadcn. Kuat now ships many components from this package.

**Prefer**

- `import { Button, Badge, Field, … } from '@equal-experts/kuat-react'` for published primitives.
- `import { … } from '@/components/ui/dialog'` (etc.) only for **shadcn-only** pieces.

**Dialog** is a typical shadcn-only import; **Button** should come from Kuat when you adopt the design system.

Steps:

1. Keep `@equal-experts/kuat-core` and add or update `@equal-experts/kuat-react`.
2. Replace duplicate shadcn copies of Kuat primitives with imports from this package where possible.
3. Reserve `components/ui/` for components Kuat does not publish.

---

## TypeScript

```tsx
import { ButtonGroup } from '@equal-experts/kuat-react';
import type { ComponentProps } from 'react';

type ButtonGroupProps = ComponentProps<typeof ButtonGroup>;
```

---

## Dark mode

Use the `.dark` class on the document root (or an ancestor). Tokens come from `kuat-core`.

```tsx
<html className="dark">
  <body>{/* … */}</body>
</html>
```

---

## Related documentation

- [Consumer setup](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/consumer-setup.md)
- [Choosing components](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/choosing-components.md)
- [kuat-core integration](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/setup/kuat-core-integration.md)
- [Component patterns (contributors)](https://github.com/equalexperts/kuat-mono/blob/master/kuat-docs/rules/components/patterns.md)
- [shadcn/ui](https://ui.shadcn.com)
