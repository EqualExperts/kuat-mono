<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-vue-next"
import type { CalloutAction, CalloutType } from "./constants"
import { cn } from "@/lib/utils"

const CALLOUT_ICONS = {
  info: Info,
  positive: CheckCircle2,
  warning: AlertTriangle,
  issue: XCircle,
} as const

interface Props {
  class?: HTMLAttributes["class"]
  type?: CalloutType
  title: string
  description?: string
  icon?: boolean
  action?: CalloutAction
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  icon: true,
})

const iconComponent = computed(() => CALLOUT_ICONS[props.type])
</script>

<template>
  <div
    role="status"
    data-slot="callout"
    :data-type="props.type"
    :class="cn('callout', `callout--${props.type}`, props.class)"
  >
    <component
      :is="iconComponent"
      v-if="props.icon"
      aria-hidden="true"
      class="callout__icon"
      data-slot="callout-icon"
    />
    <div class="callout__content" data-slot="callout-content">
      <div class="callout__text-content">
        <p class="callout__title" data-slot="callout-title">{{ props.title }}</p>
        <p v-if="props.description != null" class="callout__description" data-slot="callout-description">
          {{ props.description }}
        </p>
        <a
          v-if="props.action"
          class="callout__action"
          data-slot="callout-action"
          :href="props.action.href"
          :target="props.action.target"
          @click="props.action.onClick"
        >
          {{ props.action.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles.css";

/* Callout – CSS-first variants. Tokens from @equal-experts/kuat-core. */

.callout {
  @apply flex items-start gap-3 border-l-4 border-solid p-4;
}

.callout__icon {
  @apply size-6 shrink-0 text-foreground;
}

.callout__content {
  @apply flex min-w-0 flex-col gap-2;
}

.callout__text-content {
  @apply flex flex-col gap-1;
}

.callout__title {
  @apply text-base font-semibold leading-6 text-foreground;
}

.callout__description {
  @apply text-sm font-normal leading-[21px] tracking-[0.07px] text-foreground;
}

.callout__action {
  @apply text-sm font-medium leading-[21px] tracking-[0.07px] text-callout-link underline;
}

.callout--info {
  @apply bg-callout-info border-callout-info-foreground;
}

.callout--positive {
  @apply bg-callout-positive border-callout-positive-foreground;
}

.callout--warning {
  @apply bg-callout-warning border-callout-warning-foreground;
}

.callout--issue {
  @apply bg-callout-issue border-callout-issue-foreground;
}
</style>
