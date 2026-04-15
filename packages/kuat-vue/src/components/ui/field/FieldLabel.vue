<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@/lib/utils"
import "./field.css"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const attrs = useAttrs()
const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <label
    data-slot="field-label"
    :class="cn('field-label', props.class)"
    v-bind="delegatedAttrs"
  >
    <slot />
  </label>
</template>
