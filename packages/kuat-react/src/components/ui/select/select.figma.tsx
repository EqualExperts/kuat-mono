import figma from "@figma/code-connect"

import { KuatSelect } from "."

figma.connect(
  KuatSelect,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=16-1732",
  {
    props: {
      size: figma.enum("Size", {
        Regular: "regular",
        Large: "large",
        Small: "small",
        Mini: "mini",
      }),
      lines: figma.enum("Lines", {
        "1 Line": "single",
        "2 Lines": "double",
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      invalid: figma.enum("State", { Error: true }, { defaultValue: false }),
      prepend: figma.boolean("Show Decoration", {
        true: figma.nestedProps(".Select Left Decoration", {
          icon: figma.instance("Icon"),
        }),
        false: undefined,
      }),
      label: figma.boolean("Show Prepend", {
        true: figma.textContent("Prepend:"),
        false: undefined,
      }),
    },
    example: ({ size, lines, disabled, invalid, prepend, label }) => (
      <KuatSelect
        size={size}
        lines={lines}
        disabled={disabled}
        invalid={invalid}
        prepend={prepend.icon}
        label={label}
        items={[
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" },
        ]}
      />
    ),
  },
)
