import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/vue"
import Field from "./Field.vue"
import FieldDescription from "./FieldDescription.vue"
import FieldError from "./FieldError.vue"
import FieldLabel from "./FieldLabel.vue"
import FieldLegend from "./FieldLegend.vue"
import FieldSet from "./FieldSet.vue"

describe("Field", () => {
  it("renders default responsive orientation class", () => {
    const { container } = render(Field, { slots: { default: "Content" } })
    expect(container.querySelector(".field--orientation-responsive")).toBeInTheDocument()
  })

  it("supports explicit horizontal orientation", () => {
    const { container } = render(Field, {
      props: { orientation: "horizontal" },
      slots: { default: "Content" },
    })
    expect(container.querySelector(".field--orientation-horizontal")).toBeInTheDocument()
  })

  it("renders label and description hooks", () => {
    render({
      components: { Field, FieldDescription, FieldLabel },
      template: `
        <Field>
          <FieldLabel for="field-id">Label</FieldLabel>
          <input id="field-id" />
          <FieldDescription>Help text</FieldDescription>
        </Field>
      `,
    })
    expect(screen.getByText("Label")).toBeInTheDocument()
    expect(screen.getByText("Help text")).toBeInTheDocument()
  })

  it("renders fieldset with legend variant", () => {
    const { container } = render({
      components: { FieldLegend, FieldSet },
      template: `
        <FieldSet>
          <FieldLegend variant="label">Legend</FieldLegend>
        </FieldSet>
      `,
    })
    expect(container.querySelector(".field-legend--label")).toBeInTheDocument()
  })

  it("renders multiple errors as a list", () => {
    render(FieldError, {
      props: {
        errors: [{ message: "A" }, { message: "B" }],
      },
    })
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })
})
