<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectScrollDownButtonProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { SelectScrollDownButton as RekaSelectScrollDownButton } from "reka-ui"
import { ChevronDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import "./select.css"

const props = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }
>()
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <RekaSelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="delegatedProps"
    :class="cn('select-scroll-button', props.class)"
  >
    <ChevronDown class="size-4" aria-hidden="true" />
  </RekaSelectScrollDownButton>
</template>
