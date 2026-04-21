<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import CarouselNext from "../carousel/CarouselNext.vue"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <CarouselNext :class="props.class" />
</template>
