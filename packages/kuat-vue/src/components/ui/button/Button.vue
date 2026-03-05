<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariant, ButtonSize, ButtonColor } from "./constants"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import "./button.css"

interface Props extends PrimitiveProps {
  variant?: ButtonVariant | "default"
  size?: ButtonSize | "sm" | "lg"
  color?: ButtonColor
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "primary",
  size: "default",
  color: "ee-blue",
})

function normalizeVariant(v: Props["variant"]): ButtonVariant {
  if (v === "default") return "primary"
  return (v ?? "primary") as ButtonVariant
}

function normalizeSize(s: Props["size"]): ButtonSize {
  if (s === "sm") return "small"
  if (s === "lg") return "large"
  return (s ?? "default") as ButtonSize
}
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(
      'button',
      `button--variant-${normalizeVariant(props.variant)}`,
      normalizeVariant(props.variant) === 'destructive' ? [] : `button--color-${props.color}`,
      `button--size-${normalizeSize(props.size)}`,
      props.class
    )"
  >
    <slot />
  </Primitive>
</template>
