/**
 * Kuat Input — 4px radius, four sizes, states via focus / aria-invalid / disabled, optional decorations.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Search, Info } from 'lucide-react';
import { Button, Input, INPUT_SIZES } from '@equal-experts/kuat-react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [...INPUT_SIZES],
    },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    'aria-label': 'Example input',
    placeholder: 'Type here',
  },
};

export const Empty: Story = {
  args: {
    'aria-label': 'Empty (no placeholder)',
  },
};

export const Placeholder: Story = {
  args: {
    'aria-label': 'Placeholder',
    placeholder: 'Value',
  },
};

export const WithValue: Story = {
  args: {
    'aria-label': 'With value',
    defaultValue: 'Value',
  },
};

export const Invalid: Story = {
  args: {
    'aria-label': 'Invalid',
    defaultValue: 'Value',
    'aria-invalid': true,
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Disabled',
    defaultValue: 'Value',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      {INPUT_SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-xs capitalize text-slate-500">{size}</span>
          <Input size={size} aria-label={`${size} sample`} placeholder="Value" />
        </div>
      ))}
    </div>
  ),
};

export const WithSearchDecorations: Story = {
  render: () => (
    <Input
      aria-label="Search"
      placeholder="Value"
      leftDecoration={<Search className="size-4 shrink-0 text-slate-500" aria-hidden />}
      rightDecoration={
        <span className="text-sm whitespace-nowrap text-slate-500">12 results</span>
      }
    />
  ),
};

export const WithUrlDecorations: Story = {
  render: () => (
    <Input
      aria-label="URL"
      placeholder="example.com"
      defaultValue="example.com"
      leftDecoration={
        <span className="whitespace-nowrap text-sm text-slate-500">https://</span>
      }
      rightDecoration={<Info className="size-4 shrink-0 text-slate-500" aria-hidden />}
    />
  ),
};

export const WithButtonDecoration: Story = {
  render: () => (
    <Input
      aria-label="Search with action"
      placeholder="Type to search…"
      className="pr-0.5"
      rightDecoration={
        <Button type="button" size="small" variant="secondary">
          Search
        </Button>
      }
    />
  ),
};

export const CurrencyDecorations: Story = {
  render: () => (
    <Input
      aria-label="Amount"
      placeholder="0,00"
      leftDecoration={<span className="text-sm text-slate-500">$</span>}
      rightDecoration={<span className="text-sm text-slate-500">USD</span>}
    />
  ),
};
