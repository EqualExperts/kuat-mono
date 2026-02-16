<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('alert-dialog-header', props.class)">
    <slot />
  </div>
</template>

<style scoped>
.alert-dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

@media (min-width: 640px) {
  .alert-dialog-header {
    text-align: left;
  }
}
</style>
