import figma from "@figma/code-connect"

import { Accordion, AccordionItem, AccordionTrigger } from "."

figma.connect(
  AccordionTrigger,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=66-5034",
  {
    props: {
      label: figma.textContent("Label"),
    },
    example: ({ label }) => (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{label}</AccordionTrigger>
        </AccordionItem>
      </Accordion>
    ),
  },
)
