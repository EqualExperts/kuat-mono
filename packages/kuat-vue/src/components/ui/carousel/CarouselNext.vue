<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { carouselContextKey } from "./context"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const carousel = inject(carouselContextKey)

const buttonClass = computed(() => cn("carousel__next", props.class))
</script>

<template>
  <button
    type="button"
    :class="buttonClass"
    :disabled="!(carousel?.canScrollNext.value ?? false)"
    aria-label="Next slide"
    @click="carousel?.scrollNext()"
  >
    <ChevronRight />
  </button>
</template>
