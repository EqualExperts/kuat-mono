<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import CarouselPrevious from "../carousel/CarouselPrevious.vue"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <CarouselPrevious :class="props.class" />
</template>
