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
  cn("kuat-carousel__prev", props.class)
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
    <ChevronLeft />
  </button>
</template>
