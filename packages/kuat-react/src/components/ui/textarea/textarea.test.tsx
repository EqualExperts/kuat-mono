/**
 * Textarea – Kuat React. Resize, aria-invalid, disabled.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Textarea, TEXTAREA_RESIZE } from "./textarea"

describe("Textarea", () => {
  describe("rendering", () => {
    it("renders a textarea with default classes", () => {
      render(<Textarea aria-label="Message" />)
      const el = screen.getByRole("textbox", { name: /message/i })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("TEXTAREA")
      expect(el).toHaveClass("textarea", "textarea--resize-vertical")
      expect(el).toHaveAttribute("data-slot", "textarea")
    })

    it("forwards custom className", () => {
      render(<Textarea className="custom" aria-label="x" />)
      expect(screen.getByRole("textbox")).toHaveClass("custom")
    })

    it("forwards ref to the textarea element", () => {
      const ref = { current: null as HTMLTextAreaElement | null }
      render(<Textarea ref={ref} aria-label="x" />)
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })
  })

  describe("resize", () => {
    it.each(TEXTAREA_RESIZE)("applies textarea--resize-%s", (resize) => {
      render(<Textarea resize={resize} aria-label="x" />)
      expect(screen.getByRole("textbox")).toHaveClass(`textarea--resize-${resize}`)
    })
  })

  describe("states", () => {
    it("sets aria-invalid when passed", () => {
      render(<Textarea aria-label="x" aria-invalid />)
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled textarea", () => {
      render(<Textarea aria-label="x" disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
    })
  })
})
