<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"

import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
  /** Preset header title when `#header` is not used. */
  title?: string
}

const props = defineProps<Props>()
const slots = useSlots()

const hasCustomHeader = computed(() => !!slots.header)
const hasPresetHeader = computed(
  () => !hasCustomHeader.value && !!props.title && props.title !== ""
)
const hasHeaderMeta = computed(() => !!slots["header-meta"])
const hasSidePanel = computed(() => !!slots["side-panel"])
const hasComposer = computed(() => !!slots.composer)

const mainClasses = computed(() =>
  cn("kuat-chat-layout__main", !hasSidePanel.value && "kuat-chat-layout__main--no-side")
)
</script>

<template>
  <section
    data-slot="kuat-chat-layout"
    aria-label="Chat"
    :class="cn('kuat-chat-layout', props.class)"
  >
    <div v-if="hasCustomHeader" data-slot="header" class="kuat-chat-layout__header">
      <slot name="header" />
    </div>
    <div
      v-else-if="hasPresetHeader"
      data-slot="header"
      class="kuat-chat-layout__header"
    >
      <div class="kuat-chat-layout__header-bar">
        <h2 class="kuat-chat-layout__header-title">{{ title }}</h2>
        <div
          v-if="hasHeaderMeta"
          data-slot="header-meta"
          class="kuat-chat-layout__header-meta"
        >
          <slot name="header-meta" />
        </div>
      </div>
    </div>
    <div :class="mainClasses">
      <div data-slot="messages" class="kuat-chat-layout__messages">
        <div data-slot="messages-body" class="kuat-chat-layout__messages-body">
          <slot name="messages" />
        </div>
      </div>
      <aside
        v-if="hasSidePanel"
        data-slot="side-panel"
        class="kuat-chat-layout__side"
      >
        <slot name="side-panel" />
      </aside>
    </div>
    <div v-if="hasComposer" data-slot="composer" class="kuat-chat-layout__composer">
      <slot name="composer" />
    </div>
  </section>
</template>

<style scoped>
@reference "../../../styles.css";

.kuat-chat-layout {
  @apply flex flex-col h-full min-h-0 w-full bg-background text-foreground;
}

.kuat-chat-layout__header {
  @apply shrink-0 w-full border-b border-border;
}

.kuat-chat-layout__header-bar {
  @apply flex items-center justify-between gap-2 px-4 py-3;
}

.kuat-chat-layout__header-title {
  @apply m-0 text-sm font-semibold text-foreground;
}

.kuat-chat-layout__header-meta {
  @apply shrink-0 text-xs text-muted-foreground;
}

.kuat-chat-layout__main {
  @apply flex flex-1 min-h-0 min-w-0 w-full;
}

.kuat-chat-layout__main--no-side .kuat-chat-layout__messages {
  @apply max-w-none;
}

.kuat-chat-layout__messages {
  @apply flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col;
}

.kuat-chat-layout__messages-body {
  @apply flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4;
}

.kuat-chat-layout__side {
  @apply shrink-0 w-full max-w-sm border-l border-border overflow-auto min-h-0 flex flex-col p-4;
}

.kuat-chat-layout__composer {
  @apply shrink-0 w-full;
}
</style>
