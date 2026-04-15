import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import { defineComponent, ref } from "vue"

import ToggleGroup from "./ToggleGroup.vue"
import ToggleGroupItem from "./ToggleGroupItem.vue"

describe("ToggleGroup", () => {
  it("renders horizontal orientation by default", () => {
    render(ToggleGroup, {
      props: { type: "single" },
      attrs: { "aria-label": "Text style" },
      slots: {
        default: `
          <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
        `,
      },
      global: {
        components: { ToggleGroupItem },
      },
    })

    const group = screen.getByRole("group", { name: "Text style" })
    expect(group).toHaveClass("toggle-group", "toggle-group--horizontal")
  })

  it("supports vertical orientation", () => {
    render(ToggleGroup, {
      props: { type: "single", orientation: "vertical" },
      attrs: { "aria-label": "Text style" },
      slots: {
        default: `
          <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">Italic</ToggleGroupItem>
        `,
      },
      global: {
        components: { ToggleGroupItem },
      },
    })

    expect(screen.getByRole("group", { name: "Text style" })).toHaveClass("toggle-group--vertical")
  })

  it("toggles single selection", async () => {
    render(
      defineComponent({
        components: { ToggleGroup, ToggleGroupItem },
        setup() {
          const value = ref("")
          return { value }
        },
        template: `
          <ToggleGroup v-model="value" type="single" aria-label="Text style">
            <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">Italic</ToggleGroupItem>
          </ToggleGroup>
        `,
      })
    )

    const bold = screen.getByRole("button", { name: "Bold" })
    const italic = screen.getByRole("button", { name: "Italic" })

    await fireEvent.click(bold)
    expect(bold).toHaveAttribute("data-state", "on")
    expect(italic).toHaveAttribute("data-state", "off")

    await fireEvent.click(italic)
    expect(bold).toHaveAttribute("data-state", "off")
    expect(italic).toHaveAttribute("data-state", "on")
  })

  it("supports multiple selection", async () => {
    render(
      defineComponent({
        components: { ToggleGroup, ToggleGroupItem },
        setup() {
          const value = ref<string[]>([])
          return { value }
        },
        template: `
          <ToggleGroup v-model="value" type="multiple" aria-label="Text style">
            <ToggleGroupItem value="bold" aria-label="Bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">Italic</ToggleGroupItem>
          </ToggleGroup>
        `,
      })
    )

    const bold = screen.getByRole("button", { name: "Bold" })
    const italic = screen.getByRole("button", { name: "Italic" })

    await fireEvent.click(bold)
    await fireEvent.click(italic)

    expect(bold).toHaveAttribute("data-state", "on")
    expect(italic).toHaveAttribute("data-state", "on")
  })

  it("applies size and skin classes to items", () => {
    render(ToggleGroup, {
      props: { type: "single" },
      attrs: { "aria-label": "Text style" },
      slots: {
        default: `
          <ToggleGroupItem value="bold" size="mini" skin="ghost" aria-label="Bold">
            Bold
          </ToggleGroupItem>
        `,
      },
      global: {
        components: { ToggleGroupItem },
      },
    })

    expect(screen.getByRole("button", { name: "Bold" })).toHaveClass(
      "toggle-group-item--size-mini",
      "toggle-group-item--skin-ghost"
    )
  })
})
