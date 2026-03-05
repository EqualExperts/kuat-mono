<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonGroupOrientation } from "./constants"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    orientation?: ButtonGroupOrientation
  }>(),
  {
    orientation: "horizontal",
  }
)
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="cn('button-group', `button-group--${props.orientation}`, props.class)"
  >
    <slot />
  </div>
</template>

<style scoped>
@reference "../../../styles.css";

.button-group {
  @apply flex w-fit items-stretch;
}

.button-group:has(> [data-slot="button-group"]) {
  @apply gap-2;
}

.button-group > *:focus-visible {
  @apply relative z-10;
}

.button-group:has(select[aria-hidden="true"]:last-child)
  > [data-slot="select-trigger"]:last-of-type {
  @apply rounded-b-md rounded-t-md;
}

.button-group [data-slot="select-trigger"]:not([class*="w-"]) {
  @apply w-fit;
}

.button-group > input {
  @apply flex-1;
}

.button-group--horizontal > *:not(:first-child) {
  @apply rounded-b-none rounded-l-none rounded-t-none border-l-0;
}

.button-group--horizontal > *:not(:last-child) {
  @apply rounded-b-none rounded-r-none rounded-t-none;
}

.button-group--vertical {
  @apply flex-col;
}

.button-group--vertical > *:not(:first-child) {
  @apply rounded-l-none rounded-r-none rounded-t-none border-t-0;
}

.button-group--vertical > *:not(:last-child) {
  @apply rounded-b-none rounded-l-none rounded-r-none;
}
</style>
