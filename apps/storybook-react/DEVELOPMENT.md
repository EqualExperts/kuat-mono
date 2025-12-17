# Storybook React Development Guide

This guide covers working with Storybook for React component development and documentation.

## Table of Contents

- [Getting Started](#getting-started)
- [Creating Stories](#creating-stories)
- [Story Patterns](#story-patterns)
- [Testing Components](#testing-components)
- [Building for Deployment](#building-for-deployment)

## Getting Started

### Starting Storybook

From the monorepo root:

```bash
pnpm --filter storybook-react dev
```

Or from this directory:

```bash
pnpm dev
```

Storybook will start on http://localhost:6006

### Project Structure

```
apps/storybook-react/
├── .storybook/
│   ├── main.ts       # Storybook configuration
│   └── preview.ts    # Global decorators and parameters
├── stories/
│   ├── Introduction.mdx       # Welcome page
│   ├── Button.stories.tsx     # Button component stories
│   ├── Accordion.stories.tsx  # Accordion component stories
│   └── AlertDialog.stories.tsx # AlertDialog component stories
├── package.json
└── tsconfig.json
```

## Creating Stories

### Basic Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@equal-experts/kuat-react';

// Define metadata for the component
const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',  // Location in sidebar
  component: ComponentName,
  tags: ['autodocs'],  // Enable auto-generated docs
  argTypes: {
    // Define controls for props
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// Define individual stories
export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};
```

### Story with Custom Render

For complex component setups:

```typescript
export const WithDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
```

### Story with Arguments

To enable interactive controls:

```typescript
export const Interactive: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'default',
    size: 'default',
    children: 'Interactive Button',
  },
};
```

## Story Patterns

### Theme Testing

Test components in both light and dark themes:

```typescript
export const LightTheme: Story = {
  parameters: {
    themes: {
      themeOverride: 'light',
    },
  },
  args: {
    children: 'Light Theme Button',
  },
};

export const DarkTheme: Story = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
  args: {
    children: 'Dark Theme Button',
  },
};
```

### All Variants Showcase

Create comprehensive variant showcases:

```typescript
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>
    </div>
  ),
};
```

### State Variations

Show different component states:

```typescript
import { useState } from 'react';

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
```

### Accessibility Testing

Document accessibility features:

```typescript
export const AccessibilityDemo: Story = {
  render: () => (
    <div>
      <h3>Keyboard Navigation</h3>
      <p>Tab to focus, Enter to activate, Escape to close</p>
      <Button>Accessible Button</Button>
    </div>
  ),
  parameters: {
    a11y: {
      // Configure accessibility checks
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### Brand Colors

Showcase brand color usage:

```typescript
export const WithBrandColors: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button className="bg-ee-blue-500 hover:bg-ee-blue-600">
        EE Blue
      </Button>
      <Button className="bg-tech-blue-500 hover:bg-tech-blue-600">
        Tech Blue
      </Button>
      <Button className="bg-transform-teal-500 hover:bg-transform-teal-600">
        Transform Teal
      </Button>
      <Button className="bg-equal-ember-500 hover:bg-equal-ember-600">
        Equal Ember
      </Button>
    </div>
  ),
};
```

## Testing Components

### Visual Testing

Use Storybook's UI to test:

1. **Toggle themes** - Click the theme icon (🎨) in the toolbar
2. **Test responsive** - Use the viewport addon to test different sizes
3. **Check accessibility** - Use the A11y addon to check compliance
4. **Test interactions** - Use controls to modify props in real-time

### Keyboard Navigation

Test keyboard accessibility:

- **Tab** - Navigate between elements
- **Enter/Space** - Activate buttons
- **Escape** - Close dialogs/modals
- **Arrow keys** - Navigate menus/lists

### Browser Testing

Test in different browsers:

```bash
# Start Storybook
pnpm dev

# Open in different browsers
# - Chrome: http://localhost:6006
# - Firefox: http://localhost:6006
# - Safari: http://localhost:6006
```

## Building for Deployment

### Build Static Storybook

```bash
# From monorepo root
pnpm --filter storybook-react build

# Or from this directory
pnpm build
```

This creates a static site in `storybook-static/`.

### Preview the Build

```bash
pnpm preview
```

Or use any static file server:

```bash
npx http-server storybook-static
```

### Deployment Options

Deploy to various platforms:

**Netlify**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=storybook-static --prod
```

**Vercel**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel storybook-static --prod
```

**GitHub Pages**:
```bash
# Build Storybook
pnpm build

# Deploy to gh-pages branch
npx gh-pages -d storybook-static
```

## Advanced Topics

### Custom Decorators

Add global decorators in `.storybook/preview.ts`:

```typescript
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};
```

### Custom Parameters

Configure story parameters:

```typescript
export const CustomBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};
```

### TypeScript Types

Use proper TypeScript types:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Button } from '@equal-experts/kuat-react';

type ButtonProps = ComponentProps<typeof Button>;

const meta: Meta<ButtonProps> = {
  // configuration
};
```

## Best Practices

1. **Use descriptive story names**
   ```typescript
   // Good
   export const DefaultButton: Story = { };
   export const DestructiveVariant: Story = { };
   
   // Bad
   export const Story1: Story = { };
   export const Test: Story = { };
   ```

2. **Group related stories**
   ```typescript
   // Use title to organize in sidebar
   title: 'Components/Forms/Button'
   title: 'Components/Forms/Input'
   title: 'Components/Feedback/Alert'
   ```

3. **Include all variants**
   
   Create stories for all component variants to ensure comprehensive testing.

4. **Document usage**
   
   Add descriptions using JSDoc or MDX:
   ```typescript
   /**
    * The primary button for main actions.
    * Use sparingly for the most important action on a page.
    */
   export const Primary: Story = { };
   ```

5. **Test edge cases**
   
   Create stories for error states, loading states, empty states, etc.

## Troubleshooting

### Storybook Won't Start

1. **Check port availability**
   ```bash
   lsof -i :6006  # Check if port is in use
   ```

2. **Clear cache**
   ```bash
   rm -rf node_modules/.cache
   pnpm dev
   ```

3. **Reinstall dependencies**
   ```bash
   rm -rf node_modules
   pnpm install
   ```

### Component Not Loading

1. **Verify import path**
   ```typescript
   import { Button } from '@equal-experts/kuat-react';  // Correct
   ```

2. **Rebuild packages**
   ```bash
   cd ../.. # to monorepo root
   pnpm build
   ```

3. **Check exports**
   
   Verify the component is exported in `packages/kuat-react/src/index.ts`.

### Styles Not Loading

1. **Check CSS import** in `.storybook/preview.ts`:
   ```typescript
   import '@equal-experts/kuat-react/styles';
   ```

2. **Verify Tailwind config** in component package

3. **Clear Storybook cache**
   ```bash
   rm -rf node_modules/.cache/storybook
   ```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook Addons](https://storybook.js.org/addons/)
- [Component Guidelines](../../docs/agent/technical/component-guidelines.md)
- [shadcn/ui Documentation](https://ui.shadcn.com)

