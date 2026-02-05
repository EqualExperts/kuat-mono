import type { Meta, StoryObj } from "@storybook/react"
import {
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
} from "@equal-experts/kuat-react"

const meta: Meta<typeof KuatCarousel> = {
  title: "Kuat Blocks/KuatCarousel",
  component: KuatCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Kuat Carousel is built with Embla. Use it for testimonials, image galleries, or any content that benefits from horizontal scrolling with 1, 2, or 3 visible slides. Navigation is in the top-right. See [marketing scenarios](https://github.com/EqualExperts/kuat-docs) for usage (e.g. many testimonials, limited space).",
      },
    },
  },
  argTypes: {
    slidesPerView: {
      control: "select",
      options: [1, 2, 3],
      description: "Number of slides visible at once",
    },
  },
}

export default meta

type Story = StoryObj<typeof KuatCarousel>

const textSlides = Array.from({ length: 5 }, (_, i) => i + 1)

export const OneSlide: Story = {
  args: {
    slidesPerView: 1,
  },
  render: (args) => (
    <KuatCarousel {...args} className="w-full max-w-sm">
      <KuatCarouselContent>
        {textSlides.map((n) => (
          <KuatCarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-6 text-4xl font-semibold">
              {n}
            </div>
          </KuatCarouselItem>
        ))}
      </KuatCarouselContent>
      <KuatCarouselPrevious />
      <KuatCarouselNext />
    </KuatCarousel>
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
    slidesPerView: 2,
  },
  render: (args) => (
    <KuatCarousel {...args} className="w-full max-w-sm">
      <KuatCarouselContent>
        {textSlides.map((n) => (
          <KuatCarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">
              {n}
            </div>
          </KuatCarouselItem>
        ))}
      </KuatCarouselContent>
      <KuatCarouselPrevious />
      <KuatCarouselNext />
    </KuatCarousel>
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
    slidesPerView: 3,
  },
  render: (args) => (
    <KuatCarousel {...args} className="w-full max-w-sm">
      <KuatCarouselContent>
        {textSlides.map((n) => (
          <KuatCarouselItem key={n}>
            <div className="flex aspect-square items-center justify-center bg-muted p-4 text-xl font-semibold">
              {n}
            </div>
          </KuatCarouselItem>
        ))}
      </KuatCarouselContent>
      <KuatCarouselPrevious />
      <KuatCarouselNext />
    </KuatCarousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three slides visible at once.",
      },
    },
  },
}

export const WithImagePlaceholder: Story = {
  args: {
    slidesPerView: 2,
  },
  render: (args) => (
    <KuatCarousel {...args} className="w-full max-w-md">
      <KuatCarouselContent>
        {[1, 2, 3].map((n) => (
          <KuatCarouselItem key={n}>
            <div className="aspect-video w-full rounded-[6px] bg-gradient-to-br from-slate-200 to-slate-300" />
          </KuatCarouselItem>
        ))}
      </KuatCarouselContent>
      <KuatCarouselPrevious />
      <KuatCarouselNext />
    </KuatCarousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Carousel with image-style placeholders (e.g. for galleries or testimonials with photos).",
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-2 text-sm font-medium">1 slide</h3>
        <KuatCarousel slidesPerView={1} className="w-full max-w-xs">
          <KuatCarouselContent>
            {[1, 2, 3].map((n) => (
              <KuatCarouselItem key={n}>
                <div className="flex aspect-square items-center justify-center bg-muted text-2xl font-semibold">
                  {n}
                </div>
              </KuatCarouselItem>
            ))}
          </KuatCarouselContent>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </KuatCarousel>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">2 slides</h3>
        <KuatCarousel slidesPerView={2} className="w-full max-w-xs">
          <KuatCarouselContent>
            {[1, 2, 3, 4].map((n) => (
              <KuatCarouselItem key={n}>
                <div className="flex aspect-square items-center justify-center bg-muted text-xl font-semibold">
                  {n}
                </div>
              </KuatCarouselItem>
            ))}
          </KuatCarouselContent>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </KuatCarousel>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">3 slides</h3>
        <KuatCarousel slidesPerView={3} className="w-full max-w-xs">
          <KuatCarouselContent>
            {[1, 2, 3, 4, 5].map((n) => (
              <KuatCarouselItem key={n}>
                <div className="flex aspect-square items-center justify-center bg-muted font-semibold">
                  {n}
                </div>
              </KuatCarouselItem>
            ))}
          </KuatCarouselContent>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </KuatCarousel>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of 1, 2, and 3 slides per view. Navigation is always in the top-right.",
      },
    },
  },
}
