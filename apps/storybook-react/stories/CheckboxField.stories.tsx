/**
 * Kuat CheckboxField — appearance (plain | card), layout (inline | block), optional secondary, flipped.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxField } from '@equal-experts/kuat-react';
import { useState } from 'react';
import { checkboxFieldDocs } from '../docs/component-docs';

const meta: Meta<typeof CheckboxField> = {
  title: 'Form Components/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: checkboxFieldDocs,
      },
    },
  
    a11y: { test: 'todo' },
  },
  argTypes: {
    label: { control: 'text' },
    secondaryText: { control: 'text' },
    appearance: { control: 'select', options: ['plain', 'card'] },
    layout: { control: 'select', options: ['inline', 'block'] },
    flipped: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

/* —— Plain / Checkbox Group (no card chrome) —— */

export const PlainInline: Story = {
  name: 'Plain · inline · label only',
  args: {
    label: 'Label',
    appearance: 'plain',
    layout: 'inline',
  },
};

export const PlainBlock: Story = {
  name: 'Plain · block · label only',
  args: {
    label: 'Label',
    appearance: 'plain',
    layout: 'block',
  },
};

export const PlainInlineWithSecondary: Story = {
  name: 'Plain · inline · with secondary (no border)',
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'plain',
    layout: 'inline',
  },
};

export const PlainWithSecondary: Story = {
  name: 'Plain · block · with secondary (no border)',
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'plain',
    layout: 'block',
  },
};

export const PlainFlipped: Story = {
  name: 'Plain · flipped · label only',
  args: {
    label: 'Checkbox on the right',
    appearance: 'plain',
    layout: 'block',
    flipped: true,
  },
};

export const PlainFlippedWithSecondary: Story = {
  name: 'Plain · flipped · with secondary',
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'plain',
    layout: 'block',
    flipped: true,
  },
};

/* —— Card / Rich checkbox group —— */

export const CardLabelOnly: Story = {
  name: 'Card · label only',
  args: {
    label: 'Label',
    appearance: 'card',
    layout: 'block',
  },
};

export const Card: Story = {
  name: 'Card · with secondary',
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'card',
    layout: 'block',
  },
};

export const CardFlipped: Story = {
  name: 'Card · flipped · with secondary',
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'card',
    flipped: true,
  },
};

export const CardInlineLayout: Story = {
  name: 'Card · inline layout',
  args: {
    label: 'Label',
    secondaryText: 'Secondary',
    appearance: 'card',
    layout: 'inline',
  },
};

/* —— States —— */

export const Disabled: Story = {
  args: {
    label: 'Cannot change',
    secondaryText: 'Secondary',
    appearance: 'plain',
    layout: 'block',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Must accept terms',
    secondaryText: 'Error state on the control',
    appearance: 'card',
    'aria-invalid': true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Pre-selected',
    secondaryText: 'defaultChecked',
    appearance: 'plain',
    layout: 'block',
    defaultChecked: true,
  },
};

function ControlledExample() {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxField
      label="Controlled"
      secondaryText="Plain with secondary (no card border)"
      appearance="plain"
      layout="block"
      checked={checked}
      onCheckedChange={(v) => setChecked(v === true)}
    />
  );
}

export const Controlled: StoryObj = {
  render: () => <ControlledExample />,
};

/** Side-by-side: plain vs card, secondary on/off, flipped. */
export const AllVariantsOverview: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>plain · inline · no secondary</p>
        <CheckboxField label="Label" appearance="plain" layout="inline" />
      </div>
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>plain · block · secondary</p>
        <CheckboxField
          label="Label"
          secondaryText="Secondary text"
          appearance="plain"
          layout="block"
        />
      </div>
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>card · secondary</p>
        <CheckboxField
          label="Label"
          secondaryText="Secondary text"
          appearance="card"
        />
      </div>
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>card · flipped</p>
        <CheckboxField
          label="Label"
          secondaryText="Secondary text"
          appearance="card"
          flipped
        />
      </div>
    </div>
  ),
};
