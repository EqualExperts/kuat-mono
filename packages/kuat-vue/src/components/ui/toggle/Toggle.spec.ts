import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"

import { TOGGLE_SIZES, TOGGLE_SKINS } from "./constants"
import Toggle from "./Toggle.vue"

describe("Toggle", () => {
  it("renders with default classes", () => {
    render(Toggle, {
      attrs: { "aria-label": "Bold" },
      slots: { default: "Bold" },
    })

    const toggle = screen.getByRole("button", { name: "Bold" })
    expect(toggle).toHaveClass("toggle", "toggle--size-regular", "toggle--skin-outlined")
  })

  it.each(TOGGLE_SIZES)("supports %s size", (size) => {
    render(Toggle, {
      props: { size },
      attrs: { "aria-label": `${size} toggle` },
      slots: { default: size },
    })

    expect(screen.getByRole("button", { name: `${size} toggle` })).toHaveClass(
      `toggle--size-${size}`
    )
  })

  it.each(TOGGLE_SKINS)("supports %s skin", (skin) => {
    render(Toggle, {
      props: { skin },
      attrs: { "aria-label": `${skin} toggle` },
      slots: { default: skin },
    })

    expect(screen.getByRole("button", { name: `${skin} toggle` })).toHaveClass(
      `toggle--skin-${skin}`
    )
  })

  it("toggles pressed state on click", async () => {
    render(Toggle, {
      attrs: { "aria-label": "Italic" },
      slots: { default: "Italic" },
    })

    const toggle = screen.getByRole("button", { name: "Italic" })
    expect(toggle).toHaveAttribute("data-state", "off")

    await fireEvent.click(toggle)
    expect(toggle).toHaveAttribute("data-state", "on")
    expect(toggle).toHaveAttribute("aria-pressed", "true")
  })

  it("respects disabled state", async () => {
    render(Toggle, {
      attrs: { "aria-label": "Disabled", disabled: true },
      slots: { default: "Disabled" },
    })

    const toggle = screen.getByRole("button", { name: "Disabled" })
    expect(toggle).toBeDisabled()
    expect(toggle).toHaveAttribute("data-disabled")
  })
})
