import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic } from "lucide-react"
import { Toggle, TOGGLE_SIZES, TOGGLE_SKINS } from "@equal-experts/kuat-react"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    children: "Label",
    size: "regular",
    skin: "outlined",
    defaultPressed: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "select", options: [...TOGGLE_SIZES] },
    skin: { control: "select", options: [...TOGGLE_SKINS] },
    defaultPressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    "aria-label": "Toggle label",
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Toggle {...args} aria-label="Bold">
        <Bold className="size-4" aria-hidden />
        Bold
      </Toggle>
      <Toggle {...args} aria-label="Italic" defaultPressed>
        <Italic className="size-4" aria-hidden />
        Italic
      </Toggle>
    </div>
  ),
}

export const SizeMatrix: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {TOGGLE_SIZES.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-16 text-xs capitalize text-muted-foreground">{size}</span>
          <Toggle {...args} size={size} aria-label={`${size} outlined`}>
            Label
          </Toggle>
          <Toggle {...args} size={size} skin="ghost" aria-label={`${size} ghost`}>
            Label
          </Toggle>
        </div>
      ))}
    </div>
  ),
}
