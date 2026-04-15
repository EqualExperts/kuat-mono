/**
 * Switch – Kuat React. States, aria-invalid, disabled.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Switch } from "./switch"

describe("Switch", () => {
  describe("rendering", () => {
    it("renders with default classes", () => {
      render(<Switch aria-label="Airplane mode" />)
      const el = screen.getByRole("switch", { name: /airplane mode/i })
      expect(el).toHaveClass("switch")
      expect(el).toHaveAttribute("data-slot", "switch")
    })

    it("forwards custom className", () => {
      render(<Switch className="custom" aria-label="x" />)
      expect(screen.getByRole("switch")).toHaveClass("custom")
    })

    it("forwards ref to the switch button", () => {
      const ref = { current: null as HTMLButtonElement | null }
      render(<Switch ref={ref} aria-label="x" />)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("states", () => {
    it.each([
      ["unchecked", false, "unchecked"],
      ["checked", true, "checked"],
    ] as const)("renders data-state %s when checked=%s", (_label, checked, expected) => {
      render(
        <Switch aria-label="x" checked={checked} onCheckedChange={() => {}} />
      )
      expect(screen.getByRole("switch")).toHaveAttribute("data-state", expected)
    })

    it("renders checked via defaultChecked (uncontrolled)", () => {
      render(<Switch aria-label="x" defaultChecked />)
      expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked")
    })

    it("sets aria-invalid when passed", () => {
      render(<Switch aria-label="x" aria-invalid />)
      expect(screen.getByRole("switch")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled switch", () => {
      render(<Switch aria-label="x" disabled />)
      expect(screen.getByRole("switch")).toBeDisabled()
    })

    it("combines invalid and disabled attributes", () => {
      render(<Switch aria-label="x" aria-invalid disabled />)
      const el = screen.getByRole("switch")
      expect(el).toHaveAttribute("aria-invalid", "true")
      expect(el).toBeDisabled()
    })
  })

  describe("interaction", () => {
    it("toggles checked on click", async () => {
      const user = userEvent.setup()
      render(<Switch aria-label="Toggle" />)
      const control = screen.getByRole("switch")
      expect(control).toHaveAttribute("data-state", "unchecked")
      await user.click(control)
      expect(control).toHaveAttribute("data-state", "checked")
      expect(control).toHaveAttribute("aria-checked", "true")
    })

    it("supports keyboard toggling with Space", async () => {
      const user = userEvent.setup()
      render(<Switch aria-label="Keyboard toggle" />)
      const control = screen.getByRole("switch")
      control.focus()
      await user.keyboard(" ")
      expect(control).toHaveAttribute("data-state", "checked")
    })
  })
})
