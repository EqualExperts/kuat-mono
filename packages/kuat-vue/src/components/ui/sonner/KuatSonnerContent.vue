<script setup lang="ts">
import type { Component } from "vue"

export type SonnerContentAction = {
  label: string
  onClick: () => void
  ariaLabel?: string
}

withDefaults(
  defineProps<{
    action?: SonnerContentAction
    description?: string
    leftIcon?: Component | null
    showLeftIcon?: boolean
    title: string
  }>(),
  {
    action: undefined,
    description: undefined,
    leftIcon: null,
    showLeftIcon: true,
  },
)
</script>

<template>
  <div class="kuat-sonner__content">
    <component :is="leftIcon" v-if="showLeftIcon && leftIcon" class="kuat-sonner__icon" />
    <div class="kuat-sonner__text">
      <div class="kuat-sonner__title">{{ title }}</div>
      <div v-if="description" class="kuat-sonner__description">{{ description }}</div>
    </div>
    <button
      v-if="action"
      type="button"
      class="kuat-sonner__action"
      :aria-label="action.ariaLabel ?? action.label"
      @click="action.onClick"
    >
      {{ action.label }}
    </button>
  </div>
</template>
