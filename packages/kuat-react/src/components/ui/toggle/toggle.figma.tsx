import figma from "@figma/code-connect"

import { Toggle } from "."

figma.connect(
  Toggle,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=816-112827",
  {
    props: {
      size: figma.enum("Size", {
        Regular: "regular",
        Large: "large",
        Small: "small",
        Mini: "mini",
      }),
      skin: figma.enum("Skin", {
        Outlined: "outlined",
        Ghost: "ghost",
      }),
      defaultPressed: figma.enum("Active?", {
        Yes: true,
        No: false,
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      leftIcon: figma.boolean("Show left icon", {
        true: figma.instance("⮑ Left icon"),
        false: undefined,
      }),
      rightIcon: figma.boolean("Show right icon", {
        true: figma.instance("⮑ Right icon"),
        false: undefined,
      }),
      label: figma.textContent("Label"),
    },
    example: ({ size, skin, defaultPressed, disabled, leftIcon, rightIcon, label }) => (
      <Toggle size={size} skin={skin} defaultPressed={defaultPressed} disabled={disabled}>
        {leftIcon}
        {label}
        {rightIcon}
      </Toggle>
    ),
  },
)
