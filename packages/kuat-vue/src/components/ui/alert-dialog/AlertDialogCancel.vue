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
.alert-dialog-cancel {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  transition-property: color, background-color, border-color, opacity;
  transition-duration: 150ms;
  outline: none;
  cursor: pointer;
  border: 1px solid var(--input);
  background-color: var(--background);
  color: var(--foreground);
  height: 2.5rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
}

.alert-dialog-cancel:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.alert-dialog-cancel:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}

@media (min-width: 640px) {
  .alert-dialog-cancel {
    margin-top: 0;
  }
}
</style>
