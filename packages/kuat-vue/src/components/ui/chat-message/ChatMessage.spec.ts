import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen } from "@testing-library/vue"

import ChatMessage from "./ChatMessage.vue"

describe("ChatMessage", () => {
  it("renders variant class and aria-label for assistant", () => {
    const { container } = render(ChatMessage, {
      props: { variant: "assistant" },
      slots: { default: () => "Hello" },
    })

    const root = container.querySelector("[data-slot='chat-message']")
    expect(root).toBeInTheDocument()
    expect(root).toHaveClass("chat-message--assistant")
    expect(root).toHaveAttribute("aria-label", "Assistant message")
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("renders leading and footer slots", () => {
    const { container } = render(ChatMessage, {
      props: { variant: "user" },
      slots: {
        leading: () => h("span", { "data-testid": "lead" }, "L"),
        label: () => "Name",
        default: () => "Body",
        footer: () => h("span", { "data-testid": "foot" }, "F"),
      },
    })

    expect(screen.getByTestId("lead")).toBeInTheDocument()
    expect(screen.getByText("Body")).toBeInTheDocument()
    expect(screen.getByTestId("foot")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='leading']")).toBeInTheDocument()
  })

  it("renders author and content props without default slot", () => {
    render(ChatMessage, {
      props: {
        variant: "assistant",
        author: "A",
        content: "Plain body",
      },
    })
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("Plain body")).toBeInTheDocument()
  })
})
