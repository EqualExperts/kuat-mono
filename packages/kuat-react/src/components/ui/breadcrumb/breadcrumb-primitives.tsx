"use client"

import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

import "./breadcrumb.css"

const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    "aria-label"?: string
  }
>(({ className, "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => (
  <nav
    ref={ref}
    aria-label={ariaLabel}
    className={cn("breadcrumb", className)}
    {...props}
  />
))
BreadcrumbRoot.displayName = "BreadcrumbRoot"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("breadcrumb-list", className)} {...props} />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("breadcrumb-item", className)} {...props} />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  /** When provided, render this element instead of <a> (e.g. Next.js Link). */
  render?: React.ReactElement
  asChild?: boolean
}

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, render, asChild = false, ...props }, ref) => {
  if (render) {
    const renderProps = (render as React.ReactElement<{ className?: string }>).props
    return React.cloneElement(render, {
      ...props,
      ref,
      className: cn("breadcrumb-link", renderProps?.className, className),
    } as Record<string, unknown>)
  }
  if (asChild && React.Children.only(props.children)) {
    const child = React.Children.only(props.children) as React.ReactElement<{ className?: string }>
    return React.cloneElement(child, {
      ref,
      className: cn("breadcrumb-link", child.props?.className, className),
      ...props,
    } as Record<string, unknown>)
  }
  return (
    <a
      ref={ref}
      className={cn("breadcrumb-link", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("breadcrumb-page", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("breadcrumb-separator", className)}
    {...props}
  >
    {children ?? <ChevronRight className="breadcrumb-separator__icon" />}
  </span>
))
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("breadcrumb-ellipsis", className)}
    {...props}
  >
    <MoreHorizontal className="breadcrumb-ellipsis__icon" />
  </span>
))
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
export type { BreadcrumbLinkProps }
