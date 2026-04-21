import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Switch } from "@equal-experts/kuat-react"
import { switchDocs } from "../docs/component-docs"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: switchDocs,
      },
    },
  
    a11y: { test: "error" },
  },
  args: {
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    "aria-label": "Airplane mode",
  },
}

export const Checked: Story = {
  args: {
    "aria-label": "Wi-fi",
    defaultChecked: true,
  },
}

export const Invalid: Story = {
  args: {
    "aria-label": "Invalid switch",
    "aria-invalid": true,
  },
}

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled switch",
    disabled: true,
  },
}

function ControlledExample() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <Switch
        aria-label="Controlled notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <span className="text-sm text-muted-foreground">{checked ? "On" : "Off"}</span>
    </div>
  )
}

export const Controlled: StoryObj = {
  render: () => <ControlledExample />,
}
