import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

describe("Select composition", () => {
  it("supports shadcn primitive composition end-to-end", async () => {
    const user = userEvent.setup()
    render(
      <Select defaultValue="default">
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
    )

    const trigger = screen.getByRole("combobox", { name: "Composition example" })
    await user.click(trigger)
    expect(screen.getByRole("listbox")).toHaveClass("select-content--position-item-aligned")
    expect(document.querySelector('[data-slot="select-separator"]')).not.toBeNull()
    await user.click(screen.getByRole("option", { name: "Mono" }))
    expect(trigger).toHaveTextContent("Mono")
  })
})
