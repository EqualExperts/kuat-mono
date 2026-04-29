/**
 * Kuat Checkbox primitive — states via Radix data-state (Figma matrix: default, checked, indeterminate, invalid, disabled).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@equal-experts/kuat-react';
import { checkboxDocs } from '../docs/component-docs';

const meta: Meta<typeof Checkbox> = {
  title: 'Form Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: checkboxDocs,
      },
    },
  
    a11y: { test: 'error' },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    'aria-label': 'Example checkbox',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Checked',
  },
};

export const UncheckedControlled: Story = {
  render: () => (
    <Checkbox
      aria-label="Unchecked (controlled)"
      checked={false}
      onCheckedChange={() => {}}
    />
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Checkbox
      aria-label="Indeterminate"
      checked="indeterminate"
      onCheckedChange={() => {}}
    />
  ),
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    'aria-label': 'Invalid',
  },
};

export const InvalidChecked: Story = {
  render: () => (
    <Checkbox
      aria-label="Invalid and checked"
      checked
      aria-invalid
      onCheckedChange={() => {}}
    />
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Disabled (checked)',
  },
};

export const DisabledInvalid: Story = {
  args: {
    disabled: true,
    'aria-invalid': true,
    'aria-label': 'Disabled and invalid',
  },
};

/** Figma-style matrix: each row is a distinct state for visual comparison. */
export const AllStatesOverview: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: '12px 24px',
        alignItems: 'center',
        maxWidth: 420,
      }}
    >
      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Default</span>
      <Checkbox aria-label="Default" />

      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Checked</span>
      <Checkbox aria-label="Checked" defaultChecked />

      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Indeterminate</span>
      <Checkbox
        aria-label="Indeterminate"
        checked="indeterminate"
        onCheckedChange={() => {}}
      />

      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Invalid</span>
      <Checkbox aria-label="Invalid" aria-invalid />

      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Invalid + checked</span>
      <Checkbox aria-label="Invalid checked" checked aria-invalid onCheckedChange={() => {}} />

      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Disabled</span>
      <Checkbox aria-label="Disabled" disabled />

      <span style={{ fontSize: 12, color: 'var(--muted-foreground, #64748b)' }}>Disabled + checked</span>
      <Checkbox aria-label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
