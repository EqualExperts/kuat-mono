# Storybook Vue Development Guide

This guide covers working with Storybook for Vue component development and documentation.

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
pnpm --filter storybook-vue dev
```

Or from this directory:

```bash
pnpm dev
```

Storybook will start on http://localhost:6007

### Project Structure

```
apps/storybook-vue/
├── .storybook/
│   ├── main.ts       # Storybook configuration
│   └── preview.ts    # Global decorators and parameters
├── stories/
│   ├── Introduction.mdx       # Welcome page
│   ├── Button.stories.ts      # Button component stories
│   ├── Accordion.stories.ts   # Accordion component stories
│   └── AlertDialog.stories.ts # AlertDialog component stories
├── package.json
└── tsconfig.json
```

## Creating Stories

### Basic Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@equal-experts/kuat-vue';

// Define metadata for the component
const meta: Meta<typeof Button> = {
  title: 'Components/Button',  // Location in sidebar
  component: Button,
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
type Story = StoryObj<typeof Button>;

// Define individual stories
export const Default: Story = {
  render: () => ({
    components: { Button },
    template: '<Button>Click me</Button>',
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="outline">Outline Button</Button>',
  }),
};
```

### Story with Multiple Components

For complex component setups:

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@equal-experts/kuat-vue';

export const WithDialog: Story = {
  render: () => ({
    components: {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      Button,
    },
    template: `
      <Dialog>
        <DialogTrigger as-child>
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
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};
```

### Story with Reactive State

Using Vue's Composition API:

```typescript
import { ref } from 'vue';

export const Interactive: Story = {
  render: () => ({
    components: { Dialog, DialogTrigger, DialogContent, Button },
    setup() {
      const isOpen = ref(false);
      return { isOpen };
    },
    template: `
      <div>
        <Dialog v-model:open="isOpen">
          <DialogTrigger as-child>
            <Button>Open Dialog ({{ isOpen ? 'Open' : 'Closed' }})</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button @click="isOpen = false">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};
```

### Story with Arguments

To enable interactive controls:

```typescript
export const Interactive: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.label }}</Button>',
  }),
  args: {
    variant: 'default',
    size: 'default',
    label: 'Interactive Button',
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
  render: () => ({
    components: { Button },
    template: '<Button>Light Theme Button</Button>',
  }),
};

export const DarkTheme: Story = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
  render: () => ({
    components: { Button },
    template: '<Button>Dark Theme Button</Button>',
  }),
};
```

### All Variants Showcase

Create comprehensive variant showcases:

```typescript
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div class="flex gap-4 flex-wrap items-center">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </div>
    `,
  }),
};
```

### Event Handling

Show event handling:

```typescript
export const WithEventHandlers: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const handleClick = () => {
        alert('Button clicked!');
      };
      return { handleClick };
    },
    template: `
      <Button @click="handleClick">
        Click Me
      </Button>
    `,
  }),
};
```

### Computed Properties

Use computed properties in stories:

```typescript
import { ref, computed } from 'vue';

export const WithComputed: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const count = ref(0);
      const buttonText = computed(() => `Clicked ${count.value} times`);
      
      return { count, buttonText };
    },
    template: `
      <Button @click="count++">
        {{ buttonText }}
      </Button>
    `,
  }),
};
```

### Brand Colors

Showcase brand color usage:

```typescript
export const WithBrandColors: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button class="bg-ee-blue-500 hover:bg-ee-blue-600">
          EE Blue
        </Button>
        <Button class="bg-tech-blue-500 hover:bg-tech-blue-600">
          Tech Blue
        </Button>
        <Button class="bg-transform-teal-500 hover:bg-transform-teal-600">
          Transform Teal
        </Button>
        <Button class="bg-equal-ember-500 hover:bg-equal-ember-600">
          Equal Ember
        </Button>
      </div>
    `,
  }),
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
# - Chrome: http://localhost:6007
# - Firefox: http://localhost:6007
# - Safari: http://localhost:6007
```

## Building for Deployment

### Build Static Storybook

```bash
# From monorepo root
pnpm --filter storybook-vue build

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

### Using Slots

Handle Vue slots in stories:

```typescript
export const WithSlots: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardContent },
    template: `
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          Card content goes here
        </CardContent>
      </Card>
    `,
  }),
};
```

### Scoped Styles

Add scoped styles to stories:

```typescript
export const WithScopedStyles: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div>
        <style scoped>
          .custom-button {
            margin: 1rem;
          }
        </style>
        <Button class="custom-button">Styled Button</Button>
      </div>
    `,
  }),
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

4. **Use Composition API**
   
   Prefer Composition API over Options API in stories:
   ```typescript
   setup() {
     const state = ref('');
     return { state };
   }
   ```

5. **Test edge cases**
   
   Create stories for error states, loading states, empty states, etc.

## Troubleshooting

### Storybook Won't Start

1. **Check port availability**
   ```bash
   lsof -i :6007  # Check if port is in use
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
   import { Button } from '@equal-experts/kuat-vue';  // Correct
   ```

2. **Rebuild packages**
   ```bash
   cd ../.. # to monorepo root
   pnpm build
   ```

3. **Check exports**
   
   Verify the component is exported in `packages/kuat-vue/src/index.ts`.

### Styles Not Loading

1. **Check CSS import** in `.storybook/preview.ts`:
   ```typescript
   import '@equal-experts/kuat-vue/styles';
   ```

2. **Verify Tailwind config** in component package

3. **Clear Storybook cache**
   ```bash
   rm -rf node_modules/.cache/storybook
   ```

### Vue Warnings

If you see Vue warnings in console:

1. **Check template syntax**
   
   Ensure your template is valid Vue 3 syntax.

2. **Verify component registration**
   
   Make sure all components are registered in the `components` object.

3. **Check prop types**
   
   Verify props match component definitions.

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/vue/get-started/introduction)
- [Storybook Vue3 Guide](https://storybook.js.org/docs/vue/writing-stories/introduction)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Component Guidelines](../../kuat-docs/rules/components/patterns.md)
- [shadcn-vue Documentation](https://www.shadcn-vue.com)

