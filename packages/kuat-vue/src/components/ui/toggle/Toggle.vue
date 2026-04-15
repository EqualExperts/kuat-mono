<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ToggleSize, ToggleSkin } from "./constants"
import { computed, useAttrs } from "vue"
import { Toggle as RekaToggle } from "reka-ui"
import { cn } from "@/lib/utils"
import "./toggle.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    size?: ToggleSize
    skin?: ToggleSkin
  }>(),
  {
    size: "regular",
    skin: "outlined",
  }
)

const model = defineModel<boolean>({ required: false })
const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <RekaToggle
    v-model="model"
    data-slot="toggle"
    v-bind="delegatedAttrs"
    :class="cn('toggle', `toggle--size-${props.size}`, `toggle--skin-${props.skin}`, props.class)"
  >
    <slot />
  </RekaToggle>
</template>
