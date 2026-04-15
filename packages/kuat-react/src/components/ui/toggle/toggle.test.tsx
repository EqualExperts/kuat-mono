import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { TOGGLE_SIZES, TOGGLE_SKINS } from "./constants"
import { Toggle } from "./toggle"

describe("Toggle", () => {
  it("renders with default classes", () => {
    render(<Toggle aria-label="Bold">Bold</Toggle>)
    const toggle = screen.getByRole("button", { name: "Bold" })

    expect(toggle).toHaveClass("toggle")
    expect(toggle).toHaveClass("toggle--size-regular")
    expect(toggle).toHaveClass("toggle--skin-outlined")
  })

  it.each(TOGGLE_SIZES)("supports %s size", (size) => {
    render(
      <Toggle aria-label={`${size} toggle`} size={size}>
        {size}
      </Toggle>
    )

    expect(screen.getByRole("button", { name: `${size} toggle` })).toHaveClass(
      `toggle--size-${size}`
    )
  })

  it.each(TOGGLE_SKINS)("supports %s skin", (skin) => {
    render(
      <Toggle aria-label={`${skin} toggle`} skin={skin}>
        {skin}
      </Toggle>
    )

    expect(screen.getByRole("button", { name: `${skin} toggle` })).toHaveClass(
      `toggle--skin-${skin}`
    )
  })

  it("toggles pressed state on click", async () => {
    const user = userEvent.setup()
    render(<Toggle aria-label="Italic">Italic</Toggle>)

    const toggle = screen.getByRole("button", { name: "Italic" })
    expect(toggle).toHaveAttribute("data-state", "off")

    await user.click(toggle)
    expect(toggle).toHaveAttribute("data-state", "on")
    expect(toggle).toHaveAttribute("aria-pressed", "true")
  })

  it("respects disabled state", async () => {
    const user = userEvent.setup()
    render(
      <Toggle aria-label="Disabled toggle" disabled>
        Disabled
      </Toggle>
    )

    const toggle = screen.getByRole("button", { name: "Disabled toggle" })
    expect(toggle).toBeDisabled()
    expect(toggle).toHaveAttribute("data-disabled")

    await user.click(toggle)
    expect(toggle).toHaveAttribute("data-state", "off")
  })
})
