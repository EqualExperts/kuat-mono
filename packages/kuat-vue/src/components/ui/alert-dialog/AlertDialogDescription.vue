<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  AlertDialogDescription,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="cn('alert-dialog-description', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>

<style scoped>
.alert-dialog-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--muted-foreground);
}
</style>
