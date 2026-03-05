<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>(), {
  orientation: "horizontal",
  decorative: true,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegatedProps"
    :class="cn('separator', props.class)"
  />
</template>

<style scoped>
@reference "../../../styles.css";

.separator {
  @apply shrink-0 bg-border;
}

.separator[data-orientation="horizontal"] {
  @apply h-px w-full;
}

.separator[data-orientation="vertical"] {
  @apply h-full w-px;
}
</style>
