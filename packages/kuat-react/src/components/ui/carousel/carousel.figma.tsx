import figma from "@figma/code-connect"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "."

figma.connect(
  Carousel,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=164-18293",
  {
    props: {
      slideCount: figma.enum("Slides", {
        "1 Slide": 1,
        "2 Slides": 2,
        "3 Slides": 3,
      }),
    },
    example: ({ slideCount }) => (
      <Carousel>
        <CarouselContent>
          {Array.from({ length: slideCount }).map((_, index) => (
            <CarouselItem key={index}>Slide {index + 1}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },
)
