<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AlertDialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay class="alert-dialog-overlay" />
    <AlertDialogContent
      v-bind="forwarded"
      :class="cn('alert-dialog-content', props.class)"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<style scoped>
@reference "../../../styles.css";

.alert-dialog-overlay {
  @apply fixed inset-0 z-50;
  background-color: rgb(0 0 0 / 0.8);
}

.alert-dialog-overlay[data-state="open"] {
  animation: alert-dialog-fade-in 0.15s ease-out;
}

.alert-dialog-overlay[data-state="closed"] {
  animation: alert-dialog-fade-out 0.15s ease-out;
}

.alert-dialog-content {
  @apply fixed left-1/2 top-1/2 z-50 grid w-full max-w-xl -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 transition-[duration:200ms];
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.alert-dialog-content[data-state="open"] {
  animation: alert-dialog-content-in 0.2s ease-out;
}

.alert-dialog-content[data-state="closed"] {
  animation: alert-dialog-content-out 0.2s ease-out;
}

@media (min-width: 640px) {
  .alert-dialog-content {
    @apply rounded-lg;
  }
}

@keyframes alert-dialog-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes alert-dialog-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes alert-dialog-content-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes alert-dialog-content-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
}
</style>
