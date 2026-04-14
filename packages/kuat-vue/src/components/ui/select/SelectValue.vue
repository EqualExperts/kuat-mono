<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectValueProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { SelectValue as RekaSelectValue } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectValueProps & { class?: HTMLAttributes["class"] }>()
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <RekaSelectValue
    data-slot="select-value"
    v-bind="delegatedProps"
    :class="cn('select-trigger__value', props.class)"
  />
</template>
