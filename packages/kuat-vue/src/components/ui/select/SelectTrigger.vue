<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectTriggerProps } from "reka-ui"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SelectIcon, SelectTrigger as RekaSelectTrigger } from "reka-ui"
import { ChevronDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import type { SelectLines, SelectSize } from "./constants"
import "./select.css"

const props = withDefaults(
  defineProps<
    SelectTriggerProps & {
      class?: HTMLAttributes["class"]
      size?: SelectSize
      lines?: SelectLines
      label?: string
      prepend?: string
      decoration?: string
      invalid?: boolean
    }
  >(),
  {
    size: "regular",
    lines: "single",
    label: undefined,
    prepend: undefined,
    decoration: undefined,
    invalid: false,
  }
)

const delegatedProps = reactiveOmit(
  props,
  "class",
  "size",
  "lines",
  "label",
  "prepend",
  "decoration",
  "invalid"
)

const isInvalid = computed(() => {
  const ariaInvalid = (delegatedProps as Record<string, unknown>)["aria-invalid"]
  return props.invalid || ariaInvalid === true || ariaInvalid === "true"
})
</script>

<template>
  <RekaSelectTrigger
    data-slot="select-trigger"
    v-bind="delegatedProps"
    :class="
      cn(
        'select-trigger',
        `select-trigger--size-${props.size}`,
        `select-trigger--lines-${props.lines}`,
        props.class
      )
    "
    :aria-invalid="isInvalid ? true : undefined"
  >
    <span v-if="props.prepend || $slots.prepend" class="select-trigger__prepend">
      <slot name="prepend">{{ props.prepend }}</slot>
    </span>

    <span class="select-trigger__value-wrap">
      <span v-if="props.label || $slots.label" class="select-trigger__label">
        <slot name="label">{{ props.label }}</slot>
      </span>
      <slot />
    </span>

    <span v-if="props.decoration || $slots.decoration" class="select-trigger__decoration">
      <slot name="decoration">{{ props.decoration }}</slot>
    </span>

    <SelectIcon>
      <ChevronDown class="select-trigger__icon size-4" aria-hidden="true" />
    </SelectIcon>
  </RekaSelectTrigger>
</template>
