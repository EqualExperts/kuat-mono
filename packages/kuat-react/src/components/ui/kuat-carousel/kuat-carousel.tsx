"use client"

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "../carousel"
import type {
  CarouselEventHandler,
  CarouselEventHandlers,
  CarouselContentProps,
  CarouselItemProps,
  CarouselProps,
  CarouselItemBasis,
} from "../carousel"

export type KuatCarouselSlidesPerView = CarouselItemBasis

export interface KuatCarouselProps extends Omit<CarouselProps, "basis"> {
  slidesPerView?: KuatCarouselSlidesPerView
}

const KuatCarousel = React.forwardRef<HTMLDivElement, KuatCarouselProps>(
  ({ slidesPerView = 1, ...props }, ref) => {
    return <Carousel ref={ref} basis={slidesPerView} {...props} />
  }
)
KuatCarousel.displayName = "KuatCarousel"

type KuatCarouselContentProps = CarouselContentProps
type KuatCarouselItemProps = CarouselItemProps

const KuatCarouselContent = CarouselContent
const KuatCarouselItem = CarouselItem
const KuatCarouselPrevious = CarouselPrevious
const KuatCarouselNext = CarouselNext
const useKuatCarousel = useCarousel

export type { KuatCarouselContentProps, KuatCarouselItemProps, CarouselEventHandler, CarouselEventHandlers }
export {
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
  useKuatCarousel,
}
