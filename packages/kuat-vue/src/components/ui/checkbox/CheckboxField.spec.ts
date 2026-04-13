/**
 * CheckboxField – appearance, layout, secondary, flipped.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import CheckboxField from "./CheckboxField.vue"
import { CHECKBOX_FIELD_APPEARANCES, CHECKBOX_FIELD_LAYOUTS } from "./constants"

describe("CheckboxField", () => {
  it.each(CHECKBOX_FIELD_APPEARANCES)("applies appearance class for %s", (appearance) => {
    const { container } = render(CheckboxField, {
      props: { label: "L", appearance },
    })
    expect(
      container.querySelector(`.checkbox-field--appearance-${appearance}`)
    ).toBeInTheDocument()
  })

  it.each(CHECKBOX_FIELD_LAYOUTS)("applies layout class for %s", (layout) => {
    const { container } = render(CheckboxField, {
      props: { label: "L", layout },
    })
    expect(container.querySelector(`.checkbox-field--layout-${layout}`)).toBeInTheDocument()
  })

  it("does not set has-secondary when secondaryText is omitted", () => {
    const { container } = render(CheckboxField, {
      props: { label: "Only primary", appearance: "plain" },
    })
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).not.toHaveClass("checkbox-field--has-secondary")
  })

  it("applies plain flipped with secondary (no card)", () => {
    const { container } = render(CheckboxField, {
      props: {
        label: "Left text",
        secondaryText: "Detail",
        appearance: "plain",
        layout: "block",
        flipped: true,
      },
    })
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).toHaveClass("checkbox-field--appearance-plain")
    expect(root).toHaveClass("checkbox-field--flipped")
    expect(root).toHaveClass("checkbox-field--has-secondary")
  })

  it("applies card without secondary text", () => {
    const { container } = render(CheckboxField, {
      props: { label: "Card only", appearance: "card" },
    })
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).toHaveClass("checkbox-field--appearance-card")
    expect(root).not.toHaveClass("checkbox-field--has-secondary")
  })

  it("forwards aria-invalid to the checkbox", () => {
    render(CheckboxField, {
      props: { label: "Invalid field", id: "fld-invalid" },
      attrs: { "aria-invalid": true },
    })
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("applies invalid modifier for error label styling when aria-invalid", () => {
    const { container } = render(CheckboxField, {
      props: {
        label: "Error",
        secondaryText: "Detail",
        appearance: "card",
      },
      attrs: { "aria-invalid": true },
    })
    expect(
      container.querySelector('[data-slot="checkbox-field"]')
    ).toHaveClass("checkbox-field--invalid")
  })

  it("associates label with checkbox via id", () => {
    render(CheckboxField, {
      props: { id: "agree", label: "I agree" },
    })
    const cb = screen.getByRole("checkbox", { name: /i agree/i })
    expect(cb).toHaveAttribute("id", "agree")
  })

  it("applies plain appearance with secondary without card class", () => {
    const { container } = render(CheckboxField, {
      props: {
        label: "Label",
        appearance: "plain",
        secondaryText: "Help",
      },
    })
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).toHaveClass("checkbox-field--appearance-plain")
    expect(root).toHaveClass("checkbox-field--has-secondary")
    expect(root).not.toHaveClass("checkbox-field--appearance-card")
  })

  it("applies card appearance", () => {
    const { container } = render(CheckboxField, {
      props: {
        label: "Label",
        appearance: "card",
        secondaryText: "More",
      },
    })
    expect(container.querySelector(".checkbox-field--appearance-card")).toBeInTheDocument()
  })

  it("renders secondary text in plain mode", () => {
    render(CheckboxField, {
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
    const { container } = render(CheckboxField, {
      props: {
        label: "L",
        flipped: true,
        secondaryText: "S",
      },
    })
    expect(container.querySelector(".checkbox-field--flipped")).toBeInTheDocument()
  })

  it("disables checkbox and applies disabled field class", () => {
    render(CheckboxField, {
      props: { label: "Off", disabled: true },
    })
    const cb = screen.getByRole("checkbox")
    expect(cb).toBeDisabled()
    expect(cb.closest('[data-slot="checkbox-field"]')).toHaveClass("checkbox-field--disabled")
  })
})
