import figma from "@figma/code-connect"

import { Sonner } from "."

figma.connect(
  Sonner,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=139-11361",
  {
    props: {
      visibleToasts: figma.enum("Stack", {
        "1 Level": 1,
        "2 Levels": 2,
        "3 Levels": 3,
      }),
    },
    example: ({ visibleToasts }) => <Sonner visibleToasts={visibleToasts} />,
  },
)
