/**
 * ContentCard – Kuat Vue.
 * Tests badge passthrough via the `#badge` slot.
 */
import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen } from "@testing-library/vue"

import Badge from "../badge/Badge.vue"
import ContentCard from "./ContentCard.vue"

describe("ContentCard", () => {
  it("renders badge slot content inside the badge region", () => {
    render(ContentCard, {
      props: {
        category: "User experience",
        title: "A clear & descriptive headline",
        titleHeadingLevel: 3,
      },
      slots: {
        badge: () =>
          h(Badge, { variant: "secondary" }, () => "Case study"),
      },
    })

    const badgeRegion = document.querySelector("[data-slot='badge']")
    expect(badgeRegion).toBeInTheDocument()
    expect(screen.getByText("Case study")).toBeInTheDocument()
  })

  it("uses constrained width by default", () => {
    render(ContentCard, {
      props: {
        category: "User experience",
        title: "A clear & descriptive headline",
        titleHeadingLevel: 3,
      },
    })

    const root = document.querySelector("[data-slot='content-card']")
    expect(root).toHaveClass("content-card--width-default")
  })

  it("supports fluid width mode", () => {
    render(ContentCard, {
      props: {
        category: "User experience",
        title: "A clear & descriptive headline",
        titleHeadingLevel: 3,
        width: "fluid",
      },
    })

    const root = document.querySelector("[data-slot='content-card']")
    expect(root).toHaveClass("content-card--width-fluid")
  })

  it("supports custom max-width mode", () => {
    render(ContentCard, {
      props: {
        category: "User experience",
        title: "A clear & descriptive headline",
        titleHeadingLevel: 3,
        width: "custom",
        maxWidth: "28rem",
      },
    })

    const root = document.querySelector("[data-slot='content-card']")
    expect(root).toHaveClass("content-card--width-custom")
    expect(root).toHaveAttribute("style", expect.stringContaining("--content-card-max-width: 28rem"))
  })
})

