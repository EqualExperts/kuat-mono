import figma from "@figma/code-connect"

import { Breadcrumb } from "."

figma.connect(
  Breadcrumb,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=68-7354",
  {
    props: {
      home: figma.textContent("Home"),
      components: figma.textContent("Components"),
      current: figma.textContent("Breadcrumb"),
    },
    example: ({ home, components, current }) => (
      <Breadcrumb
        items={[
          { label: home, href: "/" },
          { label: components, href: "/components" },
          { label: current },
        ]}
      />
    ),
  },
)
