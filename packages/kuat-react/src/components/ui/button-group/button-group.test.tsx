/**
 * ButtonGroup – Kuat React. Group container, orientation, ButtonGroupText, ButtonGroupSeparator.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  ButtonGroup,
  ButtonGroupText,
  ButtonGroupSeparator,
  buttonGroupVariants,
  BUTTON_GROUP_ORIENTATIONS,
} from "./button-group"

describe("ButtonGroup", () => {
  describe("rendering", () => {
    it("renders with default props and children", () => {
      render(
        <ButtonGroup>
          <span>One</span>
          <span>Two</span>
        </ButtonGroup>
      )
      const el = screen.getByRole("group", { name: undefined })
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe("DIV")
      expect(el).toHaveAttribute("data-slot", "button-group")
      expect(el).toHaveAttribute("data-orientation", "horizontal")
      expect(el).toHaveClass("button-group", "button-group--horizontal")
      expect(el).toHaveTextContent("OneTwo")
    })

    it("forwards custom className", () => {
      render(<ButtonGroup className="custom"><span>Label</span></ButtonGroup>)
      expect(screen.getByRole("group")).toHaveClass("custom", "button-group")
    })

    it("forwards ref to the root div", () => {
      const ref = { current: null as HTMLDivElement | null }
      render(<ButtonGroup ref={ref}><span>Label</span></ButtonGroup>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe("orientation", () => {
    it("applies horizontal orientation by default", () => {
      render(<ButtonGroup><span>Child</span></ButtonGroup>)
      const el = screen.getByRole("group")
      expect(el).toHaveClass("button-group--horizontal")
      expect(el).toHaveAttribute("data-orientation", "horizontal")
    })

    it("applies vertical orientation when orientation is vertical", () => {
      render(<ButtonGroup orientation="vertical"><span>Child</span></ButtonGroup>)
      const el = screen.getByRole("group")
      expect(el).toHaveClass("button-group--vertical")
      expect(el).toHaveAttribute("data-orientation", "vertical")
    })
  })
})

describe("ButtonGroupText", () => {
  describe("rendering", () => {
    it("renders with slot content and applies button-group-text class", () => {
      render(<ButtonGroupText><span>Filter:</span></ButtonGroupText>)
      const el = document.querySelector(".button-group-text")
      expect(el).toBeInTheDocument()
      expect(el?.tagName).toBe("DIV")
      expect(el).toHaveTextContent("Filter:")
    })

    it("forwards custom className", () => {
      render(<ButtonGroupText className="custom">Label</ButtonGroupText>)
      const el = document.querySelector(".button-group-text")
      expect(el).toHaveClass("custom", "button-group-text")
    })

    it("forwards ref when not asChild", () => {
      const ref = { current: null as HTMLDivElement | null }
      render(<ButtonGroupText ref={ref}>Label</ButtonGroupText>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it("renders as child when asChild is true", () => {
      render(
        <ButtonGroupText asChild>
          <span data-testid="child">Label</span>
        </ButtonGroupText>
      )
      const child = screen.getByTestId("child")
      expect(child).toHaveClass("button-group-text")
      expect(child.tagName).toBe("SPAN")
    })
  })
})

describe("ButtonGroupSeparator", () => {
  describe("rendering", () => {
    it("renders with data-slot and button-group-separator class", () => {
      render(<ButtonGroupSeparator />)
      const el = document.querySelector("[data-slot='button-group-separator']")
      expect(el).toBeInTheDocument()
      expect(el).toHaveClass("button-group-separator")
    })

    it("defaults orientation to vertical", () => {
      render(<ButtonGroupSeparator />)
      const el = document.querySelector("[data-slot='button-group-separator']")
      expect(el).toHaveAttribute("data-orientation", "vertical")
    })

    it("forwards custom className", () => {
      render(<ButtonGroupSeparator className="custom" />)
      const el = document.querySelector(".button-group-separator")
      expect(el).toHaveClass("custom", "button-group-separator")
    })

    it("forwards ref to the separator element", () => {
      const ref = { current: null as HTMLElement | null }
      render(<ButtonGroupSeparator ref={ref} />)
      expect(ref.current).toBeTruthy()
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
