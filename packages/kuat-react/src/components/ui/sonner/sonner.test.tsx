import * as React from "react"
import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const { toasterSpy, primitiveToast } = vi.hoisted(() => ({
  toasterSpy: vi.fn(),
  primitiveToast: Object.assign(vi.fn(() => "toast-id"), {
    success: vi.fn(() => "success-id"),
    info: vi.fn(() => "info-id"),
    warning: vi.fn(() => "warning-id"),
    error: vi.fn(() => "error-id"),
    loading: vi.fn(() => "loading-id"),
    dismiss: vi.fn(),
  }),
}))

vi.mock("sonner", () => ({
  Toaster: (props: Record<string, unknown>) => {
    toasterSpy(props)
    return <div data-testid="toaster" />
  },
  toast: primitiveToast,
}))

import { Sonner, toast } from "./sonner"
import { SonnerContent } from "./sonner-content"

describe("Sonner", () => {
  beforeEach(() => {
    toasterSpy.mockClear()
    primitiveToast.mockClear()
    primitiveToast.success.mockClear()
    primitiveToast.info.mockClear()
    primitiveToast.warning.mockClear()
    primitiveToast.error.mockClear()
    primitiveToast.loading.mockClear()
  })

  it("renders toaster with Kuat defaults", () => {
    render(<Sonner />)

    expect(screen.getByTestId("toaster")).toBeInTheDocument()
    expect(toasterSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        containerAriaLabel: "Notifications",
        expand: false,
        position: "top-right",
        visibleToasts: 3,
      }),
    )
  })

  it("maps assertive announcement to important toasts", () => {
    toast.error("Failed to save", {
      announcement: "assertive",
      description: "Try again.",
    })

    expect(primitiveToast.error).toHaveBeenCalledWith(
      "Failed to save",
      expect.objectContaining({
        description: "Try again.",
        important: true,
      }),
    )
  })

  it("defaults to polite announcement", () => {
    toast("Saved")

    expect(primitiveToast).toHaveBeenCalledWith(
      "Saved",
      expect.objectContaining({
        important: false,
      }),
    )
  })
})

describe("SonnerContent", () => {
  it("renders icon, title, description and action button", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <SonnerContent
        title="Line 1"
        description="Line 2"
        leftIcon={<span aria-hidden="true">icon</span>}
        action={{ label: "Undo", onClick }}
      />,
    )

    expect(screen.getByText("Line 1")).toBeInTheDocument()
    expect(screen.getByText("Line 2")).toBeInTheDocument()
    expect(screen.getByText("icon")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Undo" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
