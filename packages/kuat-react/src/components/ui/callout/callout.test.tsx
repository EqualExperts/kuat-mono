/**
 * Callout – Kuat React. Title/description/icon/action, per-type variant classes.
 */
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Callout, CALLOUT_TYPES } from "./callout"

describe("Callout", () => {
  describe("rendering", () => {
    it("renders with only the required title", () => {
      render(<Callout title="Some good information" />)
      const el = screen.getByRole("status")
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("data-slot", "callout")
      expect(el).toHaveTextContent("Some good information")
    })

    it("forwards custom className", () => {
      render(<Callout title="Title" className="custom" />)
      expect(screen.getByRole("status")).toHaveClass("custom", "callout")
    })

    it("forwards ref to the root div", () => {
      const ref = { current: null as HTMLDivElement | null }
      render(<Callout ref={ref} title="Title" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it("does not render a description when omitted", () => {
      render(<Callout title="Title" />)
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument()
    })

    it("renders a description when provided", () => {
      render(<Callout title="Title" description="More detail" />)
      expect(screen.getByText("More detail")).toBeInTheDocument()
    })
  })

  describe("type", () => {
    it("defaults to info", () => {
      render(<Callout title="Title" />)
      const el = screen.getByRole("status")
      expect(el).toHaveClass("callout--info")
      expect(el).toHaveAttribute("data-type", "info")
    })

    it.each(CALLOUT_TYPES)("applies the %s variant class and data-type", (type) => {
      render(<Callout title="Title" type={type} />)
      const el = screen.getByRole("status")
      expect(el).toHaveClass(`callout--${type}`)
      expect(el).toHaveAttribute("data-type", type)
    })
  })

  describe("icon", () => {
    it("renders an icon by default", () => {
      render(<Callout title="Title" />)
      expect(document.querySelector('[data-slot="callout-icon"]')).toBeInTheDocument()
    })

    it("hides the icon when icon is false", () => {
      render(<Callout title="Title" icon={false} />)
      expect(document.querySelector('[data-slot="callout-icon"]')).not.toBeInTheDocument()
    })
  })

  describe("action", () => {
    it("does not render an action link when omitted", () => {
      render(<Callout title="Title" />)
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
    })

    it("renders an action as a link with the given label and href", () => {
      render(
        <Callout
          title="Title"
          action={{ label: "Close message", href: "#close" }}
        />
      )
      const link = screen.getByRole("link", { name: "Close message" })
      expect(link).toHaveAttribute("href", "#close")
    })

    it("forwards onClick on the action link", () => {
      const onClick = vi.fn()
      render(
        <Callout
          title="Title"
          action={{ label: "Close message", href: "#close", onClick }}
        />
      )
      screen.getByRole("link", { name: "Close message" }).click()
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("CALLOUT_TYPES", () => {
    it("includes all four semantic types", () => {
      expect(CALLOUT_TYPES).toEqual(["info", "positive", "warning", "issue"])
    })
  })
})
