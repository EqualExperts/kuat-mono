/**
 * Checkbox – Kuat React. States, aria-invalid, disabled, indeterminate.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  describe("rendering", () => {
    it("renders with default classes", () => {
      render(<Checkbox aria-label="Accept" />)
      const el = screen.getByRole("checkbox", { name: /accept/i })
      expect(el).toHaveClass("checkbox")
      expect(el).toHaveAttribute("data-slot", "checkbox")
    })

    it("forwards custom className", () => {
      render(<Checkbox className="custom" aria-label="x" />)
      expect(screen.getByRole("checkbox")).toHaveClass("custom")
    })

    it("forwards ref to the checkbox button", () => {
      const ref = { current: null as HTMLButtonElement | null }
      render(<Checkbox ref={ref} aria-label="x" />)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("states", () => {
    it.each([
      ["unchecked", false, "unchecked"],
      ["checked", true, "checked"],
    ] as const)("renders data-state %s when checked=%s", (_label, checked, expected) => {
      render(
        <Checkbox aria-label="x" checked={checked} onCheckedChange={() => {}} />
      )
      expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", expected)
    })

    it("renders checked via defaultChecked (uncontrolled)", () => {
      render(<Checkbox aria-label="x" defaultChecked />)
      expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "checked")
    })

    it("sets aria-invalid when passed", () => {
      render(<Checkbox aria-label="x" aria-invalid />)
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled checkbox", () => {
      render(<Checkbox aria-label="x" disabled />)
      expect(screen.getByRole("checkbox")).toBeDisabled()
    })

    it("supports indeterminate via checked prop", () => {
      render(
        <Checkbox aria-label="x" checked="indeterminate" onCheckedChange={() => {}} />
      )
      expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "indeterminate")
    })

    it("combines invalid and disabled attributes", () => {
      render(<Checkbox aria-label="x" aria-invalid disabled />)
      const el = screen.getByRole("checkbox")
      expect(el).toHaveAttribute("aria-invalid", "true")
      expect(el).toBeDisabled()
    })
  })

  describe("interaction", () => {
    it("toggles checked on click", async () => {
      const user = userEvent.setup()
      render(<Checkbox aria-label="Toggle" />)
      const cb = screen.getByRole("checkbox")
      expect(cb).toHaveAttribute("data-state", "unchecked")
      await user.click(cb)
      expect(cb).toHaveAttribute("data-state", "checked")
    })
  })
})
