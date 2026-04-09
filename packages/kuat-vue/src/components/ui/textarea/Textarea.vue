<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@/lib/utils"
import type { TextareaResize } from "./constants"
import "./textarea.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    resize?: TextareaResize
  }>(),
  { resize: "vertical" }
)

const model = defineModel<string>({ required: false })
const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <textarea
    data-slot="textarea"
    :class="cn('textarea', `textarea--resize-${props.resize}`, props.class)"
    v-bind="delegatedAttrs"
    v-model="model"
  />
</template>
