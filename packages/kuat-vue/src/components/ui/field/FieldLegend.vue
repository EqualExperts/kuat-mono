<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@/lib/utils"
import { type FieldLegendVariant } from "./constants"
import "./field.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    variant?: FieldLegendVariant
  }>(),
  {
    variant: "legend",
  }
)

const attrs = useAttrs()
const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <legend
    data-slot="field-legend"
    :class="cn('field-legend', `field-legend--${variant}`, props.class)"
    v-bind="delegatedAttrs"
  >
    <slot />
  </legend>
</template>
