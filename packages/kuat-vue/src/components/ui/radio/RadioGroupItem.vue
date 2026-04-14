<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { RadioGroupItemEmits, RadioGroupItemProps } from "reka-ui"
import {
  RadioGroupIndicator,
  RadioGroupItem as RekaRadioGroupItem,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import "./radio.css"

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupItemEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RekaRadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwarded"
    :class="cn('radio', props.class)"
  >
    <RadioGroupIndicator class="radio__indicator">
      <span class="radio__dot" aria-hidden="true" />
    </RadioGroupIndicator>
  </RekaRadioGroupItem>
</template>
