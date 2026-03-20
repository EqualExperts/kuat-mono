<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import type { PrimitiveProps } from "reka-ui"
import { Primitive } from "reka-ui"

import { cn } from "@/lib/utils"


interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  /** Optional media; when `null`, the media area is removed (no gap). */
  imageSrc?: string | null
  imageAlt?: string

  /** Header props (not slots). */
  category: string
  title: string
  titleHeadingLevel: 1 | 2 | 3 | 4 | 5 | 6

  /** Optional basic content text (hidden when omitted). */
  contentText?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  imageSrc: null,
  imageAlt: "",
  contentText: null,
})

const headingTag = computed(() => `h${props.titleHeadingLevel}`)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('content-card', props.class)"
    data-slot="content-card"
    v-bind="$attrs"
  >
    <slot v-if="asChild" />
    <div v-if="props.imageSrc !== null" class="content-card__media">
      <img class="content-card__media-img" :src="props.imageSrc" :alt="props.imageAlt" />
    </div>

    <div class="content-card__body">
      <div class="content-card__heading-row">
        <div class="content-card__heading-left">
          <div class="content-card__heading-meta">
            <div data-slot="badge" class="content-card__badge">
              <slot name="badge" />
            </div>
            <p class="content-card__category">{{ props.category }}</p>
          </div>

          <component :is="headingTag" class="content-card__title">
          {{ props.title }}
          </component>
        </div>

        <div data-slot="header-accessory" class="content-card__header-accessory">
          <slot name="header-accessory" />
        </div>
      </div>

      <div v-if="props.contentText != null" data-slot="content" class="content-card__content">
        <p class="content-card__content-text">{{ props.contentText }}</p>
      </div>

      <div data-slot="custom-content" class="content-card__custom-content">
        <slot name="custom-content" />
      </div>

      <div data-slot="footer" class="content-card__footer">
        <slot name="footer" />
      </div>
    </div>
  </Primitive>
</template>

<style scoped>
@reference "../../../styles.css";

.content-card {
  @apply flex flex-col items-start relative border border-border bg-card pb-2 w-full max-w-[373px] border-solid min-w-0;
}

.content-card__media {
  @apply relative shrink-0 h-[192px] w-full;
}

.content-card__media-img {
  @apply inset-0 max-w-none object-cover pointer-events-none size-full;
}

.content-card__body {
  @apply flex flex-col gap-4 items-start p-4 relative shrink-0 w-full;
}

.content-card__heading-row {
  @apply flex items-start justify-between overflow-clip shrink-0 w-full;
}

.content-card__heading-left {
  @apply flex flex-[1_0_0] flex-col gap-1 items-start min-h-px min-w-px relative;
}

.content-card__header-accessory {
  @apply flex flex-col items-start justify-start overflow-clip gap-2 shrink-0 ;
}

.content-card__badge {
  @apply flex items-center;
}

.content-card__heading-meta {
  @apply flex gap-2 items-center shrink-0 w-full;
}

.content-card__category {
  @apply whitespace-nowrap text-xs font-medium text-ee-blue-700;
}

.content-card__title {
  @apply w-full max-w-[250px] text-2xl font-semibold tracking-tight text-foreground ;
}

.content-card__content {
  @apply overflow-clip relative shrink-0 w-full;
}

.content-card__content-text {
  @apply text-foreground whitespace-pre-wrap;
}

.content-card__custom-content {
  @apply overflow-clip relative shrink-0 w-full;
}

.content-card__footer {
  @apply overflow-clip relative shrink-0 w-full;
}
</style>

