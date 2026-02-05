<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import type { KuatHeaderVariants } from "."
import { cn, kuatHeaderVariants } from "."
import { Separator } from "@/components/ui/separator"
import EELogo from "./EELogo.vue"

interface Props {
  class?: HTMLAttributes["class"]
  variant?: KuatHeaderVariants["variant"]
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
  cn(kuatHeaderVariants({ variant: props.variant }), props.class)
)

const separatorClass = computed(() =>
  cn(
    "h-[49px] w-px",
    props.variant === "bold"
      ? "bg-[var(--kuat-header-bold-foreground-secondary)]/30"
      : "bg-border"
  )
)

const secondaryTextClass = computed(() =>
  props.variant === "bold"
    ? "text-[var(--kuat-header-bold-foreground-secondary)]"
    : "text-[var(--kuat-header-default-foreground-secondary)]"
)
</script>

<template>
  <header :class="classes">
    <!-- Desktop Layout -->
    <div class="hidden md:flex h-[98px] items-center justify-between px-6">
      <!-- Left section: Logo, separator, title -->
      <div class="flex items-center gap-5">
        <!-- Custom logo slot -->
        <div v-if="hasLogoSlot" class="shrink-0">
          <slot name="logo" :variant="props.variant" />
        </div>
        <!-- Default EE logo -->
        <div v-else-if="!props.hideLogo" class="shrink-0">
          <EELogo
            class="h-[50px] w-[188px]"
            :text-color="props.variant === 'bold' ? 'white' : 'grey'"
          />
        </div>
        <Separator
          v-if="hasLogoSlot || !props.hideLogo"
          orientation="vertical"
          :class="separatorClass"
        />
        <h1
          v-if="props.title"
          class="text-[30px] font-semibold leading-[30px] tracking-[-1px] font-sans"
        >
          {{ props.title }}
        </h1>
        <slot name="title" />
      </div>

      <!-- Right section: Navigation and actions -->
      <div class="flex items-center gap-8">
        <nav v-if="$slots.navigation" class="flex items-center">
          <slot name="navigation" />
        </nav>
        <div v-if="$slots.actions" class="flex items-center gap-2">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="flex md:hidden min-h-[103px] items-start justify-between px-3 py-4">
      <!-- Left section: Logo and title stacked -->
      <div class="flex flex-col gap-2">
        <!-- Custom logo slot (mobile) -->
        <div v-if="hasLogoSlot" class="shrink-0">
          <slot name="logo" :variant="props.variant" />
        </div>
        <!-- Default EE logo (mobile - smaller) -->
        <div v-else-if="!props.hideLogo" class="shrink-0">
          <EELogo
            class="h-[39px] w-[147px]"
            :text-color="props.variant === 'bold' ? 'white' : 'grey'"
          />
        </div>
        <p
          v-if="props.title"
          :class="cn('text-base font-semibold', secondaryTextClass)"
        >
          {{ props.title }}
        </p>
        <slot name="title" />
      </div>

      <!-- Right section: Mobile menu trigger -->
      <div v-if="$slots['mobile-menu-trigger']" class="shrink-0">
        <slot name="mobile-menu-trigger" />
      </div>
    </div>

    <!-- Mobile menu (rendered outside the layout containers) -->
    <slot name="mobile-menu" />

    <!-- Default slot for custom content -->
    <slot />
  </header>
</template>
