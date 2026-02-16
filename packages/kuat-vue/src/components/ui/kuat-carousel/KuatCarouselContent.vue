<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

const carousel = inject<{
  orientation: { value: "horizontal" | "vertical" }
}>("kuatCarousel")

const orientation = computed(() => carousel?.orientation?.value ?? "horizontal")

const contentClass = computed(() =>
  cn(
    "kuat-carousel__content",
    `kuat-carousel__content--${orientation.value}`,
    props.class
  )
)
</script>

<template>
  <div :class="contentClass">
    <slot />
  </div>
</template>
