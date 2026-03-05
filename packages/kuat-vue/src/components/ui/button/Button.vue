<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariant, ButtonSize } from "./constants"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  variant?: ButtonVariant
  size?: ButtonSize
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(
      'button',
      `button--variant-${props.variant}`,
      `button--size-${props.size}`,
      props.class
    )"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
@reference "../../../styles.css";

.button {
  @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors;
  transition-duration: 150ms;
  transition-timing-function: default;
}

.button:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}

.button:disabled {
  @apply pointer-events-none opacity-50;
}

.button :deep(svg) {
  @apply pointer-events-none size-4 shrink-0;
}

.button--variant-default {
  @apply bg-primary text-primary-foreground;
}

.button--variant-default:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, transparent);
}

.button--variant-destructive {
  @apply bg-destructive text-destructive-foreground;
}

.button--variant-destructive:hover {
  background-color: color-mix(in srgb, var(--destructive) 90%, transparent);
}

.button--variant-outline {
  @apply border border-input bg-background text-foreground;
}

.button--variant-outline:hover {
  @apply bg-accent text-accent-foreground;
}

.button--variant-secondary {
  @apply bg-secondary text-secondary-foreground;
}

.button--variant-secondary:hover {
  background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
}

.button--variant-ghost:hover {
  @apply bg-accent text-accent-foreground;
}

.button--variant-link {
  @apply text-primary underline-offset-4;
}

.button--variant-link:hover {
  @apply underline;
}

.button--size-default {
  @apply h-10 px-4 py-2;
}

.button--size-sm {
  @apply h-9 rounded-md px-3;
}

.button--size-lg {
  @apply h-11 rounded-md px-8;
}

.button--size-icon {
  @apply size-10;
}

.button--size-icon-sm {
  @apply size-9;
}

.button--size-icon-lg {
  @apply size-11;
}
</style>
