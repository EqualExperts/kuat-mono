<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>(), {
  orientation: "vertical",
})
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="delegatedProps"
    :orientation="props.orientation"
    :class="cn('button-group-separator', props.class)"
  />
</template>

<style scoped>
.button-group-separator {
  margin: 0;
  align-self: stretch;
}

.button-group-separator[data-orientation="vertical"] {
  height: auto;
}
</style>
