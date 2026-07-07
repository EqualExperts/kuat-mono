import figma from "@figma/code-connect"

import { Checkbox } from "."

figma.connect(
  Checkbox,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=16-1790",
  {
    props: {
      checked: figma.enum("Checked?", {
        False: false,
        True: true,
        Indeterminate: "indeterminate",
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      "aria-invalid": figma.enum(
        "State",
        { Error: true, "Error Focus": true },
        { defaultValue: false },
      ),
    },
    example: (props) => (
      <Checkbox
        checked={props.checked}
        disabled={props.disabled}
        aria-invalid={props["aria-invalid"]}
      />
    ),
  },
)
