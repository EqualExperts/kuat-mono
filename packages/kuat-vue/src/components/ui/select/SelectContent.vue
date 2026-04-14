<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectContentProps } from "reka-ui"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  SelectContent as RekaSelectContent,
  SelectPortal,
  SelectViewport,
} from "reka-ui"
import { cn } from "@/lib/utils"
import type { SelectSize } from "./constants"
import SelectScrollDownButton from "./SelectScrollDownButton.vue"
import SelectScrollUpButton from "./SelectScrollUpButton.vue"
import "./select.css"

const props = withDefaults(
  defineProps<
    SelectContentProps & {
      class?: HTMLAttributes["class"]
      size?: SelectSize
      maxHeight?: string | number
    }
  >(),
  {
    position: "item-aligned",
    size: "regular",
    maxHeight: 320,
  }
)

const delegatedProps = reactiveOmit(props, "class", "size", "maxHeight")
const styleVar = computed(() => ({
  "--kuat-select-content-max-height":
    typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight,
}))
</script>

<template>
  <SelectPortal>
    <RekaSelectContent
      data-slot="select-content"
      v-bind="delegatedProps"
      :style="styleVar"
      :class="
        cn(
          'select-content',
          `select-content--position-${props.position}`,
          `select-content--size-${props.size}`,
          props.class
        )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport data-slot="select-viewport" class="select-viewport">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </RekaSelectContent>
  </SelectPortal>
</template>
