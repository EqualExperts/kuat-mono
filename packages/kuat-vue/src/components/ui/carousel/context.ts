import type { InjectionKey, Ref } from "vue"
import type useEmblaCarousel from "embla-carousel-vue"

export type CarouselOrientation = "horizontal" | "vertical"
export type CarouselItemBasis = 1 | 2 | 3
export interface CarouselResponsiveBasis {
  sm?: CarouselItemBasis
  md?: CarouselItemBasis
  lg?: CarouselItemBasis
  xl?: CarouselItemBasis
  "2xl"?: CarouselItemBasis
}
type EmblaApiRef = ReturnType<typeof useEmblaCarousel>[1]
export type CarouselApi = NonNullable<EmblaApiRef["value"]>

export interface CarouselContextValue {
  api: Ref<CarouselApi | undefined>
  basis: Ref<CarouselItemBasis>
  responsiveBasis: Ref<CarouselResponsiveBasis>
  orientation: Ref<CarouselOrientation>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
}

export const carouselContextKey: InjectionKey<CarouselContextValue> = Symbol("carousel")
