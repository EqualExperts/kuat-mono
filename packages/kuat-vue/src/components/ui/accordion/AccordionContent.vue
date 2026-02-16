<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionContent } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="accordion-content"
  >
    <div :class="cn('accordion-content__body', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>

<style scoped>
.accordion-content {
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-property: all;
  transition-timing-function: default;
  transition-duration: 150ms;
}

.accordion-content[data-state="closed"] {
  animation: accordion-up 0.2s ease-out;
}

.accordion-content[data-state="open"] {
  animation: accordion-down 0.2s ease-out;
}

.accordion-content__body {
  padding-bottom: 1rem;
  padding-top: 0;
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>
