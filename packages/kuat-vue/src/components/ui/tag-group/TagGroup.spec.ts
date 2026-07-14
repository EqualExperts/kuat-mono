/**
 * TagGroup – Kuat Vue. Accessibility wrapper: group role + label, aria-live dismissal announcements.
 */
import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen, fireEvent } from "@testing-library/vue"
import TagGroup from "./TagGroup.vue"
import Tag from "../tag/Tag.vue"

describe("TagGroup", () => {
  describe("rendering", () => {
    it("renders a labelled group", () => {
      render(TagGroup, {
        props: { label: "Technology filters" },
        slots: {
          default: () => [
            h(Tag, null, { default: () => "One" }),
            h(Tag, null, { default: () => "Two" }),
          ],
        },
      })
      const el = screen.getByRole("group", { name: "Technology filters" })
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("data-slot", "tag-group")
      expect(el).toHaveClass("tag-group")
      expect(el).toHaveTextContent("One")
      expect(el).toHaveTextContent("Two")
    })

    it("forwards custom class", () => {
      render(TagGroup, {
        props: { label: "Filters", class: "custom" },
        slots: { default: () => h(Tag, null, { default: () => "One" }) },
      })
      expect(screen.getByRole("group")).toHaveClass("custom", "tag-group")
    })

    it("renders a polite live region", () => {
      render(TagGroup, {
        props: { label: "Filters" },
        slots: { default: () => h(Tag, null, { default: () => "One" }) },
      })
      const region = document.querySelector("[data-slot='tag-group-live-region']")
      expect(region).toBeInTheDocument()
      expect(region).toHaveAttribute("aria-live", "polite")
      expect(region).toHaveClass("sr-only")
    })
  })

  describe("dismissal announcements", () => {
    it("announces when a dismiss tag inside the group is removed", async () => {
      render(TagGroup, {
        props: { label: "Applied filters" },
        slots: {
          default: () => [
            h(Tag, { mode: "dismiss" }, { default: () => "Design" }),
            h(Tag, { mode: "dismiss" }, { default: () => "Engineering" }),
          ],
        },
      })
      await fireEvent.click(screen.getByRole("button", { name: "Design" }))
      const region = document.querySelector("[data-slot='tag-group-live-region']")
      expect(region).toHaveTextContent("Design removed")
    })
  })
})
