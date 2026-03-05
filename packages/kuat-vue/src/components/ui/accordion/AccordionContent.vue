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
@reference "../../../styles.css";

.accordion-content {
  @apply overflow-hidden text-sm leading-5 transition-all;
  transition-duration: 150ms;
  transition-timing-function: default;
}

.accordion-content[data-state="closed"] {
  animation: accordion-up 0.2s ease-out;
}

.accordion-content[data-state="open"] {
  animation: accordion-down 0.2s ease-out;
}

.accordion-content__body {
  @apply pb-4 pt-0;
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
