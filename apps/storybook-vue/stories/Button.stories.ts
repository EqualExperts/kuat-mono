/**
 * @deprecated This component import is deprecated.
 *
 * For new projects, install Button directly via shadcn-vue CLI:
 * ```bash
 * npx shadcn-vue@latest add button
 * ```
 *
 * The component will be themed automatically when using kuat-core.
 * This story demonstrates the Button styling that kuat-core provides.
 */
import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@equal-experts/kuat-vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button (Deprecated)',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Destructive: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="destructive">Destructive</Button>',
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="outline">Outline</Button>',
  }),
};

export const Secondary: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="secondary">Secondary</Button>',
  }),
};

export const Ghost: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="ghost">Ghost</Button>',
  }),
};

export const Link: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="link">Link</Button>',
  }),
};

export const Small: Story = {
  render: () => ({
    components: { Button },
    template: '<Button size="sm">Small</Button>',
  }),
};

export const Large: Story = {
  render: () => ({
    components: { Button },
    template: '<Button size="lg">Large</Button>',
  }),
};

export const Icon: Story = {
  render: () => ({
    components: { Button },
    template: '<Button size="icon">→</Button>',
  }),
};

export const WithBrandColors: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button class="bg-ee-blue-500 hover:bg-ee-blue-600">EE Blue</Button>
        <Button class="bg-tech-blue-500 hover:bg-tech-blue-600">Tech Blue</Button>
        <Button class="bg-transform-teal-500 hover:bg-transform-teal-600">Transform Teal</Button>
        <Button class="bg-equal-ember-500 hover:bg-equal-ember-600">Equal Ember</Button>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div class="flex gap-4 flex-wrap items-center">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default Size</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">→</Button>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </div>
    `,
  }),
};

