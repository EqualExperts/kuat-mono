import { cn } from "@/lib/utils"
import type { KuatHeaderVariant } from "./constants"

export { default as KuatHeader } from "./KuatHeader.vue"
export { default as EELogo } from "./EELogo.vue"
export { cn }
export { KUAT_HEADER_VARIANTS, EE_LOGO_TEXT_COLORS } from "./constants"
export type { KuatHeaderVariant, EELogoTextColor } from "./constants"
export type KuatHeaderVariants = { variant?: KuatHeaderVariant }

/** Returns class string for header variant (backward compatibility). */
export function kuatHeaderVariants(options?: { variant?: KuatHeaderVariant }) {
  const v = options?.variant ?? "default"
  return cn("kuat-header", `kuat-header--${v}`)
}
