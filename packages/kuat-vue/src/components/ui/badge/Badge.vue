<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariant, BadgeRoundness } from "./constants"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  variant?: BadgeVariant
  roundness?: BadgeRoundness
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  variant: "default",
  roundness: "default",
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('badge', `badge--${props.variant}`, `badge--roundness-${props.roundness}`, props.class)"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
/* Badge – non-interactive (no focus state). */
.badge {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  border-width: 1px;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  transition-property: color, background-color, border-color;
  transition-timing-function: default;
  transition-duration: 150ms;
}

.badge--roundness-default {
  border-radius: 6px;
}

.badge--roundness-round {
  border-radius: 9999px;
}

.badge--default {
  border-color: transparent;
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.badge--secondary {
  border-color: transparent;
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.badge--destructive {
  border-color: transparent;
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

.badge--outline {
  color: var(--foreground);
}

.badge--ghost {
  border-color: transparent;
  background-color: transparent;
  color: var(--foreground);
}
</style>
