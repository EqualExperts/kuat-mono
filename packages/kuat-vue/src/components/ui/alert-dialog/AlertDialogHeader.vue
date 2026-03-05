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
@reference "../../../styles.css";

.alert-dialog-header {
  @apply flex flex-col gap-2 text-center;
}

@media (min-width: 640px) {
  .alert-dialog-header {
    @apply text-left;
  }
}
</style>
