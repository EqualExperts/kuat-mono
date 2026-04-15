import type { Meta, StoryObj } from "@storybook/vue3"
import {
  KuatSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SELECT_LINES,
  SELECT_SIZES,
} from "@equal-experts/kuat-vue"
import { selectDocs } from "../docs/component-docs"

const groupedThemeItems = [
  {
    label: "Default",
    items: [
      { value: "default", label: "Default" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "amber", label: "Amber", decoration: "◌" },
    ],
  },
  {
    label: "Monospaced",
    items: [{ value: "mono", label: "Mono" }],
  },
]

const meta: Meta<typeof KuatSelect> = {
  title: "Components/Select",
  component: KuatSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: selectDocs,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: [...SELECT_SIZES],
    },
    lines: {
      control: "select",
      options: [...SELECT_LINES],
    },
    position: {
      control: "select",
      options: ["item-aligned", "popper"],
    },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof KuatSelect>

export const BasicSelect: Story = {
  render: (args) => ({
    components: { KuatSelect },
    setup() {
      return { args, groupedThemeItems }
    },
    template:
      '<KuatSelect v-bind="args" :items="groupedThemeItems" aria-label="Theme" placeholder="Select theme" />',
  }),
}

export const PersonSelectionDecorated: Story = {
  render: () => ({
    components: { KuatSelect },
    setup() {
      const items = [
        { value: "a", label: "Person name A", prepend: "👤", decoration: "◌" },
        { value: "b", label: "Person name B", prepend: "👤" },
        { value: "c", label: "Person name C", prepend: "👤" },
        { value: "d", label: "Person name D", prepend: "👤" },
      ]
      return { items }
    },
    template:
      '<KuatSelect aria-label="Person" placeholder="Choose person" :items="items" prepend="👤" />',
  }),
}

export const TwoLineTriggerAndItems: Story = {
  render: () => ({
    components: { KuatSelect },
    setup() {
      const items = [
        { value: "a", label: "Label" },
        { value: "b", label: "Label", description: "Line 2" },
        { value: "c", label: "Shadcn", description: "Founder" },
      ]
      return { items }
    },
    template:
      '<KuatSelect aria-label="User role" lines="double" label="Text" placeholder="Select an item" prepend="◌" :items="items" />',
  }),
}

export const AlignWithTrigger: Story = {
  render: () => ({
    components: { KuatSelect },
    setup() {
      return { groupedThemeItems }
    },
    template: `
      <div class="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
        <KuatSelect
          aria-label="Item aligned"
          placeholder="item-aligned"
          position="item-aligned"
          :items="groupedThemeItems"
        />
        <KuatSelect
          aria-label="Popper aligned"
          placeholder="popper"
          position="popper"
          :items="groupedThemeItems"
        />
      </div>
    `,
  }),
}

export const ScrollableItems: Story = {
  render: () => ({
    components: { KuatSelect },
    setup() {
      const items = Array.from({ length: 30 }, (_, index) => ({
        value: `timezone-${index + 1}`,
        label: `Timezone ${index + 1}`,
      }))
      return { items }
    },
    template:
      '<KuatSelect aria-label="Timezone" placeholder="Select a timezone" :max-height="220" :items="items" />',
  }),
}

export const ValidationState: Story = {
  render: () => ({
    components: { KuatSelect },
    setup() {
      return { groupedThemeItems }
    },
    template: `
      <div class="max-w-sm space-y-1">
        <KuatSelect
          aria-label="Theme invalid"
          aria-describedby="theme-error"
          invalid
          placeholder="Select an item"
          :items="groupedThemeItems"
        />
        <p id="theme-error" class="text-sm text-destructive">
          Please select a valid item.
        </p>
      </div>
    `,
  }),
}

export const SizeAndLineMatrix: Story = {
  render: () => ({
    components: { KuatSelect },
    setup() {
      return { sizes: SELECT_SIZES, groupedThemeItems }
    },
    template: `
      <div class="grid gap-4">
        <div v-for="size in sizes" :key="size" class="space-y-2">
          <p class="text-xs capitalize text-muted-foreground">{{ size }}</p>
          <KuatSelect
            :aria-label="size + ' single line'"
            :size="size"
            lines="single"
            :items="groupedThemeItems"
            placeholder="Select an item"
          />
          <KuatSelect
            :aria-label="size + ' double line'"
            :size="size"
            lines="double"
            label="Text"
            :items="groupedThemeItems"
            placeholder="Select an item"
          />
        </div>
      </div>
    `,
  }),
}

export const ShadcnComposition: Story = {
  render: () => ({
    components: {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectSeparator,
      SelectTrigger,
      SelectValue,
    },
    template: `
      <Select default-value="amber">
        <SelectTrigger aria-label="Composition example">
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="amber" decoration="◌">Amber</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            <SelectItem value="mono">Mono</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    `,
  }),
}
