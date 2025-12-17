# Storybook React

Interactive component documentation and development environment for `@equal-experts/kuat-react`.

## Getting Started

```bash
# From the monorepo root
pnpm --filter storybook-react dev

# Or from this directory
pnpm dev
```

This will start Storybook on [http://localhost:6006](http://localhost:6006).

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
// stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@equal-experts/kuat-react';

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

