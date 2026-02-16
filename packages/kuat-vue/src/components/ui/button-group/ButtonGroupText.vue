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
.button-group-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  background-color: var(--muted);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.button-group-text :deep(svg:not([class*="size-"])) {
  width: 1rem;
  height: 1rem;
}

.button-group-text :deep(svg) {
  pointer-events: none;
}
</style>
