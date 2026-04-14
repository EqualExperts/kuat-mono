<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectSeparatorProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { SelectSeparator as RekaSelectSeparator } from "reka-ui"
import { cn } from "@/lib/utils"
import "./select.css"

const props = defineProps<
  SelectSeparatorProps & { class?: HTMLAttributes["class"] }
>()
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <RekaSelectSeparator
    data-slot="select-separator"
    v-bind="delegatedProps"
    :class="cn('select-separator', props.class)"
  />
</template>
