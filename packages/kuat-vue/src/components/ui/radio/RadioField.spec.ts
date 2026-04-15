/**
 * RadioField – appearance, layout, secondary, flipped.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import RadioField from "./RadioField.vue"
import RadioGroup from "./RadioGroup.vue"
import RadioGroupItem from "./RadioGroupItem.vue"
import { RADIO_FIELD_APPEARANCES, RADIO_FIELD_LAYOUTS } from "./constants"

function renderRadioField(
  props: Record<string, unknown> = { label: "L" },
  attrs: Record<string, unknown> = {}
) {
  return render(
    {
      components: { RadioField, RadioGroup, RadioGroupItem },
      data() {
        return { model: "main", props: { ...props, ...attrs } }
      },
      template: `
        <RadioGroup v-model="model">
          <RadioField v-bind="props" value="main" />
          <RadioGroupItem value="other" aria-label="Other" />
        </RadioGroup>
      `,
    },
    {}
  )
}

describe("RadioField", () => {
  it.each(RADIO_FIELD_APPEARANCES)("applies appearance class for %s", (appearance) => {
    const { container } = renderRadioField({ label: "L", appearance })
    expect(container.querySelector(`.radio-field--appearance-${appearance}`)).toBeInTheDocument()
  })

  it.each(RADIO_FIELD_LAYOUTS)("applies layout class for %s", (layout) => {
    const { container } = renderRadioField({ label: "L", layout })
    expect(container.querySelector(`.radio-field--layout-${layout}`)).toBeInTheDocument()
  })

  it("does not set has-secondary when secondaryText is omitted", () => {
    const { container } = renderRadioField({ label: "Only primary", appearance: "plain" })
    const root = container.querySelector('[data-slot="radio-field"]')
    expect(root).not.toHaveClass("radio-field--has-secondary")
  })

  it("applies card without secondary text", () => {
    const { container } = renderRadioField({ label: "Card only", appearance: "card" })
    const root = container.querySelector('[data-slot="radio-field"]')
    expect(root).toHaveClass("radio-field--appearance-card")
    expect(root).not.toHaveClass("radio-field--has-secondary")
  })

  it("forwards aria-invalid to the radio item", () => {
    renderRadioField({ label: "Invalid field", id: "fld-invalid" }, { "aria-invalid": true })
    expect(screen.getByRole("radio", { name: /invalid field/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    )
  })

  it("applies invalid modifier for error label styling when aria-invalid", () => {
    const { container } = renderRadioField(
      {
        label: "Error",
        secondaryText: "Detail",
        appearance: "card",
      },
      { "aria-invalid": true }
    )
    expect(container.querySelector('[data-slot="radio-field"]')).toHaveClass("radio-field--invalid")
  })

  it("associates label with radio via id", () => {
    renderRadioField({ id: "pick", label: "Pick me" })
    const radio = screen.getByRole("radio", { name: /pick me/i })
    expect(radio).toHaveAttribute("id", "pick")
  })

  it("retains card label hook for appearance styling", () => {
    const { container } = renderRadioField({
      label: "Label",
      appearance: "card",
      secondaryText: "More",
    })
    expect(container.querySelector(".radio-field__label")).toBeInTheDocument()
  })

  it("disables radio and applies disabled field class", () => {
    renderRadioField({ label: "Off", disabled: true })
    const radio = screen.getByRole("radio", { name: /off/i })
    expect(radio).toBeDisabled()
    expect(radio.closest('[data-slot="radio-field"]')).toHaveClass("radio-field--disabled")
  })
})
