# @equal-experts/kuat-react

React components and blocks for the Kuat Design System: **localized primitives** (forms, actions, feedback, **IconButton**) and **composed blocks** (header, carousel, logo lockup, etc.). Use **`@equal-experts/kuat-core`** for tokens and the **shadcn CLI** only for UI that Kuat does not ship (for example Dialog, DropdownMenu, Tabs).

**IconButton** is available from the package root (`import { IconButton } from "@equal-experts/kuat-react"`) and as a subpath entry: `@equal-experts/kuat-react/icon-button`.

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
pnpm add react react-dom @equal-experts/kuat-core @equal-experts/kuat-react
```

You need **both** packages: core supplies CSS variables and the Tailwind preset; this package supplies components.

### Agent Guardrails

Add this to your project `AGENTS.md` (or `.cursorrules`) so agent workflows stay Kuat-first:

```markdown
## Kuat UI Component Selection Rules
1. Load bundled rules entrypoints from `@equal-experts/kuat-core`:
   - `node_modules/@equal-experts/kuat-core/agent-docs/kuat-docs/rules/README.md`
   - `node_modules/@equal-experts/kuat-core/agent-docs/external/kuat-agent-rules/kuat-docs/rules/LOADING.md`
2. Ensure decisions reference both bundled Equal Experts foundations and web rules (`.../external/kuat-agent-rules/.../foundations/*` and `.../types/web/*`).
3. Read `kuat-docs/setup/choosing-components.md` before building UI.
4. Choose sources in order: Kuat blocks -> Kuat components -> shadcn gaps -> custom.
5. Verify exports in `@equal-experts/kuat-react` before implementing.
6. Document the chosen source and any exception rationale in PR notes.
```

### Peer dependencies

Install peers for the components you use before running `dev` or `build`.
`react`/`react-dom` are always required. Embla (carousel) and Sonner ship as
bundled dependencies, so you don't install those.

| Components you use | Peers to install |
|---|---|
| `Button`, `ButtonGroup`, `IconButton` | `@radix-ui/react-slot` |
| `Accordion` | `@radix-ui/react-accordion`, `lucide-react` |
| `AlertDialog` | `@radix-ui/react-alert-dialog` |
| `Select` | `@radix-ui/react-select`, `lucide-react` |
| `DropdownMenu` | `@radix-ui/react-dropdown-menu`, `lucide-react` |
| `Checkbox` / `CheckboxField` | `@radix-ui/react-checkbox`, `lucide-react` |
| `Radio` / `RadioField` | `@radix-ui/react-radio-group` |
| `Switch` / `SwitchField` | `@radix-ui/react-switch` |
| `Toggle`, `ToggleGroup` | `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group` |
| `Separator` | `@radix-ui/react-separator` |
| `Carousel`, `KuatCarousel` | `lucide-react` |
| `Breadcrumb`, `KuatHeader` | `lucide-react` |
| `Sonner` | — (bundled, no peer to install) |
| `Badge`, `Field`, `Input`, `Textarea`, `ContentCard`, `KuatRadialProgress` | none |

> **Tip:** if you use the Kuat agent plugin in Claude Code, run
> `/kuat-add <component>` to add a component and install its peers automatically,
> instead of wiring the table above by hand.

Example peer install for a broad setup:

```bash
pnpm add @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-select @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group lucide-react
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

`KuatCarousel` is exported from both the root barrel and subpath:

```tsx
import { KuatCarousel } from '@equal-experts/kuat-react';
// or
import { KuatCarousel } from '@equal-experts/kuat-react/kuat-carousel';
```

---

## Recommended setup

### 1. Tailwind v4 + Kuat tokens (CSS-first)

Add the Tailwind v4 plugin to your build (e.g. `@tailwindcss/vite`), then create
a global stylesheet that imports Tailwind and the Kuat tokens. The tokens must
be pulled in **through Tailwind** (a CSS `@import`) so the `@theme` block in
`variables.css` is processed and the token utilities (`bg-primary`,
`text-foreground`, `rounded-lg`, …) are generated:

```css
/* src/index.css */
@import "@equal-experts/kuat-core/fonts.css"; /* fonts; or a <link> — see kuat-core README */
@import "tailwindcss";
@import "@equal-experts/kuat-core/variables.css";
```

> A plain JS `import "@equal-experts/kuat-core/variables.css"` loads the raw
> variables but does **not** feed the `@theme` block to Tailwind, so the token
> utilities never generate (with no error). Always `@import` the tokens through
> Tailwind, as above.
>
> The legacy JS preset (`presets: [kuatPreset]`) is **deprecated** and is not
> auto-loaded by Tailwind v4 — don't use it. See the kuat-core README.

### 2. Component styles (once per app entrypoint)

Kuat component CSS is pre-compiled, so a JS import is correct here:

```typescript
// main.tsx
import '@equal-experts/kuat-react/styles'; // pre-compiled component CSS
import './index.css';                       // Tailwind + Kuat tokens (from step 1)
import './app.css';                          // your app styles, last
```

Import order matters: load Kuat styles before app-specific styles.

If you scaffolded from a starter template (for example Vite), remove or neutralize template CSS that resets fonts/layout globally (for example `src/index.css` with `:root { font: ... }`, `body { ... }`, `#root { ... }`). These rules can override Kuat typography and spacing.

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

## Verification test (human or agent)

Use this quick smoke test after installation to verify imports, styles, and Tailwind are wired correctly.

### 1. Add a smoke component

```tsx
import { Button, Field, FieldLabel, Input, KuatCarousel, KuatCarouselContent, KuatCarouselItem } from '@equal-experts/kuat-react';

export function KuatInstallSmoke() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-4xl font-bold">Kuat install smoke test</h1>

      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" placeholder="Test input" />
      </Field>

      <Button variant="primary">Primary action</Button>

      <KuatCarousel opts={{ loop: false }}>
        <KuatCarouselContent>
          <KuatCarouselItem>Slide 1</KuatCarouselItem>
          <KuatCarouselItem>Slide 2</KuatCarouselItem>
        </KuatCarouselContent>
      </KuatCarousel>
    </div>
  );
}
```

### 2. Run checks

```bash
pnpm build
pnpm dev
```

### 3. Pass/fail criteria

- Pass: no unresolved import errors for `@equal-experts/kuat-react/styles` or component imports.
- Pass: heading renders visibly larger and bold (`text-4xl font-bold` applied).
- Pass: `Button`, `Field`, and `KuatCarousel` render with Kuat styles (not plain browser defaults).
- Pass: typography uses Kuat font stack (Lexend for sans) rather than template defaults.
- Fail: any need to import internal `dist/*.css` files manually.
- Fail: selecting custom/shadcn carousel without documenting why `@equal-experts/kuat-react` carousel exports were not used.

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
