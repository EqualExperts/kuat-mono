/**
 * Tag – Kuat Vue. Categorisation pill: display/toggle/dismiss modes, nine colour categories.
 */
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/vue"
import Tag from "./Tag.vue"
import { tagVariants, TAG_COLORS, TAG_MODES } from "./index"

describe("Tag", () => {
  describe("display mode (default)", () => {
    it("renders a non-interactive span", () => {
      render(Tag, { slots: { default: "Design" } })
      const el = screen.getByText("Design")
      expect(el.tagName).toBe("SPAN")
      expect(el).toHaveAttribute("data-slot", "tag")
      expect(el).toHaveAttribute("data-mode", "display")
      expect(el).toHaveClass("tag", "tag--base")
      expect(el).not.toHaveClass("tag--interactive")
    })

    it("forwards custom class", () => {
      render(Tag, { props: { class: "custom" }, slots: { default: "Design" } })
      expect(screen.getByText("Design")).toHaveClass("custom", "tag")
    })
  })

  describe("colours", () => {
    it.each(TAG_COLORS)("applies the %s colour class", (color) => {
      render(Tag, { props: { color }, slots: { default: "Label" } })
      const el = screen.getByText("Label")
      expect(el).toHaveClass(`tag--${color}`)
      expect(el).toHaveAttribute("data-color", color)
    })
  })

  describe("toggle mode", () => {
    it("renders a button with aria-pressed", () => {
      render(Tag, { props: { mode: "toggle" }, slots: { default: "Filter" } })
      const el = screen.getByRole("button", { name: "Filter" })
      expect(el).toHaveAttribute("type", "button")
      expect(el).toHaveAttribute("aria-pressed", "false")
      expect(el).toHaveClass("tag--interactive")
      expect(el).not.toHaveClass("tag--selected")
    })

    it("shows selected state with an aria-hidden check icon", () => {
      render(Tag, { props: { mode: "toggle", selected: true }, slots: { default: "Filter" } })
      const el = screen.getByRole("button", { name: "Filter" })
      expect(el).toHaveAttribute("aria-pressed", "true")
      expect(el).toHaveClass("tag--selected")
      const icon = el.querySelector("[data-slot='tag-icon']")
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })

    it("emits update:selected with the next state on click", async () => {
      const { emitted } = render(Tag, {
        props: { mode: "toggle", selected: false },
        slots: { default: "Filter" },
      })
      await fireEvent.click(screen.getByRole("button", { name: "Filter" }))
      expect(emitted("update:selected")).toEqual([[true]])
    })
  })

  describe("dismiss mode", () => {
    it("renders a selected-visual button with an aria-hidden x icon", () => {
      render(Tag, { props: { mode: "dismiss" }, slots: { default: "Design" } })
      const el = screen.getByRole("button", { name: "Design" })
      expect(el).toHaveClass("tag--selected", "tag--interactive")
      expect(el).not.toHaveAttribute("aria-pressed")
      const icon = el.querySelector("[data-slot='tag-icon']")
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })

    it("emits dismiss on click", async () => {
      const { emitted } = render(Tag, {
        props: { mode: "dismiss" },
        slots: { default: "Design" },
      })
      await fireEvent.click(screen.getByRole("button", { name: "Design" }))
      expect(emitted("dismiss")).toHaveLength(1)
    })
  })

  describe("disabled", () => {
    it("disables the interactive button", () => {
      render(Tag, { props: { mode: "toggle", disabled: true }, slots: { default: "Filter" } })
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
