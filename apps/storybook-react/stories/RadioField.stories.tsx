/**
 * Kuat RadioField — appearance (plain | card), layout, optional secondary, flipped. Must be used inside `RadioGroup`.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { RadioField, RadioGroup } from '@equal-experts/kuat-react';
import { useState } from 'react';

const meta: Meta<typeof RadioField> = {
  title: 'Components/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrap options in `RadioGroup`. For accessibility, pair the group with a visible label using `aria-labelledby` on `RadioGroup` or a `fieldset`/`legend`.',
      },
    },
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
type Story = StoryObj<typeof RadioField>;

/* —— Plain / Radio Group (no card chrome) —— */

export const PlainInline: Story = {
  name: 'Plain · inline · label only',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    appearance: 'plain',
    layout: 'inline',
  },
};

export const PlainBlock: Story = {
  name: 'Plain · block · label only',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    appearance: 'plain',
    layout: 'block',
  },
};

export const PlainInlineWithSecondary: Story = {
  name: 'Plain · inline · with secondary (no border)',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'plain',
    layout: 'inline',
  },
};

export const PlainWithSecondary: Story = {
  name: 'Plain · block · with secondary (no border)',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'plain',
    layout: 'block',
  },
};

export const PlainFlipped: Story = {
  name: 'Plain · flipped · label only',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Radio on the right',
    appearance: 'plain',
    layout: 'block',
    flipped: true,
  },
};

export const PlainFlippedWithSecondary: Story = {
  name: 'Plain · flipped · with secondary',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'plain',
    layout: 'block',
    flipped: true,
  },
};

/* —— Card / Rich radio group —— */

export const CardLabelOnly: Story = {
  name: 'Card · label only',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    appearance: 'card',
    layout: 'block',
  },
};

export const Card: Story = {
  name: 'Card · with secondary',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'card',
    layout: 'block',
  },
};

export const CardFlipped: Story = {
  name: 'Card · flipped · with secondary',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    secondaryText: 'Secondary text',
    appearance: 'card',
    flipped: true,
  },
};

export const CardInlineLayout: Story = {
  name: 'Card · inline layout',
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Label',
    secondaryText: 'Secondary',
    appearance: 'card',
    layout: 'inline',
  },
};

/* —— States —— */

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="other" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Selected instead"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Cannot select this',
    secondaryText: 'Secondary',
    appearance: 'plain',
    layout: 'block',
    disabled: true,
  },
};

export const Invalid: Story = {
  render: (args) => (
    <RadioGroup defaultValue="main" className="flex flex-col gap-3">
      <RadioField {...args} value="main" />
      <RadioField
        value="other"
        label="Other option"
        appearance={args.appearance}
        layout={args.layout}
      />
    </RadioGroup>
  ),
  args: {
    label: 'Must choose carefully',
    secondaryText: 'Error state on the control',
    appearance: 'card',
    'aria-invalid': true,
  },
};

function ControlledExample() {
  const [value, setValue] = useState('main');
  return (
    <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <RadioField
        value="main"
        label="Controlled"
        secondaryText="Plain with secondary (no card border)"
        appearance="plain"
        layout="block"
      />
      <RadioField value="other" label="Other" appearance="plain" layout="block" />
    </RadioGroup>
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
        <RadioGroup defaultValue="a" className="flex flex-col gap-2">
          <RadioField value="a" label="Label" appearance="plain" layout="inline" />
          <RadioField value="b" label="Other" appearance="plain" layout="inline" />
        </RadioGroup>
      </div>
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>plain · block · secondary</p>
        <RadioGroup defaultValue="a" className="flex flex-col gap-2">
          <RadioField
            value="a"
            label="Label"
            secondaryText="Secondary text"
            appearance="plain"
            layout="block"
          />
          <RadioField value="b" label="Other" appearance="plain" layout="block" />
        </RadioGroup>
      </div>
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>card · secondary</p>
        <RadioGroup defaultValue="a" className="flex flex-col gap-2">
          <RadioField
            value="a"
            label="Label"
            secondaryText="Secondary text"
            appearance="card"
          />
          <RadioField value="b" label="Other" appearance="card" />
        </RadioGroup>
      </div>
      <div>
        <p style={{ fontSize: 12, margin: '0 0 8px', color: '#64748b' }}>card · flipped</p>
        <RadioGroup defaultValue="a" className="flex flex-col gap-2">
          <RadioField
            value="a"
            label="Label"
            secondaryText="Secondary text"
            appearance="card"
            flipped
          />
          <RadioField value="b" label="Other" appearance="card" flipped />
        </RadioGroup>
      </div>
    </div>
  ),
};
