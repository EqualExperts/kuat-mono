import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem, TOGGLE_SIZES, TOGGLE_SKINS } from "@equal-experts/kuat-react"

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const SingleOutlined: Story = {
  render: () => (
    <ToggleGroup type="single" aria-label="Text style" defaultValue="bold">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="size-4" aria-hidden />
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="size-4" aria-hidden />
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="size-4" aria-hidden />
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const MultipleGhost: Story = {
  render: () => (
    <ToggleGroup type="multiple" aria-label="Text style" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" skin="ghost" aria-label="Bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" skin="ghost" aria-label="Italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" skin="ghost" aria-label="Underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup type="single" orientation="vertical" aria-label="Vertical text style">
      <ToggleGroupItem value="bold" aria-label="Bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const SizeAndSkinMatrix: Story = {
  render: () => (
    <div className="grid gap-4">
      {TOGGLE_SIZES.map((size) => (
        <div key={size} className="space-y-2">
          <p className="text-xs capitalize text-muted-foreground">{size}</p>
          <div className="flex flex-wrap gap-4">
            {TOGGLE_SKINS.map((skin) => (
              <ToggleGroup key={`${size}-${skin}`} type="single" aria-label={`${size}-${skin}`}>
                <ToggleGroupItem value="left" size={size} skin={skin} aria-label="Left">
                  Left
                </ToggleGroupItem>
                <ToggleGroupItem value="middle" size={size} skin={skin} aria-label="Middle">
                  Middle
                </ToggleGroupItem>
                <ToggleGroupItem value="right" size={size} skin={skin} aria-label="Right">
                  Right
                </ToggleGroupItem>
              </ToggleGroup>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
