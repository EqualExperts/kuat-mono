<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { cn } from "@/lib/utils"
import type { CarouselItemBasis } from "./context"
import { carouselContextKey } from "./context"

interface Props {
  class?: HTMLAttributes["class"]
  basis?: CarouselItemBasis
}

const props = defineProps<Props>()
const carousel = inject(carouselContextKey)

const resolvedBasis = computed(() => props.basis ?? carousel?.basis.value ?? 1)

const itemClass = computed(() =>
  cn(
    "carousel__item",
    `carousel__item--${carousel?.orientation.value ?? "horizontal"}`,
    `carousel__item--basis-${resolvedBasis.value}`,
    props.class
  )
)
</script>

<template>
  <div :class="itemClass">
    <slot />
  </div>
</template>
