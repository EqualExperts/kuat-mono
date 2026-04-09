import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { ChatComposer } from "./chat-composer"

describe("ChatComposer", () => {
  it("renders root and input slot", () => {
    const { container } = render(
      <ChatComposer>
        <textarea data-testid="ta" placeholder="Message" />
      </ChatComposer>
    )

    const root = container.querySelector("[data-slot='chat-composer']")
    expect(root).toBeInTheDocument()
    expect(root).toHaveClass("chat-composer")
    expect(screen.getByTestId("ta")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='input']")).toBeInTheDocument()
  })

  it("renders toolbar and actions when provided", () => {
    const { container } = render(
      <ChatComposer
        toolbar={<span data-testid="tb">Tools</span>}
        actions={<button type="button">Send</button>}
      >
        <span>Input</span>
      </ChatComposer>
    )

    expect(screen.getByTestId("tb")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument()
    expect(container.querySelector("[data-slot='toolbar']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='actions']")).toBeInTheDocument()
  })

  it("omits toolbar when not passed", () => {
    const { container } = render(<ChatComposer>Child</ChatComposer>)
    expect(container.querySelector("[data-slot='toolbar']")).toBeNull()
  })

  it("renders a default textarea when children are omitted", () => {
    render(
      <ChatComposer
        textareaProps={{
          placeholder: "Type here",
          "aria-label": "Message input",
        }}
      />
    )
    expect(
      screen.getByRole("textbox", { name: "Message input" })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument()
  })
})
