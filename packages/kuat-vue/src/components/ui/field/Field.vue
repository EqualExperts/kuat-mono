<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@/lib/utils"
import { type FieldOrientation } from "./constants"
import "./field.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    orientation?: FieldOrientation
    as?: string
  }>(),
  {
    orientation: "responsive",
    as: "div",
  }
)

const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _c, "data-slot": _slot, ...rest } = attrs as Record<string, unknown>
  return rest
})

const dataSlot = computed(() => {
  const slot = (attrs as Record<string, unknown>)["data-slot"]
  return typeof slot === "string" ? slot : "field"
})
</script>

<template>
  <component
    :is="as"
    :class="cn('field', `field--orientation-${orientation}`, props.class)"
    :data-slot="dataSlot"
    v-bind="delegatedAttrs"
  >
    <slot />
  </component>
</template>
