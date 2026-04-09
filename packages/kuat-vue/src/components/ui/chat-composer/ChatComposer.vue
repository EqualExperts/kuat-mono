<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"

import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
  /** Props for the built-in textarea (used when the default slot is empty). */
  textareaProps?: Record<string, unknown> & { class?: HTMLAttributes["class"] }
}

const props = defineProps<Props>()
const slots = useSlots()

const hasToolbar = computed(() => !!slots.toolbar)
const hasActions = computed(() => !!slots.actions)
const hasCustomInput = computed(() => !!slots.default)

const textareaBind = computed(() => {
  const raw = props.textareaProps ?? {}
  const { class: _drop, ...rest } = raw
  return rest
})

const textareaClass = computed(() =>
  cn("chat-composer__textarea", props.textareaProps?.class)
)
</script>

<template>
  <div data-slot="chat-composer" :class="cn('chat-composer', props.class)">
    <div v-if="hasToolbar" data-slot="toolbar" class="chat-composer__toolbar">
      <slot name="toolbar" />
    </div>
    <div class="chat-composer__main">
      <div data-slot="input" class="chat-composer__input">
        <slot v-if="hasCustomInput" />
        <textarea
          v-else
          data-slot="chat-composer-textarea"
          v-bind="textareaBind"
          :class="textareaClass"
        />
      </div>
      <div v-if="hasActions" data-slot="actions" class="chat-composer__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles.css";

.chat-composer {
  @apply flex flex-col gap-2 w-full min-w-0 border-t border-border bg-background pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 px-3 shrink-0;
}

.chat-composer__toolbar {
  @apply flex flex-wrap items-center gap-2 min-h-0 min-w-0;
}

.chat-composer__main {
  @apply flex gap-2 items-end min-w-0 w-full;
}

.chat-composer__input {
  @apply flex-1 min-w-0 min-h-[2.5rem] flex flex-col;
}

.chat-composer__actions {
  @apply shrink-0 flex items-center gap-2 self-end pb-0.5;
}

.chat-composer__textarea {
  @apply min-h-[72px] w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50;
}
</style>
