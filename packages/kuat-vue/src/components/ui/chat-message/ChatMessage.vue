<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"

import { cn } from "@/lib/utils"
import type { ChatMessageVariant } from "./constants"

interface Props {
  class?: HTMLAttributes["class"]
  variant: ChatMessageVariant
  /** Plain label text; overridden by the `#label` slot when used. */
  label?: string
  /** Shorthand label (e.g. "You"); used when `label` is not set. */
  author?: string
  /** Plain body text when the default slot is empty. */
  content?: string
}

const props = defineProps<Props>()
const slots = useSlots()

const ariaLabel = computed(
  () =>
    ({
      user: "User message",
      assistant: "Assistant message",
      system: "System message",
    })[props.variant]
)

const hasLeading = computed(() => !!slots.leading)
const labelFallback = computed(() => props.label ?? props.author)
const hasLabel = computed(
  () => !!slots.label || !!labelFallback.value
)
const hasFooter = computed(() => !!slots.footer)

const rowClasses = computed(() =>
  cn("chat-message__row", !hasLeading.value && "chat-message__row--no-leading")
)
</script>

<template>
  <article
    data-slot="chat-message"
    :data-variant="variant"
    :aria-label="ariaLabel"
    :class="cn('chat-message', `chat-message--${variant}`, props.class)"
  >
    <div :class="rowClasses">
      <div
        v-if="hasLeading"
        data-slot="leading"
        class="chat-message__leading"
      >
        <slot name="leading" />
      </div>
      <div class="chat-message__column">
        <div v-if="hasLabel" data-slot="label" class="chat-message__label">
          <slot name="label">{{ labelFallback }}</slot>
        </div>
        <div data-slot="content" class="chat-message__content">
          <slot>
            <p v-if="content" class="chat-message__text">{{ content }}</p>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="hasFooter" data-slot="footer" class="chat-message__footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<style scoped>
@reference "../../../styles.css";

.chat-message {
  @apply flex flex-col gap-2 min-w-0 w-full;
}

.chat-message__row {
  @apply flex gap-3 min-w-0 w-full items-start;
}

.chat-message__row--no-leading {
  @apply gap-0;
}

.chat-message__leading {
  @apply shrink-0 flex flex-col items-center justify-start pt-0.5;
}

.chat-message__column {
  @apply flex flex-col gap-1 min-w-0 flex-1;
}

.chat-message__label {
  @apply text-xs text-muted-foreground;
}

.chat-message__content {
  @apply min-w-0 text-sm text-foreground;
}

.chat-message__text {
  @apply m-0;
}

.chat-message__footer {
  @apply flex flex-wrap items-center gap-2 text-xs text-muted-foreground pl-0;
}

.chat-message--user .chat-message__row {
  @apply flex-row-reverse;
}

.chat-message--user .chat-message__column {
  @apply items-end;
}

.chat-message--user .chat-message__label {
  @apply text-end;
}

.chat-message--user .chat-message__content {
  @apply rounded-md border border-border bg-muted px-3 py-2 max-w-[min(100%,42rem)];
}

.chat-message--user .chat-message__footer {
  @apply justify-end pr-0;
}

.chat-message--assistant .chat-message__content {
  @apply rounded-md border border-transparent bg-transparent px-0 py-1 max-w-[min(100%,42rem)];
}

.chat-message--assistant .chat-message__column {
  @apply items-start;
}

.chat-message--system .chat-message__row {
  @apply justify-center;
}

.chat-message--system .chat-message__leading {
  @apply hidden;
}

.chat-message--system .chat-message__column {
  @apply items-center flex-none max-w-full;
}

.chat-message--system .chat-message__content {
  @apply text-center text-xs text-muted-foreground px-2 py-1 rounded-md bg-muted/60 border border-border/60;
}
</style>
