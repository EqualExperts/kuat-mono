import type { Meta, StoryObj } from "@storybook/vue3"
import {
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
} from "@equal-experts/kuat-vue"

const meta: Meta<typeof KuatCarousel> = {
  title: "Kuat Blocks/KuatCarousel",
  component: KuatCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Kuat Carousel is built with Embla. Use it for testimonials, image galleries, or any content that benefits from horizontal scrolling with 1, 2, or 3 visible slides. Navigation is in the top-right. See marketing scenarios for usage (e.g. many testimonials, limited space).",
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

const textSlides = [1, 2, 3, 4, 5]

export const OneSlide: Story = {
  args: {
    slidesPerView: 1,
  },
  render: (args) => ({
    components: {
      KuatCarousel,
      KuatCarouselContent,
      KuatCarouselItem,
      KuatCarouselPrevious,
      KuatCarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <KuatCarousel v-bind="args" class="w-full max-w-sm">
        <template #content>
          <KuatCarouselContent>
            <KuatCarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-6 text-4xl font-semibold">
                {{ n }}
              </div>
            </KuatCarouselItem>
          </KuatCarouselContent>
        </template>
        <template #controls>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </template>
      </KuatCarousel>
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
    slidesPerView: 2,
  },
  render: (args) => ({
    components: {
      KuatCarousel,
      KuatCarouselContent,
      KuatCarouselItem,
      KuatCarouselPrevious,
      KuatCarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <KuatCarousel v-bind="args" class="w-full max-w-sm">
        <template #content>
          <KuatCarouselContent>
            <KuatCarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-6 text-2xl font-semibold">
                {{ n }}
              </div>
            </KuatCarouselItem>
          </KuatCarouselContent>
        </template>
        <template #controls>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </template>
      </KuatCarousel>
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
    slidesPerView: 3,
  },
  render: (args) => ({
    components: {
      KuatCarousel,
      KuatCarouselContent,
      KuatCarouselItem,
      KuatCarouselPrevious,
      KuatCarouselNext,
    },
    setup() {
      return { args, textSlides }
    },
    template: `
      <KuatCarousel v-bind="args" class="w-full max-w-sm">
        <template #content>
          <KuatCarouselContent>
            <KuatCarouselItem v-for="n in textSlides" :key="n">
              <div class="flex aspect-square items-center justify-center bg-muted p-4 text-xl font-semibold">
                {{ n }}
              </div>
            </KuatCarouselItem>
          </KuatCarouselContent>
        </template>
        <template #controls>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </template>
      </KuatCarousel>
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

export const WithImagePlaceholder: Story = {
  args: {
    slidesPerView: 2,
  },
  render: (args) => ({
    components: {
      KuatCarousel,
      KuatCarouselContent,
      KuatCarouselItem,
      KuatCarouselPrevious,
      KuatCarouselNext,
    },
    setup() {
      return { args }
    },
    template: `
      <KuatCarousel v-bind="args" class="w-full max-w-md">
        <template #content>
          <KuatCarouselContent>
            <KuatCarouselItem v-for="n in 3" :key="n">
              <div class="aspect-video w-full rounded-[6px] bg-gradient-to-br from-slate-200 to-slate-300" />
            </KuatCarouselItem>
          </KuatCarouselContent>
        </template>
        <template #controls>
          <KuatCarouselPrevious />
          <KuatCarouselNext />
        </template>
      </KuatCarousel>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with image-style placeholders (e.g. for galleries or testimonials with photos).",
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: {
      KuatCarousel,
      KuatCarouselContent,
      KuatCarouselItem,
      KuatCarouselPrevious,
      KuatCarouselNext,
    },
    setup() {
      return { textSlides }
    },
    template: `
      <div class="flex flex-col gap-10">
        <div>
          <h3 class="mb-2 text-sm font-medium">1 slide</h3>
          <KuatCarousel :slides-per-view="1" class="w-full max-w-xs">
            <template #content>
              <KuatCarouselContent>
                <KuatCarouselItem v-for="n in 3" :key="n">
                  <div class="flex aspect-square items-center justify-center bg-muted text-2xl font-semibold">{{ n }}</div>
                </KuatCarouselItem>
              </KuatCarouselContent>
            </template>
            <template #controls>
              <KuatCarouselPrevious />
              <KuatCarouselNext />
            </template>
          </KuatCarousel>
        </div>
        <div>
          <h3 class="mb-2 text-sm font-medium">2 slides</h3>
          <KuatCarousel :slides-per-view="2" class="w-full max-w-xs">
            <template #content>
              <KuatCarouselContent>
                <KuatCarouselItem v-for="n in 4" :key="n">
                  <div class="flex aspect-square items-center justify-center bg-muted text-xl font-semibold">{{ n }}</div>
                </KuatCarouselItem>
              </KuatCarouselContent>
            </template>
            <template #controls>
              <KuatCarouselPrevious />
              <KuatCarouselNext />
            </template>
          </KuatCarousel>
        </div>
        <div>
          <h3 class="mb-2 text-sm font-medium">3 slides</h3>
          <KuatCarousel :slides-per-view="3" class="w-full max-w-xs">
            <template #content>
              <KuatCarouselContent>
                <KuatCarouselItem v-for="n in 5" :key="n">
                  <div class="flex aspect-square items-center justify-center bg-muted font-semibold">{{ n }}</div>
                </KuatCarouselItem>
              </KuatCarouselContent>
            </template>
            <template #controls>
              <KuatCarouselPrevious />
              <KuatCarouselNext />
            </template>
          </KuatCarousel>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of 1, 2, and 3 slides per view. Navigation is always in the top-right.",
      },
    },
  },
}
