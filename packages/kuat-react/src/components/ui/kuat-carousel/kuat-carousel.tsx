"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import "./kuat-carousel.css"

type KuatCarouselApi = UseEmblaCarouselType[1]
type KuatCarouselOptions = UseEmblaCarouselType[0]
type KuatCarouselOrientation = "horizontal" | "vertical"

export type KuatCarouselSlidesPerView = 1 | 2 | 3

interface KuatCarouselContextValue {
  api: KuatCarouselApi
  slidesPerView: KuatCarouselSlidesPerView
  orientation: KuatCarouselOrientation
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const KuatCarouselContext = React.createContext<
  KuatCarouselContextValue | undefined
>(undefined)

function useKuatCarousel() {
  const context = React.useContext(KuatCarouselContext)
  if (!context) {
    throw new Error(
      "KuatCarousel components must be used within a KuatCarousel."
    )
  }
  return context
}

export interface KuatCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  opts?: KuatCarouselOptions
  slidesPerView?: KuatCarouselSlidesPerView
  orientation?: KuatCarouselOrientation
  plugins?: Parameters<typeof useEmblaCarousel>[1]
}

const KuatCarousel = React.forwardRef<HTMLDivElement, KuatCarouselProps>(
  (
    {
      opts,
      slidesPerView = 1,
      orientation = "horizontal",
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )

    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const onSelect = React.useCallback((api: KuatCarouselApi | undefined) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect).on("select", onSelect)
      return () => {
        api.off("reInit", onSelect).off("select", onSelect)
      }
    }, [api, onSelect])

    const contextValue = React.useMemo<KuatCarouselContextValue>(
      () => ({
        api: api!,
        slidesPerView,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }),
      [
        api,
        slidesPerView,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      ]
    )

    const childArray = React.Children.toArray(children)
    const [content, ...controls] = childArray

    return (
      <KuatCarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("kuat-carousel", className)}
          {...props}
        >
          <div ref={emblaRef} className="kuat-carousel__viewport">
            {content}
          </div>
          {controls}
        </div>
      </KuatCarouselContext.Provider>
    )
  }
)
KuatCarousel.displayName = "KuatCarousel"

export interface KuatCarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const KuatCarouselContent = React.forwardRef<
  HTMLDivElement,
  KuatCarouselContentProps
>(({ className, ...props }, ref) => {
  const { orientation } = useKuatCarousel()

  return (
    <div
      ref={ref}
      className={cn(
        "kuat-carousel__content",
        `kuat-carousel__content--${orientation}`,
        className
      )}
      {...props}
    />
  )
})
KuatCarouselContent.displayName = "KuatCarouselContent"

export interface KuatCarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const KuatCarouselItem = React.forwardRef<
  HTMLDivElement,
  KuatCarouselItemProps
>(({ className, ...props }, ref) => {
  const { slidesPerView, orientation } = useKuatCarousel()

  return (
    <div
      ref={ref}
      className={cn(
        "kuat-carousel__item",
        `kuat-carousel__item--${orientation}`,
        `kuat-carousel__item--basis-${slidesPerView}`,
        className
      )}
      {...props}
    />
  )
})
KuatCarouselItem.displayName = "KuatCarouselItem"

const KuatCarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useKuatCarousel()

  return (
    <button
      ref={ref}
      type="button"
      className={cn("kuat-carousel__prev", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  )
})
KuatCarouselPrevious.displayName = "KuatCarouselPrevious"

const KuatCarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useKuatCarousel()

  return (
    <button
      ref={ref}
      type="button"
      className={cn("kuat-carousel__next", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  )
})
KuatCarouselNext.displayName = "KuatCarouselNext"

export {
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
  useKuatCarousel,
}
