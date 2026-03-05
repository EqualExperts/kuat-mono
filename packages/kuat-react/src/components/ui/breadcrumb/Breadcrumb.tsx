"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb-primitives"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../dropdown-menu"
import { cn } from "@/lib/utils"

const BREADCRUMB_COLLAPSE_BREAKPOINT = 640

function useCollapsed(breakpoint: number = BREADCRUMB_COLLAPSE_BREAKPOINT) {
  const [collapsed, setCollapsed] = React.useState(false)
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }
    const m = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = () => setCollapsed(m.matches)
    handler()
    m.addEventListener("change", handler)
    return () => m.removeEventListener("change", handler)
  }, [breakpoint])
  return collapsed
}

/** Single breadcrumb entry for the trail. */
export interface BreadcrumbItemEntry {
  /** Visible label. */
  label: string
  /** Link URL. Omit for current page when no children. */
  href?: string
  /** Sub-items; when set, this item is rendered as a dropdown. */
  children?: Array<{ label: string; href: string }>
}

export interface BreadcrumbProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "children"> {
  /** Breadcrumb trail: ordered list of items. Last item is current page if it has no href. */
  items: BreadcrumbItemEntry[]
  /** Custom link component (e.g. Next.js Link). Receives { href, children } and should render a link. */
  linkComponent?: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
  }>
  /** Custom separator node (e.g. icon). Default is chevron. */
  separator?: React.ReactNode
  /** aria-label for the nav. Default "Breadcrumb". */
  "aria-label"?: string
}

const DefaultLink: React.FC<{
  href: string
  children: React.ReactNode
  className?: string
}> = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

function renderItem(
  item: BreadcrumbItemEntry,
  isCurrent: boolean,
  LinkComponent: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
  }>,
  separator: React.ReactNode | undefined
) {
  const hasChildren = item.children && item.children.length > 0
  if (hasChildren) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "breadcrumb-dropdown-trigger",
              "inline-flex items-center gap-1 font-medium"
            )}
            aria-haspopup="menu"
          >
            {item.label}
            <ChevronDown
              className="breadcrumb-dropdown-trigger__icon"
              aria-hidden
            />
            <span className="sr-only">Toggle menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            {item.children!.map((child, i) => (
              <DropdownMenuItem key={i} asChild>
                <a href={child.href}>{child.label}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  if (isCurrent) return <BreadcrumbPage>{item.label}</BreadcrumbPage>
  if (item.href) {
    return (
      <BreadcrumbLink
        render={
          <LinkComponent href={item.href}>{item.label}</LinkComponent>
        }
      />
    )
  }
  return <BreadcrumbPage>{item.label}</BreadcrumbPage>
}

function BreadcrumbInner(
  {
    items,
    linkComponent: LinkComponent = DefaultLink,
    separator,
    className,
    "aria-label": ariaLabel = "Breadcrumb",
    ...props
  }: BreadcrumbProps,
  ref: React.Ref<HTMLElement>
) {
  const collapsed = useCollapsed()

  if (!items.length) return null

  const showCollapsed =
    collapsed && items.length > 2
  const displayItems: BreadcrumbItemEntry[] = showCollapsed
    ? [items[0], items[items.length - 1]]
    : items
  const middleItems = showCollapsed ? items.slice(1, -1) : []

  /** Flatten middle items for ellipsis dropdown: { label, href }[] */
  const ellipsisLinks: Array<{ label: string; href: string }> = middleItems.flatMap(
    (item) =>
      item.href
        ? [{ label: item.label, href: item.href }]
        : (item.children ?? []).map((c) => ({ label: c.label, href: c.href }))
  )

  return (
    <BreadcrumbRoot
      ref={ref}
      aria-label={ariaLabel}
      className={className}
      {...props}
    >
      <BreadcrumbList>
        {displayItems.map((item, displayIndex) => {
          const realIndex = showCollapsed
            ? displayIndex === 0
              ? 0
              : items.length - 1
            : displayIndex
          const isLast = displayIndex === displayItems.length - 1
          const isCurrent = isLast && !item.href && !item.children

          return (
            <React.Fragment key={realIndex}>
              {displayIndex > 0 && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
              {showCollapsed &&
                displayIndex === 1 &&
                ellipsisLinks.length > 0 && (
                  <>
                    <BreadcrumbItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "breadcrumb-dropdown-trigger",
                              "breadcrumb-ellipsis-trigger",
                              "inline-flex items-center"
                            )}
                            aria-haspopup="menu"
                          >
                            <BreadcrumbEllipsis />
                            <span className="sr-only">Show more pages</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuGroup>
                            {ellipsisLinks.map((link, i) => (
                              <DropdownMenuItem key={i} asChild>
                                <a href={link.href}>{link.label}</a>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                  </>
                )}
              <BreadcrumbItem>
                {renderItem(item, isCurrent, LinkComponent, separator)}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  BreadcrumbInner
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
