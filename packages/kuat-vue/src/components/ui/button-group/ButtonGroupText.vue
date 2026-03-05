<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('button-group-text', props.class)"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
@reference "../../../styles.css";

.button-group-text {
  @apply flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium leading-5;
  background-color: var(--muted);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.button-group-text :deep(svg:not([class*="size-"])) {
  @apply size-4;
}

.button-group-text :deep(svg) {
  @apply pointer-events-none;
}
</style>
