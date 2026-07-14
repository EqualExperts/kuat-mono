<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { provide, ref } from "vue"
import { cn } from "@/lib/utils"
import { TAG_GROUP_INJECTION_KEY } from "./constants"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Accessible name for the group, e.g. "Technology filters". */
  label: string
}>()

const message = ref("")

provide(TAG_GROUP_INJECTION_KEY, {
  announce: (next: string) => {
    message.value = next
  },
})
</script>

<template>
  <div
    role="group"
    :aria-label="props.label"
    data-slot="tag-group"
    :class="cn('tag-group', props.class)"
  >
    <slot />
    <span aria-live="polite" class="sr-only" data-slot="tag-group-live-region">
      {{ message }}
    </span>
  </div>
</template>

<style scoped>
@reference "../../../styles.css";

/* TagGroup – thin accessibility wrapper. Wrapping/reflow is plain flex-wrap (8px gap in
   both axes per the Figma exploration); the component's job is the group role, label, and
   the aria-live dismissal announcements. */

.tag-group {
  @apply flex flex-wrap gap-2;
}
</style>
