import { describe, it, expect } from "vitest"
import { h } from "vue"
import { render, screen } from "@testing-library/vue"

import ChatComposer from "./ChatComposer.vue"

describe("ChatComposer", () => {
  it("renders default slot in input region", () => {
    const { container } = render(ChatComposer, {
      slots: {
        default: () =>
          h("textarea", {
            "data-testid": "ta",
            placeholder: "Message",
          }),
      },
    })

    expect(container.querySelector("[data-slot='chat-composer']")).toBeInTheDocument()
    expect(screen.getByTestId("ta")).toBeInTheDocument()
  })

  it("renders toolbar and actions slots", () => {
    const { container } = render(ChatComposer, {
      slots: {
        toolbar: () => h("span", { "data-testid": "tb" }, "T"),
        default: () => "Input",
        actions: () => h("button", { type: "button" }, "Send"),
      },
    })

    expect(screen.getByTestId("tb")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument()
    expect(container.querySelector("[data-slot='toolbar']")).toBeInTheDocument()
  })

  it("renders default textarea when default slot is empty", () => {
    render(ChatComposer, {
      props: {
        textareaProps: {
          placeholder: "Hi",
          "aria-label": "Composer",
        },
      },
    })
    expect(screen.getByRole("textbox", { name: "Composer" })).toBeInTheDocument()
  })
})
