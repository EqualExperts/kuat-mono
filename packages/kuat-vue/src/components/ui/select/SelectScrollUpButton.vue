<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SelectScrollUpButtonProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { SelectScrollUpButton as RekaSelectScrollUpButton } from "reka-ui"
import { ChevronUp } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import "./select.css"

const props = defineProps<
  SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }
>()
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <RekaSelectScrollUpButton
    data-slot="select-scroll-up-button"
    v-bind="delegatedProps"
    :class="cn('select-scroll-button', props.class)"
  >
    <ChevronUp class="size-4" aria-hidden="true" />
  </RekaSelectScrollUpButton>
</template>
