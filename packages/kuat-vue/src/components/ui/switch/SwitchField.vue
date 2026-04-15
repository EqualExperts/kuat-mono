<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs, useId } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import Switch from "./Switch.vue"
import type { SwitchFieldAppearance, SwitchFieldLayout } from "./constants"
import "./switch-field.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    label: string
    secondaryText?: string
    appearance?: SwitchFieldAppearance
    layout?: SwitchFieldLayout
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

const model = defineModel<boolean>({ required: false })

const attrs = useAttrs()

const generatedId = useId()
const fieldId = computed(() => props.id ?? generatedId)

const hasSecondary = computed(() => props.secondaryText != null)

const switchProps = reactiveOmit(props, [
  "label",
  "secondaryText",
  "appearance",
  "layout",
  "flipped",
  "id",
  "class",
  "disabled",
])

/** Field props for the inner Switch plus fallthrough attrs (e.g. aria-invalid). */
const switchBind = computed(() => {
  const { class: _c, ...fromAttrs } = attrs as Record<string, unknown>
  return { ...switchProps, ...fromAttrs }
})

const isInvalid = computed(() => {
  const v = (switchBind.value as Record<string, unknown>)["aria-invalid"]
  return v === true || v === "true"
})
</script>

<template>
  <div
    data-slot="switch-field"
    :class="
      cn(
        'switch-field',
        `switch-field--appearance-${appearance}`,
        `switch-field--layout-${layout}`,
        hasSecondary && 'switch-field--has-secondary',
        flipped && 'switch-field--flipped',
        disabled && 'switch-field--disabled',
        isInvalid && 'switch-field--invalid',
        props.class
      )
    "
  >
    <label class="switch-field__label" :for="fieldId">
      <span class="switch-field__switch-wrap">
        <Switch
          :id="fieldId"
          v-model="model"
          v-bind="switchBind"
          :disabled="disabled"
        />
      </span>
      <span class="switch-field__text">
        <span class="switch-field__primary">{{ label }}</span>
        <span v-if="hasSecondary" class="switch-field__secondary">{{ secondaryText }}</span>
      </span>
    </label>
  </div>
</template>
