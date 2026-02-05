<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"

const BASIS_MAP = {
  1: "basis-full",
  2: "basis-1/2",
  3: "basis-1/3",
} as const

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

const basisClass = computed(() => BASIS_MAP[slidesPerView.value])

const itemClass = computed(() =>
  cn(
    "min-w-0 shrink-0 grow-0 rounded-[6px] shadow-sm",
    orientation.value === "horizontal" ? `pl-2 ${basisClass.value}` : `pt-2 ${basisClass.value}`,
    props.class
  )
)
</script>

<template>
  <div :class="itemClass">
    <slot />
  </div>
</template>
