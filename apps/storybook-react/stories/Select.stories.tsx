import type { Meta, StoryObj } from "@storybook/react"
import { CircleDashed, UserRound } from "lucide-react"
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
} from "@equal-experts/kuat-react"
import { selectDocs } from "../docs/component-docs"

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
  
    a11y: { test: "error" },
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

const groupedThemeItems = [
  {
    label: "Default",
    items: [
      { value: "default", label: "Default" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      {
        value: "amber",
        label: "Amber",
        decoration: <CircleDashed className="size-4" aria-hidden />,
      },
    ],
  },
  {
    label: "Monospaced",
    items: [{ value: "mono", label: "Mono" }],
  },
]

export const BasicSelect: Story = {
  args: {
    triggerProps: { "aria-label": "Theme" },
    items: groupedThemeItems,
    placeholder: "Select theme",
  },
}

export const PersonSelectionDecorated: Story = {
  args: {
    triggerProps: { "aria-label": "Person" },
    items: [
      {
        value: "a",
        label: "Person name A",
        prepend: <UserRound className="size-4" aria-hidden />,
        decoration: <CircleDashed className="size-4" aria-hidden />,
      },
      {
        value: "b",
        label: "Person name B",
        prepend: <UserRound className="size-4" aria-hidden />,
      },
      {
        value: "c",
        label: "Person name C",
        prepend: <UserRound className="size-4" aria-hidden />,
      },
      {
        value: "d",
        label: "Person name D",
        prepend: <UserRound className="size-4" aria-hidden />,
      },
    ],
    placeholder: "Choose person",
    prepend: <UserRound className="size-4" aria-hidden />,
  },
}

export const TwoLineTriggerAndItems: Story = {
  args: {
    triggerProps: { "aria-label": "User role" },
    lines: "double",
    label: "Text",
    items: [
      { value: "a", label: "Label" },
      { value: "b", label: "Label", description: "Line 2" },
      { value: "c", label: "Shadcn", description: "Founder" },
    ],
    placeholder: "Select an item",
    prepend: <CircleDashed className="size-4" aria-hidden />,
  },
}

export const AlignWithTrigger: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
      <KuatSelect
        triggerProps={{ "aria-label": "Item aligned" }}
        placeholder="item-aligned"
        position="item-aligned"
        items={groupedThemeItems}
      />
      <KuatSelect
        triggerProps={{ "aria-label": "Popper aligned" }}
        placeholder="popper"
        position="popper"
        items={groupedThemeItems}
      />
    </div>
  ),
}

export const ScrollableItems: Story = {
  render: () => (
    <KuatSelect
      triggerProps={{ "aria-label": "Timezone" }}
      placeholder="Select a timezone"
      maxHeight={220}
      items={Array.from({ length: 30 }, (_, index) => ({
        value: `timezone-${index + 1}`,
        label: `Timezone ${index + 1}`,
      }))}
    />
  ),
}

export const ValidationState: Story = {
  render: () => (
    <div className="max-w-sm space-y-1">
      <KuatSelect
        triggerProps={{
          "aria-label": "Theme invalid",
          "aria-describedby": "theme-error",
        }}
        invalid
        placeholder="Select an item"
        items={groupedThemeItems}
      />
      <p id="theme-error" className="text-sm text-destructive">
        Please select a valid item.
      </p>
    </div>
  ),
}

export const SizeAndLineMatrix: Story = {
  render: () => (
    <div className="grid gap-4">
      {SELECT_SIZES.map((size: string) => (
        <div key={size} className="space-y-2">
          <p className="text-xs capitalize text-muted-foreground">{size}</p>
          <KuatSelect
            triggerProps={{ "aria-label": `${size} single line` }}
            size={size}
            lines="single"
            items={groupedThemeItems}
            placeholder="Select an item"
          />
          <KuatSelect
            triggerProps={{ "aria-label": `${size} double line` }}
            size={size}
            lines="double"
            label="Text"
            items={groupedThemeItems}
            placeholder="Select an item"
          />
        </div>
      ))}
    </div>
  ),
}

export const ShadcnComposition: Story = {
  render: () => (
    <Select defaultValue="amber">
      <SelectTrigger aria-label="Composition example">
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectGroup>
          <SelectLabel>Default</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="green">Green</SelectItem>
          <SelectItem value="amber" decoration={<CircleDashed className="size-4" aria-hidden />}>
            Amber
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Monospaced</SelectLabel>
          <SelectItem value="mono">Mono</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}
