/**
 * Kuat Textarea – 4px radius, states via focus / aria-invalid / disabled, CSS resize.
 */
import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Textarea } from '@equal-experts/kuat-vue';
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
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: '<Textarea v-bind="args" aria-label="Message" />',
  }),
};

export const WithValue: Story = {
  args: {
    resize: 'vertical',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const model = ref('Value');
      return { args, model };
    },
    template: '<Textarea v-bind="args" aria-label="Message" v-model="model" />',
  }),
};

export const Invalid: Story = {
  args: {
    resize: 'vertical',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const model = ref('Value');
      return { args, model };
    },
    template:
      '<Textarea v-bind="args" aria-label="Message" v-model="model" aria-invalid="true" />',
  }),
};

export const Disabled: Story = {
  args: {
    resize: 'vertical',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const model = ref('Value');
      return { args, model };
    },
    template:
      '<Textarea v-bind="args" aria-label="Message" v-model="model" disabled />',
  }),
};

export const ResizeBoth: Story = {
  args: {
    resize: 'both',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template:
      '<Textarea v-bind="args" aria-label="Message" placeholder="Resize both axes" />',
  }),
};
