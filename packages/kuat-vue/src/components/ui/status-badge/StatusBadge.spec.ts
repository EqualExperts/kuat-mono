/**
 * StatusBadge – Kuat Vue. Non-interactive status indicator: five semantic types, two sizes.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import StatusBadge from "./StatusBadge.vue"
import {
  statusBadgeVariants,
  STATUS_BADGE_TYPES,
  STATUS_BADGE_SIZES,
} from "./index"

describe("StatusBadge", () => {
  describe("rendering", () => {
    it("renders with default props and slot content", () => {
      render(StatusBadge, { slots: { default: "Success" } })
      const el = screen.getByText("Success")
      expect(el.tagName).toBe("SPAN")
      expect(el).toHaveAttribute("data-slot", "status-badge")
      expect(el).toHaveAttribute("data-type", "success")
      expect(el).toHaveAttribute("data-size", "base")
      expect(el).toHaveClass("status-badge", "status-badge--success", "status-badge--size-base")
    })

    it("forwards custom class", () => {
      render(StatusBadge, { props: { class: "custom" }, slots: { default: "Label" } })
      expect(screen.getByText("Label")).toHaveClass("custom", "status-badge")
    })
  })

  describe("types", () => {
    it.each(STATUS_BADGE_TYPES)("applies the %s type class", (type) => {
      render(StatusBadge, { props: { type }, slots: { default: "Label" } })
      const el = screen.getByText("Label")
      expect(el).toHaveClass(`status-badge--${type}`)
      expect(el).toHaveAttribute("data-type", type)
    })

    it("renders an aria-hidden icon for semantic types", () => {
      render(StatusBadge, { props: { type: "error" }, slots: { default: "Error" } })
      const icon = screen
        .getByText("Error")
        .querySelector("[data-slot='status-badge-icon']")
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })

    it("renders no icon for the neutral type", () => {
      render(StatusBadge, { props: { type: "neutral" }, slots: { default: "Neutral" } })
      const icon = screen
        .getByText("Neutral")
        .querySelector("[data-slot='status-badge-icon']")
      expect(icon).not.toBeInTheDocument()
    })
  })

  describe("sizes", () => {
    it.each(STATUS_BADGE_SIZES)("applies the %s size class", (size) => {
      render(StatusBadge, { props: { size }, slots: { default: "Label" } })
      const el = screen.getByText("Label")
      expect(el).toHaveClass(`status-badge--size-${size}`)
      expect(el).toHaveAttribute("data-size", size)
    })
  })
})

describe("statusBadgeVariants", () => {
  it("returns expected class string for default options", () => {
    const classes = statusBadgeVariants()
    expect(classes).toContain("status-badge")
    expect(classes).toContain("status-badge--success")
    expect(classes).toContain("status-badge--size-base")
  })

  it("returns class string for explicit options", () => {
    const classes = statusBadgeVariants({ type: "warning", size: "large" })
    expect(classes).toContain("status-badge--warning")
    expect(classes).toContain("status-badge--size-large")
  })
})

describe("STATUS_BADGE_TYPES / STATUS_BADGE_SIZES", () => {
  it("exposes the five types and two sizes", () => {
    expect(STATUS_BADGE_TYPES).toEqual(["success", "warning", "error", "info", "neutral"])
    expect(STATUS_BADGE_SIZES).toEqual(["base", "large"])
  })
})
