<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronDown } from "lucide-vue-next"
import {
  AccordionHeader,
  AccordionTrigger,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AccordionHeader class="accordion-trigger-wrapper">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="cn('accordion-trigger', props.class)"
    >
      <slot />
      <slot name="icon">
        <ChevronDown class="accordion-trigger__icon" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

<style scoped>
@reference "../../../styles.css";

.accordion-trigger-wrapper {
  @apply flex;
}

.accordion-trigger {
  @apply flex flex-1 items-center justify-between py-4 font-medium transition-all;
  transition-duration: 150ms;
  transition-timing-function: default;
}

.accordion-trigger:hover {
  @apply underline;
}

.accordion-trigger[data-state="open"] :deep(svg) {
  @apply rotate-180;
}

.accordion-trigger__icon {
  @apply size-4 shrink-0 transition-transform;
  transition-duration: 200ms;
}
</style>
