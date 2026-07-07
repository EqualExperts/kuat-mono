import figma from "@figma/code-connect"

import { RadioGroup, RadioGroupItem } from "."

figma.connect(
  RadioGroupItem,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=16-1796",
  {
    props: {
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
      "aria-invalid": figma.enum(
        "State",
        { Error: true, "Error Focus": true },
        { defaultValue: false },
      ),
    },
    example: (props) => (
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem
          value="option-1"
          disabled={props.disabled}
          aria-invalid={props["aria-invalid"]}
        />
      </RadioGroup>
    ),
  },
)
