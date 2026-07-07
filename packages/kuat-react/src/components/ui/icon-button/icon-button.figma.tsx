import figma from "@figma/code-connect"

import { IconButton } from "."

figma.connect(
  IconButton,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=9-775",
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
        Regular: "regular",
        Large: "large",
        Small: "small",
        Mini: "mini",
      }),
      roundness: figma.enum("Roundness", {
        Default: "default",
        Round: "round",
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      icon: figma.instance("⮑ Left icon"),
    },
    example: ({ variant, size, roundness, disabled, icon }) => (
      <IconButton variant={variant} size={size} roundness={roundness} disabled={disabled}>
        {icon}
      </IconButton>
    ),
  },
)
