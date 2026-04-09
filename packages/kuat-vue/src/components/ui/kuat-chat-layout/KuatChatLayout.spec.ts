import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen } from "@testing-library/vue"

import KuatChatLayout from "./KuatChatLayout.vue"

describe("KuatChatLayout", () => {
  it("renders messages slot and section aria-label", () => {
    const { container } = render(KuatChatLayout, {
      slots: {
        messages: () => h("div", { "data-testid": "msg" }, "Hello"),
      },
    })

    expect(container.querySelector("[data-slot='kuat-chat-layout']")).toHaveAttribute(
      "aria-label",
      "Chat"
    )
    expect(screen.getByTestId("msg")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='messages-body']")).toBeInTheDocument()
  })

  it("renders side-panel when provided", () => {
    const { container } = render(KuatChatLayout, {
      slots: {
        messages: () => "M",
        "side-panel": () => h("div", { "data-testid": "side" }, "S"),
      },
    })

    expect(screen.getByTestId("side")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='side-panel']")).toBeInTheDocument()
  })

  it("omits side panel slot wrapper when empty", () => {
    const { container } = render(KuatChatLayout, {
      slots: {
        messages: () => "M",
      },
    })
    expect(container.querySelector("[data-slot='side-panel']")).toBeNull()
  })

  it("renders preset header from title and header-meta slot", () => {
    render(KuatChatLayout, {
      props: { title: "My thread" },
      slots: {
        messages: () => "M",
        "header-meta": () => h("span", { "data-testid": "meta" }, "Extra"),
      },
    })
    expect(screen.getByRole("heading", { name: "My thread" })).toBeInTheDocument()
    expect(screen.getByTestId("meta")).toBeInTheDocument()
  })
})
