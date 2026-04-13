/**
 * Input – Kuat Vue. Decorations, sizes, aria-invalid, disabled.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import { Input, INPUT_SIZES } from "./index"

describe("Input", () => {
  describe("rendering", () => {
    it("renders an input with default size class", () => {
      render(Input, { attrs: { "aria-label": "Field" } })
      const el = screen.getByRole("textbox", { name: /field/i })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("INPUT")
      expect(el.closest("[data-slot=input]")).toHaveClass("input", "input--size-regular")
      expect(el).toHaveAttribute("data-slot", "input-field")
    })

    it("forwards custom class to the wrapper", () => {
      render(Input, {
        props: { class: "custom" },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("textbox").closest(".custom")).toBeTruthy()
    })

    it("renders left and right decoration slots", () => {
      render(Input, {
        attrs: { "aria-label": "x" },
        slots: {
          leftDecoration: "<span data-testid=\"left\">L</span>",
          rightDecoration: "<span data-testid=\"right\">R</span>",
        },
      })
      expect(screen.getByTestId("left")).toHaveTextContent("L")
      expect(screen.getByTestId("right")).toHaveTextContent("R")
    })
  })

  describe("size", () => {
    it.each(INPUT_SIZES)("applies input--size-%s on the wrapper", (size) => {
      render(Input, {
        props: { size },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("textbox").closest("[data-slot=input]")).toHaveClass(
        `input--size-${size}`
      )
    })
  })

  describe("states", () => {
    it("sets aria-invalid when passed", () => {
      render(Input, {
        attrs: { "aria-label": "x", "aria-invalid": true },
      })
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled input", () => {
      render(Input, {
        attrs: { "aria-label": "x", disabled: true },
      })
      expect(screen.getByRole("textbox")).toBeDisabled()
    })
  })
})
