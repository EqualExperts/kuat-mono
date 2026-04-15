<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui"
import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import "./toggle-group.css"

const props = withDefaults(
  defineProps<ToggleGroupRootProps & { class?: HTMLAttributes["class"] }>(),
  { orientation: "horizontal" }
)
const emits = defineEmits<ToggleGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    v-bind="forwarded"
    :class="cn('toggle-group', `toggle-group--${props.orientation}`, props.class)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
