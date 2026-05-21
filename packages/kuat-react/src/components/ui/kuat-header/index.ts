export {
  KuatHeader,
  EELogo,
  kuatHeaderVariants,
} from "./kuat-header"

export {
  KUAT_HEADER_VARIANTS,
  KUAT_HEADER_LOCKUP_VARIANTS,
  KUAT_HEADER_APP_SWITCHER_EMPTY,
  EE_LOGO_TEXT_COLORS,
} from "./kuat-header.types"

export type {
  KuatHeaderProps,
  EELogoProps,
  KuatHeaderVariant,
  KuatHeaderLockupVariant,
  EELogoTextColor,
  KuatHeaderSubItem,
  KuatHeaderNavItem,
  KuatHeaderAccountItem,
  KuatHeaderAccountConfig,
  KuatHeaderAccountLabels,
  KuatHeaderAccountMobileTier,
  KuatHeaderActionItem,
  KuatHeaderApp,
  KuatHeaderAppSwitcherConfig,
  KuatHeaderAppSwitcherEmpty,
  KuatHeaderAppSwitcherLabels,
  KuatHeaderLockupConfig,
} from "./kuat-header.types"

export {
  shouldShowAppSwitcher,
  resolveAppSwitcherLabels,
  resolveHeaderLockup,
  resolveAccountLabels,
  shouldShowAccountMobileTier,
  hasStructuredAccount,
  resolveDesktopAccountMenuItems,
  shouldUseDesktopAccountDropdown,
} from "./kuat-header.logic"
