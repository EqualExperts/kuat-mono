import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

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
    useEmblaCarousel: vi.fn(() => [vi.fn(), api]),
    setCanScrollState: (prev: boolean, next: boolean) => {
      canScrollPrev = prev
      canScrollNext = next
    },
  }
})

vi.mock("embla-carousel-react", () => ({
  default: embla.useEmblaCarousel,
}))

describe("Carousel", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    embla.setCanScrollState(true, true)
    embla.api.on.mockImplementation(() => embla.api)
    embla.api.off.mockImplementation(() => embla.api)
    embla.useEmblaCarousel.mockReturnValue([vi.fn(), embla.api])
  })

  it("applies basis classes from root and item override", () => {
    render(
      <Carousel basis={2}>
        <CarouselContent>
          <CarouselItem data-testid="item-a">A</CarouselItem>
          <CarouselItem basis={3} data-testid="item-b">
            B
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(screen.getByTestId("item-a")).toHaveClass("carousel__item--basis-2")
    expect(screen.getByTestId("item-b")).toHaveClass("carousel__item--basis-3")
  })

  it("applies responsive basis classes for all Kuat Tailwind breakpoints", () => {
    render(
      <Carousel basis={1} basisSm={2} basisMd={3}>
        <CarouselContent>
          <CarouselItem data-testid="item-a">A</CarouselItem>
          <CarouselItem basisLg={2} basisXl={3} basis2xl={1} data-testid="item-b">
            B
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(screen.getByTestId("item-a")).toHaveClass("carousel__item--basis-sm-2")
    expect(screen.getByTestId("item-a")).toHaveClass("carousel__item--basis-md-3")
    expect(screen.getByTestId("item-b")).toHaveClass("carousel__item--basis-sm-2")
    expect(screen.getByTestId("item-b")).toHaveClass("carousel__item--basis-md-3")
    expect(screen.getByTestId("item-b")).toHaveClass("carousel__item--basis-lg-2")
    expect(screen.getByTestId("item-b")).toHaveClass("carousel__item--basis-xl-3")
    expect(screen.getByTestId("item-b")).toHaveClass("carousel__item--basis-2xl-1")
  })

  it("passes options and plugins to Embla", () => {
    const plugins = [{ name: "noop" }]
    const opts = { loop: true, align: "start" as const }

    render(
      <Carousel opts={opts} plugins={plugins}>
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(embla.useEmblaCarousel).toHaveBeenCalledWith(
      expect.objectContaining(opts),
      plugins
    )
  })

  it("passes center alignment options to Embla", () => {
    render(
      <Carousel opts={{ align: "center" }}>
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(embla.useEmblaCarousel).toHaveBeenCalledWith(
      expect.objectContaining({ align: "center", axis: "x" }),
      undefined
    )
  })

  it("passes page-style start alignment options to Embla", () => {
    render(
      <Carousel
        basis={2}
        opts={{ align: "start", slidesToScroll: 2, containScroll: "trimSnaps" }}
      >
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

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

  it("supports controls and click handlers", async () => {
    const user = userEvent.setup()

    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    await user.click(screen.getByRole("button", { name: "Previous slide" }))
    await user.click(screen.getByRole("button", { name: "Next slide" }))

    expect(embla.api.scrollPrev).toHaveBeenCalled()
    expect(embla.api.scrollNext).toHaveBeenCalled()
  })

  it("wires inline Embla events and cleans up on unmount", () => {
    const selectHandler = vi.fn()
    const reInitHandler = vi.fn()

    const { unmount } = render(
      <Carousel
        events={{
          select: selectHandler,
          reInit: reInitHandler,
        }}
      >
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(embla.api.on).toHaveBeenCalledWith("select", expect.any(Function))
    expect(embla.api.on).toHaveBeenCalledWith("reInit", expect.any(Function))

    const selectListener = embla.api.on.mock.calls
      .filter(([name]) => name === "select")
      .at(-1)?.[1]
    if (selectListener) {
      ;(selectListener as () => void)()
    }
    expect(selectHandler).toHaveBeenCalledWith(embla.api, "select")

    unmount()

    expect(embla.api.off).toHaveBeenCalledWith("select", expect.any(Function))
    expect(embla.api.off).toHaveBeenCalledWith("reInit", expect.any(Function))
  })
})
