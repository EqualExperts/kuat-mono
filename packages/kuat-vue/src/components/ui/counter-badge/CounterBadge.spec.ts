/**
 * CounterBadge – Kuat Vue. Digits-only count pill with "{max}+" overflow.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import CounterBadge from "./CounterBadge.vue"
import { counterBadgeVariants, COUNTER_BADGE_TYPES } from "./index"

describe("CounterBadge", () => {
  describe("rendering", () => {
    it("renders the count with default props", () => {
      render(CounterBadge, { props: { count: 8 } })
      const el = screen.getByText("8")
      expect(el.tagName).toBe("SPAN")
      expect(el).toHaveAttribute("data-slot", "counter-badge")
      expect(el).toHaveAttribute("data-type", "primary")
      expect(el).toHaveClass("counter-badge", "counter-badge--primary")
    })

    it("forwards custom class", () => {
      render(CounterBadge, { props: { count: 1, class: "custom" } })
      expect(screen.getByText("1")).toHaveClass("custom", "counter-badge")
    })
  })

  describe("overflow", () => {
    it("caps at 99+ by default", () => {
      render(CounterBadge, { props: { count: 100 } })
      expect(screen.getByText("99+")).toBeInTheDocument()
    })

    it("shows the exact count at the cap", () => {
      render(CounterBadge, { props: { count: 99 } })
      expect(screen.getByText("99")).toBeInTheDocument()
    })

    it("respects a custom max", () => {
      render(CounterBadge, { props: { count: 10, max: 9 } })
      expect(screen.getByText("9+")).toBeInTheDocument()
    })
  })

  describe("types", () => {
    it.each(COUNTER_BADGE_TYPES)("applies the %s type class", (type) => {
      render(CounterBadge, { props: { count: 1, type } })
      const el = screen.getByText("1")
      expect(el).toHaveClass(`counter-badge--${type}`)
      expect(el).toHaveAttribute("data-type", type)
    })
  })
})

describe("counterBadgeVariants", () => {
  it("returns expected class string for default options", () => {
    const classes = counterBadgeVariants()
    expect(classes).toContain("counter-badge")
    expect(classes).toContain("counter-badge--primary")
  })

  it("returns class string for attention type", () => {
    const classes = counterBadgeVariants({ type: "attention" })
    expect(classes).toContain("counter-badge--attention")
  })
})
