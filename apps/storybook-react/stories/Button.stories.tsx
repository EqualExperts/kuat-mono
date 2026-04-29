/**
 * Kuat Button – primary/secondary/outline/ghost/ghost-muted/destructive, per-instance color, no shadow.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@equal-experts/kuat-react';
import { buttonDocs } from '../docs/component-docs';

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: buttonDocs,
      },
    },
  
    a11y: { test: 'todo' },
  },
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
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const GhostMuted: Story = {
  args: {
    variant: 'ghost-muted',
    children: 'Ghost Muted',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button size="mini">Mini</Button>
      <Button size="small">Small</Button>
      <Button size="default">Default</Button>
      <Button size="large">Large</Button>
      <Button size="icon" aria-label="Icon only">→</Button>
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button color="ee-blue" variant="primary">EE Blue</Button>
      <Button color="tech-blue" variant="primary">Tech Blue</Button>
      <Button color="byte-white" variant="primary">Byte White</Button>
      <Button color="the-cloud" variant="primary">The Cloud</Button>
      <Button color="dark-data" variant="primary">Dark Data</Button>
      <Button color="transform-teal" variant="primary">Transform Teal</Button>
      <Button color="equal-ember" variant="primary">Equal Ember</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost-muted">Ghost Muted</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Button size="mini">Mini</Button>
        <Button size="small">Small</Button>
        <Button size="default">Default</Button>
        <Button size="large">Large</Button>
        <Button size="icon" aria-label="Icon">→</Button>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>
    </div>
  ),
};
