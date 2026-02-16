<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('alert-dialog-footer', props.class)">
    <slot />
  </div>
</template>

<style scoped>
.alert-dialog-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .alert-dialog-footer {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
