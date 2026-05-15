import { cn } from "@/lib/utils"
import type { KuatHeaderVariant } from "./constants"

export { default as KuatHeader } from "./KuatHeader.vue"
export { default as EELogo } from "./EELogo.vue"
export { cn }
export {
  KUAT_HEADER_VARIANTS,
  KUAT_HEADER_LOCKUP_VARIANTS,
  EE_LOGO_TEXT_COLORS,
  KUAT_HEADER_APP_SWITCHER_EMPTY,
} from "./constants"
export {
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
export type {
  KuatHeaderVariant,
  KuatHeaderLockupVariant,
  EELogoTextColor,
  KuatHeaderApp,
  KuatHeaderAppSwitcherConfig,
  KuatHeaderAppSwitcherLabels,
  KuatHeaderAppSwitcherEmpty,
  KuatHeaderAccountItem,
  KuatHeaderAccountConfig,
  KuatHeaderAccountMobileTier,
  KuatHeaderAccountLabels,
  KuatHeaderLockupConfig,
  KuatHeaderSubItem,
  KuatHeaderNavItem,
  KuatHeaderActionItem,
  KuatHeaderMobileAccount,
  KuatHeaderMobileAccountItem,
} from "./constants"
export type KuatHeaderVariants = { variant?: KuatHeaderVariant }

/** Returns class string for header variant (backward compatibility). */
export function kuatHeaderVariants(options?: { variant?: KuatHeaderVariant }) {
  const v = options?.variant ?? "default"
  return cn("kuat-header", `kuat-header--${v}`)
}
