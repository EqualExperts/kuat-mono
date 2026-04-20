import { beforeEach, describe, expect, it, vi } from "vitest"

const { primitiveToast } = vi.hoisted(() => ({
  primitiveToast: Object.assign(vi.fn(() => "toast-id"), {
    success: vi.fn(() => "success-id"),
    info: vi.fn(() => "info-id"),
    warning: vi.fn(() => "warning-id"),
    error: vi.fn(() => "error-id"),
    loading: vi.fn(() => "loading-id"),
    dismiss: vi.fn(),
  }),
}))

vi.mock("vue-sonner", () => ({
  toast: primitiveToast,
}))

import { toast } from "./toast"

describe("kuat vue toast wrapper", () => {
  beforeEach(() => {
    primitiveToast.mockClear()
    primitiveToast.success.mockClear()
    primitiveToast.info.mockClear()
    primitiveToast.warning.mockClear()
    primitiveToast.error.mockClear()
    primitiveToast.loading.mockClear()
  })

  it("maps assertive announcement to important", () => {
    toast.error("Unable to save", {
      description: "Retry soon",
      announcement: "assertive",
    })

    expect(primitiveToast.error).toHaveBeenCalledWith(
      "Unable to save",
      expect.objectContaining({
        description: "Retry soon",
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
