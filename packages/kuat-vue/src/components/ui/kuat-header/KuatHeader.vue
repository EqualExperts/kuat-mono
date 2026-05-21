<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, watch, onUnmounted, useSlots } from "vue"
import { onClickOutside, useEventListener } from "@vueuse/core"
import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Menu, User, X } from "lucide-vue-next"
import type {
  KuatHeaderVariant,
  KuatHeaderApp,
  KuatHeaderNavItem,
  KuatHeaderAccountConfig,
  KuatHeaderAppSwitcherConfig,
  KuatHeaderLockupConfig,
} from "./constants"
import {
  shouldShowAppSwitcher,
  resolveAppSwitcherLabels,
  resolveAppSwitcherEmptyMessage,
  resolveAccountLabels,
  shouldShowAccountMobileTier,
  hasStructuredAccount,
  resolveHeaderLockup,
  resolveMobileSheetAriaLabel,
  resolveDesktopAccountMenuItems,
  shouldUseDesktopAccountDropdown,
} from "./kuat-header.logic"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Button from "@/components/ui/button/Button.vue"
import IconButton from "@/components/ui/icon-button/IconButton.vue"
import EELogo from "./EELogo.vue"

import "./kuat-header.css"

interface Props {
  class?: HTMLAttributes["class"]
  variant?: KuatHeaderVariant
  title?: string
  lockup?: KuatHeaderLockupConfig
  navigationItems?: KuatHeaderNavItem[]
  account?: KuatHeaderAccountConfig
  appSwitcher?: KuatHeaderAppSwitcherConfig
  mobileMenuAriaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})

const slots = useSlots()
const hasLogoSlot = computed(() => !!slots.logo)
const hasAccountMarkupSlot = computed(
  () => !!(slots["account-markup"] ?? slots.actions)
)

const lockupState = computed(() =>
  resolveHeaderLockup({
    logo: hasLogoSlot.value ? true : undefined,
    lockup: props.lockup,
  })
)

const hasStructuredNavigation = computed(
  () => !!props.navigationItems?.length
)
const structuredAccount = computed(() => hasStructuredAccount(props.account))
const hasAccountMobileTier = computed(() =>
  shouldShowAccountMobileTier(props.account)
)
const hasStructuredMenus = computed(
  () =>
    hasStructuredNavigation.value ||
    structuredAccount.value ||
    hasAccountMarkupSlot.value
)

const appSwitcherLabels = computed(() =>
  resolveAppSwitcherLabels(props.appSwitcher)
)
const accountLabels = computed(() => resolveAccountLabels(props.account))
const mobileAccountItems = computed(() => props.account?.mobile?.items)
const useDesktopAccountDropdown = computed(() =>
  shouldUseDesktopAccountDropdown(props.account)
)
const desktopAccountMenuItems = computed(() =>
  resolveDesktopAccountMenuItems(props.account)
)

const showSwitcher = computed(() => shouldShowAppSwitcher(props.appSwitcher))

const useBuiltInMobileSheet = computed(
  () =>
    !slots["mobile-menu"] &&
    (hasStructuredMenus.value || showSwitcher.value || hasAccountMobileTier.value)
)

const sheetAriaLabel = computed(() =>
  resolveMobileSheetAriaLabel({
    mobileMenuAriaLabel: props.mobileMenuAriaLabel,
    showAppSwitcher: showSwitcher.value,
    hasStructuredNavigation: hasStructuredNavigation.value,
    hasAccountMobileTier: hasAccountMobileTier.value,
  })
)

const isMobileOpen = ref(false)
const mobileSheetView = ref<"main" | "apps" | "account">("main")
const mobileTriggerRef = ref<InstanceType<typeof Button> | null>(null)
const mobileSheetRef = ref<HTMLElement | null>(null)
const mobileTeaserRef = ref<HTMLButtonElement | null>(null)
const mobileAccountTeaserRef = ref<HTMLButtonElement | null>(null)
const mobileAccountPanelRef = ref<HTMLElement | null>(null)
const mobileAppsPanelRef = ref<HTMLElement | null>(null)

const desktopSwitcherRef = ref<HTMLElement | null>(null)
const desktopAppMenuOpen = ref(false)
const navMenuOpen = ref<string | null>(null)

const logoColor = computed(() => (props.variant === "bold" ? "white" : "grey"))
const effectiveLockupVariant = computed(() => lockupState.value.lockupVariant)
const showDefaultDesktopLockup = computed(
  () =>
    lockupState.value.mode === "builtin" &&
    effectiveLockupVariant.value === "default"
)
const showDemoDesktopLockup = computed(
  () =>
    lockupState.value.mode === "builtin" &&
    effectiveLockupVariant.value === "demo"
)
const showDefaultMobileLockup = computed(
  () =>
    lockupState.value.mode === "builtin" &&
    effectiveLockupVariant.value === "default"
)
const showDemoMobileLockup = computed(
  () =>
    lockupState.value.mode === "builtin" &&
    effectiveLockupVariant.value === "demo"
)

onClickOutside(desktopSwitcherRef, () => {
  desktopAppMenuOpen.value = false
})

watch(desktopAppMenuOpen, (open) => {
  if (open) {
    props.appSwitcher?.onOpen?.()
  }
})

watch(isMobileOpen, (open) => {
  if (typeof document === "undefined") return
  if (open) {
    document.body.style.overflow = "hidden"
    mobileSheetView.value = "main"
  } else {
    document.body.style.overflow = ""
    mobileSheetView.value = "main"
  }
})

watch(isMobileOpen, (open, wasOpen) => {
  if (wasOpen && !open && mobileTriggerRef.value) {
    const inst = mobileTriggerRef.value as unknown as { $el?: HTMLElement }
    inst.$el?.focus?.()
  }
})

useEventListener(
  () => document,
  "keydown",
  (event: KeyboardEvent) => {
    if (!isMobileOpen.value) return
    if (event.key === "Escape") {
      event.preventDefault()
      isMobileOpen.value = false
      return
    }
    if (event.key !== "Tab" || !mobileSheetRef.value) return
    const focusables = mobileSheetRef.value.querySelectorAll<HTMLElement>(
      "button, a, [tabindex]:not([tabindex='-1'])"
    )
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  },
  { passive: false }
)

watch([isMobileOpen, mobileSheetView], () => {
  if (!isMobileOpen.value) return
  requestAnimationFrame(() => {
    const root = mobileSheetRef.value
    root?.querySelector<HTMLElement>("button, a, [tabindex]:not([tabindex='-1'])")?.focus()
  })
})

const classes = computed(() =>
  cn("kuat-header", `kuat-header--${props.variant}`, props.class)
)

const emptyAppsMessage = computed(() =>
  resolveAppSwitcherEmptyMessage(props.appSwitcher)
)

function onAppSelect(app: KuatHeaderApp) {
  props.appSwitcher?.onSelect?.(app)
  desktopAppMenuOpen.value = false
}

function openAppsView() {
  props.appSwitcher?.onOpen?.()
  mobileSheetView.value = "apps"
  requestAnimationFrame(() => {
    const first = mobileAppsPanelRef.value?.querySelector<HTMLElement>("a, button")
    first?.focus()
  })
}

function openAccountView() {
  mobileSheetView.value = "account"
  requestAnimationFrame(() => {
    const first = mobileAccountPanelRef.value?.querySelector<HTMLElement>("a")
    first?.focus()
  })
}

function backToMain() {
  const from = mobileSheetView.value
  mobileSheetView.value = "main"
  requestAnimationFrame(() => {
    if (from === "apps") {
      mobileTeaserRef.value?.focus()
    } else if (from === "account") {
      mobileAccountTeaserRef.value?.focus()
    }
  })
}

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = ""
  }
})
</script>


<template>
  <header :class="classes">
    <div class="kuat-header__desktop">
      <div class="kuat-header__desktop-left">
        <template v-if="hasLogoSlot">
          <div class="shrink-0">
            <slot name="logo" :variant="props.variant" />
          </div>
        </template>
        <template v-else-if="showDefaultDesktopLockup">
          <div class="shrink-0">
            <EELogo
              class="ee-logo--desktop shrink-0"
              :text-color="logoColor"
            />
          </div>
          <Separator
            orientation="vertical"
            class="kuat-header__separator"
          />
        </template>
        <template v-else-if="showDemoDesktopLockup">
          <div class="kuat-header__desktop-demo-lockup">
            <h1 v-if="props.title" class="kuat-header__desktop-demo-title">
              {{ props.title }}
            </h1>
            <div class="kuat-header__demo-byline">
              <span class="kuat-header__demo-label">A demo by</span>
              <div class="kuat-header__desktop-demo-logo">
                <EELogo
                  class="ee-logo--desktop shrink-0"
                  :text-color="logoColor"
                />
              </div>
            </div>
          </div>
        </template>
        <h1
          v-if="props.title && effectiveLockupVariant === 'default'"
          class="kuat-header__desktop-title"
        >
          {{ props.title }}
        </h1>
        <slot name="title" />
      </div>
      <div class="kuat-header__desktop-right">
        <nav
          v-if="hasStructuredNavigation"
          aria-label="Primary navigation"
        >
          <div class="kuat-header__nav-items">
            <template
              v-for="(item, i) in props.navigationItems"
              :key="`${item.label}-${item.url}`"
            >
              <a
                v-if="!item.items?.length"
                :href="item.url"
                :class="cn(
                  'kuat-header__nav-link',
                  props.variant === 'bold' && 'kuat-header__nav-link--bold'
                )"
              >
                {{ item.label }}
              </a>
              <div
                v-else
                class="kuat-header__nav-dropdown-wrap"
              >
                <button
                  type="button"
                  :class="cn(
                    'kuat-header__nav-trigger',
                    props.variant === 'bold' && 'kuat-header__nav-trigger--bold'
                  )"
                  aria-haspopup="menu"
                  :aria-expanded="navMenuOpen === `nav-${i}`"
                  @click="navMenuOpen = navMenuOpen === `nav-${i}` ? null : `nav-${i}`"
                >
                  {{ item.label }}
                  <ChevronDown class="h-4 w-4" aria-hidden />
                </button>
                <div
                  v-show="navMenuOpen === `nav-${i}`"
                  class="kuat-header__dropdown-content kuat-header__nav-dropdown-panel"
                  role="menu"
                >
                  <a
                    v-for="sub in item.items"
                    :key="`${sub.label}-${sub.url}`"
                    :href="sub.url"
                    class="kuat-header__dropdown-link block px-2 py-2"
                    role="menuitem"
                    @click="navMenuOpen = null"
                  >
                    {{ sub.label }}
                  </a>
                </div>
              </div>
            </template>
          </div>
        </nav>
        <nav
          v-else-if="$slots.navigation"
          class="kuat-header__nav"
        >
          <slot name="navigation" />
        </nav>

        <div
          v-if="showSwitcher"
          ref="desktopSwitcherRef"
          class="kuat-header__nav-dropdown-wrap"
        >
          <IconButton
            type="button"
            variant="ghost"
            color="ee-blue"
            size="regular"
            class="kuat-header__app-switcher-trigger"
            :aria-label="appSwitcherLabels.trigger"
            aria-haspopup="menu"
            :aria-expanded="desktopAppMenuOpen"
            @click="desktopAppMenuOpen = !desktopAppMenuOpen"
          >
            <LayoutGrid class="h-5 w-5" aria-hidden />
          </IconButton>
          <div
            v-show="desktopAppMenuOpen"
            class="kuat-header__dropdown-content kuat-header__nav-dropdown-panel kuat-header__app-switcher-panel kuat-header__nav-dropdown-panel--end"
            role="menu"
          >
            <div class="kuat-header__app-switcher-scroll">
              <template v-if="props.appSwitcher?.loading">
                <div
                  class="kuat-header__app-switcher-skeleton"
                  aria-hidden
                />
                <div
                  class="kuat-header__app-switcher-skeleton"
                  aria-hidden
                />
                <div
                  class="kuat-header__app-switcher-skeleton"
                  aria-hidden
                />
              </template>
              <template v-else-if="props.appSwitcher?.apps.length">
                <a
                  v-for="app in props.appSwitcher.apps"
                  :key="app.id"
                  :href="app.href"
                  :target="props.appSwitcher.linkTarget ?? '_self'"
                  :rel="props.appSwitcher.linkTarget === '_blank' ? 'noopener noreferrer' : undefined"
                  class="kuat-header__app-switcher-link"
                  role="menuitem"
                  @click="onAppSelect(app)"
                >
                  <span class="kuat-header__app-switcher-text">
                    <span class="kuat-header__app-switcher-label">{{ app.label }}</span>
                    <span
                      v-if="app.description"
                      class="kuat-header__app-switcher-desc"
                    >{{ app.description }}</span>
                  </span>
                </a>
              </template>
              <div
                v-else-if="(props.appSwitcher?.empty ?? 'hide') === 'message'"
                class="kuat-header__app-switcher-empty px-3 py-3 text-muted-foreground text-sm"
              >
                {{ emptyAppsMessage }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="structuredAccount && props.account"
          class="kuat-header__actions-items"
        >
          <template
            v-for="(item, index) in props.account.items"
            :key="`${item.label}-${item.href}`"
          >
            <div
              v-if="useDesktopAccountDropdown && index === 0"
              class="kuat-header__nav-dropdown-wrap"
            >
              <button
                type="button"
                :class="cn(
                  'kuat-header__action-trigger',
                  props.variant === 'bold' && 'kuat-header__action-trigger--bold'
                )"
                aria-haspopup="menu"
                :aria-expanded="navMenuOpen === 'account-menu'"
                @click="navMenuOpen = navMenuOpen === 'account-menu' ? null : 'account-menu'"
              >
                <component
                  :is="item.icon ?? User"
                  class="h-4 w-4"
                  aria-hidden
                />
                <span class="hidden sm:inline">{{ item.label }}</span>
                <ChevronDown class="h-4 w-4" aria-hidden />
              </button>
              <div
                v-show="navMenuOpen === 'account-menu'"
                class="kuat-header__dropdown-content kuat-header__nav-dropdown-panel"
                role="menu"
              >
                <a
                  v-for="sub in desktopAccountMenuItems"
                  :key="`${sub.label}-${sub.url}`"
                  :href="sub.url"
                  class="kuat-header__dropdown-link block px-2 py-2"
                  role="menuitem"
                  @click="navMenuOpen = null"
                >
                  {{ sub.label }}
                </a>
              </div>
            </div>
            <a
              v-else
              :href="item.href"
              :class="cn(
                'kuat-header__action-link',
                props.variant === 'bold' && 'kuat-header__action-link--bold'
              )"
            >
              <component
                :is="item.icon ?? User"
                class="h-4 w-4"
                aria-hidden
              />
              <span>{{ item.label }}</span>
            </a>
          </template>
        </div>
        <div
          v-else-if="hasAccountMarkupSlot"
          class="kuat-header__actions"
        >
          <slot name="account-markup" />
          <slot name="actions" />
        </div>
      </div>
    </div>

    <div class="kuat-header__mobile">
      <div class="kuat-header__mobile-left">
        <div v-if="hasLogoSlot" class="shrink-0">
          <slot name="logo" :variant="props.variant" />
        </div>
        <div v-else-if="showDefaultMobileLockup" class="shrink-0">
          <EELogo
            class="ee-logo--mobile shrink-0"
            :text-color="logoColor"
          />
        </div>
        <div v-else-if="showDemoMobileLockup" class="kuat-header__mobile-demo-lockup">
          <p v-if="props.title" class="kuat-header__mobile-demo-title">
            {{ props.title }}
          </p>
          <div class="kuat-header__demo-byline">
            <span class="kuat-header__demo-label">A demo by</span>
            <div class="kuat-header__mobile-demo-logo">
              <EELogo
                class="ee-logo--mobile shrink-0"
                :text-color="logoColor"
              />
            </div>
          </div>
        </div>
        <p
          v-if="props.title && effectiveLockupVariant === 'default'"
          class="kuat-header__mobile-title"
        >
          {{ props.title }}
        </p>
        <slot name="title" />
      </div>
      <div
        v-if="$slots['mobile-menu-trigger']"
        class="kuat-header__mobile-trigger-wrap"
      >
        <slot name="mobile-menu-trigger" />
      </div>
      <Button
        v-else-if="useBuiltInMobileSheet"
        ref="mobileTriggerRef"
        variant="ghost"
        size="icon"
        :class="cn(
          'kuat-header__mobile-trigger',
          props.variant === 'bold' && 'kuat-header__mobile-trigger--bold'
        )"
        aria-label="Open menu"
        :aria-expanded="isMobileOpen"
        aria-controls="kuat-header-mobile-menu"
        @click="isMobileOpen = true"
      >
        <Menu class="h-6 w-6" aria-hidden />
      </Button>
    </div>

    <div
      v-if="useBuiltInMobileSheet && isMobileOpen"
      id="kuat-header-mobile-menu"
      ref="mobileSheetRef"
      class="kuat-header__mobile-sheet"
      role="dialog"
      aria-modal="true"
      :aria-label="sheetAriaLabel"
    >
      <div
        :class="cn(
          'kuat-header__mobile-sheet-header',
          (mobileSheetView === 'apps' || mobileSheetView === 'account') &&
            'kuat-header__mobile-sheet-header--split'
        )"
      >
        <Button
          v-if="mobileSheetView === 'apps' || mobileSheetView === 'account'"
          type="button"
          variant="ghost"
          class="kuat-header__mobile-back"
          aria-label="Back to main menu"
          @click="backToMain"
        >
          <ChevronLeft class="h-6 w-6" aria-hidden />
          <span class="kuat-header__mobile-back-text">Back</span>
        </Button>
        <span
          v-else
          aria-hidden
          class="kuat-header__mobile-sheet-header-spacer"
        />
        <Button
          variant="ghost"
          size="icon"
          class="kuat-header__mobile-close"
          aria-label="Close menu"
          @click="isMobileOpen = false"
        >
          <X class="h-6 w-6" aria-hidden />
        </Button>
      </div>

      <div
        :class="cn(
          'kuat-header__mobile-panel',
          mobileSheetView !== 'main' && 'kuat-header__mobile-panel--hidden'
        )"
        :aria-hidden="mobileSheetView !== 'main'"
        :inert="mobileSheetView !== 'main'"
      >
        <div class="kuat-header__mobile-panel-inner">
          <div class="kuat-header__mobile-sheet-nav">
            <nav
              v-if="hasStructuredNavigation"
              aria-label="Primary navigation"
            >
              <ul class="kuat-header__mobile-list">
                <li
                  v-for="item in props.navigationItems"
                  :key="`${item.label}-${item.url}`"
                >
                  <a
                    :href="item.url"
                    class="kuat-header__mobile-link"
                  >{{ item.label }}</a>
                  <ul
                    v-if="item.items?.length"
                    class="kuat-header__mobile-sub-list"
                  >
                    <li
                      v-for="subItem in item.items"
                      :key="`${subItem.label}-${subItem.url}`"
                    >
                      <a
                        :href="subItem.url"
                        class="kuat-header__mobile-sub-link"
                      >{{ subItem.label }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div
            v-if="hasAccountMobileTier || showSwitcher"
            class="kuat-header__mobile-sheet-sticky"
          >
            <div
              v-if="hasAccountMobileTier"
              class="kuat-header__mobile-app-teaser-wrap"
            >
              <button
                ref="mobileAccountTeaserRef"
                type="button"
                class="kuat-header__mobile-app-teaser"
                :aria-label="accountLabels.teaserDescription ? `${accountLabels.teaserTitle}, ${accountLabels.teaserDescription}` : accountLabels.teaserTitle"
                @click="openAccountView"
              >
                <span class="kuat-header__mobile-app-teaser-icon shrink-0" aria-hidden>
                  <component
                    :is="props.account?.items[0]?.icon ?? User"
                    class="h-6 w-6"
                    aria-hidden
                  />
                </span>
                <span class="kuat-header__mobile-app-teaser-text">
                  <span class="kuat-header__mobile-app-teaser-title">{{ accountLabels.teaserTitle }}</span>
                  <span
                    v-if="accountLabels.teaserDescription"
                    class="kuat-header__mobile-app-teaser-desc"
                  >{{ accountLabels.teaserDescription }}</span>
                </span>
                <ChevronRight
                  class="kuat-header__mobile-app-teaser-chevron h-5 w-5 shrink-0"
                  aria-hidden
                />
              </button>
            </div>
            <div
              v-if="showSwitcher"
              class="kuat-header__mobile-app-teaser-wrap"
            >
              <button
                ref="mobileTeaserRef"
                type="button"
                class="kuat-header__mobile-app-teaser"
                :aria-label="`${appSwitcherLabels.teaserTitle}, ${appSwitcherLabels.teaserDescription}`"
                @click="openAppsView"
              >
                <LayoutGrid
                  class="kuat-header__mobile-app-teaser-icon h-6 w-6 shrink-0"
                  aria-hidden
                />
                <span class="kuat-header__mobile-app-teaser-text">
                  <span class="kuat-header__mobile-app-teaser-title">{{ appSwitcherLabels.teaserTitle }}</span>
                  <span class="kuat-header__mobile-app-teaser-desc">{{ appSwitcherLabels.teaserDescription }}</span>
                </span>
                <ChevronRight
                  class="kuat-header__mobile-app-teaser-chevron h-5 w-5 shrink-0"
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="structuredAccount && props.account && !hasAccountMobileTier"
          class="kuat-header__mobile-sheet-actions"
        >
          <ul class="kuat-header__mobile-list">
            <li
              v-for="item in props.account.items"
              :key="`${item.label}-${item.href}`"
            >
              <a
                :href="item.href"
                class="kuat-header__mobile-link"
              >
                <span class="kuat-header__mobile-action-icon">
                  <component
                    :is="item.icon ?? User"
                    class="h-4 w-4"
                    aria-hidden
                  />
                </span>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="showSwitcher"
        ref="mobileAppsPanelRef"
        :class="cn(
          'kuat-header__mobile-panel kuat-header__mobile-panel--apps',
          mobileSheetView !== 'apps' && 'kuat-header__mobile-panel--hidden'
        )"
        :aria-hidden="mobileSheetView !== 'apps'"
      >
        <div class="kuat-header__mobile-apps-heading">
          {{ appSwitcherLabels.title }}
        </div>
        <nav
          class="kuat-header__mobile-apps-nav"
          :aria-label="appSwitcherLabels.nav"
        >
          <ul
            v-if="props.appSwitcher?.loading"
            class="kuat-header__mobile-list"
          >
            <li
              class="kuat-header__app-switcher-skeleton kuat-header__app-switcher-skeleton--mobile"
              aria-hidden
            />
            <li
              class="kuat-header__app-switcher-skeleton kuat-header__app-switcher-skeleton--mobile"
              aria-hidden
            />
          </ul>
          <ul
            v-else-if="props.appSwitcher?.apps.length"
            class="kuat-header__mobile-list"
          >
            <li
              v-for="app in props.appSwitcher.apps"
              :key="app.id"
            >
              <a
                :href="app.href"
                class="kuat-header__mobile-app-link"
                :target="props.appSwitcher?.linkTarget ?? '_self'"
                :rel="props.appSwitcher?.linkTarget === '_blank' ? 'noopener noreferrer' : undefined"
                @click="onAppSelect(app)"
              >
                <span class="kuat-header__mobile-app-link-text">
                  <span class="kuat-header__mobile-app-link-label">{{ app.label }}</span>
                  <span
                    v-if="app.description"
                    class="kuat-header__mobile-app-link-desc"
                  >{{ app.description }}</span>
                </span>
              </a>
            </li>
          </ul>
          <p
            v-else-if="(props.appSwitcher?.empty ?? 'hide') === 'message'"
            class="kuat-header__mobile-apps-empty px-3 text-sm text-muted-foreground"
          >
            {{ emptyAppsMessage }}
          </p>
        </nav>
      </div>

      <div
        v-if="hasAccountMobileTier"
        ref="mobileAccountPanelRef"
        :class="cn(
          'kuat-header__mobile-panel kuat-header__mobile-panel--apps kuat-header__mobile-panel--account',
          mobileSheetView !== 'account' && 'kuat-header__mobile-panel--hidden'
        )"
        :aria-hidden="mobileSheetView !== 'account'"
      >
        <div class="kuat-header__mobile-apps-heading">
          {{ accountLabels.title }}
        </div>
        <nav
          class="kuat-header__mobile-apps-nav"
          :aria-label="accountLabels.nav"
        >
          <ul class="kuat-header__mobile-list">
            <li
              v-for="row in mobileAccountItems ?? []"
              :key="`${row.label}-${row.href}`"
            >
              <a
                :href="row.href"
                class="kuat-header__mobile-app-link"
              >
                <span class="kuat-header__mobile-app-link-text">
                  <span class="kuat-header__mobile-app-link-label">{{ row.label }}</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <template v-if="!useBuiltInMobileSheet">
      <slot name="mobile-menu" />
    </template>
    <slot />
  </header>
</template>
