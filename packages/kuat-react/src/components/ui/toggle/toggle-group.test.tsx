import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

describe("ToggleGroup", () => {
  it("renders horizontal orientation by default", () => {
    render(
      <ToggleGroup type="single" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Bold">
          Bold
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const group = screen.getByRole("group", { name: "Text style" })
    expect(group).toHaveClass("toggle-group")
    expect(group).toHaveClass("toggle-group--horizontal")
  })

  it("supports vertical orientation", () => {
    render(
      <ToggleGroup type="single" orientation="vertical" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole("group", { name: "Text style" })).toHaveClass(
      "toggle-group--vertical"
    )
  })

  it("toggles single selection", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="single" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const bold = screen.getByLabelText("Bold")
    const italic = screen.getByLabelText("Italic")

    await user.click(bold)
    expect(bold).toHaveAttribute("data-state", "on")
    expect(italic).toHaveAttribute("data-state", "off")

    await user.click(italic)
    expect(bold).toHaveAttribute("data-state", "off")
    expect(italic).toHaveAttribute("data-state", "on")
  })

  it("supports multiple selection", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="multiple" aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const bold = screen.getByLabelText("Bold")
    const italic = screen.getByLabelText("Italic")

    await user.click(bold)
    await user.click(italic)

    expect(bold).toHaveAttribute("data-state", "on")
    expect(italic).toHaveAttribute("data-state", "on")
  })

  it("applies size and skin classes to items", () => {
    render(
      <ToggleGroup type="single" aria-label="Text style">
        <ToggleGroupItem value="bold" size="mini" skin="ghost" aria-label="Bold">
          Bold
        </ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByLabelText("Bold")).toHaveClass(
      "toggle-group-item--size-mini",
      "toggle-group-item--skin-ghost"
    )
  })
})
