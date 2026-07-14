import figma from "@figma/code-connect"

import { StatusBadge } from "."

// Label text in Figma is a per-variant text layer, not a component property — static example text.
figma.connect(
  StatusBadge,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=3425-546",
  {
    props: {
      type: figma.enum("Type", {
        Success: "success",
        Warning: "warning",
        Error: "error",
        Info: "info",
        Neutral: "neutral",
      }),
      size: figma.enum("Size", {
        Base: "base",
        Large: "large",
      }),
    },
    example: ({ type, size }) => (
      <StatusBadge type={type} size={size}>
        Label
      </StatusBadge>
    ),
  },
)
