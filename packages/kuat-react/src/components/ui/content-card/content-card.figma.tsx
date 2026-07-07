import figma from "@figma/code-connect"

import { ContentCard } from "."

// Figma's "Card" exposes three generic instance-swap slots and no text
// properties; ContentCard's badge/category/title are required props, so the
// example fills them with representative placeholder text.
figma.connect(
  ContentCard,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=179-29234",
  {
    props: {
      customContent: figma.instance("Main Slot"),
      headerAccessory: figma.instance("Header Slot"),
      footer: figma.instance("Footer Slot"),
    },
    example: ({ customContent, headerAccessory, footer }) => (
      <ContentCard
        badge="Badge"
        category="Category"
        title="Card title"
        headerAccessory={headerAccessory}
        customContent={customContent}
        footer={footer}
      />
    ),
  },
)
