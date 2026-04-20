<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { Toaster } from "vue-sonner"

import { cn } from "@/lib/utils"
import type { SonnerPosition } from "./constants"

defineOptions({ inheritAttrs: false })

type ClassNamesMap = Record<string, string>
type ToastOptions = {
  classNames?: ClassNamesMap
} & Record<string, unknown>

const props = withDefaults(
  defineProps<{
    class?: string
    containerAriaLabel?: string
    expand?: boolean
    position?: SonnerPosition
    toastOptions?: ToastOptions
    visibleToasts?: number
  }>(),
  {
    containerAriaLabel: "Notifications",
    expand: false,
    position: "top-right",
    visibleToasts: 3,
  },
)

const attrs = useAttrs()

const mergedToastOptions = computed(() => {
  const incoming = props.toastOptions ?? ({} as ToastOptions)

  return {
    ...incoming,
    classNames: {
      toast: "kuat-sonner__toast",
      title: "kuat-sonner__title",
      description: "kuat-sonner__description",
      content: "kuat-sonner__content",
      icon: "kuat-sonner__icon",
      actionButton: "kuat-sonner__action",
      cancelButton: "kuat-sonner__cancel",
      loader: "kuat-sonner__loader",
      ...incoming.classNames,
    },
  }
})

const resolvedToastOptions = computed(() => mergedToastOptions.value as any)
</script>

<template>
  <Toaster
    :class="cn('kuat-sonner__toaster', props.class)"
    :container-aria-label="props.containerAriaLabel"
    :expand="props.expand"
    :position="props.position"
    :visible-toasts="props.visibleToasts"
    :toast-options="resolvedToastOptions"
    v-bind="attrs"
  />
</template>

<style>
@reference "../../../styles.css";

.kuat-sonner__toaster {
  --width: 22.25rem;
}

.kuat-sonner__toast {
  @apply w-[var(--width)] rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm;
}

.kuat-sonner__content {
  @apply flex min-w-0 items-start gap-3;
}

.kuat-sonner__icon {
  @apply mt-0.5 shrink-0 text-muted-foreground;
}

.kuat-sonner__text {
  @apply min-w-0 flex-1;
}

.kuat-sonner__title {
  @apply text-sm font-semibold leading-[1.3125rem] text-foreground;
}

.kuat-sonner__description {
  @apply mt-1 text-sm leading-[1.3125rem] text-muted-foreground;
}

.kuat-sonner__action,
.kuat-sonner__cancel {
  @apply h-6 rounded px-2 text-[0.625rem] font-semibold leading-[1.3125rem] transition-colors;
}

.kuat-sonner__action {
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
}

.kuat-sonner__cancel {
  @apply border border-border bg-background text-foreground hover:bg-muted;
}

.kuat-sonner__loader {
  @apply inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-muted-foreground;
}

.kuat-sonner__loading-spinner {
  @apply inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-muted-foreground;
}
</style>
