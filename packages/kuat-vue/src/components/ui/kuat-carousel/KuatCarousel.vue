<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import Carousel from "../carousel/Carousel.vue"
import type { CarouselApi, CarouselEventHandlers, CarouselOrientation } from "../carousel"

export type KuatCarouselSlidesPerView = 1 | 2 | 3

interface Props {
  class?: HTMLAttributes["class"]
  opts?: Record<string, unknown>
  plugins?: unknown[]
  events?: CarouselEventHandlers
  setApi?: (api: CarouselApi | undefined) => void
  slidesPerView?: KuatCarouselSlidesPerView
  orientation?: CarouselOrientation
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  orientation: "horizontal",
})
</script>

<template>
  <Carousel
    :class="props.class"
    :opts="props.opts"
    :plugins="props.plugins"
    :events="props.events"
    :set-api="props.setApi"
    :basis="props.slidesPerView"
    :orientation="props.orientation"
  >
    <template #controls>
      <slot name="controls" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </Carousel>
</template>
