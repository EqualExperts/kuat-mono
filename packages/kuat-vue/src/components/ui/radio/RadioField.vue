<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs, useId } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field"
import RadioGroupItem from "./RadioGroupItem.vue"
import type { RadioFieldAppearance, RadioFieldLayout } from "./constants"
import "./radio-field.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** @deprecated Prefer composing `Field` + `RadioGroupItem` for new form layouts. */
    label: string
    secondaryText?: string
    appearance?: RadioFieldAppearance
    layout?: RadioFieldLayout
    flipped?: boolean
    id?: string
    disabled?: boolean
    /** Must match a unique option value in the parent `RadioGroup`. */
    value: string
  }>(),
  {
    appearance: "plain",
    layout: "inline",
    flipped: false,
  }
)

const attrs = useAttrs()

const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)

const hasSecondary = computed(() => props.secondaryText != null)

const itemProps = reactiveOmit(props, [
  "label",
  "secondaryText",
  "appearance",
  "layout",
  "flipped",
  "id",
  "class",
  "disabled",
])

/** Field props for the inner RadioGroupItem plus fallthrough attrs (e.g. aria-invalid). */
const radioBind = computed(() => {
  const { class: _c, ...fromAttrs } = attrs as Record<string, unknown>
  return { ...itemProps, ...fromAttrs }
})

const isInvalid = computed(() => {
  const v = (radioBind.value as Record<string, unknown>)["aria-invalid"]
  return v === true || v === "true"
})
</script>

<template>
  <Field
    data-slot="radio-field"
    :class="
      cn(
        'radio-field',
        `radio-field--appearance-${appearance}`,
        `radio-field--layout-${layout}`,
        hasSecondary && 'radio-field--has-secondary',
        flipped && 'radio-field--flipped',
        disabled && 'radio-field--disabled',
        isInvalid && 'radio-field--invalid',
        props.class
      )
    "
  >
    <FieldLabel class="radio-field__label" :for="fieldId">
      <span class="radio-field__radio-wrap">
        <RadioGroupItem
          :id="fieldId"
          v-bind="radioBind"
          :disabled="disabled"
        />
      </span>
      <FieldContent class="radio-field__text">
        <FieldTitle class="radio-field__primary">{{ label }}</FieldTitle>
        <FieldDescription v-if="hasSecondary" class="radio-field__secondary">
          {{ secondaryText }}
        </FieldDescription>
      </FieldContent>
    </FieldLabel>
  </Field>
</template>
