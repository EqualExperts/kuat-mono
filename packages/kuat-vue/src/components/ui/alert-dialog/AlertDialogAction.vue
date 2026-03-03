<script setup lang="ts">
import type { AlertDialogActionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogAction } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn('alert-dialog-action', props.class)">
    <slot />
  </AlertDialogAction>
</template>

<style scoped>
.alert-dialog-action {
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
  border: none;
  cursor: pointer;
  background-color: var(--primary);
  color: var(--primary-foreground);
  height: 2.5rem;
  padding: 0.5rem 1rem;
}

.alert-dialog-action:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, transparent);
}

.alert-dialog-action:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
</style>
