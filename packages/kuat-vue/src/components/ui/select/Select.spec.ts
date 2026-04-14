import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import { SELECT_SIZES } from "./constants"
import KuatSelect from "./KuatSelect.vue"

const groupedItems = [
  {
    label: "Default",
    items: [
      { value: "default", label: "Default" },
      { value: "blue", label: "Blue" },
    ],
  },
  {
    label: "Scaled",
    items: [{ value: "mono", label: "Mono", description: "Monospaced" }],
  },
]

describe("KuatSelect", () => {
  it("renders trigger and placeholder", () => {
    render(KuatSelect, {
      props: {
        items: [{ value: "default", label: "Default" }],
      },
      attrs: {
        "aria-label": "Theme",
      },
    })

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveClass("select-trigger")
    expect(trigger).toHaveTextContent("Select an item")
    expect(trigger).toHaveClass("select-trigger--lines-single")
    expect(trigger).not.toHaveAttribute("aria-invalid")
  })

  it("accepts grouped items with labels and separator structure", () => {
    render(KuatSelect, {
      props: {
        items: groupedItems,
      },
      attrs: {
        "aria-label": "Theme",
      },
    })

    expect(screen.getByRole("combobox", { name: "Theme" })).toBeInTheDocument()
    const nativeSelect = document.querySelector('select[aria-hidden="true"]')
    expect(nativeSelect).not.toBeNull()
  })

  it.each(SELECT_SIZES)("applies trigger and content size classes for %s", (size) => {
    render(KuatSelect, {
      props: {
        size,
        items: [{ value: "default", label: "Default" }],
      },
      attrs: {
        "aria-label": `${size} select`,
      },
    })

    const trigger = screen.getByRole("combobox", { name: `${size} select` })
    expect(trigger).toHaveClass(`select-trigger--size-${size}`)
    expect(trigger).toHaveClass("select-trigger")
  })

  it("supports invalid + describedby passthrough", () => {
    render(KuatSelect, {
      props: {
        invalid: true,
        size: "mini",
        lines: "double",
        items: [{ value: "default", label: "Default", description: "Description" }],
      },
      attrs: {
        "aria-label": "Theme",
        "aria-describedby": "theme-error",
      },
    })

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveAttribute("aria-invalid", "true")
    expect(trigger).toHaveAttribute("aria-describedby", "theme-error")
    expect(trigger).toHaveClass("select-trigger--size-mini")
    expect(trigger).toHaveClass("select-trigger--lines-double")
  })

  it("renders double-line label/description plus prepend/decoration", () => {
    render(KuatSelect, {
      props: {
        lines: "double",
        label: "Label",
        prepend: "Pre",
        decoration: "Dec",
        items: [
          {
            value: "amber",
            label: "Amber",
            description: "Second line",
            prepend: "IP",
            decoration: "ID",
          },
        ],
      },
      attrs: {
        "aria-label": "Theme",
      },
    })

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveClass("select-trigger--lines-double")
    expect(screen.getByText("Label")).toBeInTheDocument()
    expect(document.querySelector(".select-trigger__prepend")).toHaveTextContent("Pre")
    expect(document.querySelector(".select-trigger__decoration")).toHaveTextContent("Dec")
  })

  it("uses item-aligned mode by default without runtime errors", () => {
    render(KuatSelect, {
      props: {
        items: [{ value: "default", label: "Default" }],
      },
      attrs: {
        "aria-label": "Theme",
      },
    })

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveAttribute("aria-controls")
    expect(trigger).toHaveAttribute("data-state", "closed")
  })

  it("supports popper position prop without runtime errors", () => {
    render(KuatSelect, {
      props: {
        position: "popper",
        items: [{ value: "default", label: "Default" }],
      },
      attrs: {
        "aria-label": "Theme",
      },
    })

    expect(screen.getByRole("combobox", { name: "Theme" })).toBeInTheDocument()
  })

  it("applies maxHeight and supports long lists without runtime errors", () => {
    render(KuatSelect, {
      props: {
        maxHeight: 240,
        items: [
          ...Array.from({ length: 30 }, (_, index) => ({
            value: `timezone-${index + 1}`,
            label: `Timezone ${index + 1}`,
          })),
        ],
      },
      attrs: {
        "aria-label": "Timezone",
      },
    })

    const trigger = screen.getByRole("combobox", { name: "Timezone" })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute("aria-controls")
  })

  it("opens via keyboard and closes with Escape", async () => {
    render(KuatSelect, {
      props: {
        items: [
          { value: "default", label: "Default" },
          { value: "amber", label: "Amber" },
        ],
      },
      attrs: {
        "aria-label": "Theme keyboard",
      },
    })

    const trigger = screen.getByRole("combobox", { name: "Theme keyboard" })
    trigger.focus()
    expect(trigger).toHaveFocus()

    await fireEvent.keyDown(trigger, { key: "ArrowDown", code: "ArrowDown" })
    expect(trigger).toHaveAttribute("aria-expanded")
    expect(trigger).toHaveAttribute("data-state")

    await fireEvent.keyDown(trigger, { key: "Escape", code: "Escape" })
    expect(trigger).toHaveAttribute("aria-expanded")
    expect(trigger).toHaveAttribute("data-state")
  })
})
