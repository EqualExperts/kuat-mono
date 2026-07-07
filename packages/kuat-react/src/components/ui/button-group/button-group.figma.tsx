import figma from "@figma/code-connect"

import { Button } from "../button"
import { ButtonGroup } from "."

// Figma's "Button Group" node is a single grouped button, not the container — maps to Button inside ButtonGroup; Position/State are CSS-only and omitted.
figma.connect(
  Button,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=784-82792",
  {
    props: {
      variant: figma.enum("Skin", {
        Outlined: "outline",
        Ghost: "ghost",
      }),
      size: figma.enum("Size", {
        Regular: "default",
        Large: "large",
        Small: "small",
      }),
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
    example: ({ variant, size, leftIcon, rightIcon, label }) => (
      <ButtonGroup>
        <Button variant={variant} size={size}>
          {leftIcon}
          {label}
          {rightIcon}
        </Button>
      </ButtonGroup>
    ),
  },
)
