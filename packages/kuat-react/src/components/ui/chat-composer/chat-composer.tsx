"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { KuatSlotContent } from "@/lib/react-node-compat"

import "./chat-composer.css"

export interface ChatComposerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Optional toolbar above the input (e.g. model picker, attach). */
  toolbar?: KuatSlotContent
  /**
   * Main input area. When omitted, a styled default `<textarea>` is rendered;
   * use `textareaProps` (and optional `placeholder`) to configure it.
   */
  children?: KuatSlotContent
  /** Props forwarded to the default textarea (ignored when `children` is set). */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
  /** Ref to the default textarea element (ignored when `children` is set). */
  textareaRef?: React.Ref<HTMLTextAreaElement>
  /** Primary actions (e.g. send, stop). */
  actions?: KuatSlotContent
}

const ChatComposer = React.forwardRef<HTMLDivElement, ChatComposerProps>(
  function ChatComposer(
    {
      className,
      toolbar = null,
      children,
      textareaProps,
      textareaRef,
      actions = null,
      ...props
    },
    ref
  ) {
    const hasToolbar =
      toolbar != null && toolbar !== false && toolbar !== ""
    const hasActions =
      actions != null && actions !== false && actions !== ""
    const hasCustomInput = children != null && children !== false
    const {
      className: textareaClassName,
      ...restTextareaProps
    } = textareaProps ?? {}

    return (
      <div
        ref={ref}
        data-slot="chat-composer"
        className={cn("chat-composer", className)}
        {...props}
      >
        {hasToolbar ? (
          <div data-slot="toolbar" className="chat-composer__toolbar">
            {toolbar}
          </div>
        ) : null}
        <div className="chat-composer__main">
          <div data-slot="input" className="chat-composer__input">
            {hasCustomInput ? (
              children
            ) : (
              <textarea
                ref={textareaRef}
                data-slot="chat-composer-textarea"
                className={cn("chat-composer__textarea", textareaClassName)}
                {...restTextareaProps}
              />
            )}
          </div>
          {hasActions ? (
            <div data-slot="actions" className="chat-composer__actions">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)
ChatComposer.displayName = "ChatComposer"

export { ChatComposer }
