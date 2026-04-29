import type { Meta, StoryObj } from "@storybook/vue3"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  KuatCarousel,
} from "@equal-experts/kuat-vue"
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

const textSlides = [1, 2, 3, 4, 5]
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
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <Carousel v-bind="args" class="w-full max-w-full sm:max-w-sm">
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-6 text-4xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
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
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <Carousel v-bind="args" class="w-full max-w-full sm:max-w-sm">
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
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
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <Carousel v-bind="args" class="w-full max-w-full sm:max-w-sm">
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-4 text-xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Three slides visible at once.",
      },
    },
  },
}

export const ResponsiveBasisByBreakpoint: Story = {
  render: () => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { textSlides }
    },
    template: `
      <Carousel
        :basis="1"
        :basis-sm="2"
        :basis-md="2"
        :basis-lg="3"
        :basis-xl="3"
        :basis2xl="3"
        class="w-full"
      >
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
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
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, imageSlides }
    },
    template: `
      <Carousel v-bind="args" class="w-full max-w-full sm:max-w-md">
        <template #content>
          <CarouselContent>
            <CarouselItem
              v-for="(src, idx) in imageSlides"
              :key="src"
            >
              <img
                :src="src"
                :alt="'Example carousel image ' + (idx + 1)"
                class="aspect-video w-full rounded-[6px] object-cover"
                loading="lazy"
              />
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with real image examples from a public placeholder source.",
      },
    },
  },
}

export const ContainerWidths: Story = {
  args: {
    basis: 2,
  },
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      const widthExamples = [
        { label: "Small container (18rem max)", className: "w-full max-w-full sm:max-w-72" },
        { label: "Medium container (24rem max)", className: "w-full max-w-full sm:max-w-96" },
        { label: "Large container (32rem max)", className: "w-full max-w-full sm:max-w-[32rem]" },
      ]

      return { args, textSlides, widthExamples }
    },
    template: `
      <div class="flex w-full flex-col gap-4">
        <div
          v-for="width in widthExamples"
          :key="width.label"
          :class="[width.className, 'space-y-2']"
        >
          <p class="text-xs text-muted-foreground">{{ width.label }}</p>
          <Carousel v-bind="args" class="w-full">
            <template #content>
              <CarouselContent>
                <CarouselItem
                  v-for="n in textSlides"
                  :key="width.label + '-' + n"
                >
                  <div class="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
                    {{ n }}
                  </div>
                </CarouselItem>
              </CarouselContent>
            </template>
            <template #controls>
              <CarouselPrevious />
              <CarouselNext />
            </template>
          </Carousel>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Shows the same carousel rendered in small, medium, and large container widths.",
      },
    },
  },
}

export const AlignCenter: Story = {
  args: {
    basis: 2,
  },
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <Carousel v-bind="args" :opts="{ align: 'center' }" class="w-full max-w-full sm:max-w-md">
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Uses `opts.align = \"center\"` to keep the active snap centered in the container.",
      },
    },
  },
}

export const AlignStart: Story = {
  args: {
    basis: 2,
  },
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <Carousel v-bind="args" :opts="{ align: 'start' }" class="w-full max-w-full sm:max-w-md">
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Uses `opts.align = \"start\"` so active snaps are left-aligned in the viewport.",
      },
    },
  },
}

export const PagedStartAligned: Story = {
  args: {
    basis: 2,
  },
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <Carousel
        v-bind="args"
        :opts="{ align: 'start', slidesToScroll: 2, containScroll: 'trimSnaps' }"
        class="w-full max-w-full sm:max-w-md"
      >
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-video items-center justify-center bg-muted p-4 text-xl font-semibold">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </Carousel>
    `,
  }),
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
  render: () => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      const events: string[] = []
      const carouselEvents = {
        select: () => {
          events.push("select")
        },
      }
      return { textSlides, carouselEvents, noopPlugin, events }
    },
    template: `
      <div class="flex w-full max-w-full sm:max-w-md flex-col gap-2">
        <Carousel
          :basis="2"
          :plugins="[noopPlugin()]"
          :events="carouselEvents"
          :opts="{ align: 'start' }"
        >
          <template #content>
            <CarouselContent>
              <CarouselItem v-for="n in textSlides" :key="n">
                <div class="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">{{ n }}</div>
              </CarouselItem>
            </CarouselContent>
          </template>
          <template #controls>
            <CarouselPrevious />
            <CarouselNext />
          </template>
        </Carousel>
        <p class="text-xs text-muted-foreground">Event handlers are attached inline via the events prop.</p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates passing Embla plugins and inline event handlers.",
      },
    },
  },
}

export const KuatCarouselCompatibility: StoryObj<typeof KuatCarousel> = {
  render: () => ({
    components: {
      KuatCarousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    },
    setup() {
      return { textSlides }
    },
    template: `
      <KuatCarousel :slides-per-view="2" class="w-full max-w-full sm:max-w-sm">
        <template #content>
          <CarouselContent>
            <CarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">{{ n }}</div>
            </CarouselItem>
          </CarouselContent>
        </template>
        <template #controls>
          <CarouselPrevious />
          <CarouselNext />
        </template>
      </KuatCarousel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Legacy `KuatCarousel` API remains available and maps `slidesPerView` to `basis`.",
      },
    },
  },
}
