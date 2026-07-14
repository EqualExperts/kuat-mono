/**
 * Tag – Kuat React. Categorisation pill: display/toggle/dismiss modes, nine colour categories.
 */
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tag, tagVariants, TAG_COLORS, TAG_MODES } from "./tag"

describe("Tag", () => {
  describe("display mode (default)", () => {
    it("renders a non-interactive span", () => {
      render(<Tag>Design</Tag>)
      const el = screen.getByText("Design")
      expect(el.tagName).toBe("SPAN")
      expect(el).toHaveAttribute("data-slot", "tag")
      expect(el).toHaveAttribute("data-mode", "display")
      expect(el).toHaveClass("tag", "tag--base")
      expect(el).not.toHaveClass("tag--interactive")
    })

    it("forwards custom className", () => {
      render(<Tag className="custom">Design</Tag>)
      expect(screen.getByText("Design")).toHaveClass("custom", "tag")
    })

    it("forwards ref to the root span", () => {
      const ref = { current: null as HTMLElement | null }
      render(<Tag ref={ref}>Design</Tag>)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })

  describe("colours", () => {
    it.each(TAG_COLORS)("applies the %s colour class", (color) => {
      render(<Tag color={color}>Label</Tag>)
      const el = screen.getByText("Label")
      expect(el).toHaveClass(`tag--${color}`)
      expect(el).toHaveAttribute("data-color", color)
    })
  })

  describe("toggle mode", () => {
    it("renders a button with aria-pressed", () => {
      render(<Tag mode="toggle">Filter</Tag>)
      const el = screen.getByRole("button", { name: "Filter" })
      expect(el).toHaveAttribute("type", "button")
      expect(el).toHaveAttribute("aria-pressed", "false")
      expect(el).toHaveClass("tag--interactive")
      expect(el).not.toHaveClass("tag--selected")
    })

    it("shows selected state with an aria-hidden check icon", () => {
      render(
        <Tag mode="toggle" selected>
          Filter
        </Tag>
      )
      const el = screen.getByRole("button", { name: "Filter" })
      expect(el).toHaveAttribute("aria-pressed", "true")
      expect(el).toHaveClass("tag--selected")
      const icon = el.querySelector("[data-slot='tag-icon']")
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })

    it("calls onSelectedChange with the next state on click", async () => {
      const user = userEvent.setup()
      const onSelectedChange = vi.fn()
      render(
        <Tag mode="toggle" selected={false} onSelectedChange={onSelectedChange}>
          Filter
        </Tag>
      )
      await user.click(screen.getByRole("button", { name: "Filter" }))
      expect(onSelectedChange).toHaveBeenCalledWith(true)
    })

    it("is keyboard-operable", async () => {
      const user = userEvent.setup()
      const onSelectedChange = vi.fn()
      render(
        <Tag mode="toggle" onSelectedChange={onSelectedChange}>
          Filter
        </Tag>
      )
      await user.tab()
      await user.keyboard("{Enter}")
      expect(onSelectedChange).toHaveBeenCalledWith(true)
    })
  })

  describe("dismiss mode", () => {
    it("renders a selected-visual button with an aria-hidden x icon", () => {
      render(<Tag mode="dismiss">Design</Tag>)
      const el = screen.getByRole("button", { name: "Design" })
      expect(el).toHaveClass("tag--selected", "tag--interactive")
      expect(el).not.toHaveAttribute("aria-pressed")
      const icon = el.querySelector("[data-slot='tag-icon']")
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })

    it("calls onDismiss on click", async () => {
      const user = userEvent.setup()
      const onDismiss = vi.fn()
      render(
        <Tag mode="dismiss" onDismiss={onDismiss}>
          Design
        </Tag>
      )
      await user.click(screen.getByRole("button", { name: "Design" }))
      expect(onDismiss).toHaveBeenCalledOnce()
    })

    it("respects event.preventDefault from a consumer onClick", async () => {
      const user = userEvent.setup()
      const onDismiss = vi.fn()
      render(
        <Tag mode="dismiss" onDismiss={onDismiss} onClick={(e) => e.preventDefault()}>
          Design
        </Tag>
      )
      await user.click(screen.getByRole("button", { name: "Design" }))
      expect(onDismiss).not.toHaveBeenCalled()
    })
  })

  describe("disabled", () => {
    it("disables the interactive button", () => {
      render(
        <Tag mode="toggle" disabled>
          Filter
        </Tag>
      )
      expect(screen.getByRole("button", { name: "Filter" })).toBeDisabled()
    })
  })
})

describe("tagVariants", () => {
  it("returns expected class string for default options", () => {
    const classes = tagVariants()
    expect(classes).toContain("tag")
    expect(classes).toContain("tag--base")
    expect(classes).not.toContain("tag--interactive")
  })

  it("returns selected classes for dismiss mode", () => {
    const classes = tagVariants({ color: "transform-teal", mode: "dismiss" })
    expect(classes).toContain("tag--transform-teal")
    expect(classes).toContain("tag--interactive")
    expect(classes).toContain("tag--selected")
  })
})

describe("TAG_COLORS / TAG_MODES", () => {
  it("exposes nine colours and three modes", () => {
    expect(TAG_COLORS).toHaveLength(9)
    expect(TAG_MODES).toEqual(["display", "toggle", "dismiss"])
  })
})
