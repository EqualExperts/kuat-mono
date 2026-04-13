<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@/lib/utils"
import type { InputSize } from "./constants"
import "./input.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    size?: InputSize
  }>(),
  { size: "regular" }
)

const model = defineModel<string>({ required: false })
const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <div
    data-slot="input"
    :class="cn('input', `input--size-${props.size}`, props.class)"
  >
    <span
      v-if="$slots.leftDecoration"
      class="input__decoration input__decoration--left"
    >
      <slot name="leftDecoration" />
    </span>
    <input
      data-slot="input-field"
      class="input__field"
      v-bind="delegatedAttrs"
      v-model="model"
    />
    <span
      v-if="$slots.rightDecoration"
      class="input__decoration input__decoration--right"
    >
      <slot name="rightDecoration" />
    </span>
  </div>
</template>
