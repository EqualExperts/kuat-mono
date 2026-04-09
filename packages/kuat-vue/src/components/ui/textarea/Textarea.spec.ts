/**
 * Textarea – Kuat Vue. Resize, aria-invalid, disabled.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import Textarea from "./Textarea.vue"
import { TEXTAREA_RESIZE } from "./index"

describe("Textarea", () => {
  describe("rendering", () => {
    it("renders a textarea with default classes", () => {
      render(Textarea, { attrs: { "aria-label": "Message" } })
      const el = screen.getByRole("textbox", { name: /message/i })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("TEXTAREA")
      expect(el).toHaveClass("textarea", "textarea--resize-vertical")
      expect(el).toHaveAttribute("data-slot", "textarea")
    })

    it("forwards custom class", () => {
      render(Textarea, {
        props: { class: "custom" },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("textbox")).toHaveClass("custom")
    })
  })

  describe("resize", () => {
    it.each(TEXTAREA_RESIZE)("applies textarea--resize-%s", (resize) => {
      render(Textarea, {
        props: { resize },
        attrs: { "aria-label": "x" },
      })
      expect(screen.getByRole("textbox")).toHaveClass(`textarea--resize-${resize}`)
    })
  })

  describe("states", () => {
    it("sets aria-invalid when passed", () => {
      render(Textarea, {
        attrs: { "aria-label": "x", "aria-invalid": true },
      })
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled textarea", () => {
      render(Textarea, {
        attrs: { "aria-label": "x", disabled: true },
      })
      expect(screen.getByRole("textbox")).toBeDisabled()
    })
  })
})
