import figma from "@figma/code-connect"

import { Badge } from "."

figma.connect(
  Badge,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=19-6979",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "default",
        Secondary: "secondary",
        Outline: "outline",
        Ghost: "ghost",
        Destructive: "destructive",
      }),
      roundness: figma.enum("Roundness", {
        Default: "default",
        Round: "round",
      }),
      iconLeft: figma.boolean("Show icon left", {
        true: figma.instance("⮑ Icon left"),
        false: undefined,
      }),
      iconRight: figma.boolean("Show icon right", {
        true: figma.instance("⮑ Icon right"),
        false: undefined,
      }),
      label: figma.textContent("Label"),
    },
    example: ({ variant, roundness, iconLeft, iconRight, label }) => (
      <Badge variant={variant} roundness={roundness}>
        {iconLeft}
        {label}
        {iconRight}
      </Badge>
    ),
  },
)
