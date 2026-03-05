/**
 * Button – Kuat React. Variants, color, size, states; destructive overrides color.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Button,
  buttonVariants,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_COLORS,
} from "./button"

describe("Button", () => {
  describe("rendering", () => {
    it("renders with default props and children", () => {
      render(<Button>Click me</Button>)
      const el = screen.getByRole("button", { name: /click me/i })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("BUTTON")
      expect(el).toHaveClass("button", "button--variant-primary", "button--color-ee-blue", "button--size-default")
    })

    it("forwards custom className", () => {
      render(<Button className="custom">Label</Button>)
      expect(screen.getByRole("button")).toHaveClass("custom")
    })

    it("forwards ref to the button element", () => {
      const ref = { current: null as HTMLButtonElement | null }
      render(<Button ref={ref}>Label</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("variants", () => {
    it.each(BUTTON_VARIANTS)("applies variant class button--variant-%s", (variant) => {
      render(<Button variant={variant}>Label</Button>)
      expect(screen.getByRole("button")).toHaveClass(`button--variant-${variant}`)
    })

    it('maps variant "default" to primary', () => {
      render(<Button variant="default">Label</Button>)
      expect(screen.getByRole("button")).toHaveClass("button--variant-primary")
    })
  })

  describe("color", () => {
    it.each(BUTTON_COLORS)("applies color class button--color-%s when not destructive", (color) => {
      render(<Button color={color} variant="primary">Label</Button>)
      expect(screen.getByRole("button")).toHaveClass(`button--color-${color}`)
    })

    it("does not apply color class when variant is destructive", () => {
      render(<Button variant="destructive" color="transform-teal">Delete</Button>)
      const btn = screen.getByRole("button")
      expect(btn).toHaveClass("button--variant-destructive")
      expect(btn).not.toHaveClass("button--color-transform-teal")
    })
  })

  describe("sizes", () => {
    it.each(BUTTON_SIZES)("applies size class button--size-%s", (size) => {
      render(<Button size={size}>Label</Button>)
      expect(screen.getByRole("button")).toHaveClass(`button--size-${size}`)
    })

    it('maps size "sm" to small', () => {
      render(<Button size="sm">Label</Button>)
      expect(screen.getByRole("button")).toHaveClass("button--size-small")
    })

    it('maps size "lg" to large', () => {
      render(<Button size="lg">Label</Button>)
      expect(screen.getByRole("button")).toHaveClass("button--size-large")
    })
  })

  describe("states", () => {
    it("renders disabled button with disabled attribute", () => {
      render(<Button disabled>Label</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })
  })

  describe("content", () => {
    it("renders text only", () => {
      render(<Button>Submit</Button>)
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    })

    it("renders icon and text", () => {
      const Icon = () => <span data-testid="icon" aria-hidden>→</span>
      render(
        <Button>
          <Icon />
          Next
        </Button>
      )
      const btn = screen.getByRole("button", { name: /next/i })
      expect(btn).toBeInTheDocument()
      expect(screen.getByTestId("icon").parentElement).toBe(btn)
    })

    it("renders text and icon", () => {
      const Icon = () => <span data-testid="icon" aria-hidden>✓</span>
      render(
        <Button>
          Done
          <Icon />
        </Button>
      )
      expect(screen.getByRole("button", { name: /done/i })).toBeInTheDocument()
      expect(screen.getByTestId("icon")).toBeInTheDocument()
    })

    it("renders icon only with size icon", () => {
      render(<Button size="icon" aria-label="Close">×</Button>)
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

    it("maps default variant and sm/lg size in buttonVariants", () => {
      const classes = buttonVariants({ variant: "default", size: "sm" })
      expect(classes).toContain("button--variant-primary")
      expect(classes).toContain("button--size-small")
    })
  })
})
