<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { CheckboxIndicator, CheckboxRoot } from "reka-ui"
import { Check, Minus } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import "./checkbox.css"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const model = defineModel<boolean | "indeterminate">({ required: false })

const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <CheckboxRoot
    v-model="model"
    data-slot="checkbox"
    :class="cn('checkbox', props.class)"
    v-bind="delegatedAttrs"
  >
    <CheckboxIndicator class="checkbox__indicator">
      <Check class="checkbox__icon checkbox__icon--check" aria-hidden="true" />
      <Minus class="checkbox__icon checkbox__icon--indeterminate" aria-hidden="true" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
