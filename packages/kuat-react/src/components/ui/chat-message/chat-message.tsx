"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { KuatSlotContent } from "@/lib/react-node-compat"

import "./chat-message.css"

export const CHAT_MESSAGE_VARIANTS = ["user", "assistant", "system"] as const
export type ChatMessageVariant = (typeof CHAT_MESSAGE_VARIANTS)[number]

const VARIANT_ARIA_LABEL: Record<ChatMessageVariant, string> = {
  user: "User message",
  assistant: "Assistant message",
  system: "System message",
}

export interface ChatMessageProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Aligns and styles the message as user, assistant, or system. */
  variant: ChatMessageVariant
  /** Optional leading slot (e.g. avatar). */
  leading?: KuatSlotContent
  /** Optional label above the main content (e.g. name, timestamp). Overrides `author` when both are set. */
  label?: KuatSlotContent
  /** Shorthand for a plain text label (e.g. "You", "Assistant"). */
  author?: string
  /** Plain-text body; used when `children` is omitted. For rich content, use `children`. */
  content?: string
  /** Optional footer (e.g. actions, metadata). */
  footer?: KuatSlotContent
  children?: KuatSlotContent
}

const ChatMessage = React.forwardRef<HTMLElement, ChatMessageProps>(
  function ChatMessage(
    {
      className,
      variant,
      leading = null,
      label = null,
      author,
      content,
      footer = null,
      children,
      ...props
    },
    ref
  ) {
    const hasLeading = leading != null && leading !== false && leading !== ""
    const labelResolved =
      label != null && label !== false && label !== ""
        ? label
        : author != null && author !== ""
          ? author
          : null
    const hasLabel =
      labelResolved != null && labelResolved !== ""
    const hasFooter = footer != null && footer !== false && footer !== ""
    const hasRichBody = children != null && children !== false
    const body =
      hasRichBody ? (
        children
      ) : content != null && content !== "" ? (
        <p className="chat-message__text">{content}</p>
      ) : null

    return (
      <article
        ref={ref}
        data-slot="chat-message"
        data-variant={variant}
        aria-label={VARIANT_ARIA_LABEL[variant]}
        className={cn("chat-message", `chat-message--${variant}`, className)}
        {...props}
      >
        <div
          className={cn(
            "chat-message__row",
            !hasLeading && "chat-message__row--no-leading"
          )}
        >
          {hasLeading ? (
            <div data-slot="leading" className="chat-message__leading">
              {leading}
            </div>
          ) : null}
          <div className="chat-message__column">
            {hasLabel ? (
              <div data-slot="label" className="chat-message__label">
                {labelResolved}
              </div>
            ) : null}
            <div data-slot="content" className="chat-message__content">
              {body}
            </div>
          </div>
        </div>
        {hasFooter ? (
          <div data-slot="footer" className="chat-message__footer">
            {footer}
          </div>
        ) : null}
      </article>
    )
  }
)
ChatMessage.displayName = "ChatMessage"

export { ChatMessage }
