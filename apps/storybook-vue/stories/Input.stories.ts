/**
 * Kuat Input — 4px radius, four sizes, states via focus / aria-invalid / disabled, optional decoration slots.
 */
import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Search, Info } from 'lucide-vue-next';
import { Button, Input, INPUT_SIZES } from '@equal-experts/kuat-vue';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [...INPUT_SIZES],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Type here',
  },
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: '<Input v-bind="args" aria-label="Example input" />',
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { Input },
    template: '<Input aria-label="Empty (no placeholder)" />',
  }),
};

export const Placeholder: Story = {
  render: () => ({
    components: { Input },
    template: '<Input aria-label="Placeholder" placeholder="Value" />',
  }),
};

export const WithValue: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const model = ref('Value');
      return { model };
    },
    template: '<Input aria-label="With value" v-model="model" />',
  }),
};

export const Invalid: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const model = ref('Value');
      return { model };
    },
    template:
      '<Input aria-label="Invalid" v-model="model" aria-invalid="true" />',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const model = ref('Value');
      return { model };
    },
    template: '<Input aria-label="Disabled" v-model="model" disabled />',
  }),
};

/** Matches [shadcn file input](https://ui.shadcn.com/docs/components/radix/input#file). No v-model (use @change). */
export const File: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="flex max-w-md flex-col gap-2">
        <label for="picture" class="text-sm font-medium text-slate-900">Picture</label>
        <Input id="picture" type="file" />
        <p class="text-sm text-slate-500">Select a picture to upload.</p>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Input },
    setup() {
      return { sizes: INPUT_SIZES };
    },
    template: `
      <div class="flex max-w-md flex-col gap-4">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-1">
          <span class="text-xs capitalize text-slate-500">{{ size }}</span>
          <Input :size="size" :aria-label="size + ' sample'" placeholder="Value" />
        </div>
      </div>
    `,
  }),
};

export const WithSearchDecorations: Story = {
  render: () => ({
    components: { Input, Search },
    template: `
      <Input aria-label="Search" placeholder="Value">
        <template #leftDecoration>
          <Search class="size-4 shrink-0 text-slate-500" aria-hidden="true" />
        </template>
        <template #rightDecoration>
          <span class="text-sm whitespace-nowrap text-slate-500">12 results</span>
        </template>
      </Input>
    `,
  }),
};

export const WithUrlDecorations: Story = {
  render: () => ({
    components: { Input, Info },
    setup() {
      const model = ref('example.com');
      return { model };
    },
    template: `
      <Input aria-label="URL" v-model="model" placeholder="example.com">
        <template #leftDecoration>
          <span class="whitespace-nowrap text-sm text-slate-500">https://</span>
        </template>
        <template #rightDecoration>
          <Info class="size-4 shrink-0 text-slate-500" aria-hidden="true" />
        </template>
      </Input>
    `,
  }),
};

export const WithButtonDecoration: Story = {
  render: () => ({
    components: { Input, Button },
    template: `
      <Input aria-label="Search with action" placeholder="Type to search…" class="pr-0.5">
        <template #rightDecoration>
          <Button type="button" size="small" variant="secondary">Search</Button>
        </template>
      </Input>
    `,
  }),
};

export const CurrencyDecorations: Story = {
  render: () => ({
    components: { Input },
    template: `
      <Input aria-label="Amount" placeholder="0,00">
        <template #leftDecoration>
          <span class="text-sm text-slate-500">$</span>
        </template>
        <template #rightDecoration>
          <span class="text-sm text-slate-500">USD</span>
        </template>
      </Input>
    `,
  }),
};
