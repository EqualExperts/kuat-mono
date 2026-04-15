/**
 * Kuat Textarea – 4px radius, states via focus / aria-invalid / disabled, CSS resize.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@equal-experts/kuat-react';
import { textareaDocs } from '../docs/component-docs';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: textareaDocs,
      },
    },
  },
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
    'aria-label': 'Message',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Value',
    'aria-label': 'Message',
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 'Value',
    'aria-invalid': true,
    'aria-label': 'Message',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Value',
    disabled: true,
    'aria-label': 'Message',
  },
};

export const ResizeNone: Story = {
  args: {
    resize: 'none',
    placeholder: 'Not resizable',
    'aria-label': 'Message',
  },
};

export const ResizeBoth: Story = {
  args: {
    resize: 'both',
    placeholder: 'Resize both axes',
    'aria-label': 'Message',
  },
};
