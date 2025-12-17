import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@equal-experts/kuat-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
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
  args: {
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '→',
  },
};

export const WithBrandColors: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button className="bg-ee-blue-500 hover:bg-ee-blue-600">EE Blue</Button>
      <Button className="bg-tech-blue-500 hover:bg-tech-blue-600">Tech Blue</Button>
      <Button className="bg-transform-teal-500 hover:bg-transform-teal-600">Transform Teal</Button>
      <Button className="bg-equal-ember-500 hover:bg-equal-ember-600">Equal Ember</Button>
    </div>
  ),
};

