import figma from "@figma/code-connect"

import { Input } from "."

figma.connect(
  Input,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=16-1738",
  {
    props: {
      size: figma.enum("Size", {
        Regular: "regular",
        Large: "large",
        Small: "small",
        Mini: "mini",
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      invalid: figma.enum(
        "State",
        { Error: true, "Error Focus": true },
        { defaultValue: false },
      ),
      leftDecoration: figma.boolean("Show decoration left", {
        true: figma.nestedProps("Decoration left", {
          icon: figma.instance("Icon"),
        }),
        false: undefined,
      }),
      rightDecoration: figma.boolean("Show decoration right", {
        true: figma.nestedProps("Decoration right", {
          icon: figma.instance("Icon"),
        }),
        false: undefined,
      }),
    },
    example: ({ size, disabled, invalid, leftDecoration, rightDecoration }) => (
      <Input
        size={size}
        disabled={disabled}
        aria-invalid={invalid}
        leftDecoration={leftDecoration.icon}
        rightDecoration={rightDecoration.icon}
      />
    ),
  },
)
