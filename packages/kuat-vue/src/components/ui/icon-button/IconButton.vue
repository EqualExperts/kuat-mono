<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import type { ButtonVariant, ButtonColor } from "../button/constants"
import type { IconButtonSize, IconButtonRoundness } from "./constants"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import "./icon-button.css"

interface Props extends PrimitiveProps {
  variant?: ButtonVariant | "default"
  size?: IconButtonSize | "sm" | "lg"
  color?: ButtonColor
  roundness?: IconButtonRoundness
  type?: "button" | "submit" | "reset"
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "primary",
  size: "regular",
  color: "ee-blue",
  roundness: "default",
  type: "button",
})

function normalizeVariant(v: Props["variant"]): ButtonVariant {
  if (v === "default") return "primary"
  return (v ?? "primary") as ButtonVariant
}

function normalizeSize(s: Props["size"]): IconButtonSize {
  if (s === "sm") return "small"
  if (s === "lg") return "large"
  return (s ?? "regular") as IconButtonSize
}

const v = computed(() => normalizeVariant(props.variant))
const s = computed(() => normalizeSize(props.size))
const isDestructive = computed(() => v.value === "destructive")

const nativeType = computed(() => {
  if (props.asChild) return undefined
  if (props.as !== "button") return undefined
  return props.type
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :type="nativeType"
    :class="
      cn(
        'button',
        'icon-button',
        `button--variant-${v}`,
        isDestructive ? [] : `button--color-${color}`,
        `icon-button--size-${s}`,
        `icon-button--roundness-${roundness}`,
        props.class
      )
    "
  >
    <slot />
  </Primitive>
</template>
