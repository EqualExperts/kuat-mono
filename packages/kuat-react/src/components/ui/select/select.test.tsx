import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SELECT_SIZES } from "./constants"
import { KuatSelect } from "./select"

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
    render(
      <KuatSelect
        triggerProps={{ "aria-label": "Theme" }}
        placeholder="Choose theme"
        items={[{ value: "default", label: "Default" }]}
      />
    )

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveClass("select-trigger")
    expect(trigger).toHaveTextContent("Choose theme")
    expect(trigger).toHaveClass("select-trigger--lines-single")
    expect(trigger).not.toHaveAttribute("aria-invalid")
  })

  it("renders grouped items, labels, and separators", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        triggerProps={{ "aria-label": "Theme" }}
        items={groupedItems}
      />
    )

    await user.click(screen.getByRole("combobox", { name: "Theme" }))
    expect(screen.getAllByText("Default").length).toBeGreaterThan(0)
    expect(screen.getByText("Scaled")).toBeInTheDocument()
    expect(screen.getByText("Monospaced")).toBeInTheDocument()
    expect(document.querySelector('[data-slot="select-separator"]')).not.toBeNull()
  })

  it("selects item on click", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        triggerProps={{ "aria-label": "Theme" }}
        items={[
          { value: "default", label: "Default" },
          { value: "amber", label: "Amber" },
        ]}
      />
    )

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    await user.click(trigger)
    await user.click(screen.getByRole("option", { name: "Amber" }))
    expect(trigger).toHaveTextContent("Amber")
  })

  it.each(SELECT_SIZES)("applies trigger and content size classes for %s", async (size) => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        size={size}
        triggerProps={{ "aria-label": `${size} select` }}
        items={[{ value: "default", label: "Default" }]}
      />
    )

    const trigger = screen.getByRole("combobox", { name: `${size} select` })
    expect(trigger).toHaveClass(`select-trigger--size-${size}`)

    await user.click(trigger)
    expect(screen.getByRole("listbox")).toHaveClass(`select-content--size-${size}`)
  })

  it("supports invalid + describedby passthrough", () => {
    render(
      <KuatSelect
        invalid
        lines="double"
        size="mini"
        triggerProps={{ "aria-label": "Theme", "aria-describedby": "theme-error" }}
        items={[{ value: "default", label: "Default", description: "Description" }]}
      />
    )

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveAttribute("aria-invalid", "true")
    expect(trigger).toHaveAttribute("aria-describedby", "theme-error")
    expect(trigger).toHaveClass("select-trigger--size-mini")
    expect(trigger).toHaveClass("select-trigger--lines-double")
  })

  it("renders double-line label/description plus prepend/decoration", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        lines="double"
        label="Label"
        prepend={<span data-testid="trigger-prepend">Pre</span>}
        decoration={<span data-testid="trigger-decoration">Dec</span>}
        triggerProps={{ "aria-label": "Theme" }}
        items={[
          {
            value: "amber",
            label: "Amber",
            description: "Second line",
            prepend: <span data-testid="item-prepend">IP</span>,
            decoration: <span data-testid="item-decoration">ID</span>,
          },
        ]}
      />
    )

    const trigger = screen.getByRole("combobox", { name: "Theme" })
    expect(trigger).toHaveClass("select-trigger--lines-double")
    expect(screen.getByText("Label")).toBeInTheDocument()
    expect(screen.getByTestId("trigger-prepend")).toBeInTheDocument()
    expect(screen.getByTestId("trigger-decoration")).toBeInTheDocument()

    await user.click(trigger)
    expect(document.querySelector(".select-item--double")).not.toBeNull()
    expect(screen.getByText("Second line")).toBeInTheDocument()
    expect(screen.getByTestId("item-prepend")).toBeInTheDocument()
    expect(screen.getByTestId("item-decoration")).toBeInTheDocument()
  })

  it("uses item-aligned content class by default", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        triggerProps={{ "aria-label": "Theme" }}
        items={[{ value: "default", label: "Default" }]}
      />
    )

    await user.click(screen.getByRole("combobox", { name: "Theme" }))
    expect(screen.getByRole("listbox")).toHaveClass("select-content--position-item-aligned")
  })

  it("passes popper alignment option to content", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        position="popper"
        triggerProps={{ "aria-label": "Theme" }}
        items={[{ value: "default", label: "Default" }]}
      />
    )

    await user.click(screen.getByRole("combobox", { name: "Theme" }))
    expect(screen.getByRole("listbox")).toHaveClass("select-content--position-popper")
  })

  it("applies maxHeight and supports long lists for scrolling", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        maxHeight={220}
        triggerProps={{ "aria-label": "Timezone" }}
        items={Array.from({ length: 30 }, (_, index) => ({
          value: `timezone-${index + 1}`,
          label: `Timezone ${index + 1}`,
        }))}
      />
    )

    await user.click(screen.getByRole("combobox", { name: "Timezone" }))
    const listbox = screen.getByRole("listbox")
    expect(listbox).toHaveStyle("--kuat-select-content-max-height: 220px")
    expect(screen.getAllByRole("option")).toHaveLength(30)
  })

  it("opens via keyboard and closes with Escape", async () => {
    const user = userEvent.setup()
    render(
      <KuatSelect
        triggerProps={{ "aria-label": "Theme keyboard" }}
        items={[
          { value: "default", label: "Default" },
          { value: "amber", label: "Amber" },
        ]}
      />
    )

    const trigger = screen.getByRole("combobox", { name: "Theme keyboard" })
    trigger.focus()
    await user.keyboard("{Enter}")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(trigger).toHaveAttribute("data-state", "open")
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("data-state", "closed")
  })
})
