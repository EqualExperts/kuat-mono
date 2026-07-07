import figma from "@figma/code-connect"

import { Textarea } from "."

figma.connect(
  Textarea,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=16-1745",
  {
    props: {
      resize: figma.boolean("Show resizable", {
        true: "vertical",
        false: "none",
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      "aria-invalid": figma.enum(
        "State",
        { Error: true, "Error Focus": true },
        { defaultValue: false },
      ),
    },
    example: (props) => (
      <Textarea
        resize={props.resize}
        disabled={props.disabled}
        aria-invalid={props["aria-invalid"]}
      />
    ),
  },
)
