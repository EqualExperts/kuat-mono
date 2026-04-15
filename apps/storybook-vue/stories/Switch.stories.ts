import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import { Switch } from "@equal-experts/kuat-vue"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const model = ref(false)
      return { args, model }
    },
    template: '<Switch v-model="model" v-bind="args" aria-label="Airplane mode" />',
  }),
}

export const Checked: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const model = ref(true)
      return { args, model }
    },
    template: '<Switch v-model="model" v-bind="args" aria-label="Wi-fi" />',
  }),
}

export const Invalid: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const model = ref(false)
      return { args, model }
    },
    template: '<Switch v-model="model" v-bind="args" aria-label="Invalid switch" aria-invalid />',
  }),
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const model = ref(false)
      return { args, model }
    },
    template: '<Switch v-model="model" v-bind="args" aria-label="Disabled switch" disabled />',
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const model = ref(false)
      return { model }
    },
    template: `
      <div class="flex items-center gap-3">
        <Switch v-model="model" aria-label="Controlled notifications" />
        <span class="text-sm text-muted-foreground">{{ model ? "On" : "Off" }}</span>
      </div>
    `,
  }),
}
