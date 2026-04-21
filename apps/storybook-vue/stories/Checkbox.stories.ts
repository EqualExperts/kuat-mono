/**
 * Kuat Checkbox — states via reka-ui data-state (Figma matrix).
 */
import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Checkbox } from '@equal-experts/kuat-vue';
import { checkboxDocs } from '../docs/component-docs';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
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
  render: (args) => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: '<Checkbox v-bind="args" aria-label="Example checkbox" />',
  }),
};

export const Checked: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const model = ref(true);
      return { args, model };
    },
    template: '<Checkbox v-bind="args" v-model="model" aria-label="Checked" />',
  }),
};

export const UncheckedControlled: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const model = ref(false);
      return { model };
    },
    template: '<Checkbox v-model="model" aria-label="Unchecked (controlled)" />',
  }),
};

export const Indeterminate: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const model = ref<'indeterminate'>('indeterminate');
      return { args, model };
    },
    template: '<Checkbox v-bind="args" v-model="model" aria-label="Indeterminate" />',
  }),
};

export const Invalid: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: '<Checkbox v-bind="args" aria-label="Invalid" aria-invalid="true" />',
  }),
};

export const InvalidChecked: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const model = ref(true);
      return { model };
    },
    template:
      '<Checkbox v-model="model" aria-label="Invalid and checked" aria-invalid="true" />',
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template: '<Checkbox v-bind="args" aria-label="Disabled" disabled />',
  }),
};

export const DisabledChecked: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const model = ref(true);
      return { model };
    },
    template: '<Checkbox v-model="model" aria-label="Disabled (checked)" disabled />',
  }),
};

export const DisabledInvalid: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      return { args };
    },
    template:
      '<Checkbox v-bind="args" aria-label="Disabled and invalid" disabled aria-invalid="true" />',
  }),
};

export const AllStatesOverview: StoryObj = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checkedA = ref(true);
      const checkedB = ref(true);
      const indeterminate = ref<'indeterminate'>('indeterminate');
      const invalidChecked = ref(true);
      return { checkedA, checkedB, indeterminate, invalidChecked };
    },
    template: `
      <div style="display: grid; grid-template-columns: 160px 1fr; gap: 12px 24px; align-items: center; max-width: 420px;">
        <span style="font-size: 12px; color: #64748b">Default</span>
        <Checkbox aria-label="Default" />
        <span style="font-size: 12px; color: #64748b">Checked</span>
        <Checkbox aria-label="Checked" v-model="checkedA" />
        <span style="font-size: 12px; color: #64748b">Indeterminate</span>
        <Checkbox aria-label="Indeterminate" v-model="indeterminate" />
        <span style="font-size: 12px; color: #64748b">Invalid</span>
        <Checkbox aria-label="Invalid" aria-invalid="true" />
        <span style="font-size: 12px; color: #64748b">Invalid + checked</span>
        <Checkbox aria-label="Invalid checked" v-model="invalidChecked" aria-invalid="true" />
        <span style="font-size: 12px; color: #64748b">Disabled</span>
        <Checkbox aria-label="Disabled" disabled />
        <span style="font-size: 12px; color: #64748b">Disabled + checked</span>
        <Checkbox aria-label="Disabled checked" v-model="checkedB" disabled />
      </div>
    `,
  }),
};
