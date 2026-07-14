/**
 * TagGroup – Kuat React. Accessibility wrapper: group role + label, aria-live dismissal announcements.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TagGroup } from "./tag-group"
import { Tag } from "../tag"

describe("TagGroup", () => {
  describe("rendering", () => {
    it("renders a labelled group", () => {
      render(
        <TagGroup label="Technology filters">
          <Tag>One</Tag>
          <Tag>Two</Tag>
        </TagGroup>
      )
      const el = screen.getByRole("group", { name: "Technology filters" })
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("data-slot", "tag-group")
      expect(el).toHaveClass("tag-group")
      expect(el).toHaveTextContent("OneTwo")
    })

    it("forwards custom className", () => {
      render(
        <TagGroup label="Filters" className="custom">
          <Tag>One</Tag>
        </TagGroup>
      )
      expect(screen.getByRole("group")).toHaveClass("custom", "tag-group")
    })

    it("forwards ref to the root div", () => {
      const ref = { current: null as HTMLDivElement | null }
      render(
        <TagGroup label="Filters" ref={ref}>
          <Tag>One</Tag>
        </TagGroup>
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it("renders a polite live region", () => {
      render(
        <TagGroup label="Filters">
          <Tag>One</Tag>
        </TagGroup>
      )
      const region = document.querySelector("[data-slot='tag-group-live-region']")
      expect(region).toBeInTheDocument()
      expect(region).toHaveAttribute("aria-live", "polite")
      expect(region).toHaveClass("sr-only")
    })
  })

  describe("dismissal announcements", () => {
    it("announces when a dismiss tag inside the group is removed", async () => {
      const user = userEvent.setup()
      render(
        <TagGroup label="Applied filters">
          <Tag mode="dismiss">Design</Tag>
          <Tag mode="dismiss">Engineering</Tag>
        </TagGroup>
      )
      await user.click(screen.getByRole("button", { name: "Design" }))
      const region = document.querySelector("[data-slot='tag-group-live-region']")
      expect(region).toHaveTextContent("Design removed")
    })
  })
})
