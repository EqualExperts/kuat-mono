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
        <div v-if="hasLogoSlot" class="shrink-0">
          <slot name="logo" :variant="props.variant" />
        </div>
        <div v-else-if="!props.hideLogo" class="shrink-0">
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
        <nav v-if="$slots.navigation" class="flex items-center">
          <slot name="navigation" />
        </nav>
        <div v-if="$slots.actions" class="flex items-center gap-2">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="kuat-header__mobile">
      <div class="kuat-header__mobile-left">
        <div v-if="hasLogoSlot" class="shrink-0">
          <slot name="logo" :variant="props.variant" />
        </div>
        <div v-else-if="!props.hideLogo" class="shrink-0">
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
      <div v-if="$slots['mobile-menu-trigger']" class="shrink-0">
        <slot name="mobile-menu-trigger" />
      </div>
    </div>

    <slot name="mobile-menu" />
    <slot />
  </header>
</template>

<style scoped>
.kuat-header {
  position: relative;
  width: 100%;
  border-bottom-width: 1px;
}

.kuat-header--default {
  background-color: var(--kuat-header-default-background);
  color: var(--kuat-header-default-foreground);
  border-color: var(--border);
}

.kuat-header--bold {
  background-color: var(--kuat-header-bold-background);
  color: var(--kuat-header-bold-foreground);
  border-color: color-mix(in srgb, var(--kuat-header-bold-foreground-secondary) 20%, transparent);
}

.kuat-header__desktop {
  display: none;
}

@media (min-width: 768px) {
  .kuat-header__desktop {
    display: flex;
    height: 98px;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.kuat-header__desktop-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
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
  display: flex;
  align-items: center;
  gap: 2rem;
}

.kuat-header__mobile {
  display: flex;
  min-height: 103px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0.75rem;
}

@media (min-width: 768px) {
  .kuat-header__mobile {
    display: none;
  }
}

.kuat-header__mobile-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kuat-header__mobile-title {
  font-size: 1rem;
  font-weight: 600;
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
  background-color: var(--border);
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
