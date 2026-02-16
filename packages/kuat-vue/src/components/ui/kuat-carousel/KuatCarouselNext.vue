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
  cn("kuat-carousel__next", props.class)
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
    <ChevronRight />
  </button>
</template>
