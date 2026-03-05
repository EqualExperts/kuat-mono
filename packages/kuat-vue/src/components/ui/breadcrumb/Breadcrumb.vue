<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ref, computed, onMounted, onUnmounted } from "vue"
import { ChevronRight, ChevronDown, MoreHorizontal } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import type { BreadcrumbItemEntry } from "./types"
import "./breadcrumb.css"

interface Props {
  items: BreadcrumbItemEntry[]
  /** aria-label for the nav. Default "Breadcrumb". */
  ariaLabel?: string
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: "Breadcrumb",
})

const BREADCRUMB_COLLAPSE_BREAKPOINT = 640
const collapsed = ref(false)

let mediaQuery: MediaQueryList | null = null
function useCollapsed() {
  onMounted(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return
    mediaQuery = window.matchMedia(`(max-width: ${BREADCRUMB_COLLAPSE_BREAKPOINT}px)`)
    collapsed.value = mediaQuery.matches
    mediaQuery.addEventListener("change", handler)
  })
  onUnmounted(() => {
    if (mediaQuery) mediaQuery.removeEventListener("change", handler)
  })
}
function handler() {
  if (mediaQuery) collapsed.value = mediaQuery.matches
}
useCollapsed()

const showCollapsed = computed(() => collapsed.value && props.items.length > 2)
const displayItems = computed(() =>
  showCollapsed.value ? [props.items[0], props.items[props.items.length - 1]] : props.items
)
const middleItems = computed(() =>
  showCollapsed.value ? props.items.slice(1, -1) : []
)
const ellipsisLinks = computed(() =>
  middleItems.value.flatMap((item) =>
    item.href
      ? [{ label: item.label, href: item.href }]
      : (item.children ?? []).map((c) => ({ label: c.label, href: c.href }))
  )
)

const dropdownOpen = ref<string | null>(null)

function toggleDropdown(key: string) {
  dropdownOpen.value = dropdownOpen.value === key ? null : key
}

function closeDropdown() {
  dropdownOpen.value = null
}

function isCurrent(item: BreadcrumbItemEntry, isLast: boolean) {
  return isLast && !item.href && (!item.children || item.children.length === 0)
}

function hasChildren(item: BreadcrumbItemEntry) {
  return item.children && item.children.length > 0
}
</script>

<template>
  <nav
    v-if="items.length"
    :aria-label="ariaLabel"
    :class="cn('breadcrumb', props.class)"
    role="navigation"
  >
    <ol class="breadcrumb-list">
      <template
        v-for="(item, displayIndex) in displayItems"
        :key="showCollapsed && displayIndex === 1 ? items.length - 1 : displayIndex"
      >
        <span
          v-if="displayIndex > 0"
          role="presentation"
          aria-hidden="true"
          class="breadcrumb-separator"
        >
          <ChevronRight class="breadcrumb-separator__icon" />
        </span>
        <template v-if="showCollapsed && displayIndex === 1 && ellipsisLinks.length > 0">
          <li class="breadcrumb-item">
            <button
              type="button"
              class="breadcrumb-dropdown-trigger breadcrumb-ellipsis-trigger"
              aria-haspopup="menu"
              :aria-expanded="dropdownOpen === 'ellipsis'"
              @click="toggleDropdown('ellipsis')"
            >
              <MoreHorizontal class="breadcrumb-dropdown-trigger__icon" aria-hidden />
              <span class="sr-only">Show more pages</span>
            </button>
            <div
              v-show="dropdownOpen === 'ellipsis'"
              class="breadcrumb-dropdown-content"
              role="menu"
            >
              <a
                v-for="(link, i) in ellipsisLinks"
                :key="i"
                :href="link.href"
                class="breadcrumb-dropdown-item"
                role="menuitem"
                @click="closeDropdown"
              >
                {{ link.label }}
              </a>
            </div>
          </li>
          <span role="presentation" aria-hidden="true" class="breadcrumb-separator">
            <ChevronRight class="breadcrumb-separator__icon" />
          </span>
        </template>
        <li class="breadcrumb-item">
          <template v-if="hasChildren(item)">
            <button
              type="button"
              class="breadcrumb-dropdown-trigger"
              aria-haspopup="menu"
              :aria-expanded="dropdownOpen === `item-${displayIndex}`"
              @click="toggleDropdown(`item-${displayIndex}`)"
            >
              {{ item.label }}
              <ChevronDown class="breadcrumb-dropdown-trigger__icon" aria-hidden />
              <span class="sr-only">Toggle menu</span>
            </button>
            <div
              v-show="dropdownOpen === `item-${displayIndex}`"
              class="breadcrumb-dropdown-content"
              role="menu"
            >
              <a
                v-for="(child, i) in item.children"
                :key="i"
                :href="child.href"
                class="breadcrumb-dropdown-item"
                role="menuitem"
                @click="closeDropdown"
              >
                {{ child.label }}
              </a>
            </div>
          </template>
          <template v-else-if="isCurrent(item, displayIndex === displayItems.length - 1)">
            <span
              class="breadcrumb-page"
              role="link"
              aria-disabled="true"
              aria-current="page"
            >
              {{ item.label }}
            </span>
          </template>
          <template v-else-if="item.href">
            <a :href="item.href" class="breadcrumb-link">{{ item.label }}</a>
          </template>
          <template v-else>
            <span class="breadcrumb-page" aria-current="page">{{ item.label }}</span>
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>
