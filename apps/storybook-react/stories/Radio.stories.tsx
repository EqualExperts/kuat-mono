/**
 * Kuat Radio primitives — `RadioGroup` + `RadioGroupItem` (Radix). Use with a group label in real forms (`aria-labelledby` on `RadioGroup` or `fieldset`/`legend`).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '@equal-experts/kuat-react';
import { radioDocs } from '../docs/component-docs';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: radioDocs,
      },
    },
  
    a11y: { test: "error" },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="flex flex-col gap-3" aria-label="Example group">
      <RadioGroupItem value="a" aria-label="Option A" />
      <RadioGroupItem value="b" aria-label="Option B" />
    </RadioGroup>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <RadioGroup defaultValue="a" aria-label="Example group">
      <RadioGroupItem value="a" aria-label="Enabled" />
      <RadioGroupItem value="b" aria-label="Disabled option" disabled />
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup defaultValue="a" aria-label="Example group">
      <RadioGroupItem value="a" aria-label="Valid" />
      <RadioGroupItem value="b" aria-label="Invalid" aria-invalid />
    </RadioGroup>
  ),
};
