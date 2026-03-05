<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, onMounted, ref, watch } from "vue"
import { cn } from "@/lib/utils"
import type { KuatRadialProgressColor, KuatRadialProgressSize } from "./constants"

const VIEWBOX_SIZE = 100
const STROKE_WIDTH = 4
const RADIUS = (VIEWBOX_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const CENTER = VIEWBOX_SIZE / 2

const props = withDefaults(
  defineProps<{
    /** Value from 0 to 100 */
    value: number
    size?: KuatRadialProgressSize
    /** Bar colour from Kuat palette */
    color?: KuatRadialProgressColor
    /** When true, animate from 0 to value on mount */
    animate?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  {
    size: "medium",
    color: "default",
    animate: false,
  }
)

const clampedValue = computed(() => Math.min(100, Math.max(0, props.value)))
const hasAnimated = ref(false)
const displayValue = ref(props.animate ? 0 : clampedValue.value)

onMounted(() => {
  if (props.animate) {
    displayValue.value = clampedValue.value
    hasAnimated.value = true
  }
})

watch(clampedValue, (val) => {
  if (!props.animate || hasAnimated.value) {
    displayValue.value = val
  }
})

const strokeDashoffset = computed(
  () => CIRCUMFERENCE * (1 - displayValue.value / 100)
)
const progressTransition = computed(() =>
  props.animate ? "stroke-dashoffset 0.6s ease-out" : undefined
)

const rootClasses = computed(() =>
  cn(
    "kuat-radial-progress",
    `kuat-radial-progress--${props.size}`,
    `kuat-radial-progress--${props.color}`,
    props.class
  )
)
</script>

<template>
  <div
    role="progressbar"
    :aria-valuenow="clampedValue"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuetext="`${Math.round(clampedValue)}%`"
    :class="rootClasses"
  >
    <svg
      class="kuat-radial-progress__svg"
      :viewBox="`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`"
      aria-hidden
    >
      <g :transform="`rotate(-90 ${CENTER} ${CENTER})`">
        <circle
          data-kuat-radial-progress-track
          :cx="CENTER"
          :cy="CENTER"
          :r="RADIUS"
          fill="none"
          stroke="var(--kuat-radial-progress-background-bar, var(--muted, #e5e7eb))"
          :style="{ strokeWidth: 'var(--kuat-radial-progress-stroke, 4)' }"
        />
        <circle
          data-kuat-radial-progress-arc
          :cx="CENTER"
          :cy="CENTER"
          :r="RADIUS"
          fill="none"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="strokeDashoffset"
          stroke-linecap="butt"
          :style="{
            strokeWidth: 'var(--kuat-radial-progress-stroke, 4)',
            ...(progressTransition ? { transition: progressTransition } : {}),
          }"
        />
      </g>
    </svg>
    <span
      class="kuat-radial-progress__label"
      aria-hidden
      data-kuat-radial-progress-label
    >
      {{ Math.round(clampedValue) }}%
    </span>
  </div>
</template>

<style scoped>
@reference "../../../styles.css";

.kuat-radial-progress {
  @apply relative inline-block;
}

.kuat-radial-progress--mini {
  width: var(--kuat-radial-progress-size-mini, 48px);
  height: var(--kuat-radial-progress-size-mini, 48px);
  @apply text-xs leading-4;
}

.kuat-radial-progress--small {
  width: var(--kuat-radial-progress-size-small, 64px);
  height: var(--kuat-radial-progress-size-small, 64px);
  @apply text-sm leading-5;
}

.kuat-radial-progress--medium {
  width: var(--kuat-radial-progress-size-medium, 96px);
  height: var(--kuat-radial-progress-size-medium, 96px);
  @apply text-base leading-6;
}

.kuat-radial-progress--large {
  width: var(--kuat-radial-progress-size-large, 128px);
  height: var(--kuat-radial-progress-size-large, 128px);
  @apply text-lg leading-7;
}

/* Track (full circle) – visible grey oval; token with fallback when theme not applied */
.kuat-radial-progress :deep([data-kuat-radial-progress-track]) {
  stroke: var(--kuat-radial-progress-background-bar, var(--muted, #e5e7eb));
}

.kuat-radial-progress__svg {
  @apply absolute inset-0 size-full;
}

.kuat-radial-progress__label {
  @apply absolute inset-0 flex items-center justify-center font-semibold leading-4 text-foreground;
  font-variant-numeric: tabular-nums;
}

/* Default = EE Blue */
.kuat-radial-progress--default :deep([data-kuat-radial-progress-arc]) {
  stroke: var(--ee-blue-500, #0066cc);
}

.kuat-radial-progress--primary :deep([data-kuat-radial-progress-arc]) {
  stroke: var(--primary);
}

.kuat-radial-progress--ee-blue :deep([data-kuat-radial-progress-arc]) {
  stroke: var(--ee-blue-500);
}

.kuat-radial-progress--tech-blue :deep([data-kuat-radial-progress-arc]) {
  stroke: var(--tech-blue-500);
}

.kuat-radial-progress--transform-teal :deep([data-kuat-radial-progress-arc]) {
  stroke: var(--transform-teal-500);
}

.kuat-radial-progress--equal-ember :deep([data-kuat-radial-progress-arc]) {
  stroke: var(--equal-ember-500);
}
</style>
