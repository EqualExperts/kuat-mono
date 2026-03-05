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
@reference "../../../styles.css";

.alert-dialog-action {
  @apply inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-0 bg-primary px-4 py-2 text-sm font-medium leading-5 text-primary-foreground outline-none transition-colors;
  transition-duration: 150ms;
}

.alert-dialog-action:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, transparent);
}

.alert-dialog-action:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
</style>
