<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { CounterBadgeType } from "./constants"
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    count: number
    /** Counts above this render as "{max}+". */
    max?: number
    type?: CounterBadgeType
  }>(),
  {
    max: 99,
    type: "primary",
  }
)

const display = computed(() =>
  props.count > props.max ? `${props.max}+` : String(props.count)
)
</script>

<template>
  <span
    data-slot="counter-badge"
    :data-type="props.type"
    :class="cn('counter-badge', `counter-badge--${props.type}`, props.class)"
  >
    {{ display }}
  </span>
</template>

<style scoped>
@reference "../../../styles.css";

/* CounterBadge – digits-only pill, designed to overlay the top-right of an icon or avatar.
   min-width keeps single digits circular. */

.counter-badge {
  @apply inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold leading-4 text-white tabular-nums;
}

.counter-badge--primary {
  @apply bg-primary;
}

.counter-badge--attention {
  @apply bg-destructive;
}
</style>
