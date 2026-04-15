/**
 * Switch – Kuat Vue. States, aria-invalid, disabled.
 */
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/vue"
import Switch from "./Switch.vue"

describe("Switch", () => {
  describe("rendering", () => {
    it("renders with default classes", () => {
      render(Switch, { attrs: { "aria-label": "Airplane mode" } })
      const el = screen.getByRole("switch", { name: /airplane mode/i })
      expect(el).toHaveClass("switch")
      expect(el).toHaveAttribute("data-slot", "switch")
    })

    it("forwards custom class", () => {
      render(Switch, {
        props: { class: "custom" },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("switch")).toHaveClass("custom")
    })
  })

  describe("states", () => {
    it.each([
      [false, "unchecked"],
      [true, "checked"],
    ] as const)("when modelValue is %s, data-state is %s", (modelValue, expected) => {
      render(Switch, {
        props: { modelValue },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("switch")).toHaveAttribute("data-state", expected)
    })

    it("sets aria-invalid when passed", () => {
      render(Switch, {
        attrs: { "aria-label": "x", "aria-invalid": true },
      })
      expect(screen.getByRole("switch")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled switch", () => {
      render(Switch, {
        attrs: { "aria-label": "x", disabled: true },
      })
      expect(screen.getByRole("switch")).toBeDisabled()
    })

    it("combines invalid and disabled attributes", () => {
      render(Switch, {
        attrs: { "aria-label": "x", "aria-invalid": true, disabled: true },
      })
      const el = screen.getByRole("switch")
      expect(el).toHaveAttribute("aria-invalid", "true")
      expect(el).toBeDisabled()
    })
  })

  describe("interaction", () => {
    it("toggles checked on click", async () => {
      render(Switch, { attrs: { "aria-label": "Toggle" } })
      const control = screen.getByRole("switch")
      expect(control).toHaveAttribute("data-state", "unchecked")
      await fireEvent.click(control)
      expect(control).toHaveAttribute("data-state", "checked")
      expect(control).toHaveAttribute("aria-checked", "true")
    })

    it("toggles checked on Enter key press", async () => {
      render(Switch, { attrs: { "aria-label": "Keyboard toggle" } })
      const control = screen.getByRole("switch")
      control.focus()
      await fireEvent.keyDown(control, { key: "Enter" })
      await fireEvent.keyUp(control, { key: "Enter" })
      expect(control).toHaveAttribute("data-state", "checked")
    })
  })
})
