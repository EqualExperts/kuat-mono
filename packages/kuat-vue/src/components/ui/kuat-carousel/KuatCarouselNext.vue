<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, computed } from "vue"
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

const carousel = inject<{
  scrollNext: () => void
  canScrollNext: { value: boolean }
}>("kuatCarousel")

const canScrollNext = computed(() => carousel?.canScrollNext?.value ?? false)

const buttonClass = computed(() =>
  cn(
    "absolute top-0 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-[6px] bg-primary text-primary-foreground shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
    props.class
  )
)
</script>

<template>
  <button
    type="button"
    :class="buttonClass"
    :disabled="!canScrollNext"
    aria-label="Next slide"
    @click="carousel?.scrollNext()"
  >
    <ChevronRight class="h-4 w-4" />
  </button>
</template>
