<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectItemProps } from "reka-ui"
import {
  SelectItem as RekaSelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardPropsEmits,
} from "reka-ui"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import "./select.css"

const props = defineProps<
  SelectItemProps & {
    class?: HTMLAttributes["class"]
    prepend?: string
    description?: string
    decoration?: string
  }
>()
const emits = defineEmits(["select"])
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RekaSelectItem
    data-slot="select-item"
    v-bind="forwarded"
    :class="cn('select-item', (props.description || $slots.description) && 'select-item--double', props.class)"
  >
    <span v-if="props.prepend || $slots.prepend" class="select-item__prepend">
      <slot name="prepend">{{ props.prepend }}</slot>
    </span>

    <span class="select-item__text">
      <SelectItemText class="select-item__label">
        <slot />
      </SelectItemText>
      <span v-if="props.description || $slots.description" class="select-item__description">
        <slot name="description">{{ props.description }}</slot>
      </span>
    </span>

    <span v-if="props.decoration || $slots.decoration" class="select-item__decoration">
      <slot name="decoration">{{ props.decoration }}</slot>
    </span>

    <SelectItemIndicator class="select-item__indicator">
      <Check class="size-4" aria-hidden="true" />
    </SelectItemIndicator>
  </RekaSelectItem>
</template>
