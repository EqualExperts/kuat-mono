import type { Meta, StoryObj } from "@storybook/vue3"
import { Toggle, TOGGLE_SIZES, TOGGLE_SKINS } from "@equal-experts/kuat-vue"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    size: "regular",
    skin: "outlined",
    disabled: false,
  },
  argTypes: {
    size: { control: "select", options: [...TOGGLE_SIZES] },
    skin: { control: "select", options: [...TOGGLE_SKINS] },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { args }
    },
    template: '<Toggle v-bind="args" aria-label="Toggle label">Label</Toggle>',
  }),
}

export const Pressed: Story = {
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { args }
    },
    template: '<Toggle v-bind="args" :default-value="true" aria-label="Pressed toggle">Label</Toggle>',
  }),
}

export const SizeMatrix: Story = {
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { args, sizes: TOGGLE_SIZES }
    },
    template: `
      <div class="grid gap-3">
        <div v-for="size in sizes" :key="size" class="flex items-center gap-3">
          <span class="w-16 text-xs capitalize text-muted-foreground">{{ size }}</span>
          <Toggle v-bind="args" :size="size" skin="outlined" :aria-label="size + ' outlined'">Label</Toggle>
          <Toggle v-bind="args" :size="size" skin="ghost" :aria-label="size + ' ghost'">Label</Toggle>
        </div>
      </div>
    `,
  }),
}
