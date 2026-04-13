/**
 * Checkbox – Kuat Vue. States, aria-invalid, disabled, indeterminate.
 */
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/vue"
import Checkbox from "./Checkbox.vue"

describe("Checkbox", () => {
  describe("rendering", () => {
    it("renders with default classes", () => {
      render(Checkbox, { attrs: { "aria-label": "Accept" } })
      const el = screen.getByRole("checkbox", { name: /accept/i })
      expect(el).toHaveClass("checkbox")
      expect(el).toHaveAttribute("data-slot", "checkbox")
    })

    it("forwards custom class", () => {
      render(Checkbox, {
        props: { class: "custom" },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("checkbox")).toHaveClass("custom")
    })
  })

  describe("states", () => {
    it.each([
      [false, "unchecked"],
      [true, "checked"],
    ] as const)("when modelValue is %s, data-state is %s", (modelValue, expected) => {
      render(Checkbox, {
        props: { modelValue },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", expected)
    })

    it("sets aria-invalid when passed", () => {
      render(Checkbox, {
        attrs: { "aria-label": "x", "aria-invalid": true },
      })
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled checkbox", () => {
      render(Checkbox, {
        attrs: { "aria-label": "x", disabled: true },
      })
      expect(screen.getByRole("checkbox")).toBeDisabled()
    })

    it("supports indeterminate via modelValue", () => {
      render(Checkbox, {
        props: { modelValue: "indeterminate" },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "indeterminate")
    })

    it("combines invalid and disabled attributes", () => {
      render(Checkbox, {
        attrs: { "aria-label": "x", "aria-invalid": true, disabled: true },
      })
      const el = screen.getByRole("checkbox")
      expect(el).toHaveAttribute("aria-invalid", "true")
      expect(el).toBeDisabled()
    })
  })

  describe("interaction", () => {
    it("toggles checked on click", async () => {
      render(Checkbox, { attrs: { "aria-label": "Toggle" } })
      const cb = screen.getByRole("checkbox")
      expect(cb).toHaveAttribute("data-state", "unchecked")
      await fireEvent.click(cb)
      expect(cb).toHaveAttribute("data-state", "checked")
    })
  })
})
