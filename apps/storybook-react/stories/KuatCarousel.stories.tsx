import type { Meta, StoryObj } from "@storybook/react"
import { useMemo, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  KuatCarousel,
} from "@equal-experts/kuat-react"
import { kuatCarouselDocs } from "../docs/component-docs"

const meta: Meta<typeof Carousel> = {
  title: "Blocks/KuatCarousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: kuatCarouselDocs,
      },
    },
  
    a11y: { test: "error" },
  },
  argTypes: {
    basis: {
      control: "select",
      options: [1, 2, 3],
      description: "Default item basis (visible items per viewport)",
    },
  },
}

export default meta

type Story = StoryObj<typeof Carousel>

const textSlides = Array.from({ length: 5 }, (_, i) => i + 1)
const imageSlides = [
  "https://picsum.photos/seed/kuat-carousel-1/960/540",
  "https://picsum.photos/seed/kuat-carousel-2/960/540",
  "https://picsum.photos/seed/kuat-carousel-3/960/540",
]
const noopPlugin = () => ({
  name: "noop-plugin",
  options: {},
  init: () => {},
  destroy: () => {},
})

export const OneSlide: Story = {
  args: {
    basis: 1,
  },
  render: (args) => (
    <Carousel {...args} className="w-full max-w-full sm:max-w-sm">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-6 text-4xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "One slide visible at a time (full width).",
      },
    },
  },
}

export const TwoSlides: Story = {
  args: {
    basis: 2,
  },
  render: (args) => (
    <Carousel {...args} className="w-full max-w-full sm:max-w-sm">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Two slides visible side by side.",
      },
    },
  },
}

export const ThreeSlides: Story = {
  args: {
    basis: 3,
  },
  render: (args) => (
    <Carousel {...args} className="w-full max-w-full sm:max-w-sm">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-4 text-xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three slides visible at once.",
      },
    },
  },
}

export const ResponsiveBasisByBreakpoint: Story = {
  render: () => (
    <Carousel basis={1} basisSm={2} basisMd={2} basisLg={3} basisXl={3} basis2xl={3} className="w-full">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Sets slide basis per Tailwind breakpoint using `basisSm`, `basisMd`, `basisLg`, `basisXl`, and `basis2xl`.",
      },
    },
  },
}

export const WithImagePlaceholder: Story = {
  args: {
    basis: 2,
  },
  render: (args) => (
    <Carousel {...args} className="w-full max-w-full sm:max-w-md">
      <CarouselContent>
        {imageSlides.map((src, idx) => (
          <CarouselItem key={src}>
            <img
              src={src}
              alt={`Example carousel image ${idx + 1}`}
              className="aspect-video w-full rounded-[6px] object-cover"
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Carousel with real image examples from a public placeholder source.",
      },
    },
  },
}

export const ContainerWidths: Story = {
  args: {
    basis: 2,
  },
  render: (args) => {
    const widthExamples = [
      { label: "Small container (18rem max)", className: "w-full max-w-full sm:max-w-72" },
      { label: "Medium container (24rem max)", className: "w-full max-w-full sm:max-w-96" },
      { label: "Large container (32rem max)", className: "w-full max-w-full sm:max-w-[32rem]" },
    ]

    return (
      <div className="flex w-full flex-col gap-4">
        {widthExamples.map((width) => (
          <div key={width.label} className={`${width.className} space-y-2`}>
            <p className="text-xs text-muted-foreground">{width.label}</p>
            <Carousel {...args} className="w-full">
              <CarouselContent>
                {textSlides.map((n) => (
                  <CarouselItem key={`${width.label}-${n}`}>
                    <div className="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
                      {n}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Shows the same carousel rendered in small, medium, and large container widths.",
      },
    },
  },
}

export const AlignCenter: Story = {
  args: {
    basis: 2,
  },
  render: (args) => (
    <Carousel {...args} opts={{ align: "center" }} className="w-full max-w-full sm:max-w-md">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Uses `opts.align = \"center\"` to keep the active snap centered in the container.",
      },
    },
  },
}

export const AlignStart: Story = {
  args: {
    basis: 2,
  },
  render: (args) => (
    <Carousel {...args} opts={{ align: "start" }} className="w-full max-w-full sm:max-w-md">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Uses `opts.align = \"start\"` so active snaps are left-aligned in the viewport.",
      },
    },
  },
}

export const PagedStartAligned: Story = {
  args: {
    basis: 2,
  },
  render: (args) => (
    <Carousel
      {...args}
      opts={{ align: "start", slidesToScroll: 2, containScroll: "trimSnaps" }}
      className="w-full max-w-full sm:max-w-md"
    >
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combines left alignment with page-like movement using `slidesToScroll` and `containScroll: \"trimSnaps\"`.",
      },
    },
  },
}

export const PluginsAndEvents: Story = {
  render: () => {
    const [events, setEvents] = useState<string[]>([])
    const carouselEvents = useMemo(
      () => ({
        select: () => setEvents((prev) => [...prev.slice(-3), "select"]),
        reInit: () => setEvents((prev) => [...prev.slice(-3), "reInit"]),
      }),
      []
    )

    return (
      <div className="flex w-full max-w-full sm:max-w-md flex-col gap-2">
        <Carousel
          basis={2}
          plugins={[noopPlugin() as never]}
          events={carouselEvents}
          opts={{ align: "start" }}
        >
          <CarouselContent>
            {textSlides.map((n) => (
              <CarouselItem key={n}>
                <div className="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">
                  {n}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="text-xs text-muted-foreground">
          Recent events: {events.length ? events.join(", ") : "none"}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates passing Embla plugins and inline event handlers.",
      },
    },
  },
}

export const KuatCarouselCompatibility: StoryObj<typeof KuatCarousel> = {
  render: () => (
    <KuatCarousel slidesPerView={2} className="w-full max-w-full sm:max-w-sm">
      <CarouselContent>
        {textSlides.map((n) => (
          <CarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </KuatCarousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Legacy `KuatCarousel` API remains available and maps `slidesPerView` to `basis`.",
      },
    },
  },
}
