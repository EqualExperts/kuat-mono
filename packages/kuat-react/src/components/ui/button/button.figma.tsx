import figma from "@figma/code-connect"

import { Button } from "."

figma.connect(
  Button,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=9-1071",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Outline: "outline",
        Ghost: "ghost",
        "Ghost Muted": "ghost-muted",
        Destructive: "destructive",
      }),
      size: figma.enum("Size", {
        Regular: "default",
        Large: "large",
        Small: "small",
        Mini: "mini",
      }),
      color: figma.enum("Colour", {
        Default: "ee-blue",
        "Transform Teal": "transform-teal",
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
    example: ({ variant, size, color, disabled, leftIcon, rightIcon, label }) => (
      <Button variant={variant} size={size} color={color} disabled={disabled}>
        {leftIcon}
        {label}
        {rightIcon}
      </Button>
    ),
  },
)
