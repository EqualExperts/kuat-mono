<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { StatusBadgeType, StatusBadgeSize } from "./constants"
import { AlertCircle, BadgeInfo, CheckCircle2, XCircle } from "lucide-vue-next"
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    type?: StatusBadgeType
    size?: StatusBadgeSize
  }>(),
  {
    type: "success",
    size: "base",
  }
)

/* Icons per type match the Figma component (circle-check / circle-alert / circle-x / badge-info).
   Neutral has no icon by design. */
const icon = computed(() => {
  switch (props.type) {
    case "warning":
      return AlertCircle
    case "error":
      return XCircle
    case "info":
      return BadgeInfo
    case "neutral":
      return null
    default:
      return CheckCircle2
  }
})
</script>

<template>
  <span
    data-slot="status-badge"
    :data-type="props.type"
    :data-size="props.size"
    :class="
      cn(
        'status-badge',
        `status-badge--${props.type}`,
        `status-badge--size-${props.size}`,
        props.class
      )
    "
  >
    <component
      :is="icon"
      v-if="icon"
      aria-hidden="true"
      class="status-badge__icon"
      data-slot="status-badge-icon"
    />
    <slot />
  </span>
</template>

<style scoped>
@reference "../../../styles.css";

/* StatusBadge – non-interactive (no focus state). Fills are the raw brand ramps behind
   Callout's bar colours, not the mode-flipping --callout-* aliases: no dark-mode spec exists
   yet, so the badge renders identically in both modes. */

.status-badge {
  @apply inline-flex items-center justify-center gap-1.5 rounded-none px-2 py-[3px] font-semibold;
}

.status-badge--size-base {
  @apply text-xs leading-4 tracking-[0.18px];
}

.status-badge--size-large {
  @apply text-sm leading-[21px] tracking-[0.07px];
}

.status-badge__icon {
  @apply size-3 shrink-0;
}

.status-badge--success {
  @apply bg-uptime-green-500 text-white;
}

.status-badge--warning {
  @apply bg-equal-ember-500 text-white;
}

.status-badge--error {
  @apply bg-runtime-red-600 text-white;
}

.status-badge--info {
  @apply bg-ee-blue-500 text-white;
}

.status-badge--neutral {
  @apply bg-server-slate-200 text-neutral-950;
}
</style>
