/**
 * Kuat RadioField — appearance (plain | card), layout, optional secondary, flipped. Must be used inside `RadioGroup`.
 */
import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { RadioField, RadioGroup } from '@equal-experts/kuat-vue';
import { radioFieldDocs } from '../docs/component-docs';

const meta: Meta<typeof RadioField> = {
  title: 'Components/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: radioFieldDocs,
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

export const PlainInline: Story = {
  name: 'Plain · inline · label only',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" appearance="plain" layout="inline" />
        <RadioField value="other" label="Other option" appearance="plain" layout="inline" />
      </RadioGroup>
    `,
  }),
};

export const PlainBlock: Story = {
  name: 'Plain · block · label only',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" appearance="plain" layout="block" />
        <RadioField value="other" label="Other option" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const PlainInlineWithSecondary: Story = {
  name: 'Plain · inline · with secondary (no border)',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" secondary-text="Secondary text" appearance="plain" layout="inline" />
        <RadioField value="other" label="Other option" appearance="plain" layout="inline" />
      </RadioGroup>
    `,
  }),
};

export const PlainWithSecondary: Story = {
  name: 'Plain · block · with secondary (no border)',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" secondary-text="Secondary text" appearance="plain" layout="block" />
        <RadioField value="other" label="Other option" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const PlainFlipped: Story = {
  name: 'Plain · flipped · label only',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Radio on the right" appearance="plain" layout="block" flipped />
        <RadioField value="other" label="Other option" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const PlainFlippedWithSecondary: Story = {
  name: 'Plain · flipped · with secondary',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" secondary-text="Secondary text" appearance="plain" layout="block" flipped />
        <RadioField value="other" label="Other option" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const CardLabelOnly: Story = {
  name: 'Card · label only',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" appearance="card" layout="block" />
        <RadioField value="other" label="Other option" appearance="card" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const Card: Story = {
  name: 'Card · with secondary',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" secondary-text="Secondary text" appearance="card" layout="block" />
        <RadioField value="other" label="Other option" appearance="card" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const CardFlipped: Story = {
  name: 'Card · flipped · with secondary',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" secondary-text="Secondary text" appearance="card" flipped />
        <RadioField value="other" label="Other option" appearance="card" />
      </RadioGroup>
    `,
  }),
};

export const CardInlineLayout: Story = {
  name: 'Card · inline layout',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Label" secondary-text="Secondary" appearance="card" layout="inline" />
        <RadioField value="other" label="Other option" appearance="card" layout="inline" />
      </RadioGroup>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('other');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Cannot select this" secondary-text="Secondary" appearance="plain" layout="block" disabled />
        <RadioField value="other" label="Selected instead" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Must choose carefully" secondary-text="Error state on the control" appearance="card" :aria-invalid="true" />
        <RadioField value="other" label="Other option" appearance="card" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const SelectedDefault: StoryObj = {
  name: 'Pre-selected',
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Pre-selected" secondary-text="Group default value" appearance="plain" layout="block" />
        <RadioField value="other" label="Other" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const Controlled: StoryObj = {
  render: () => ({
    components: { RadioGroup, RadioField },
    setup() {
      const model = ref('main');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3">
        <RadioField value="main" label="Controlled" secondary-text="Plain with secondary (no card border)" appearance="plain" layout="block" />
        <RadioField value="other" label="Other" appearance="plain" layout="block" />
      </RadioGroup>
    `,
  }),
};

export const AllVariantsOverview: StoryObj = {
  render: () => ({
    components: { RadioGroup, RadioField },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; align-items: start;">
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">plain · inline · no secondary</p>
          <RadioGroup v-model="m1" class="flex flex-col gap-2">
            <RadioField value="a" label="Label" appearance="plain" layout="inline" />
            <RadioField value="b" label="Other" appearance="plain" layout="inline" />
          </RadioGroup>
        </div>
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">plain · block · secondary</p>
          <RadioGroup v-model="m2" class="flex flex-col gap-2">
            <RadioField value="a" label="Label" secondary-text="Secondary text" appearance="plain" layout="block" />
            <RadioField value="b" label="Other" appearance="plain" layout="block" />
          </RadioGroup>
        </div>
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">card · secondary</p>
          <RadioGroup v-model="m3" class="flex flex-col gap-2">
            <RadioField value="a" label="Label" secondary-text="Secondary text" appearance="card" />
            <RadioField value="b" label="Other" appearance="card" />
          </RadioGroup>
        </div>
        <div>
          <p style="font-size: 12px; margin: 0 0 8px; color: #64748b">card · flipped</p>
          <RadioGroup v-model="m4" class="flex flex-col gap-2">
            <RadioField value="a" label="Label" secondary-text="Secondary text" appearance="card" flipped />
            <RadioField value="b" label="Other" appearance="card" flipped />
          </RadioGroup>
        </div>
      </div>
    `,
    setup() {
      return {
        m1: ref('a'),
        m2: ref('a'),
        m3: ref('a'),
        m4: ref('a'),
      };
    },
  }),
};
