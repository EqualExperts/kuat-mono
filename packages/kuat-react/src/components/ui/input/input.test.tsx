/**
 * Input – Kuat React. Decorations, sizes, aria-invalid, disabled.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Input, INPUT_SIZES } from "./input"

describe("Input", () => {
  describe("rendering", () => {
    it("renders an input with default size class", () => {
      render(<Input aria-label="Field" />)
      const el = screen.getByRole("textbox", { name: /field/i })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("INPUT")
      expect(el.closest("[data-slot=input]")).toHaveClass("input", "input--size-regular")
      expect(el).toHaveAttribute("data-slot", "input-field")
    })

    it("forwards custom className to the wrapper", () => {
      render(<Input className="custom" aria-label="x" />)
      expect(screen.getByRole("textbox").closest(".custom")).toBeTruthy()
    })

    it("forwards ref to the input element", () => {
      const ref = { current: null as HTMLInputElement | null }
      render(<Input ref={ref} aria-label="x" />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it("renders left and right decorations", () => {
      render(
        <Input
          aria-label="x"
          leftDecoration={<span data-testid="left">L</span>}
          rightDecoration={<span data-testid="right">R</span>}
        />
      )
      expect(screen.getByTestId("left")).toHaveTextContent("L")
      expect(screen.getByTestId("right")).toHaveTextContent("R")
    })
  })

  describe("size", () => {
    it.each(INPUT_SIZES)("applies input--size-%s on the wrapper", (size) => {
      render(<Input size={size} aria-label="x" />)
      expect(screen.getByRole("textbox").closest("[data-slot=input]")).toHaveClass(
        `input--size-${size}`
      )
    })
  })

  describe("states", () => {
    it("sets aria-invalid when passed", () => {
      render(<Input aria-label="x" aria-invalid />)
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled input", () => {
      render(<Input aria-label="x" disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
    })
  })
})
