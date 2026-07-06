/**
 * Callout – Kuat Vue. Title/description/icon/action, per-type variant classes.
 */
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/vue"
import Callout from "./Callout.vue"
import { CALLOUT_TYPES } from "./constants"

describe("Callout", () => {
  describe("rendering", () => {
    it("renders with only the required title", () => {
      render(Callout, { props: { title: "Some good information" } })
      const el = screen.getByRole("status")
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute("data-slot", "callout")
      expect(el).toHaveTextContent("Some good information")
    })

    it("forwards custom class", () => {
      render(Callout, { props: { title: "Title", class: "custom" } })
      expect(screen.getByRole("status")).toHaveClass("custom", "callout")
    })

    it("does not render a description when omitted", () => {
      render(Callout, { props: { title: "Title" } })
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument()
    })

    it("renders a description when provided", () => {
      render(Callout, { props: { title: "Title", description: "More detail" } })
      expect(screen.getByText("More detail")).toBeInTheDocument()
    })
  })

  describe("type", () => {
    it("defaults to info", () => {
      render(Callout, { props: { title: "Title" } })
      const el = screen.getByRole("status")
      expect(el).toHaveClass("callout--info")
      expect(el).toHaveAttribute("data-type", "info")
    })

    it.each(CALLOUT_TYPES)("applies the %s variant class and data-type", (type) => {
      render(Callout, { props: { title: "Title", type } })
      const el = screen.getByRole("status")
      expect(el).toHaveClass(`callout--${type}`)
      expect(el).toHaveAttribute("data-type", type)
    })
  })

  describe("icon", () => {
    it("renders an icon by default", () => {
      render(Callout, { props: { title: "Title" } })
      expect(document.querySelector('[data-slot="callout-icon"]')).toBeInTheDocument()
    })

    it("hides the icon when icon is false", () => {
      render(Callout, { props: { title: "Title", icon: false } })
      expect(document.querySelector('[data-slot="callout-icon"]')).not.toBeInTheDocument()
    })
  })

  describe("action", () => {
    it("does not render an action link when omitted", () => {
      render(Callout, { props: { title: "Title" } })
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
    })

    it("renders an action as a link with the given label and href", () => {
      render(Callout, {
        props: { title: "Title", action: { label: "Close message", href: "#close" } },
      })
      const link = screen.getByRole("link", { name: "Close message" })
      expect(link).toHaveAttribute("href", "#close")
    })

    it("forwards onClick on the action link", async () => {
      const onClick = vi.fn()
      render(Callout, {
        props: { title: "Title", action: { label: "Close message", href: "#close", onClick } },
      })
      screen.getByRole("link", { name: "Close message" }).click()
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
