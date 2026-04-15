/**
 * CheckboxField – appearance, layout, secondary, flipped.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  CheckboxField,
  CHECKBOX_FIELD_APPEARANCES,
  CHECKBOX_FIELD_LAYOUTS,
} from "./checkbox-field"

describe("CheckboxField", () => {
  it.each(CHECKBOX_FIELD_APPEARANCES)(
    "applies appearance class for %s",
    (appearance) => {
      const { container } = render(
        <CheckboxField label="L" appearance={appearance} />
      )
      expect(
        container.querySelector(`.checkbox-field--appearance-${appearance}`)
      ).toBeInTheDocument()
    }
  )

  it.each(CHECKBOX_FIELD_LAYOUTS)("applies layout class for %s", (layout) => {
    const { container } = render(<CheckboxField label="L" layout={layout} />)
    expect(
      container.querySelector(`.checkbox-field--layout-${layout}`)
    ).toBeInTheDocument()
  })

  it("does not set has-secondary when secondaryText is omitted", () => {
    const { container } = render(
      <CheckboxField label="Only primary" appearance="plain" />
    )
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).not.toHaveClass("checkbox-field--has-secondary")
  })

  it("applies plain flipped with secondary (no card)", () => {
    const { container } = render(
      <CheckboxField
        label="Left text"
        secondaryText="Detail"
        appearance="plain"
        layout="block"
        flipped
      />
    )
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).toHaveClass("checkbox-field--appearance-plain")
    expect(root).toHaveClass("checkbox-field--flipped")
    expect(root).toHaveClass("checkbox-field--has-secondary")
  })

  it("applies card without secondary text", () => {
    const { container } = render(
      <CheckboxField label="Card only" appearance="card" />
    )
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).toHaveClass("checkbox-field--appearance-card")
    expect(root).not.toHaveClass("checkbox-field--has-secondary")
  })

  it("forwards aria-invalid to the checkbox", () => {
    render(
      <CheckboxField label="Invalid field" aria-invalid id="fld-invalid" />
    )
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("applies invalid modifier for error label styling when aria-invalid", () => {
    const { container } = render(
      <CheckboxField label="Error" aria-invalid secondaryText="Detail" appearance="card" />
    )
    expect(
      container.querySelector('[data-slot="checkbox-field"]')
    ).toHaveClass("checkbox-field--invalid")
  })

  it("associates label with checkbox via id", () => {
    render(<CheckboxField id="agree" label="I agree" />)
    const cb = screen.getByRole("checkbox", { name: /i agree/i })
    expect(cb).toHaveAttribute("id", "agree")
  })

  it("applies plain appearance without card classes on wrapper", () => {
    const { container } = render(
      <CheckboxField label="Label" appearance="plain" secondaryText="Help" />
    )
    const root = container.querySelector('[data-slot="checkbox-field"]')
    expect(root).toHaveClass("checkbox-field--appearance-plain")
    expect(root).toHaveClass("checkbox-field--has-secondary")
    expect(root).not.toHaveClass("checkbox-field--appearance-card")
  })

  it("applies card appearance", () => {
    const { container } = render(
      <CheckboxField label="Label" appearance="card" secondaryText="More" />
    )
    expect(container.querySelector(".checkbox-field--appearance-card")).toBeInTheDocument()
  })

  it("retains card label hook for appearance styling", () => {
    const { container } = render(
      <CheckboxField label="Label" appearance="card" secondaryText="More" />
    )
    expect(container.querySelector(".checkbox-field__label")).toBeInTheDocument()
  })

  it("renders secondary text in plain mode", () => {
    render(
      <CheckboxField label="Primary" appearance="plain" secondaryText="Secondary line" />
    )
    expect(screen.getByText("Secondary line")).toBeInTheDocument()
  })

  it("sets flipped class when flipped", () => {
    const { container } = render(
      <CheckboxField label="L" flipped secondaryText="S" />
    )
    expect(container.querySelector(".checkbox-field--flipped")).toBeInTheDocument()
  })

  it("disables checkbox and applies disabled field class", () => {
    render(<CheckboxField label="Off" disabled />)
    const cb = screen.getByRole("checkbox")
    expect(cb).toBeDisabled()
    expect(cb.closest('[data-slot="checkbox-field"]')).toHaveClass("checkbox-field--disabled")
  })
})
