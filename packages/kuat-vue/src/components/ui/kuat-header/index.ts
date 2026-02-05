import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export { default as KuatHeader } from "./KuatHeader.vue"
export { default as EELogo } from "./EELogo.vue"
export { cn }

export const kuatHeaderVariants = cva(
  "relative w-full border-b",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--kuat-header-default-background)] text-[var(--kuat-header-default-foreground)] border-border",
        bold:
          "bg-[var(--kuat-header-bold-background)] text-[var(--kuat-header-bold-foreground)] border-[var(--kuat-header-bold-foreground-secondary)]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type KuatHeaderVariants = VariantProps<typeof kuatHeaderVariants>
