<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import "./radio.css"

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="forwarded"
    :class="cn('radio-group', props.class)"
  >
    <slot />
  </RadioGroupRoot>
</template>
