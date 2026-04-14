<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useAttrs } from "vue"
import type { SelectContentProps, SelectRootProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import type { SelectItems, SelectLines, SelectSize } from "./constants"
import { isSelectItemGroup } from "./constants"
import Select from "./Select.vue"
import SelectContent from "./SelectContent.vue"
import SelectGroup from "./SelectGroup.vue"
import SelectItem from "./SelectItem.vue"
import SelectLabel from "./SelectLabel.vue"
import SelectSeparator from "./SelectSeparator.vue"
import SelectTrigger from "./SelectTrigger.vue"
import SelectValue from "./SelectValue.vue"
import "./select.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<
    SelectRootProps & {
      class?: HTMLAttributes["class"]
      triggerClass?: HTMLAttributes["class"]
      contentClass?: HTMLAttributes["class"]
      items?: SelectItems
      placeholder?: string
      size?: SelectSize
      lines?: SelectLines
      label?: string
      prepend?: string
      decoration?: string
      invalid?: boolean
      position?: SelectContentProps["position"]
      maxHeight?: number | string
      emptyText?: string
    }
  >(),
  {
    items: () => [],
    placeholder: "Select an item",
    size: "regular",
    lines: "single",
    label: undefined,
    prepend: undefined,
    decoration: undefined,
    invalid: false,
    position: "item-aligned",
    maxHeight: 320,
    emptyText: "No options available",
  }
)

const emits = defineEmits<{
  (event: "update:modelValue", value: string): void
  (event: "update:open", open: boolean): void
}>()
const rootProps = reactiveOmit(
  props,
  "class",
  "triggerClass",
  "contentClass",
  "items",
  "placeholder",
  "size",
  "lines",
  "label",
  "prepend",
  "decoration",
  "invalid",
  "position",
  "maxHeight",
  "emptyText"
)

const attrs = useAttrs()
const triggerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <Select
    v-bind="rootProps"
    :class="cn(props.class)"
    @update:model-value="(value) => emits('update:modelValue', value)"
    @update:open="(open) => emits('update:open', open)"
  >
    <SelectTrigger
      v-bind="triggerAttrs"
      :class="cn(props.triggerClass)"
      :size="props.size"
      :lines="props.lines"
      :label="props.label"
      :prepend="props.prepend"
      :decoration="props.decoration"
      :invalid="props.invalid"
    >
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>

    <SelectContent
      :class="cn(props.contentClass)"
      :size="props.size"
      :position="props.position"
      :max-height="props.maxHeight"
    >
      <slot v-if="$slots.default" />
      <template v-else-if="props.items.length > 0">
        <template v-for="(item, index) in props.items" :key="`item-${index}`">
          <SelectGroup v-if="isSelectItemGroup(item)">
            <SelectLabel>{{ item.label }}</SelectLabel>
            <SelectItem
              v-for="entry in item.items"
              :key="entry.value"
              :value="entry.value"
              :disabled="entry.disabled"
              :prepend="entry.prepend"
              :description="entry.description"
              :decoration="entry.decoration"
            >
              {{ entry.label }}
            </SelectItem>
            <SelectSeparator v-if="index < props.items.length - 1" />
          </SelectGroup>
          <SelectItem
            v-else
            :value="item.value"
            :disabled="item.disabled"
            :prepend="item.prepend"
            :description="item.description"
            :decoration="item.decoration"
          >
            {{ item.label }}
          </SelectItem>
        </template>
      </template>
      <p v-else class="select-empty">{{ props.emptyText }}</p>
    </SelectContent>
  </Select>
</template>
