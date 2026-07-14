import figma from "@figma/code-connect"

import { CounterBadge } from "."

// The count digits in Figma are a per-variant text layer, not a component property — static example.
figma.connect(
  CounterBadge,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=3454-333",
  {
    props: {
      type: figma.enum("Type", {
        Primary: "primary",
        Attention: "attention",
      }),
    },
    example: ({ type }) => <CounterBadge type={type} count={1} />,
  },
)
