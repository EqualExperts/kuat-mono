import type {
  KuatHeaderAccountConfig,
  KuatHeaderAccountLabels,
  KuatHeaderAppSwitcherConfig,
  KuatHeaderAppSwitcherLabels,
  KuatHeaderLockupConfig,
  KuatHeaderLockupVariant,
  KuatHeaderSubItem,
} from "./constants"

const DEFAULT_APP_SWITCHER_LABELS: Required<KuatHeaderAppSwitcherLabels> = {
  trigger: "Equal Experts apps",
  nav: "Equal Experts applications",
  title: "Equal Experts apps",
  teaserTitle: "Equal Experts apps",
  teaserDescription: "Switch between EE services",
}

const DEFAULT_ACCOUNT_LABELS = {
  teaserTitle: "Account",
  teaserDescription: "",
  nav: "Account",
  title: "Account",
} as const

const DEFAULT_EMPTY_APPS_MESSAGE =
  "No applications are available right now."

export function shouldShowAppSwitcher(
  config?: KuatHeaderAppSwitcherConfig
): boolean {
  if (!config) {
    return false
  }
  if (config.loading) {
    return true
  }
  if (config.apps.length > 0) {
    return true
  }
  return config.empty === "message"
}

export function resolveAppSwitcherLabels(
  config?: KuatHeaderAppSwitcherConfig
): Required<KuatHeaderAppSwitcherLabels> {
  return {
    trigger:
      config?.labels?.trigger ?? DEFAULT_APP_SWITCHER_LABELS.trigger,
    nav: config?.labels?.nav ?? DEFAULT_APP_SWITCHER_LABELS.nav,
    title: config?.labels?.title ?? DEFAULT_APP_SWITCHER_LABELS.title,
    teaserTitle:
      config?.labels?.teaserTitle ?? DEFAULT_APP_SWITCHER_LABELS.teaserTitle,
    teaserDescription:
      config?.labels?.teaserDescription ??
      DEFAULT_APP_SWITCHER_LABELS.teaserDescription,
  }
}

export function resolveAppSwitcherEmptyMessage(
  config?: KuatHeaderAppSwitcherConfig
): string {
  return config?.emptyMessage ?? DEFAULT_EMPTY_APPS_MESSAGE
}

export function shouldShowAccountMobileTier(
  account?: KuatHeaderAccountConfig
): boolean {
  return Boolean(account?.mobile?.items?.length)
}

export function hasStructuredAccount(
  account?: KuatHeaderAccountConfig
): boolean {
  return Boolean(account?.items?.length)
}

export function resolveDesktopAccountMenuItems(
  account?: KuatHeaderAccountConfig
): KuatHeaderSubItem[] {
  return (
    account?.mobile?.items?.map((row) => ({
      label: row.label,
      url: row.href,
    })) ?? []
  )
}

export function shouldUseDesktopAccountDropdown(
  account?: KuatHeaderAccountConfig
): boolean {
  return (
    Boolean(account?.items?.length === 1) &&
    resolveDesktopAccountMenuItems(account).length > 0
  )
}

export function resolveAccountLabels(account?: KuatHeaderAccountConfig): {
  teaserTitle: string
  teaserDescription: string
  nav: string
  title: string
} {
  const labels: KuatHeaderAccountLabels | undefined = account?.labels
  const mobile = account?.mobile
  const primaryName = account?.items?.[0]?.label
  const teaserTitle =
    labels?.teaserTitle ?? mobile?.heading ?? DEFAULT_ACCOUNT_LABELS.teaserTitle
  const teaserDescription =
    labels?.teaserDescription ??
    mobile?.subtitle ??
    (primaryName ? `Signed in as ${primaryName}` : "")
  const title = labels?.title ?? mobile?.heading ?? DEFAULT_ACCOUNT_LABELS.title
  const nav = labels?.nav ?? DEFAULT_ACCOUNT_LABELS.nav
  return { teaserTitle, teaserDescription, nav, title }
}

export type HeaderLockupMode = "hidden" | "custom" | "builtin"

export function resolveHeaderLockup(options: {
  logo?: unknown | null
  lockup?: KuatHeaderLockupConfig
}): {
  mode: HeaderLockupMode
  lockupVariant: KuatHeaderLockupVariant
} {
  if (options.logo === null) {
    return { mode: "hidden", lockupVariant: "default" }
  }
  if (options.logo !== undefined && options.logo !== null) {
    return {
      mode: "custom",
      lockupVariant: options.lockup?.variant ?? "default",
    }
  }
  if (options.lockup?.variant) {
    return { mode: "builtin", lockupVariant: options.lockup.variant }
  }
  return { mode: "hidden", lockupVariant: "default" }
}

export function resolveMobileSheetAriaLabel(options: {
  mobileMenuAriaLabel?: string
  showAppSwitcher: boolean
  hasStructuredNavigation: boolean
  hasAccountMobileTier: boolean
}): string {
  if (options.mobileMenuAriaLabel) {
    return options.mobileMenuAriaLabel
  }
  if (
    options.showAppSwitcher &&
    !options.hasStructuredNavigation &&
    !options.hasAccountMobileTier
  ) {
    return "Equal Experts apps menu"
  }
  if (
    options.hasAccountMobileTier &&
    !options.hasStructuredNavigation &&
    !options.showAppSwitcher
  ) {
    return "Account menu"
  }
  return "Navigation menu"
}
