import figma from "@figma/code-connect"

import { Tag } from "."

// Figma's State axis mixes interaction model (toggle vs dismiss) with visual state; Hover is
// CSS-only and maps to the same code as Default. Selected Toggle/Dismiss map to mode + selected.
figma.connect(
  Tag,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=3442-513",
  {
    props: {
      color: figma.enum("Colour", {
        Base: "base",
        "Index Indigo": "index-indigo",
        "Transform Teal": "transform-teal",
        "Packet Plum": "packet-plum",
        "Server Slate": "server-slate",
        "Logic Lime": "logic-lime",
        "Signal Yellow": "signal-yellow",
        "Cursor Coral": "cursor-coral",
        "Patch Peach": "patch-peach",
      }),
      mode: figma.enum("State", {
        Default: undefined,
        Hover: undefined,
        "Selected Toggle": "toggle",
        "Selected Dismiss": "dismiss",
      }),
      selected: figma.enum("State", {
        "Selected Toggle": true,
      }),
      label: figma.string("Label"),
    },
    example: ({ color, mode, selected, label }) => (
      <Tag color={color} mode={mode} selected={selected}>
        {label}
      </Tag>
    ),
  },
)
