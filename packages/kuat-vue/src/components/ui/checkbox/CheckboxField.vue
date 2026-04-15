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
import Checkbox from "./Checkbox.vue"
import type { CheckboxFieldAppearance, CheckboxFieldLayout } from "./constants"
import "./checkbox-field.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** @deprecated Prefer composing `Field` + `Checkbox` for new form layouts. */
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
  const v = (checkboxBind.value as Record<string, unknown>)["aria-invalid"]
  return v === true || v === "true"
})
</script>

<template>
  <Field
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
    <FieldLabel class="checkbox-field__label" :for="fieldId">
      <span class="checkbox-field__checkbox-wrap">
        <Checkbox
          :id="fieldId"
          v-model="model"
          v-bind="checkboxBind"
          :disabled="disabled"
        />
      </span>
      <FieldContent class="checkbox-field__text">
        <FieldTitle class="checkbox-field__primary">{{ label }}</FieldTitle>
        <FieldDescription v-if="hasSecondary" class="checkbox-field__secondary">
          {{ secondaryText }}
        </FieldDescription>
      </FieldContent>
    </FieldLabel>
  </Field>
</template>
