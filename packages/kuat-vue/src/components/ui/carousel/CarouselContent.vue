<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { cn } from "@/lib/utils"
import { carouselContextKey } from "./context"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const carousel = inject(carouselContextKey)

const contentClass = computed(() =>
  cn(
    "carousel__content",
    `carousel__content--${carousel?.orientation.value ?? "horizontal"}`,
    props.class
  )
)
</script>

<template>
  <div :class="contentClass">
    <slot />
  </div>
</template>
