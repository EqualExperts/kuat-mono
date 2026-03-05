<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import type { KuatHeaderVariant } from "./constants"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import EELogo from "./EELogo.vue"

interface Props {
  class?: HTMLAttributes["class"]
  variant?: KuatHeaderVariant
  title?: string
  /** Hide the default EE logo */
  hideLogo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  hideLogo: false,
})

const slots = useSlots()
const hasLogoSlot = computed(() => !!slots.logo)

const classes = computed(() =>
  cn("kuat-header", `kuat-header--${props.variant}`, props.class)
)
</script>

<template>
  <header :class="classes">
    <!-- Desktop Layout -->
    <div class="kuat-header__desktop">
      <div class="kuat-header__desktop-left">
        <div v-if="hasLogoSlot" class="kuat-header__logo-wrap">
          <slot name="logo" :variant="props.variant" />
        </div>
        <div v-else-if="!props.hideLogo" class="kuat-header__logo-wrap">
          <EELogo
            class="ee-logo--desktop"
            :text-color="props.variant === 'bold' ? 'white' : 'grey'"
          />
        </div>
        <Separator
          v-if="hasLogoSlot || !props.hideLogo"
          orientation="vertical"
          class="kuat-header__separator"
        />
        <h1 v-if="props.title" class="kuat-header__desktop-title">
          {{ props.title }}
        </h1>
        <slot name="title" />
      </div>
      <div class="kuat-header__desktop-right">
        <nav v-if="$slots.navigation" class="kuat-header__nav">
          <slot name="navigation" />
        </nav>
        <div v-if="$slots.actions" class="kuat-header__actions">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="kuat-header__mobile">
      <div class="kuat-header__mobile-left">
        <div v-if="hasLogoSlot" class="kuat-header__logo-wrap">
          <slot name="logo" :variant="props.variant" />
        </div>
        <div v-else-if="!props.hideLogo" class="kuat-header__logo-wrap">
          <EELogo
            class="ee-logo--mobile"
            :text-color="props.variant === 'bold' ? 'white' : 'grey'"
          />
        </div>
        <p v-if="props.title" class="kuat-header__mobile-title">
          {{ props.title }}
        </p>
        <slot name="title" />
      </div>
      <div v-if="$slots['mobile-menu-trigger']" class="kuat-header__mobile-trigger-wrap">
        <slot name="mobile-menu-trigger" />
      </div>
    </div>

    <slot name="mobile-menu" />
    <slot />
  </header>
</template>

<style scoped>
@reference "../../../styles.css";

.kuat-header {
  @apply relative w-full border-b;
}

.kuat-header--default {
  @apply border-border;
  background-color: var(--kuat-header-default-background);
  color: var(--kuat-header-default-foreground);
}

.kuat-header--bold {
  background-color: var(--kuat-header-bold-background);
  color: var(--kuat-header-bold-foreground);
  border-color: color-mix(in srgb, var(--kuat-header-bold-foreground-secondary) 20%, transparent);
}

.kuat-header__desktop {
  @apply hidden;
}

@media (min-width: 768px) {
  .kuat-header__desktop {
    @apply flex h-[98px] items-center justify-between px-6;
  }
}

.kuat-header__desktop-left {
  @apply flex items-center gap-5;
}

.kuat-header__desktop-title {
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.025em;
  font-family: var(--font-sans);
}

.kuat-header--default .kuat-header__desktop-title {
  color: var(--kuat-header-default-foreground);
}

.kuat-header--bold .kuat-header__desktop-title {
  color: var(--kuat-header-bold-foreground);
}

.kuat-header__desktop-right {
  @apply flex items-center gap-8;
}

.kuat-header__nav {
  @apply flex items-center;
}

.kuat-header__actions {
  @apply flex items-center gap-2;
}

.kuat-header__logo-wrap,
.kuat-header__mobile-trigger-wrap {
  @apply shrink-0;
}

.kuat-header__mobile {
  @apply flex min-h-[103px] justify-between px-3 py-4;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .kuat-header__mobile {
    @apply hidden;
  }
}

.kuat-header__mobile-left {
  @apply flex flex-col gap-2;
}

.kuat-header__mobile-title {
  @apply text-base font-semibold;
}

.kuat-header--default .kuat-header__mobile-title {
  color: var(--kuat-header-default-foreground-secondary);
}

.kuat-header--bold .kuat-header__mobile-title {
  color: var(--kuat-header-bold-foreground-secondary);
}

.kuat-header__separator {
  height: 49px;
  width: 1px;
}

.kuat-header--default .kuat-header__separator {
  @apply bg-border;
}

.kuat-header--bold .kuat-header__separator {
  background-color: color-mix(in srgb, var(--kuat-header-bold-foreground-secondary) 30%, transparent);
}

.ee-logo--desktop {
  height: 50px;
  width: 188px;
}

@media (min-width: 768px) {
  .ee-logo--desktop {
    height: 50px;
    width: 188px;
  }
}

.ee-logo--mobile {
  height: 39px;
  width: 147px;
}
</style>
