<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, provide, ref, toRef, watch } from "vue"
import useEmblaCarousel from "embla-carousel-vue"
import { cn } from "@/lib/utils"
import type { CarouselApi, CarouselItemBasis, CarouselOrientation } from "./context"
import { carouselContextKey } from "./context"
import "./carousel.css"

export type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1]

export type CarouselEventHandler = (api: CarouselApi, eventName: string) => void
export type CarouselEventHandlers = Partial<Record<string, CarouselEventHandler>>

interface Props {
  class?: HTMLAttributes["class"]
  opts?: Record<string, unknown>
  basis?: CarouselItemBasis
  orientation?: CarouselOrientation
  plugins?: CarouselPlugins
  setApi?: (api: CarouselApi | undefined) => void
  events?: CarouselEventHandlers
}

const props = withDefaults(defineProps<Props>(), {
  basis: 1,
  orientation: "horizontal",
})

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    ...props.opts,
    axis: props.orientation === "horizontal" ? "x" : "y",
  },
  props.plugins
)

const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}

const scrollNext = () => {
  emblaApi.value?.scrollNext()
}

const updateScrollState = () => {
  if (!emblaApi.value) return
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
}

watch(
  emblaApi,
  (api, _oldApi, onCleanup) => {
    props.setApi?.(api)
    if (!api) return
    updateScrollState()
    api.on("reInit", updateScrollState).on("select", updateScrollState)
    onCleanup(() => {
      api.off("reInit", updateScrollState).off("select", updateScrollState)
    })
  },
  { immediate: true }
)

watch(
  emblaApi,
  (api, _oldApi, onCleanup) => {
    if (!api || !props.events) return

    const listeners = Object.entries(props.events).flatMap(([eventName, handler]) => {
      if (!handler) return []
      const listener = () => handler(api, eventName)
      api.on(eventName as never, listener as never)
      return [[eventName, listener] as const]
    })

    onCleanup(() => {
      listeners.forEach(([eventName, listener]) => {
        api.off(eventName as never, listener as never)
      })
    })
  },
  { immediate: true }
)

provide(carouselContextKey, {
  api: emblaApi,
  basis: toRef(() => props.basis),
  orientation: toRef(() => props.orientation),
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
})

const rootClass = computed(() => cn("carousel", props.class))
</script>

<template>
  <div :class="rootClass">
    <div v-if="$slots.controls" class="carousel__controls" data-slot="carousel-controls">
      <slot name="controls" />
    </div>
    <div ref="emblaRef" class="carousel__viewport">
      <slot name="content" />
    </div>
  </div>
</template>
