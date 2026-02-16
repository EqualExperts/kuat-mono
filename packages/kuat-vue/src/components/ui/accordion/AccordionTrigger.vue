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
.accordion-trigger-wrapper {
  display: flex;
}

.accordion-trigger {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: 500;
  transition-property: all;
  transition-timing-function: default;
  transition-duration: 150ms;
}

.accordion-trigger:hover {
  text-decoration: underline;
}

.accordion-trigger[data-state="open"] :deep(svg) {
  transform: rotate(180deg);
}

.accordion-trigger__icon {
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  transition-property: transform;
  transition-duration: 200ms;
}
</style>
