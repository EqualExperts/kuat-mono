"use client"

import * as React from "react"
import { ChevronDown, Menu, User, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import "./kuat-header.css"

export const KUAT_HEADER_VARIANTS = ["default", "bold"] as const
export type KuatHeaderVariant = (typeof KUAT_HEADER_VARIANTS)[number]

export const KUAT_HEADER_LOCKUP_VARIANTS = ["default", "demo"] as const
export type KuatHeaderLockupVariant = (typeof KUAT_HEADER_LOCKUP_VARIANTS)[number]

export const EE_LOGO_TEXT_COLORS = ["grey", "white"] as const
export type EELogoTextColor = (typeof EE_LOGO_TEXT_COLORS)[number]

/**
 * Equal Experts Logo component
 * Source: https://github.com/EqualExperts/brand-assets/blob/main/logo/logo-colour.svg
 */
export interface EELogoProps {
  className?: string
  /** Text color variant - grey for default, white for bold */
  textColor?: EELogoTextColor
}

function EELogo({ className, textColor = "grey" }: EELogoProps) {
  return (
    <svg
      className={cn("ee-logo", `ee-logo--${textColor}`, className)}
      viewBox="0 0 500 133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Equal Experts logo"
    >
      <g clipPath="url(#ee-logo-clip)">
        <g className="ee-logo__text" fill="currentColor">
          <path d="M220.235 1.45712L219.413 13.0751H197.72V23.2946H216.859V34.844H197.72V45.3862H219.667V57.0237H184.687V1.45712H220.235Z"/>
          <path d="M227.495 29.0742C227.495 11.6766 233.601 0.136902 250.675 0.136902C267.75 0.136902 273.855 11.6766 273.855 29.0742V29.3382C273.855 41.4549 270.92 50.6084 263.454 55.2243L271.869 65.0037L260.568 70.7736L252.446 58.256C251.872 58.3312 251.293 58.3606 250.714 58.344C233.64 58.344 227.534 46.7945 227.534 29.3187L227.495 29.0742ZM241.194 29.2307C241.194 40.6921 243.669 46.55 250.685 46.55C257.701 46.55 260.254 40.6823 260.254 29.2307C260.254 17.779 257.691 11.9211 250.685 11.9211C243.679 11.9211 241.194 17.8572 241.194 29.2307Z"/>
          <path d="M295.871 1.36911V35.2059C295.871 42.7947 297.436 46.5891 304.119 46.5891C310.802 46.5891 312.368 42.7947 312.368 35.2059V1.36911H325.401V35.8318C325.401 50.5009 320.284 58.3244 304.119 58.3244C287.955 58.3244 282.847 50.5009 282.847 35.8318V1.36911H295.871Z"/>
          <path d="M361.282 1.45712C365.734 13.0751 373.493 37.0737 378.894 57.014H365.656L363.258 46.462H346.38L343.982 57.014H330.724C335.651 38.2094 341.53 19.6666 348.337 1.45712H361.282ZM354.599 16.7032C352.544 22.8838 350.89 28.9079 349.315 34.844H360.294C358.562 28.9079 356.996 22.8838 355.01 16.7032H354.599Z"/>
          <path d="M399.139 1.45712V45.3862H421.076V57.0237H386.106V1.45712H399.139Z"/>
        </g>
        <path d="M102.74 38.8927H40.5969V57.5323H102.74V38.8927Z" fill="#1795D4"/>
        <path d="M102.74 75.3895H40.5969V93.029H102.74V75.3895Z" fill="#1795D4"/>
        <path d="M0.489227 2.44485V20.7938V110.382V128.741H19.1389H56.6732V110.382H19.1389V20.7938H56.6732V2.44485H19.1389H0.489227Z" fill="#1795D4"/>
        <path d="M124.198 2.44485H85.6262V21.0844H124.198V112.092H85.6262V130.741H124.198H142.847V112.092V21.0844V2.44485H124.198Z" fill="#1795D4"/>
        <g className="ee-logo__text" fill="currentColor">
          <path d="M220.235 75.2819L219.413 86.9096H197.72V97.1291H216.859V108.679H197.72V119.231H219.667V130.849H184.687V75.2819H220.235Z"/>
          <path d="M240.773 75.3015C243.17 80.1912 246.712 87.0368 249.677 92.2101H249.931C252.984 87.2519 256.614 80.1716 258.924 75.3015H273.601C269.687 83.2228 263.63 93.6868 258.014 102.928L274.765 130.868H259.168L250.088 113.969H249.853L240.616 130.868H225.264L241.683 102.821C236.487 94.0193 229.941 82.1275 226.174 75.2819L240.773 75.3015Z"/>
          <path d="M296.204 75.3015C301.096 75.3015 305.939 75.634 309.648 76.8759C315.842 79.0959 319.873 85.1982 319.873 93.7748C319.873 106.39 311.879 112.649 298.425 112.649H294.804V130.849H281.8V75.3015H296.204ZM294.804 101.021H297.358C302.965 101.021 306.164 100.366 306.164 93.7748C306.164 91.3006 305.254 89.1589 303.767 88.1614C302.28 87.1639 300.313 86.9292 297.505 86.9292H294.785L294.804 101.021Z"/>
          <path d="M363.924 75.2819L363.092 86.9096H341.399V97.1291H360.538V108.679H341.399V119.231H363.346V130.849H328.366V75.2819H363.924Z"/>
          <path d="M387.593 75.3015C392.485 75.3015 397.329 75.634 401.037 76.8759C407.221 79.0959 411.262 85.1884 411.262 93.7748C411.262 101.442 408.327 106.801 402.935 109.764L412.994 130.868H399.472L391.468 112.571C390.558 112.649 389.325 112.649 388.17 112.649H386.213V130.849H373.151V75.3015H387.593ZM386.194 101.276H388.748C394.354 101.276 397.554 100.366 397.554 93.7748C397.554 91.3006 396.644 88.9926 395.166 87.9951C393.689 86.9976 391.859 86.7629 388.885 86.7629H386.174L386.194 101.276Z"/>
          <path d="M456.957 75.2819L456.135 86.9096H442.857V130.849H429.824V86.9096H416.213V75.2819H456.957Z"/>
          <path d="M495.978 89.1393C492.031 87.0587 487.652 85.93 483.19 85.8437C481.553 85.7535 479.918 86.0343 478.405 86.6651C477.672 86.9348 477.045 87.4311 476.613 88.0819C476.182 88.7326 475.97 89.5039 476.008 90.2835C476.008 93.2174 478.943 94.9874 483.024 96.6401L487.642 98.4493C495.89 101.755 499.765 106.204 499.765 114.282C499.765 127.142 490.362 132.169 479.061 132.169C473.816 132.084 468.616 131.197 463.64 129.538L464.217 117.001C468.488 119.008 473.113 120.154 477.828 120.375C483.767 120.375 486.076 118.888 486.076 115.485C486.076 112.277 483.933 110.869 479.227 108.972L474.609 107.163C467.926 104.522 462.319 99.8282 462.319 90.5965C462.319 81.3647 469.002 73.9715 482.524 73.9715C487.385 74.0422 492.192 74.9931 496.712 76.7782L495.978 89.1393Z"/>
        </g>
      </g>
      <defs>
        <clipPath id="ee-logo-clip">
          <rect width="500" height="133" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export interface KuatHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Logo element - defaults to EE logo if not provided. Set to `null` to hide. */
  logo?: React.ReactNode
  /** Page or application title */
  title?: string
  /** Navigation items or legacy navigation node. */
  navigation?: React.ReactNode | KuatHeaderNavItem[]
  /** Right-side actions or legacy action node. */
  actions?: React.ReactNode | KuatHeaderActionItem[]
  /** Mobile menu trigger button (e.g., hamburger icon) */
  mobileMenuTrigger?: React.ReactNode
  /** Mobile menu content (typically a Sheet or Drawer) */
  mobileMenu?: React.ReactNode
  /** Hide the default EE logo */
  hideLogo?: boolean
  /** Brand lockup layout in header. */
  lockupVariant?: KuatHeaderLockupVariant
  variant?: KuatHeaderVariant
}

export interface KuatHeaderSubItem {
  label: string
  url: string
}

export interface KuatHeaderNavItem extends KuatHeaderSubItem {
  items?: KuatHeaderSubItem[]
}

export interface KuatHeaderActionItem extends KuatHeaderSubItem {
  icon?: React.ReactNode
  items?: KuatHeaderSubItem[]
}

const defaultLinkRenderer = (
  item: KuatHeaderSubItem,
  className?: string
) => (
  <a href={item.url} className={className}>
    {item.label}
  </a>
)

function isNavConfig(
  value: KuatHeaderProps["navigation"]
): value is KuatHeaderNavItem[] {
  return Array.isArray(value)
}

function isActionConfig(
  value: KuatHeaderProps["actions"]
): value is KuatHeaderActionItem[] {
  return Array.isArray(value)
}

function HeaderDropdownItems({ items }: { items: KuatHeaderSubItem[] }) {
  return (
    <DropdownMenuContent align="start" className="kuat-header__dropdown-content">
      <DropdownMenuGroup>
        {items.map((item) => (
          <DropdownMenuItem key={`${item.label}-${item.url}`} asChild>
            {defaultLinkRenderer(item, "kuat-header__dropdown-link")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}

function HeaderDesktopNav({ items, variant }: { items: KuatHeaderNavItem[]; variant: KuatHeaderVariant }) {
  return (
    <div className="kuat-header__nav-items">
      {items.map((item) => {
        if (!item.items?.length) {
          return (
            <a
              key={`${item.label}-${item.url}`}
              href={item.url}
              className={cn(
                "kuat-header__nav-link",
                variant === "bold" && "kuat-header__nav-link--bold"
              )}
            >
              {item.label}
            </a>
          )
        }

        return (
          <DropdownMenu key={`${item.label}-${item.url}`}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "kuat-header__nav-trigger",
                  variant === "bold" && "kuat-header__nav-trigger--bold"
                )}
                aria-haspopup="menu"
              >
                {item.label}
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <HeaderDropdownItems items={item.items} />
          </DropdownMenu>
        )
      })}
    </div>
  )
}

function HeaderDesktopActions({ items, variant }: { items: KuatHeaderActionItem[]; variant: KuatHeaderVariant }) {
  return (
    <div className="kuat-header__actions-items">
      {items.map((item) => {
        const icon = item.icon ?? <User className="h-4 w-4" aria-hidden />
        if (!item.items?.length) {
          return (
            <a
              key={`${item.label}-${item.url}`}
              href={item.url}
              className={cn(
                "kuat-header__action-link",
                variant === "bold" && "kuat-header__action-link--bold"
              )}
            >
              {icon}
              <span>{item.label}</span>
            </a>
          )
        }

        return (
          <DropdownMenu key={`${item.label}-${item.url}`}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "kuat-header__action-trigger",
                  variant === "bold" && "kuat-header__action-trigger--bold"
                )}
                aria-haspopup="menu"
              >
                {icon}
                <span className="hidden sm:inline">{item.label}</span>
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <HeaderDropdownItems items={item.items} />
          </DropdownMenu>
        )
      })}
    </div>
  )
}

const KuatHeader = React.forwardRef<HTMLElement, KuatHeaderProps>(
  (
    {
      className,
      variant = "default",
      logo,
      title,
      navigation,
      actions,
      mobileMenuTrigger,
      mobileMenu,
      hideLogo,
      lockupVariant = "default",
      children,
      ...props
    },
    ref
  ) => {
    const isStructuredNavigation = isNavConfig(navigation)
    const isStructuredActions = isActionConfig(actions)
    const hasStructuredMenus = isStructuredNavigation || isStructuredActions
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)
    const mobileTriggerRef = React.useRef<HTMLButtonElement | null>(null)
    const mobileSheetRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (!isMobileOpen) {
        return
      }
      const body = document.body
      const previousOverflow = body.style.overflow
      body.style.overflow = "hidden"
      const previousFocused = document.activeElement as HTMLElement | null
      const firstInteractive = mobileSheetRef.current?.querySelector<HTMLElement>(
        "button, a, [tabindex]:not([tabindex='-1'])"
      )
      firstInteractive?.focus()

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault()
          setIsMobileOpen(false)
          return
        }
        if (event.key !== "Tab" || !mobileSheetRef.current) {
          return
        }
        const focusables = mobileSheetRef.current.querySelectorAll<HTMLElement>(
          "button, a, [tabindex]:not([tabindex='-1'])"
        )
        if (!focusables.length) {
          return
        }
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
      document.addEventListener("keydown", onKeyDown)
      return () => {
        body.style.overflow = previousOverflow
        document.removeEventListener("keydown", onKeyDown)
        if (mobileTriggerRef.current) {
          mobileTriggerRef.current.focus()
        } else {
          previousFocused?.focus()
        }
      }
    }, [isMobileOpen])

    const logoElement =
      logo !== undefined
        ? logo
        : !hideLogo && (
            <EELogo
              className="ee-logo--desktop shrink-0"
              textColor={variant === "bold" ? "white" : "grey"}
            />
          )

    const mobileLogoElement =
      logo !== undefined
        ? logo
        : !hideLogo && (
            <EELogo
              className="ee-logo--mobile shrink-0"
              textColor={variant === "bold" ? "white" : "grey"}
            />
          )

    const effectiveLockupVariant = logo !== undefined ? "default" : lockupVariant
    const showDefaultDesktopLockup = logoElement && effectiveLockupVariant === "default"
    const showDefaultMobileLockup = mobileLogoElement && effectiveLockupVariant === "default"
    const showDemoDesktopLockup = logoElement && effectiveLockupVariant === "demo"
    const showDemoMobileLockup = mobileLogoElement && effectiveLockupVariant === "demo"

    return (
      <header
        ref={ref}
        className={cn(
          "kuat-header",
          `kuat-header--${variant}`,
          className
        )}
        {...props}
      >
        <div className="kuat-header__desktop">
          <div className="kuat-header__desktop-left">
            {showDefaultDesktopLockup && (
              <>
                <div className="shrink-0">{logoElement}</div>
                <Separator
                  orientation="vertical"
                  className="kuat-header__separator"
                />
              </>
            )}
            {showDemoDesktopLockup && (
              <div className="kuat-header__desktop-demo-lockup">
                {title && (
                  <h1 className="kuat-header__desktop-demo-title">
                    {title}
                  </h1>
                )}
                <div className="kuat-header__demo-byline">
                  <span className="kuat-header__demo-label">A demo by</span>
                  <div className="kuat-header__desktop-demo-logo">{logoElement}</div>
                </div>
              </div>
            )}
            {title && effectiveLockupVariant === "default" && (
              <h1 className="kuat-header__desktop-title">
                {title}
              </h1>
            )}
          </div>
          <div className="kuat-header__desktop-right">
            {isStructuredNavigation ? (
              navigation.length > 0 && (
                <nav aria-label="Primary navigation">
                  <HeaderDesktopNav items={navigation} variant={variant} />
                </nav>
              )
            ) : navigation ? (
              <nav className="flex items-center">{navigation}</nav>
            ) : null}
            {isStructuredActions ? (
              actions.length > 0 && (
                <div className="flex items-center gap-2">
                  <HeaderDesktopActions items={actions} variant={variant} />
                </div>
              )
            ) : actions ? (
              <div className="flex items-center gap-2">{actions}</div>
            ) : null}
          </div>
        </div>

        <div className="kuat-header__mobile">
          <div className="kuat-header__mobile-left">
            {showDefaultMobileLockup && <div className="shrink-0">{mobileLogoElement}</div>}
            {showDemoMobileLockup && (
              <div className="kuat-header__mobile-demo-lockup">
                {title && (
                  <p className="kuat-header__mobile-demo-title">
                    {title}
                  </p>
                )}
                <div className="kuat-header__demo-byline">
                  <span className="kuat-header__demo-label">A demo by</span>
                  <div className="kuat-header__mobile-demo-logo">{mobileLogoElement}</div>
                </div>
              </div>
            )}
            {title && effectiveLockupVariant === "default" && (
              <p className="kuat-header__mobile-title">
                {title}
              </p>
            )}
          </div>
          {mobileMenuTrigger ? (
            <div className="shrink-0">{mobileMenuTrigger}</div>
          ) : hasStructuredMenus ? (
            <Button
              ref={mobileTriggerRef}
              variant="ghost"
              size="icon"
              className={cn(
                "kuat-header__mobile-trigger",
                variant === "bold" && "kuat-header__mobile-trigger--bold"
              )}
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              aria-controls="kuat-header-mobile-menu"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden />
            </Button>
          ) : null}
        </div>

        {hasStructuredMenus ? (
          isMobileOpen && (
            <div
              id="kuat-header-mobile-menu"
              ref={mobileSheetRef}
              className="kuat-header__mobile-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="kuat-header__mobile-sheet-header">
                <Button
                  variant="ghost"
                  size="icon"
                  className="kuat-header__mobile-close"
                  aria-label="Close menu"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden />
                </Button>
              </div>
              <div className="kuat-header__mobile-sheet-nav">
                {isStructuredNavigation && navigation.length > 0 && (
                  <nav aria-label="Primary navigation">
                    <ul className="kuat-header__mobile-list">
                      {navigation.map((item) => (
                        <li key={`${item.label}-${item.url}`}>
                          <a href={item.url} className="kuat-header__mobile-link">
                            {item.label}
                          </a>
                          {item.items?.length ? (
                            <ul className="kuat-header__mobile-sub-list">
                              {item.items.map((subItem) => (
                                <li key={`${subItem.label}-${subItem.url}`}>
                                  <a href={subItem.url} className="kuat-header__mobile-sub-link">
                                    {subItem.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
              {isStructuredActions && actions.length > 0 ? (
                <div className="kuat-header__mobile-sheet-actions">
                  <ul className="kuat-header__mobile-list">
                    {actions.map((action) => (
                      <li key={`${action.label}-${action.url}`}>
                        <a href={action.url} className="kuat-header__mobile-link">
                          <span className="kuat-header__mobile-action-icon">
                            {action.icon ?? <User className="h-4 w-4" aria-hidden />}
                          </span>
                          {action.label}
                        </a>
                        {action.items?.length ? (
                          <ul className="kuat-header__mobile-sub-list">
                            {action.items.map((subItem) => (
                              <li key={`${subItem.label}-${subItem.url}`}>
                                <a href={subItem.url} className="kuat-header__mobile-sub-link">
                                  {subItem.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )
        ) : (
          mobileMenu
        )}
        {children}
      </header>
    )
  }
)
KuatHeader.displayName = "KuatHeader"

/** Returns class string for header variant (backward compatibility). */
export function kuatHeaderVariants(options?: { variant?: KuatHeaderVariant }) {
  const v = options?.variant ?? "default"
  return cn("kuat-header", `kuat-header--${v}`)
}

export { KuatHeader, EELogo }
