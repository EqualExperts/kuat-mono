import type { Meta, StoryObj } from "@storybook/vue3"
import {
  ToggleGroup,
  ToggleGroupItem,
  TOGGLE_GROUP_ORIENTATIONS,
  TOGGLE_SIZES,
  TOGGLE_SKINS,
} from "@equal-experts/kuat-vue"
import { toggleGroupDocs } from "../docs/component-docs"

const meta: Meta<typeof ToggleGroup> = {
  title: "Actions/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: toggleGroupDocs,
      },
    },
  
    a11y: { test: "error" },
  },
  args: {
    type: "single",
    orientation: "horizontal",
  },
  argTypes: {
    orientation: { control: "select", options: [...TOGGLE_GROUP_ORIENTATIONS] },
    type: { control: "select", options: ["single", "multiple"] },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const SingleOutlined: Story = {
  render: (args) => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup() {
      return { args }
    },
    template: `
      <ToggleGroup v-bind="args" type="single" aria-label="Text style" default-value="bold">
        <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

export const MultipleGhost: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    template: `
      <ToggleGroup type="multiple" aria-label="Text style" :default-value="['bold', 'italic']">
        <ToggleGroupItem value="bold" skin="ghost" aria-label="Bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic" skin="ghost" aria-label="Italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline" skin="ghost" aria-label="Underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    template: `
      <ToggleGroup type="single" orientation="vertical" aria-label="Vertical text style">
        <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

export const SizeAndSkinMatrix: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup() {
      return { sizes: TOGGLE_SIZES, skins: TOGGLE_SKINS }
    },
    template: `
      <div class="grid gap-4">
        <div v-for="size in sizes" :key="size" class="space-y-2">
          <p class="text-xs capitalize text-muted-foreground">{{ size }}</p>
          <div class="flex flex-wrap gap-4">
            <ToggleGroup v-for="skin in skins" :key="size + '-' + skin" type="single" :aria-label="size + '-' + skin">
              <ToggleGroupItem value="left" :size="size" :skin="skin" aria-label="Left">Left</ToggleGroupItem>
              <ToggleGroupItem value="middle" :size="size" :skin="skin" aria-label="Middle">Middle</ToggleGroupItem>
              <ToggleGroupItem value="right" :size="size" :skin="skin" aria-label="Right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    `,
  }),
}
