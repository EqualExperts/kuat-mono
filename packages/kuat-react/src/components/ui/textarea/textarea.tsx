"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./textarea.css"

export const TEXTAREA_RESIZE = ["none", "vertical", "horizontal", "both"] as const
export type TextareaResize = (typeof TEXTAREA_RESIZE)[number]

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "resize"> {
  /** Controls CSS `resize`. Default `vertical`. */
  resize?: TextareaResize
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = "vertical", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("textarea", `textarea--resize-${resize}`, className)}
        data-slot="textarea"
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
