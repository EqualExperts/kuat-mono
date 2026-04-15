<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import type { HTMLAttributes } from "vue"
import type { ToggleGroupItemProps } from "reka-ui"
import type { ToggleSize, ToggleSkin } from "../toggle/constants"
import { ToggleGroupItem as RekaToggleGroupItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import "../toggle/toggle.css"
import "./toggle-group.css"

const props = withDefaults(
  defineProps<
    ToggleGroupItemProps & {
      class?: HTMLAttributes["class"]
      size?: ToggleSize
      skin?: ToggleSkin
    }
  >(),
  {
    size: "regular",
    skin: "outlined",
  }
)

const delegatedProps = reactiveOmit(props, "class", "size", "skin")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RekaToggleGroupItem
    data-slot="toggle-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'toggle-group-item',
        `toggle-group-item--size-${props.size}`,
        `toggle-group-item--skin-${props.skin}`,
        props.class
      )
    "
  >
    <slot />
  </RekaToggleGroupItem>
</template>
