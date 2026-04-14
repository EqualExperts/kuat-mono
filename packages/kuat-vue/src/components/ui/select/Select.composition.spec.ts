import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"

import Select from "./Select.vue"
import SelectContent from "./SelectContent.vue"
import SelectGroup from "./SelectGroup.vue"
import SelectItem from "./SelectItem.vue"
import SelectLabel from "./SelectLabel.vue"
import SelectSeparator from "./SelectSeparator.vue"
import SelectTrigger from "./SelectTrigger.vue"
import SelectValue from "./SelectValue.vue"

const CompositionWrapper = {
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
    <Select default-value="default">
      <SelectTrigger aria-label="Composition example">
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectGroup>
          <SelectLabel>Default</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="amber">Amber</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Scaled</SelectLabel>
          <SelectItem value="mono">Mono</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  `,
}

describe("Select composition", () => {
  it("supports shadcn primitive composition end-to-end", async () => {
    render(CompositionWrapper)

    const trigger = screen.getByRole("combobox", { name: "Composition example" })
    expect(trigger).toHaveClass("select-trigger")
    expect(trigger).toHaveAttribute("aria-controls")
    expect(trigger).toHaveAttribute("aria-expanded")

    await fireEvent.keyDown(trigger, { key: "ArrowDown", code: "ArrowDown" })
    expect(trigger).toHaveAttribute("data-state")
  })
})
