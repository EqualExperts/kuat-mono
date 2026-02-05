<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ref, computed, watch, provide } from "vue"
import useEmblaCarousel from "embla-carousel-vue"
import { cn } from "@/lib/utils"

export type KuatCarouselSlidesPerView = 1 | 2 | 3

interface Props {
  class?: HTMLAttributes["class"]
  opts?: Record<string, unknown>
  slidesPerView?: KuatCarouselSlidesPerView
  orientation?: "horizontal" | "vertical"
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  orientation: "horizontal",
})

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    ...props.opts,
    axis: props.orientation === "horizontal" ? "x" : "y",
  },
  undefined
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

watch(emblaApi, (api) => {
  if (!api) return
  updateScrollState()
  api.on("reInit", updateScrollState).on("select", updateScrollState)
  return () => {
    api.off("reInit", updateScrollState).off("select", updateScrollState)
  }
}, { immediate: true })

provide("kuatCarousel", {
  api: emblaApi,
  slidesPerView: computed(() => props.slidesPerView),
  orientation: computed(() => props.orientation),
  scrollPrev,
  scrollNext,
  canScrollPrev: computed(() => canScrollPrev.value),
  canScrollNext: computed(() => canScrollNext.value),
})

const rootClass = computed(() =>
  cn("relative w-full", props.class)
)
</script>

<template>
  <div :class="rootClass">
    <div ref="emblaRef" class="overflow-hidden">
      <slot name="content" />
    </div>
    <slot name="controls" />
  </div>
</template>
