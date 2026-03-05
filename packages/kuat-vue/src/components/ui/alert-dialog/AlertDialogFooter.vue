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
@reference "../../../styles.css";

.alert-dialog-footer {
  @apply flex flex-col-reverse gap-2;
}

@media (min-width: 640px) {
  .alert-dialog-footer {
    @apply flex-row justify-end;
  }
}
</style>
