/**
 * Kuat Button – primary/secondary/outline/ghost/ghost-muted/destructive, per-instance color, no shadow.
 */
import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@equal-experts/kuat-vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'ghost-muted', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'default', 'large', 'icon'],
    },
    color: {
      control: 'select',
      options: ['ee-blue', 'tech-blue', 'byte-white', 'the-cloud', 'dark-data', 'transform-teal', 'equal-ember'],
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary</Button>',
  }),
};

export const Secondary: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="secondary">Secondary</Button>',
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="outline">Outline</Button>',
  }),
};

export const Ghost: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="ghost">Ghost</Button>',
  }),
};

export const GhostMuted: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="ghost-muted">Ghost Muted</Button>',
  }),
};

export const Destructive: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="destructive">Destructive</Button>',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap items-center">
        <Button size="mini">Mini</Button>
        <Button size="small">Small</Button>
        <Button size="default">Default</Button>
        <Button size="large">Large</Button>
        <Button size="icon" aria-label="Icon only">→</Button>
      </div>
    `,
  }),
};

export const Color: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button color="ee-blue" variant="primary">EE Blue</Button>
        <Button color="tech-blue" variant="primary">Tech Blue</Button>
        <Button color="byte-white" variant="primary">Byte White</Button>
        <Button color="the-cloud" variant="primary">The Cloud</Button>
        <Button color="dark-data" variant="primary">Dark Data</Button>
        <Button color="transform-teal" variant="primary">Transform Teal</Button>
        <Button color="equal-ember" variant="primary">Equal Ember</Button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap items-center">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
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
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="ghost-muted">Ghost Muted</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <Button size="mini">Mini</Button>
          <Button size="small">Small</Button>
          <Button size="default">Default</Button>
          <Button size="large">Large</Button>
          <Button size="icon" aria-label="Icon">→</Button>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </div>
    `,
  }),
};
