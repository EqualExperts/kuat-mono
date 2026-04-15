/**
 * SwitchField – appearance, layout, secondary, flipped.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import SwitchField from "./SwitchField.vue"
import { SWITCH_FIELD_APPEARANCES, SWITCH_FIELD_LAYOUTS } from "./constants"

describe("SwitchField", () => {
  it.each(SWITCH_FIELD_APPEARANCES)("applies appearance class for %s", (appearance) => {
    const { container } = render(SwitchField, {
      props: { label: "L", appearance },
    })
    expect(
      container.querySelector(`.switch-field--appearance-${appearance}`)
    ).toBeInTheDocument()
  })

  it.each(SWITCH_FIELD_LAYOUTS)("applies layout class for %s", (layout) => {
    const { container } = render(SwitchField, {
      props: { label: "L", layout },
    })
    expect(container.querySelector(`.switch-field--layout-${layout}`)).toBeInTheDocument()
  })

  it("does not set has-secondary when secondaryText is omitted", () => {
    const { container } = render(SwitchField, {
      props: { label: "Only primary", appearance: "plain" },
    })
    const root = container.querySelector('[data-slot="switch-field"]')
    expect(root).not.toHaveClass("switch-field--has-secondary")
  })

  it("applies plain flipped with secondary (no card)", () => {
    const { container } = render(SwitchField, {
      props: {
        label: "Left text",
        secondaryText: "Detail",
        appearance: "plain",
        layout: "block",
        flipped: true,
      },
    })
    const root = container.querySelector('[data-slot="switch-field"]')
    expect(root).toHaveClass("switch-field--appearance-plain")
    expect(root).toHaveClass("switch-field--flipped")
    expect(root).toHaveClass("switch-field--has-secondary")
  })

  it("applies card without secondary text", () => {
    const { container } = render(SwitchField, {
      props: { label: "Card only", appearance: "card" },
    })
    const root = container.querySelector('[data-slot="switch-field"]')
    expect(root).toHaveClass("switch-field--appearance-card")
    expect(root).not.toHaveClass("switch-field--has-secondary")
  })

  it("forwards aria-invalid to the switch", () => {
    render(SwitchField, {
      props: { label: "Invalid field", id: "fld-invalid" },
      attrs: { "aria-invalid": true },
    })
    expect(screen.getByRole("switch")).toHaveAttribute("aria-invalid", "true")
  })

  it("applies invalid modifier for error label styling when aria-invalid", () => {
    const { container } = render(SwitchField, {
      props: {
        label: "Error",
        secondaryText: "Detail",
        appearance: "card",
      },
      attrs: { "aria-invalid": true },
    })
    expect(
      container.querySelector('[data-slot="switch-field"]')
    ).toHaveClass("switch-field--invalid")
  })

  it("associates label with switch via id", () => {
    render(SwitchField, {
      props: { id: "notifications", label: "Notifications" },
    })
    const control = screen.getByRole("switch", { name: /notifications/i })
    expect(control).toHaveAttribute("id", "notifications")
  })

  it("applies plain appearance with secondary without card class", () => {
    const { container } = render(SwitchField, {
      props: {
        label: "Label",
        appearance: "plain",
        secondaryText: "Help",
      },
    })
    const root = container.querySelector('[data-slot="switch-field"]')
    expect(root).toHaveClass("switch-field--appearance-plain")
    expect(root).toHaveClass("switch-field--has-secondary")
    expect(root).not.toHaveClass("switch-field--appearance-card")
  })

  it("applies card appearance", () => {
    const { container } = render(SwitchField, {
      props: {
        label: "Label",
        appearance: "card",
        secondaryText: "More",
      },
    })
    expect(container.querySelector(".switch-field--appearance-card")).toBeInTheDocument()
  })

  it("retains card label hook for appearance styling", () => {
    const { container } = render(SwitchField, {
      props: {
        label: "Label",
        appearance: "card",
        secondaryText: "More",
      },
    })
    expect(container.querySelector(".switch-field__label")).toBeInTheDocument()
  })

  it("renders secondary text in plain mode", () => {
    render(SwitchField, {
      props: {
        label: "Primary",
        appearance: "plain",
        layout: "block",
        secondaryText: "Secondary line",
      },
    })
    expect(screen.getByText("Secondary line")).toBeInTheDocument()
  })

  it("sets flipped class when flipped", () => {
    const { container } = render(SwitchField, {
      props: {
        label: "L",
        flipped: true,
        secondaryText: "S",
      },
    })
    expect(container.querySelector(".switch-field--flipped")).toBeInTheDocument()
  })

  it("disables switch and applies disabled field class", () => {
    render(SwitchField, {
      props: { label: "Off", disabled: true },
    })
    const control = screen.getByRole("switch")
    expect(control).toBeDisabled()
    expect(control.closest('[data-slot="switch-field"]')).toHaveClass("switch-field--disabled")
  })
})
