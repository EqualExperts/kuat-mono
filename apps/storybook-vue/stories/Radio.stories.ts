/**
 * Kuat Radio primitives — `RadioGroup` + `RadioGroupItem`. Use with a visible group label (`aria-labelledby` or `fieldset`/`legend`) in real forms.
 */
import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { RadioGroup, RadioGroupItem } from '@equal-experts/kuat-vue';
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
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const model = ref('a');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" class="flex flex-col gap-3" aria-label="Example group">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>
    `,
  }),
};

export const DisabledItem: Story = {
  render: () => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const model = ref('a');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" aria-label="Example group">
        <RadioGroupItem value="a" aria-label="Enabled" />
        <RadioGroupItem value="b" aria-label="Disabled option" disabled />
      </RadioGroup>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const model = ref('a');
      return { model };
    },
    template: `
      <RadioGroup v-model="model" aria-label="Example group">
        <RadioGroupItem value="a" aria-label="Valid" />
        <RadioGroupItem value="b" aria-label="Invalid" aria-invalid />
      </RadioGroup>
    `,
  }),
};
