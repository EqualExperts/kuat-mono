<script setup lang="ts">
import type { AlertDialogCancelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogCancel } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogCancel v-bind="delegatedProps" :class="cn('alert-dialog-cancel', props.class)">
    <slot />
  </AlertDialogCancel>
</template>

<style scoped>
@reference "../../../styles.css";

.alert-dialog-cancel {
  @apply mt-2 inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium leading-5 text-foreground outline-none transition-colors;
  transition-duration: 150ms;
}

.alert-dialog-cancel:hover {
  @apply bg-accent text-accent-foreground;
}

.alert-dialog-cancel:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}

@media (min-width: 640px) {
  .alert-dialog-cancel {
    @apply mt-0;
  }
}
</style>
