import type { Component, VNode } from "vue"

export const KUAT_HEADER_VARIANTS = ["default", "bold"] as const
export type KuatHeaderVariant = (typeof KUAT_HEADER_VARIANTS)[number]

export const KUAT_HEADER_LOCKUP_VARIANTS = ["default", "demo"] as const
export type KuatHeaderLockupVariant = (typeof KUAT_HEADER_LOCKUP_VARIANTS)[number]

export const EE_LOGO_TEXT_COLORS = ["grey", "white"] as const
export type EELogoTextColor = (typeof EE_LOGO_TEXT_COLORS)[number]

export const KUAT_HEADER_APP_SWITCHER_EMPTY = ["hide", "message"] as const
export type KuatHeaderAppSwitcherEmpty = (typeof KUAT_HEADER_APP_SWITCHER_EMPTY)[number]

export interface KuatHeaderApp {
  id: string
  label: string
  href: string
  description?: string
  icon?: Component | VNode
}

export interface KuatHeaderAppSwitcherLabels {
  trigger?: string
  nav?: string
  title?: string
  teaserTitle?: string
  teaserDescription?: string
}

export interface KuatHeaderAppSwitcherConfig {
  apps: KuatHeaderApp[]
  loading?: boolean
  empty?: KuatHeaderAppSwitcherEmpty
  emptyMessage?: string
  linkTarget?: string
  labels?: KuatHeaderAppSwitcherLabels
  onOpen?: () => void
  onSelect?: (app: KuatHeaderApp) => void
}

export interface KuatHeaderAccountItem {
  label: string
  href: string
  icon?: Component | VNode
}

export interface KuatHeaderAccountMobileTier {
  heading: string
  subtitle?: string
  items: KuatHeaderAccountItem[]
}

export interface KuatHeaderAccountLabels {
  teaserTitle?: string
  teaserDescription?: string
  nav?: string
  title?: string
}

export interface KuatHeaderAccountConfig {
  items: KuatHeaderAccountItem[]
  mobile?: KuatHeaderAccountMobileTier
  labels?: KuatHeaderAccountLabels
}

export interface KuatHeaderLockupConfig {
  variant: KuatHeaderLockupVariant
}

export interface KuatHeaderSubItem {
  label: string
  url: string
}

export interface KuatHeaderNavItem extends KuatHeaderSubItem {
  items?: KuatHeaderSubItem[]
}

/** @deprecated Use `KuatHeaderAccountItem` with `href`. */
export interface KuatHeaderActionItem {
  label: string
  url: string
  icon?: Component | VNode
  items?: KuatHeaderSubItem[]
}

/** @deprecated Use `KuatHeaderAccountMobileTier` via `account.mobile`. */
export interface KuatHeaderMobileAccountItem {
  label: string
  href: string
}

/** @deprecated Use `KuatHeaderAccountMobileTier` via `account.mobile`. */
export interface KuatHeaderMobileAccount {
  heading: string
  subtitle?: string
  items: KuatHeaderMobileAccountItem[]
}
