"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { KuatSlotContent } from "@/lib/react-node-compat"
import "./content-card.css"

export interface ContentCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "content" | "children" | "title"
  > {
  className?: string
  asChild?: boolean
  /** Optional media; when `null`, the media area is removed (no gap). */
  imageSrc?: string | null
  imageAlt?: string

  /** Header props (not slots). */
  badge: KuatSlotContent
  category: KuatSlotContent
  title: KuatSlotContent
  titleHeadingLevel: 1 | 2 | 3 | 4 | 5 | 6

  /** Optional basic content text (hidden when omitted). */
  contentText?: string | null

  /** Header Accessory slot (flex row). */
  headerAccessory?: KuatSlotContent | null

  /** Custom content slot below basic content. */
  customContent?: KuatSlotContent | null

  /** Footer slot. */
  footer?: KuatSlotContent | null

  children?: KuatSlotContent
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(function ContentCard(
  {
    className,
    asChild = false,
    imageSrc = null,
    imageAlt = "",
    contentText = null,
    headerAccessory = null,
    customContent = null,
    footer = null,
    badge,
    category,
    title,
    titleHeadingLevel = 3,
    children,
    ...props
  },
  ref
) {
  const HeadingTag = (`h${titleHeadingLevel}` as unknown) as keyof JSX.IntrinsicElements

  const internalMarkup = (
    <>
      {imageSrc !== null ? (
        <div className="content-card__media">
          <img className="content-card__media-img" alt={imageAlt} src={imageSrc} />
        </div>
      ) : null}

      <div className="content-card__body">
        <div className="content-card__heading-row">
          <div className="content-card__heading-left">
            <div className="content-card__heading-meta">
              <div data-slot="badge" className="content-card__badge">
                {badge}
              </div>
              <p className="content-card__category">{category}</p>
            </div>
            <HeadingTag className="content-card__title">{title}</HeadingTag>
          </div>

          <div
            data-slot="header-accessory"
            className="content-card__header-accessory"
          >
            {headerAccessory ?? null}
          </div>
        </div>

        {contentText != null ? (
          <div data-slot="content" className="content-card__content">
            <p className="content-card__content-text">{contentText}</p>
          </div>
        ) : null}

        <div data-slot="custom-content" className="content-card__custom-content">
          {customContent ?? null}
        </div>

        <div data-slot="footer" className="content-card__footer">
          {footer ?? null}
        </div>
      </div>
    </>
  )

  if (asChild) {
    const onlyChild = React.Children.only(children)
    if (!React.isValidElement(onlyChild)) {
      throw new Error("ContentCard: when `asChild` is true, provide a single React element child.")
    }

    const onlyChildElement = onlyChild as React.ReactElement<{
      className?: string
      [key: string]: unknown
    }>

    return React.cloneElement(
      onlyChildElement,
      {
        ...(props as unknown as Record<string, unknown>),
        ref,
        "data-slot": "content-card",
        className: cn("content-card", onlyChildElement.props.className, className),
      } as unknown as Record<string, unknown>,
      internalMarkup
    )
  }

  return (
    <div
      ref={ref}
      data-slot="content-card"
      className={cn("content-card", className)}
      {...props}
    >
      {internalMarkup}
    </div>
  )
})

export { ContentCard }

