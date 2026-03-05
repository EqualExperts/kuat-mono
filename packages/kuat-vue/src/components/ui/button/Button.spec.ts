/**
 * Button – Kuat Vue. Variants, color, size, states; destructive overrides color.
 */
import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen } from "@testing-library/vue"
import Button from "./Button.vue"
import {
  buttonVariants,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_COLORS,
} from "./index"

describe("Button", () => {
  describe("rendering", () => {
    it("renders with default props and slot content", () => {
      render(Button, { slots: { default: "Click me" } })
      const el = screen.getByRole("button", { name: /click me/i })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("BUTTON")
      expect(el).toHaveClass("button", "button--variant-primary", "button--color-ee-blue", "button--size-default")
    })

    it("forwards custom class", () => {
      render(Button, {
        props: { class: "custom" },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass("custom")
    })
  })

  describe("variants", () => {
    it.each(BUTTON_VARIANTS)("applies variant class button--variant-%s", (variant) => {
      render(Button, {
        props: { variant },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass(`button--variant-${variant}`)
    })

    it('maps variant "default" to primary', () => {
      render(Button, {
        props: { variant: "default" },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass("button--variant-primary")
    })
  })

  describe("color", () => {
    it.each(BUTTON_COLORS)("applies color class button--color-%s when not destructive", (color) => {
      render(Button, {
        props: { color, variant: "primary" },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass(`button--color-${color}`)
    })

    it("does not apply color class when variant is destructive", () => {
      render(Button, {
        props: { variant: "destructive", color: "transform-teal" },
        slots: { default: "Delete" },
      })
      const btn = screen.getByRole("button")
      expect(btn).toHaveClass("button--variant-destructive")
      expect(btn).not.toHaveClass("button--color-transform-teal")
    })
  })

  describe("sizes", () => {
    it.each(BUTTON_SIZES)("applies size class button--size-%s", (size) => {
      render(Button, {
        props: { size },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass(`button--size-${size}`)
    })

    it('maps size "sm" to small', () => {
      render(Button, {
        props: { size: "sm" },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass("button--size-small")
    })

    it('maps size "lg" to large', () => {
      render(Button, {
        props: { size: "lg" },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toHaveClass("button--size-large")
    })
  })

  describe("states", () => {
    it("renders disabled button with disabled attribute", () => {
      render(Button, {
        props: { disabled: true },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("button")).toBeDisabled()
    })
  })

  describe("content", () => {
    it("renders text only", () => {
      render(Button, { slots: { default: "Submit" } })
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    })

    it("renders icon and text", () => {
      render(Button, {
        slots: {
          default: () => [
            h("span", { "data-testid": "icon", "aria-hidden": "true" }, "→"),
            " Next",
          ],
        },
      })
      const btn = screen.getByRole("button", { name: /next/i })
      expect(btn).toBeInTheDocument()
      expect(screen.getByTestId("icon").parentElement).toBe(btn)
    })

    it("renders icon only with size icon", () => {
      render(Button, {
        props: { size: "icon", "aria-label": "Close" },
        slots: { default: "×" },
      })
      const btn = screen.getByRole("button", { name: "Close" })
      expect(btn).toHaveClass("button--size-icon")
      expect(btn).toHaveTextContent("×")
    })
  })

  describe("buttonVariants", () => {
    it("returns expected class string for default options", () => {
      const classes = buttonVariants({})
      expect(classes).toContain("button")
      expect(classes).toContain("button--variant-primary")
      expect(classes).toContain("button--color-ee-blue")
      expect(classes).toContain("button--size-default")
    })

    it("returns class string including variant, color, and size", () => {
      const classes = buttonVariants({
        variant: "secondary",
        color: "transform-teal",
        size: "large",
      })
      expect(classes).toContain("button")
      expect(classes).toContain("button--variant-secondary")
      expect(classes).toContain("button--color-transform-teal")
      expect(classes).toContain("button--size-large")
    })

    it("omits color class for destructive in buttonVariants", () => {
      const classes = buttonVariants({ variant: "destructive", color: "ee-blue" })
      expect(classes).toContain("button--variant-destructive")
      expect(classes).not.toContain("button--color-ee-blue")
    })
  })
})
