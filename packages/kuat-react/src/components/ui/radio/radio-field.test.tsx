/**
 * RadioField — appearance, layout, secondary, flipped (inside RadioGroup).
 */
import type { ReactNode } from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { RadioGroup, RadioGroupItem } from "./radio"
import {
  RadioField,
  RADIO_FIELD_APPEARANCES,
  RADIO_FIELD_LAYOUTS,
} from "./radio-field"

function TwoOptionGroup({
  children,
  defaultValue = "main",
}: {
  children: ReactNode
  defaultValue?: string
}) {
  return <RadioGroup defaultValue={defaultValue}>{children}</RadioGroup>
}

describe("RadioField", () => {
  it.each(RADIO_FIELD_APPEARANCES)(
    "applies appearance class for %s",
    (appearance) => {
      const { container } = render(
        <TwoOptionGroup>
          <RadioField label="L" value="main" appearance={appearance} />
          <RadioGroupItem value="other" aria-label="Other" />
        </TwoOptionGroup>
      )
      expect(
        container.querySelector(`.radio-field--appearance-${appearance}`)
      ).toBeInTheDocument()
    }
  )

  it.each(RADIO_FIELD_LAYOUTS)("applies layout class for %s", (layout) => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="L" value="main" layout={layout} />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(
      container.querySelector(`.radio-field--layout-${layout}`)
    ).toBeInTheDocument()
  })

  it("does not set has-secondary when secondaryText is omitted", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="Only primary" value="main" appearance="plain" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    const root = container.querySelector('[data-slot="radio-field"]')
    expect(root).not.toHaveClass("radio-field--has-secondary")
  })

  it("applies plain flipped with secondary (no card)", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField
          label="Left text"
          value="main"
          secondaryText="Detail"
          appearance="plain"
          layout="block"
          flipped
        />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    const root = container.querySelector('[data-slot="radio-field"]')
    expect(root).toHaveClass("radio-field--appearance-plain")
    expect(root).toHaveClass("radio-field--flipped")
    expect(root).toHaveClass("radio-field--has-secondary")
  })

  it("applies card without secondary text", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="Card only" value="main" appearance="card" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    const root = container.querySelector('[data-slot="radio-field"]')
    expect(root).toHaveClass("radio-field--appearance-card")
    expect(root).not.toHaveClass("radio-field--has-secondary")
  })

  it("forwards aria-invalid to the radio item", () => {
    render(
      <TwoOptionGroup>
        <RadioField label="Invalid field" value="main" aria-invalid id="fld-invalid" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(screen.getByRole("radio", { name: /invalid field/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    )
  })

  it("applies invalid modifier for error label styling when aria-invalid", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField
          label="Error"
          value="main"
          aria-invalid
          secondaryText="Detail"
          appearance="card"
        />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(
      container.querySelector('[data-slot="radio-field"]')
    ).toHaveClass("radio-field--invalid")
  })

  it("associates label with radio via id", () => {
    render(
      <TwoOptionGroup>
        <RadioField id="pick" label="Pick me" value="main" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    const r = screen.getByRole("radio", { name: /pick me/i })
    expect(r).toHaveAttribute("id", "pick")
  })

  it("applies plain appearance without card classes on wrapper", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="Label" value="main" appearance="plain" secondaryText="Help" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    const root = container.querySelector('[data-slot="radio-field"]')
    expect(root).toHaveClass("radio-field--appearance-plain")
    expect(root).toHaveClass("radio-field--has-secondary")
    expect(root).not.toHaveClass("radio-field--appearance-card")
  })

  it("applies card appearance", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="Label" value="main" appearance="card" secondaryText="More" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(container.querySelector(".radio-field--appearance-card")).toBeInTheDocument()
  })

  it("retains card label hook for appearance styling", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="Label" value="main" appearance="card" secondaryText="More" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(container.querySelector(".radio-field__label")).toBeInTheDocument()
  })

  it("renders secondary text in plain mode", () => {
    render(
      <TwoOptionGroup>
        <RadioField
          label="Primary"
          value="main"
          appearance="plain"
          secondaryText="Secondary line"
        />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(screen.getByText("Secondary line")).toBeInTheDocument()
  })

  it("sets flipped class when flipped", () => {
    const { container } = render(
      <TwoOptionGroup>
        <RadioField label="L" value="main" flipped secondaryText="S" />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    expect(container.querySelector(".radio-field--flipped")).toBeInTheDocument()
  })

  it("disables radio and applies disabled field class", () => {
    render(
      <TwoOptionGroup>
        <RadioField label="Off" value="main" disabled />
        <RadioGroupItem value="other" aria-label="Other" />
      </TwoOptionGroup>
    )
    const r = screen.getByRole("radio", { name: /off/i })
    expect(r).toBeDisabled()
    expect(r.closest('[data-slot="radio-field"]')).toHaveClass("radio-field--disabled")
  })
})
