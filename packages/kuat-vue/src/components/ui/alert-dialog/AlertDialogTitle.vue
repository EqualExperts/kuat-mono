<script setup lang="ts">
import type { AlertDialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogTitle } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogTitle
    v-bind="delegatedProps"
    :class="cn('alert-dialog-title', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>

<style scoped>
.alert-dialog-title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
}
</style>
