"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import "./carousel.css"

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = UseEmblaCarouselType[0]
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1]
type CarouselOrientation = "horizontal" | "vertical"

export type CarouselItemBasis = 1 | 2 | 3
export type CarouselEventHandler = (api: CarouselApi, eventName: string) => void
export type CarouselEventHandlers = Partial<Record<string, CarouselEventHandler>>

interface CarouselContextValue {
  api: CarouselApi
  basis: CarouselItemBasis
  orientation: CarouselOrientation
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("Carousel components must be used within a Carousel.")
  }
  return context
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  basis?: CarouselItemBasis
  orientation?: CarouselOrientation
  plugins?: CarouselPlugins
  setApi?: (api: CarouselApi) => void
  events?: CarouselEventHandlers
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      opts,
      basis = 1,
      orientation = "horizontal",
      plugins,
      setApi,
      events,
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

    const onSelect = React.useCallback((emblaApi: CarouselApi | undefined) => {
      if (!emblaApi) return
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }, [])

    React.useEffect(() => {
      if (!api) return
      setApi?.(api)
      onSelect(api)
      api.on("reInit", onSelect).on("select", onSelect)
      return () => {
        api.off("reInit", onSelect).off("select", onSelect)
      }
    }, [api, onSelect, setApi])

    React.useEffect(() => {
      if (!api || !events) return

      const listeners = Object.entries(events).flatMap(([eventName, handler]) => {
        if (!handler) return []
        const listener = () => handler(api, eventName)
        api.on(eventName as never, listener as never)
        return [[eventName, listener] as const]
      })

      return () => {
        listeners.forEach(([eventName, listener]) => {
          api.off(eventName as never, listener as never)
        })
      }
    }, [api, events])

    const contextValue = React.useMemo<CarouselContextValue>(
      () => ({
        api: api!,
        basis,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }),
      [api, basis, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext]
    )

    const childArray = React.Children.toArray(children)
    const [content, ...controls] = childArray

    return (
      <CarouselContext.Provider value={contextValue}>
        <div ref={ref} className={cn("carousel", className)} {...props}>
          {controls.length > 0 ? (
            <div className="carousel__controls" data-slot="carousel-controls">
              {controls}
            </div>
          ) : null}
          <div ref={emblaRef} className="carousel__viewport">
            {content}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        className={cn("carousel__content", `carousel__content--${orientation}`, className)}
        {...props}
      />
    )
  }
)
CarouselContent.displayName = "CarouselContent"

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  basis?: CarouselItemBasis
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ basis: itemBasis, className, ...props }, ref) => {
    const { basis: contextBasis, orientation } = useCarousel()
    const basis = itemBasis ?? contextBasis

    return (
      <div
        ref={ref}
        className={cn(
          "carousel__item",
          `carousel__item--${orientation}`,
          `carousel__item--basis-${basis}`,
          className
        )}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel()

    return (
      <button
        ref={ref}
        type="button"
        className={cn("carousel__prev", className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous slide"
        {...props}
      >
        <ChevronLeft />
      </button>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel()

    return (
      <button
        ref={ref}
        type="button"
        className={cn("carousel__next", className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next slide"
        {...props}
      >
        <ChevronRight />
      </button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel }
