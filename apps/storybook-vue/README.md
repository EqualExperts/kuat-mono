# Storybook Vue

Interactive component documentation and development environment for `@equal-experts/kuat-vue`.

## Getting Started

```bash
# From the monorepo root
pnpm --filter storybook-vue dev

# Or from this directory
pnpm dev
```

This will start Storybook on [http://localhost:6007](http://localhost:6007).

## Building

```bash
# Build static Storybook
pnpm build

# Preview the built Storybook
pnpm preview
```

## Adding Stories

Create new story files in the `stories/` directory:

```typescript
// stories/MyComponent.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { MyComponent } from '@equal-experts/kuat-vue';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // your props
  },
};
```

## Deployment

The built Storybook (`storybook-static/`) can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Chromatic

