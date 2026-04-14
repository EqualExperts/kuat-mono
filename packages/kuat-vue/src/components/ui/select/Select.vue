<script setup lang="ts">
import type { SelectRootProps } from "reka-ui"
import { SelectRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<SelectRootProps>()
const emits = defineEmits(["update:modelValue", "update:open"])
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot data-slot="select" v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
