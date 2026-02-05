<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, computed } from "vue"
import { ChevronLeft } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

const carousel = inject<{
  scrollPrev: () => void
  canScrollPrev: { value: boolean }
}>("kuatCarousel")

const canScrollPrev = computed(() => carousel?.canScrollPrev?.value ?? false)

const buttonClass = computed(() =>
  cn(
    "absolute top-0 right-8 z-10 flex h-8 w-8 items-center justify-center rounded-[6px] bg-primary text-primary-foreground shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
    props.class
  )
)
</script>

<template>
  <button
    type="button"
    :class="buttonClass"
    :disabled="!canScrollPrev"
    aria-label="Previous slide"
    @click="carousel?.scrollPrev()"
  >
    <ChevronLeft class="h-4 w-4" />
  </button>
</template>
