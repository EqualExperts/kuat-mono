import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { KuatChatLayout } from "./kuat-chat-layout"

describe("KuatChatLayout", () => {
  it("renders messages region and aria-label", () => {
    const { container } = render(
      <KuatChatLayout messages={<div data-testid="msg">Hello</div>} />
    )

    const root = container.querySelector("[data-slot='kuat-chat-layout']")
    expect(root).toBeInTheDocument()
    expect(root).toHaveAttribute("aria-label", "Chat")
    expect(screen.getByTestId("msg")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='messages']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='messages-body']")).toBeInTheDocument()
  })

  it("renders header when provided", () => {
    const { container } = render(
      <KuatChatLayout
        header={<div data-testid="hd">Title</div>}
        messages={<div>Body</div>}
      />
    )
    expect(screen.getByTestId("hd")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='header']")).toBeInTheDocument()
  })

  it("renders preset header from title and headerMeta", () => {
    const { container } = render(
      <KuatChatLayout
        title="Thread A"
        headerMeta={<span data-testid="meta">Beta</span>}
        messages={<div>M</div>}
      />
    )
    expect(screen.getByRole("heading", { name: "Thread A" })).toBeInTheDocument()
    expect(screen.getByTestId("meta")).toBeInTheDocument()
    expect(
      container.querySelector("[data-slot='header-meta']")
    ).toBeInTheDocument()
  })

  it("renders side panel when provided", () => {
    const { container } = render(
      <KuatChatLayout
        messages={<div>M</div>}
        sidePanel={<div data-testid="side">Sources</div>}
      />
    )
    expect(screen.getByTestId("side")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='side-panel']")).toBeInTheDocument()
  })

  it("omits side panel when not provided", () => {
    const { container } = render(
      <KuatChatLayout messages={<div>M</div>} />
    )
    expect(container.querySelector("[data-slot='side-panel']")).toBeNull()
  })

  it("renders composer when provided", () => {
    const { container } = render(
      <KuatChatLayout
        messages={<div>M</div>}
        composer={<div data-testid="comp">Composer</div>}
      />
    )
    expect(screen.getByTestId("comp")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='composer']")).toBeInTheDocument()
  })
})
