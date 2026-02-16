<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

const carousel = inject<{
  slidesPerView: { value: 1 | 2 | 3 }
  orientation: { value: "horizontal" | "vertical" }
}>("kuatCarousel")

const slidesPerView = computed(() => carousel?.slidesPerView?.value ?? 1)
const orientation = computed(() => carousel?.orientation?.value ?? "horizontal")

const itemClass = computed(() =>
  cn(
    "kuat-carousel__item",
    `kuat-carousel__item--${orientation.value}`,
    `kuat-carousel__item--basis-${slidesPerView.value}`,
    props.class
  )
)
</script>

<template>
  <div :class="itemClass">
    <slot />
  </div>
</template>
