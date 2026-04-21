<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import CarouselContent from "../carousel/CarouselContent.vue"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <CarouselContent :class="props.class">
    <slot />
  </CarouselContent>
</template>
