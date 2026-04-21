<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import CarouselItem from "../carousel/CarouselItem.vue"
import type { CarouselItemBasis } from "../carousel"

interface Props {
  class?: HTMLAttributes["class"]
  basis?: CarouselItemBasis
}

const props = defineProps<Props>()
</script>

<template>
  <CarouselItem :class="props.class" :basis="props.basis">
    <slot />
  </CarouselItem>
</template>
