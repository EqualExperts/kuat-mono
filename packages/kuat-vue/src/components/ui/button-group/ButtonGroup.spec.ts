/**
 * ButtonGroup – Kuat Vue. Group container, orientation, ButtonGroupText, ButtonGroupSeparator.
 */
import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen } from "@testing-library/vue"
import ButtonGroup from "./ButtonGroup.vue"
import ButtonGroupText from "./ButtonGroupText.vue"
import ButtonGroupSeparator from "./ButtonGroupSeparator.vue"
import {
  buttonGroupVariants,
  BUTTON_GROUP_ORIENTATIONS,
} from "./index"

describe("ButtonGroup", () => {
  describe("rendering", () => {
    it("renders with default props and slot content", () => {
      render(ButtonGroup, {
        slots: {
          default: () => [h("span", null, "One"), h("span", null, "Two")],
        },
      })
      const el = screen.getByRole("group", { name: undefined })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("DIV")
      expect(el).toHaveAttribute("data-slot", "button-group")
      expect(el).toHaveAttribute("data-orientation", "horizontal")
      expect(el).toHaveClass("button-group", "button-group--horizontal")
      expect(el).toHaveTextContent("OneTwo")
    })

    it("forwards custom class", () => {
      render(ButtonGroup, {
        props: { class: "custom" },
        slots: { default: "Label" },
      })
      expect(screen.getByRole("group")).toHaveClass("custom", "button-group")
    })
  })

  describe("orientation", () => {
    it("applies horizontal orientation by default", () => {
      render(ButtonGroup, { slots: { default: () => h("span", null, "Child") } })
      const el = screen.getByRole("group")
      expect(el).toHaveClass("button-group--horizontal")
      expect(el).toHaveAttribute("data-orientation", "horizontal")
    })

    it("applies vertical orientation when orientation is vertical", () => {
      render(ButtonGroup, {
        props: { orientation: "vertical" },
        slots: { default: () => h("span", null, "Child") },
      })
      const el = screen.getByRole("group")
      expect(el).toHaveClass("button-group--vertical")
      expect(el).toHaveAttribute("data-orientation", "vertical")
    })
  })
})

describe("ButtonGroupText", () => {
  describe("rendering", () => {
    it("renders with slot content and applies button-group-text class", () => {
      render(ButtonGroupText, {
        slots: { default: "Filter:" },
      })
      const el = document.querySelector(".button-group-text")
      expect(el).toBeInTheDocument()
      expect(el?.tagName).toBe("DIV")
      expect(el).toHaveTextContent("Filter:")
    })

    it("forwards custom class", () => {
      render(ButtonGroupText, {
        props: { class: "custom" },
        slots: { default: "Label" },
      })
      const el = document.querySelector(".button-group-text")
      expect(el).toHaveClass("custom", "button-group-text")
    })
  })
})

describe("ButtonGroupSeparator", () => {
  describe("rendering", () => {
    it("renders with data-slot and button-group-separator class", () => {
      render(ButtonGroupSeparator)
      const el = document.querySelector("[data-slot='button-group-separator']")
      expect(el).toBeInTheDocument()
      expect(el).toHaveClass("button-group-separator")
    })

    it("defaults orientation to vertical", () => {
      render(ButtonGroupSeparator)
      const el = document.querySelector("[data-slot='button-group-separator']")
      expect(el).toHaveAttribute("data-orientation", "vertical")
    })

    it("forwards custom class", () => {
      render(ButtonGroupSeparator, { props: { class: "custom" } })
      const el = document.querySelector(".button-group-separator")
      expect(el).toHaveClass("custom", "button-group-separator")
    })
  })
})

describe("buttonGroupVariants", () => {
  it("returns expected class string for default options", () => {
    const classes = buttonGroupVariants()
    expect(classes).toContain("button-group")
    expect(classes).toContain("button-group--horizontal")
  })

  it("returns class string for horizontal orientation", () => {
    const classes = buttonGroupVariants({ orientation: "horizontal" })
    expect(classes).toContain("button-group")
    expect(classes).toContain("button-group--horizontal")
  })

  it("returns class string for vertical orientation", () => {
    const classes = buttonGroupVariants({ orientation: "vertical" })
    expect(classes).toContain("button-group")
    expect(classes).toContain("button-group--vertical")
  })

  it("returns class string when passed empty options", () => {
    const classes = buttonGroupVariants({})
    expect(classes).toContain("button-group")
    expect(classes).toContain("button-group--horizontal")
  })
})

describe("BUTTON_GROUP_ORIENTATIONS", () => {
  it("includes horizontal and vertical", () => {
    expect(BUTTON_GROUP_ORIENTATIONS).toContain("horizontal")
    expect(BUTTON_GROUP_ORIENTATIONS).toContain("vertical")
    expect(BUTTON_GROUP_ORIENTATIONS).toHaveLength(2)
  })
})
