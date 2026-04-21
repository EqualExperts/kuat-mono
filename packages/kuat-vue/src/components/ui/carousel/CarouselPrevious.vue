<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { ChevronLeft } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { carouselContextKey } from "./context"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const carousel = inject(carouselContextKey)

const buttonClass = computed(() => cn("carousel__prev", props.class))
</script>

<template>
  <button
    type="button"
    :class="buttonClass"
    :disabled="!(carousel?.canScrollPrev.value ?? false)"
    aria-label="Previous slide"
    @click="carousel?.scrollPrev()"
  >
    <ChevronLeft />
  </button>
</template>
