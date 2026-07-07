import figma from "@figma/code-connect"

import { Switch } from "."

figma.connect(
  Switch,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=16-1801",
  {
    props: {
      checked: figma.enum("Checked?", {
        False: false,
        True: true,
      }),
      disabled: figma.enum("State", { Disabled: true }, { defaultValue: false }),
    },
    example: (props) => <Switch checked={props.checked} disabled={props.disabled} />,
  },
)
