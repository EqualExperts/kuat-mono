"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { KuatSlotContent } from "@/lib/react-node-compat"

import "./kuat-chat-layout.css"

export interface KuatChatLayoutProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "title"> {
  /**
   * Custom header region. When provided, `title` / `headerMeta` are ignored.
   */
  header?: KuatSlotContent
  /**
   * Preset header title (e.g. thread name). Renders a default header bar unless `header` is set.
   */
  title?: string
  /** Trailing content in the preset header (e.g. badge, menu trigger). */
  headerMeta?: KuatSlotContent
  /**
   * Message list body; scroll, padding, and vertical gap are applied by the layout.
   */
  messages: KuatSlotContent
  /** Optional side column (e.g. citations, files). Omitted when not provided. */
  sidePanel?: KuatSlotContent
  /** Bottom composer region. */
  composer?: KuatSlotContent
}

const KuatChatLayout = React.forwardRef<HTMLElement, KuatChatLayoutProps>(
  function KuatChatLayout(
    {
      className,
      header = null,
      title,
      headerMeta = null,
      messages,
      sidePanel = null,
      composer = null,
      ...props
    },
    ref
  ) {
    const hasCustomHeader =
      header != null && header !== false && header !== ""
    const hasPresetHeader =
      !hasCustomHeader && title != null && title !== ""
    const hasHeaderMeta =
      headerMeta != null && headerMeta !== false && headerMeta !== ""
    const hasSide =
      sidePanel != null && sidePanel !== false && sidePanel !== ""
    const hasComposer =
      composer != null && composer !== false && composer !== ""

    return (
      <section
        ref={ref}
        data-slot="kuat-chat-layout"
        aria-label="Chat"
        className={cn("kuat-chat-layout", className)}
        {...props}
      >
        {hasCustomHeader ? (
          <div data-slot="header" className="kuat-chat-layout__header">
            {header}
          </div>
        ) : hasPresetHeader ? (
          <div data-slot="header" className="kuat-chat-layout__header">
            <div className="kuat-chat-layout__header-bar">
              <h2 className="kuat-chat-layout__header-title">{title}</h2>
              {hasHeaderMeta ? (
                <div
                  data-slot="header-meta"
                  className="kuat-chat-layout__header-meta"
                >
                  {headerMeta}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        <div
          className={cn(
            "kuat-chat-layout__main",
            !hasSide && "kuat-chat-layout__main--no-side"
          )}
        >
          <div
            data-slot="messages"
            className="kuat-chat-layout__messages"
          >
            <div
              data-slot="messages-body"
              className="kuat-chat-layout__messages-body"
            >
              {messages}
            </div>
          </div>
          {hasSide ? (
            <aside
              data-slot="side-panel"
              className="kuat-chat-layout__side"
            >
              {sidePanel}
            </aside>
          ) : null}
        </div>
        {hasComposer ? (
          <div data-slot="composer" className="kuat-chat-layout__composer">
            {composer}
          </div>
        ) : null}
      </section>
    )
  }
)
KuatChatLayout.displayName = "KuatChatLayout"

export { KuatChatLayout }
