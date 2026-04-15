<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import { SwitchRoot, SwitchThumb } from "reka-ui"
import { cn } from "@/lib/utils"
import "./switch.css"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const model = defineModel<boolean>({ required: false })

const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <SwitchRoot
    v-model="model"
    data-slot="switch"
    :class="cn('switch', props.class)"
    v-bind="delegatedAttrs"
  >
    <SwitchThumb class="switch__thumb" data-slot="switch-thumb" />
  </SwitchRoot>
</template>
