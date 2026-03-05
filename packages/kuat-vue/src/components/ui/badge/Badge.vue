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
@reference "../../../styles.css";

/* Badge – non-interactive (no focus state). */
.badge {
  @apply inline-flex items-center gap-1 border px-2.5 py-0.5 text-xs font-semibold leading-4 transition-colors;
}

.badge--roundness-default {
  @apply rounded-md;
}

.badge--roundness-round {
  @apply rounded-full;
}

.badge--default {
  @apply border-transparent bg-primary text-primary-foreground;
}

.badge--secondary {
  @apply border-transparent bg-secondary text-secondary-foreground;
}

.badge--destructive {
  @apply border-transparent bg-destructive text-destructive-foreground;
}

.badge--outline {
  @apply text-foreground;
}

.badge--ghost {
  @apply border-transparent bg-transparent text-foreground;
}
</style>
