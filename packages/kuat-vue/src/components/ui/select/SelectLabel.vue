<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectLabelProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { SelectLabel as RekaSelectLabel } from "reka-ui"
import { cn } from "@/lib/utils"
import "./select.css"

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <RekaSelectLabel
    data-slot="select-label"
    v-bind="delegatedProps"
    :class="cn('select-label', props.class)"
  >
    <slot />
  </RekaSelectLabel>
</template>
