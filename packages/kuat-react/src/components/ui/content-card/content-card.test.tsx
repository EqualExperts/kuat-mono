import { describe, it, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"

import { ContentCard } from "./content-card"
import { Badge } from "@/components/ui/badge"

describe("ContentCard", () => {
  const requiredProps = {
    badge: <Badge variant="secondary">Case study</Badge>,
    category: "User experience",
    title: "A clear & descriptive headline",
    titleHeadingLevel: 3 as const,
  }

  it("renders the root and slot wrappers (empty by default)", () => {
    const { container } = render(<ContentCard {...requiredProps} />)

    const root = container.querySelector("[data-slot='content-card']")
    expect(root).toBeInTheDocument()
    expect(root).toHaveClass("content-card")

    expect(screen.getByText("Case study")).toBeInTheDocument()
    expect(screen.getByText("User experience")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument()

    const headerAccessory = container.querySelector("[data-slot='header-accessory']")
    expect(headerAccessory).toBeInTheDocument()
    expect(headerAccessory?.textContent?.trim()).toBe("")

    const badgeRegion = container.querySelector("[data-slot='badge']")
    expect(badgeRegion).toBeInTheDocument()
    expect(badgeRegion?.textContent?.trim()).toBe("Case study")

    expect(container.querySelector("[data-slot='content']")).toBeNull()

    const customContent = container.querySelector("[data-slot='custom-content']")
    expect(customContent).toBeInTheDocument()
    expect(customContent?.textContent?.trim()).toBe("")

    const footer = container.querySelector("[data-slot='footer']")
    expect(footer).toBeInTheDocument()
    expect(footer?.textContent?.trim()).toBe("")
  })

  it("omits the media area when imageSrc is null", () => {
    const { container } = render(<ContentCard {...requiredProps} imageSrc={null} />)
    expect(container.querySelector(".content-card__media")).toBeNull()
  })

  it("renders as the provided element when asChild is true", () => {
    const { container } = render(
      <ContentCard {...requiredProps} asChild>
        <a href="/example" data-testid="root-link" />
      </ContentCard>
    )

    const rootLink = screen.getByTestId("root-link")
    expect(rootLink.tagName).toBe("A")
    expect(rootLink).toHaveClass("content-card")
    expect(rootLink).toHaveAttribute("data-slot", "content-card")

    // Internal slot regions should still be present inside the cloned root.
    expect(within(rootLink).getByText("User experience")).toBeInTheDocument()
    expect(within(rootLink).getByRole("heading", { level: 3 })).toBeInTheDocument()
  })
})

