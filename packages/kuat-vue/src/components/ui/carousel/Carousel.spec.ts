import { beforeEach, describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Carousel from "./Carousel.vue"
import CarouselContent from "./CarouselContent.vue"
import CarouselItem from "./CarouselItem.vue"
import CarouselNext from "./CarouselNext.vue"
import CarouselPrevious from "./CarouselPrevious.vue"
import KuatCarousel from "../kuat-carousel/KuatCarousel.vue"
import KuatCarouselContent from "../kuat-carousel/KuatCarouselContent.vue"
import KuatCarouselItem from "../kuat-carousel/KuatCarouselItem.vue"

const embla = vi.hoisted(() => {
  let canScrollPrev = true
  let canScrollNext = true

  const api = {
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    canScrollPrev: vi.fn(() => canScrollPrev),
    canScrollNext: vi.fn(() => canScrollNext),
    on: vi.fn(),
    off: vi.fn(),
  }

  api.on.mockImplementation(() => api)
  api.off.mockImplementation(() => api)

  return {
    api,
    useEmblaCarousel: vi.fn(),
    setCanScrollState: (prev: boolean, next: boolean) => {
      canScrollPrev = prev
      canScrollNext = next
    },
  }
})

vi.mock("embla-carousel-vue", async () => {
  const { ref } = await import("vue")
  const emblaRef = ref<HTMLElement | null>(null)
  const emblaApi = ref(embla.api)
  embla.useEmblaCarousel.mockImplementation(() => [emblaRef, emblaApi])

  return {
    default: embla.useEmblaCarousel,
  }
})

describe("Carousel (Vue)", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    embla.setCanScrollState(true, true)
    embla.api.on.mockImplementation(() => embla.api)
    embla.api.off.mockImplementation(() => embla.api)
  })

  it("passes options and plugins to Embla", () => {
    const plugins = [{ name: "noop" }]

    mount(Carousel, {
      props: {
        opts: { loop: true, align: "start" },
        plugins,
      },
      slots: {
        content: "<div>slide</div>",
      },
    })

    expect(embla.useEmblaCarousel).toHaveBeenCalledWith(
      expect.objectContaining({ loop: true, align: "start", axis: "x" }),
      plugins
    )
  })

  it("passes center alignment options to Embla", () => {
    mount(Carousel, {
      props: {
        opts: { align: "center" },
      },
      slots: {
        content: "<div>slide</div>",
      },
    })

    expect(embla.useEmblaCarousel).toHaveBeenCalledWith(
      expect.objectContaining({ align: "center", axis: "x" }),
      undefined
    )
  })

  it("passes page-style start alignment options to Embla", () => {
    mount(Carousel, {
      props: {
        basis: 2,
        opts: {
          align: "start",
          slidesToScroll: 2,
          containScroll: "trimSnaps",
        },
      },
      slots: {
        content: "<div>slide</div>",
      },
    })

    expect(embla.useEmblaCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        align: "start",
        slidesToScroll: 2,
        containScroll: "trimSnaps",
        axis: "x",
      }),
      undefined
    )
  })

  it("applies basis classes from root and item override", () => {
    const wrapper = mount({
      components: {
        Carousel,
        CarouselContent,
        CarouselItem,
      },
      template: `
        <Carousel :basis="2">
          <template #content>
            <CarouselContent>
              <CarouselItem class="item-a">A</CarouselItem>
              <CarouselItem :basis="3" class="item-b">B</CarouselItem>
            </CarouselContent>
          </template>
        </Carousel>
      `,
    })

    expect(wrapper.find(".item-a").classes()).toContain("carousel__item--basis-2")
    expect(wrapper.find(".item-b").classes()).toContain("carousel__item--basis-3")
  })

  it("wires inline Embla events and cleans up on unmount", () => {
    const selectHandler = vi.fn()
    const wrapper = mount(Carousel, {
      props: {
        events: {
          select: selectHandler,
        },
      },
      slots: {
        content: "<div>slide</div>",
      },
    })

    expect(embla.api.on).toHaveBeenCalledWith("select", expect.any(Function))

    const selectListener = embla.api.on.mock.calls
      .filter(([name]) => name === "select")
      .at(-1)?.[1]
    if (selectListener) {
      ;(selectListener as () => void)()
    }
    expect(selectHandler).toHaveBeenCalledWith(embla.api, "select")

    wrapper.unmount()
    expect(embla.api.off).toHaveBeenCalledWith("select", expect.any(Function))
  })

  it("supports previous/next controls and Kuat compatibility mapping", async () => {
    const wrapper = mount({
      components: {
        KuatCarousel,
        KuatCarouselContent,
        KuatCarouselItem,
        CarouselPrevious,
        CarouselNext,
      },
      template: `
        <KuatCarousel :slides-per-view="3">
          <template #content>
            <KuatCarouselContent>
              <KuatCarouselItem class="compat-item">A</KuatCarouselItem>
            </KuatCarouselContent>
          </template>
          <template #controls>
            <CarouselPrevious />
            <CarouselNext />
          </template>
        </KuatCarousel>
      `,
    })

    expect(wrapper.find(".compat-item").classes()).toContain("carousel__item--basis-3")
  })
})
