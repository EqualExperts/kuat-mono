/**
 * Kuat CheckboxField — appearance (plain | card), layout, optional secondary, flipped.
 */
import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { CheckboxField } from '@equal-experts/kuat-vue';

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
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
  render: () => ({
    components: { CheckboxField },
    setup() {
      const model = ref(true);
      return { model };
    },
    template: `
      <CheckboxField
        v-model="model"
        label="Pre-selected"
        secondary-text="Checked via v-model"
        appearance="plain"
        layout="block"
      />
    `,
  }),
};

export const Controlled: StoryObj = {
  render: () => ({
    components: { CheckboxField },
    setup() {
      const model = ref(false);
      return { model };
    },
    template: `
      <CheckboxField
        v-model="model"
        label="Controlled"
        secondary-text="Plain with secondary (no card border)"
        appearance="plain"
        layout="block"
      />
    `,
  }),
};

export const AllVariantsOverview: StoryObj = {
  render: () => ({
    components: { CheckboxField },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; align-items: start;">
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">plain · inline · no secondary</p>
          <CheckboxField label="Label" appearance="plain" layout="inline" />
        </div>
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">plain · block · secondary</p>
          <CheckboxField label="Label" secondary-text="Secondary text" appearance="plain" layout="block" />
        </div>
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">card · secondary</p>
          <CheckboxField label="Label" secondary-text="Secondary text" appearance="card" />
        </div>
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">card · flipped</p>
          <CheckboxField label="Label" secondary-text="Secondary text" appearance="card" flipped />
        </div>
      </div>
    `,
  }),
};
