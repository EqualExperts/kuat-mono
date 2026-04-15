<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { cn } from "@/lib/utils"
import "./field.css"

defineOptions({ inheritAttrs: false })

type FieldIssue = { message?: string } | undefined

const props = defineProps<{
  class?: HTMLAttributes["class"]
  errors?: FieldIssue[] | FieldIssue
  issues?: FieldIssue[]
}>()

const attrs = useAttrs()
const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const errorMessages = computed(() => {
  const fromErrors = Array.isArray(props.errors)
    ? props.errors
    : props.errors
      ? [props.errors]
      : []
  const fromIssues = props.issues ?? []
  return [...fromErrors, ...fromIssues]
    .map((issue) => issue?.message?.trim())
    .filter((message): message is string => Boolean(message))
})
</script>

<template>
  <div
    v-if="$slots.default || errorMessages.length"
    data-slot="field-error"
    :class="cn('field-error', props.class)"
    v-bind="delegatedAttrs"
  >
    <slot v-if="$slots.default" />
    <span v-else-if="errorMessages.length === 1">{{ errorMessages[0] }}</span>
    <ul v-else-if="errorMessages.length > 1" class="field-error__list">
      <li v-for="message in errorMessages" :key="message">{{ message }}</li>
    </ul>
  </div>
</template>
