/**
 * RadioGroup / RadioGroupItem — Kuat React. Radix data-state, aria-invalid, disabled, keyboard.
 */
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RadioGroup, RadioGroupItem } from "./radio"

describe("RadioGroup / RadioGroupItem", () => {
  describe("rendering", () => {
    it("renders a radio item with data-slot on group and item", () => {
      const { container } = render(
        <RadioGroup defaultValue="a" aria-label="Group">
          <RadioGroupItem value="a" aria-label="Option A" />
        </RadioGroup>
      )
      expect(container.querySelector('[data-slot="radio-group"]')).toBeInTheDocument()
      const item = screen.getByRole("radio", { name: /option a/i })
      expect(item).toHaveAttribute("data-slot", "radio-group-item")
      expect(item).toHaveClass("radio")
    })

    it("forwards custom className to the item", () => {
      render(
        <RadioGroup defaultValue="a">
          <RadioGroupItem value="a" className="custom" aria-label="x" />
        </RadioGroup>
      )
      expect(screen.getByRole("radio")).toHaveClass("custom")
    })

    it("forwards ref to the radio button", () => {
      const ref = { current: null as HTMLButtonElement | null }
      render(
        <RadioGroup defaultValue="a">
          <RadioGroupItem ref={ref} value="a" aria-label="x" />
        </RadioGroup>
      )
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("states", () => {
    it("renders data-state checked when selected", () => {
      render(
        <RadioGroup defaultValue="b" aria-label="G">
          <RadioGroupItem value="a" aria-label="A" />
          <RadioGroupItem value="b" aria-label="B" />
        </RadioGroup>
      )
      expect(screen.getByRole("radio", { name: /b/i })).toHaveAttribute("data-state", "checked")
      expect(screen.getByRole("radio", { name: /a/i })).toHaveAttribute("data-state", "unchecked")
    })

    it("sets aria-invalid when passed", () => {
      render(
        <RadioGroup defaultValue="a">
          <RadioGroupItem value="a" aria-label="x" aria-invalid />
        </RadioGroup>
      )
      expect(screen.getByRole("radio")).toHaveAttribute("aria-invalid", "true")
    })

    it("renders disabled item", () => {
      render(
        <RadioGroup defaultValue="a">
          <RadioGroupItem value="a" aria-label="x" disabled />
        </RadioGroup>
      )
      expect(screen.getByRole("radio")).toBeDisabled()
    })
  })

  describe("interaction", () => {
    it("selects another item on click", async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup defaultValue="a" aria-label="G">
          <RadioGroupItem value="a" aria-label="A" />
          <RadioGroupItem value="b" aria-label="B" />
        </RadioGroup>
      )
      await user.click(screen.getByRole("radio", { name: /b/i }))
      expect(screen.getByRole("radio", { name: /b/i })).toHaveAttribute("data-state", "checked")
      expect(screen.getByRole("radio", { name: /a/i })).toHaveAttribute("data-state", "unchecked")
    })

    it("moves focus to next radio with ArrowDown", async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup defaultValue="a" aria-label="G">
          <RadioGroupItem value="a" aria-label="A" />
          <RadioGroupItem value="b" aria-label="B" />
        </RadioGroup>
      )
      screen.getByRole("radio", { name: /a/i }).focus()
      await user.keyboard("{ArrowDown}")
      expect(screen.getByRole("radio", { name: /b/i })).toHaveFocus()
    })
  })
})
