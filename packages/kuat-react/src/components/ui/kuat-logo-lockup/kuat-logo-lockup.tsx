"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { EELogo } from "@/components/ui/kuat-header"
import { Separator } from "@/components/ui/separator"
import { EELogoIcon } from "@/components/ui/ee-logo-icon"

import "./kuat-logo-lockup.css"

export const KUAT_LOGO_LOCKUP_USE = ["service", "demo"] as const
export type KuatLogoLockupUse = (typeof KUAT_LOGO_LOCKUP_USE)[number]

export const KUAT_LOGO_LOCKUP_MODE = ["light", "dark"] as const
export type KuatLogoLockupMode = (typeof KUAT_LOGO_LOCKUP_MODE)[number]

export interface KuatLogoLockupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Service name (Service use) or primary title (Demo use) */
  title: string
  /** Service: logo first + name. Demo: title primary, "A demo by" + small logo. */
  use?: KuatLogoLockupUse
  /** Visual theme */
  mode?: KuatLogoLockupMode
  /** When true, force dark styling (e.g. on dark background) */
  forceDark?: boolean
}

const KuatLogoLockup = React.forwardRef<HTMLDivElement, KuatLogoLockupProps>(
  (
    {
      className,
      title,
      use = "service",
      mode = "light",
      forceDark = false,
      ...props
    },
    ref
  ) => {
    const effectiveMode: KuatLogoLockupMode = forceDark ? "dark" : mode

    const logoElement =
      (
        <EELogo
          className={cn(
            "kuat-logo-lockup__logo",
            use === "demo" && "kuat-logo-lockup__logo--demo"
          )}
          textColor={effectiveMode === "dark" ? "white" : "grey"}
        />
      )

    return (
      <div
        ref={ref}
        className={cn(
          "kuat-logo-lockup",
          `kuat-logo-lockup--${effectiveMode}`,
          `kuat-logo-lockup--${use}`,
          className
        )}
        {...props}
      >
        {use === "service" ? (
          <div className="kuat-logo-lockup__service-inner">
            <div className="kuat-logo-lockup__logo-wrap">{logoElement}</div>
            <Separator
              orientation="vertical"
              className="kuat-logo-lockup__separator"
            />
            <span className="kuat-logo-lockup__service-name">{title}</span>
          </div>
        ) : (
          <>
            <h2 className="kuat-logo-lockup__demo-title">{title}</h2>
            <div className="kuat-logo-lockup__demo-attribution">
              <span className="kuat-logo-lockup__demo-by">A demo by</span>
              <div className="kuat-logo-lockup__demo-logo-wrap">{logoElement}</div>
            </div>
          </>
        )}
      </div>
    )
  }
)
KuatLogoLockup.displayName = "KuatLogoLockup"

export { KuatLogoLockup }
