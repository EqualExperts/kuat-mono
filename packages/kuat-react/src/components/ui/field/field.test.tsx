import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field"

describe("Field", () => {
  it("renders default responsive orientation class", () => {
    const { container } = render(<Field>Content</Field>)
    expect(container.querySelector(".field--orientation-responsive")).toBeInTheDocument()
  })

  it("supports explicit horizontal orientation", () => {
    const { container } = render(<Field orientation="horizontal">Content</Field>)
    expect(container.querySelector(".field--orientation-horizontal")).toBeInTheDocument()
  })

  it("renders label and description hooks", () => {
    render(
      <Field>
        <FieldLabel htmlFor="field-id">Label</FieldLabel>
        <input id="field-id" />
        <FieldDescription>Help text</FieldDescription>
      </Field>
    )
    expect(screen.getByText("Label")).toBeInTheDocument()
    expect(screen.getByText("Help text")).toBeInTheDocument()
  })

  it("renders fieldset with legend variant", () => {
    const { container } = render(
      <FieldSet>
        <FieldLegend variant="label">Legend</FieldLegend>
      </FieldSet>
    )
    expect(container.querySelector(".field-legend--label")).toBeInTheDocument()
  })

  it("renders multiple errors as a list", () => {
    render(<FieldError errors={[{ message: "A" }, { message: "B" }]} />)
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })
})
