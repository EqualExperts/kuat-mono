<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs, useId } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import Checkbox from "./Checkbox.vue"
import type { CheckboxFieldAppearance, CheckboxFieldLayout } from "./constants"
import "./checkbox-field.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    label: string
    secondaryText?: string
    appearance?: CheckboxFieldAppearance
    layout?: CheckboxFieldLayout
    flipped?: boolean
    id?: string
    disabled?: boolean
  }>(),
  {
    appearance: "plain",
    layout: "inline",
    flipped: false,
  }
)

const model = defineModel<boolean | "indeterminate">({ required: false })

const attrs = useAttrs()

const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)

const hasSecondary = computed(() => props.secondaryText != null)

const checkboxProps = reactiveOmit(props, [
  "label",
  "secondaryText",
  "appearance",
  "layout",
  "flipped",
  "id",
  "class",
  "disabled",
])

/** Field props for the inner Checkbox plus fallthrough attrs (e.g. aria-invalid). */
const checkboxBind = computed(() => {
  const { class: _c, ...fromAttrs } = attrs as Record<string, unknown>
  return { ...checkboxProps, ...fromAttrs }
})

const isInvalid = computed(() => {
  const v = checkboxBind.value["aria-invalid"]
  return v === true || v === "true"
})
</script>

<template>
  <div
    data-slot="checkbox-field"
    :class="
      cn(
        'checkbox-field',
        `checkbox-field--appearance-${appearance}`,
        `checkbox-field--layout-${layout}`,
        hasSecondary && 'checkbox-field--has-secondary',
        flipped && 'checkbox-field--flipped',
        disabled && 'checkbox-field--disabled',
        isInvalid && 'checkbox-field--invalid',
        props.class
      )
    "
  >
    <label class="checkbox-field__label" :for="fieldId">
      <span class="checkbox-field__checkbox-wrap">
        <Checkbox
          :id="fieldId"
          v-model="model"
          v-bind="checkboxBind"
          :disabled="disabled"
        />
      </span>
      <span class="checkbox-field__text">
        <span class="checkbox-field__primary">{{ label }}</span>
        <span v-if="hasSecondary" class="checkbox-field__secondary">{{ secondaryText }}</span>
      </span>
    </label>
  </div>
</template>
