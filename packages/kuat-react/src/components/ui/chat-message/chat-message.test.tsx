import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { ChatMessage } from "./chat-message"

describe("ChatMessage", () => {
  it("renders root with variant class and aria-label for assistant", () => {
    const { container } = render(
      <ChatMessage variant="assistant">Hello</ChatMessage>
    )

    const root = container.querySelector("[data-slot='chat-message']")
    expect(root).toBeInTheDocument()
    expect(root).toHaveClass("chat-message", "chat-message--assistant")
    expect(root).toHaveAttribute("aria-label", "Assistant message")
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("uses user variant aria-label", () => {
    const { container } = render(
      <ChatMessage variant="user">Hi</ChatMessage>
    )
    expect(container.querySelector("[data-slot='chat-message']")).toHaveAttribute(
      "aria-label",
      "User message"
    )
  })

  it("uses system variant aria-label", () => {
    const { container } = render(
      <ChatMessage variant="system">Notice</ChatMessage>
    )
    expect(container.querySelector("[data-slot='chat-message']")).toHaveAttribute(
      "aria-label",
      "System message"
    )
  })

  it("renders leading, label, and footer slots when provided", () => {
    const { container } = render(
      <ChatMessage
        variant="assistant"
        leading={<span data-testid="lead">A</span>}
        label="Name"
        footer={<span data-testid="foot">Actions</span>}
      >
        Body
      </ChatMessage>
    )

    expect(screen.getByTestId("lead")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Body")).toBeInTheDocument()
    expect(screen.getByTestId("foot")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='leading']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='label']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='footer']")).toBeInTheDocument()
  })

  it("omits leading wrapper when leading is empty", () => {
    const { container } = render(
      <ChatMessage variant="assistant" leading={null}>
        Only body
      </ChatMessage>
    )
    expect(container.querySelector("[data-slot='leading']")).toBeNull()
  })

  it("renders author and content without children", () => {
    render(
      <ChatMessage variant="user" author="You" content="Hello from props" />
    )
    expect(screen.getByText("You")).toBeInTheDocument()
    expect(screen.getByText("Hello from props")).toBeInTheDocument()
  })

  it("prefers label over author when both are set", () => {
    render(
      <ChatMessage
        variant="assistant"
        author="Ignored"
        label="Shown"
        content="Body"
      />
    )
    expect(screen.getByText("Shown")).toBeInTheDocument()
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument()
  })
})
