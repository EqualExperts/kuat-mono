<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import type { KuatLogoLockupMode, KuatLogoLockupUse } from "./constants"
import { cn } from "@/lib/utils"
import EELogo from "@/components/ui/kuat-header/EELogo.vue"
import { Separator } from "@/components/ui/separator"
import EELogoIcon from "./EELogoIcon.vue"

interface Props {
  class?: HTMLAttributes["class"]
  /** Service name (Service use) or primary title (Demo use) */
  title: string
  /** Service: logo first + name. Demo: title primary, "A demo by" + small logo. */
  use?: KuatLogoLockupUse
  /** Visual theme */
  mode?: KuatLogoLockupMode
  /** When true, force dark styling (e.g. on dark background) */
  forceDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  use: "service",
  mode: "light",
  forceDark: false,
})

const effectiveMode = computed<KuatLogoLockupMode>(() =>
  props.forceDark ? "dark" : props.mode
)

const logoTextColor = computed(() =>
  effectiveMode.value === "dark" ? "white" : "grey"
)

const showIconOnly = computed(
  () => props.use === "service" && effectiveMode.value === "dark"
)

const rootClasses = computed(() =>
  cn(
    "kuat-logo-lockup",
    `kuat-logo-lockup--${effectiveMode.value}`,
    `kuat-logo-lockup--${props.use}`,
    props.class
  )
)
</script>

<template>
  <div :class="rootClasses">
    <!-- Service use: logo (or icon when dark) + separator + name -->
    <template v-if="use === 'service'">
      <div class="kuat-logo-lockup__service-inner">
        <div class="kuat-logo-lockup__logo-wrap">
          <EELogoIcon
            v-if="showIconOnly"
            class="kuat-logo-lockup__logo-icon"
          />
          <EELogo
            v-else
            class="kuat-logo-lockup__logo"
            :text-color="logoTextColor"
          />
        </div>
        <Separator
          orientation="vertical"
          class="kuat-logo-lockup__separator"
        />
        <span class="kuat-logo-lockup__service-name">{{ title }}</span>
      </div>
    </template>

    <!-- Demo use: title + "A demo by" + small logo -->
    <template v-else>
      <h2 class="kuat-logo-lockup__demo-title">{{ title }}</h2>
      <div class="kuat-logo-lockup__demo-attribution">
        <span class="kuat-logo-lockup__demo-by">A demo by</span>
        <div class="kuat-logo-lockup__demo-logo-wrap">
          <EELogo
            class="kuat-logo-lockup__logo kuat-logo-lockup__logo--demo"
            :text-color="logoTextColor"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* KuatLogoLockup – Kuat variables from @equal-experts/kuat-core */
.kuat-logo-lockup {
  container-type: inline-size;
  container-name: logo-lockup;
}

.kuat-logo-lockup--light {
  color: var(--kuat-header-default-foreground);
}

.kuat-logo-lockup--light .kuat-logo-lockup__service-name,
.kuat-logo-lockup--light .kuat-logo-lockup__demo-title,
.kuat-logo-lockup--light .kuat-logo-lockup__demo-by {
  color: var(--kuat-header-default-foreground);
}

.kuat-logo-lockup--dark {
  color: var(--kuat-header-bold-foreground);
}

.kuat-logo-lockup--dark .kuat-logo-lockup__service-name,
.kuat-logo-lockup--dark .kuat-logo-lockup__demo-title,
.kuat-logo-lockup--dark .kuat-logo-lockup__demo-by {
  color: var(--kuat-header-bold-foreground);
}

.kuat-logo-lockup--service .kuat-logo-lockup__service-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(2 * var(--spacing));
}

.kuat-logo-lockup__separator {
  display: none;
  height: calc(6 * var(--spacing));
  width: 1px;
  flex-shrink: 0;
}

.kuat-logo-lockup--light .kuat-logo-lockup__separator {
  background-color: var(--border);
}

.kuat-logo-lockup--dark .kuat-logo-lockup__separator {
  background-color: color-mix(
    in srgb,
    var(--kuat-header-bold-foreground-secondary) 30%,
    transparent
  );
}

@container logo-lockup (min-width: 320px) {
  .kuat-logo-lockup--service .kuat-logo-lockup__service-inner {
    flex-direction: row;
    align-items: center;
    gap: calc(4 * var(--spacing));
  }

  .kuat-logo-lockup__separator {
    display: block;
  }
}

@supports not (container-type: inline-size) {
  @media (min-width: 768px) {
    .kuat-logo-lockup--service .kuat-logo-lockup__service-inner {
      flex-direction: row;
      align-items: center;
      gap: calc(4 * var(--spacing));
    }

    .kuat-logo-lockup__separator {
      display: block;
    }
  }
}

.kuat-logo-lockup__service-name {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
  font-family: var(--font-sans);
}

.kuat-logo-lockup__logo-wrap,
.kuat-logo-lockup__logo-icon {
  flex-shrink: 0;
}

.kuat-logo-lockup__logo.kuat-logo-lockup__logo--demo {
  height: calc(6 * var(--spacing));
  width: auto;
}

.kuat-logo-lockup__logo:not(.kuat-logo-lockup__logo--demo) {
  height: 50px;
  width: 188px;
}

.kuat-logo-lockup__logo-icon {
  height: calc(10 * var(--spacing));
  width: 43px;
}

.kuat-logo-lockup--demo .kuat-logo-lockup__demo-title {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: var(--tracking-tight);
  font-family: var(--font-sans);
  margin: 0 0 calc(2 * var(--spacing)) 0;
}

.kuat-logo-lockup__demo-attribution {
  display: flex;
  align-items: center;
  gap: calc(2 * var(--spacing));
}

.kuat-logo-lockup__demo-by {
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: var(--tracking-normal);
  font-family: var(--font-sans);
  font-weight: 500;
}

.kuat-logo-lockup__demo-logo-wrap {
  display: flex;
  align-items: center;
}

.kuat-logo-lockup__demo-logo-wrap .kuat-logo-lockup__logo {
  height: calc(5 * var(--spacing));
  width: auto;
}

.kuat-logo-lockup__demo-logo-wrap .kuat-logo-lockup__logo-icon {
  height: calc(5 * var(--spacing));
  width: 22px;
}
</style>
