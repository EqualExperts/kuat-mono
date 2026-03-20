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
})

