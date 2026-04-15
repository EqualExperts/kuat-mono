"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./field.css"

type DataSlotProp = {
  "data-slot"?: string
}

function getDataSlot(props: unknown, fallback: string) {
  const slot = (props as DataSlotProp)["data-slot"]
  return typeof slot === "string" ? slot : fallback
}

export const FIELD_ORIENTATIONS = ["responsive", "vertical", "horizontal"] as const
export type FieldOrientation = (typeof FIELD_ORIENTATIONS)[number]

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: FieldOrientation
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "responsive", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("field", `field--orientation-${orientation}`, className)}
      data-slot={getDataSlot(props, "field")}
      {...props}
    />
  )
)
Field.displayName = "Field"

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("field-set", className)}
    data-slot={getDataSlot(props, "field-set")}
    {...props}
  />
))
FieldSet.displayName = "FieldSet"

export type FieldLegendVariant = "legend" | "label"

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement> {
  variant?: FieldLegendVariant
}

const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  ({ className, variant = "legend", ...props }, ref) => (
    <legend
      ref={ref}
      className={cn("field-legend", `field-legend--${variant}`, className)}
      data-slot={getDataSlot(props, "field-legend")}
      {...props}
    />
  )
)
FieldLegend.displayName = "FieldLegend"

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("field-group", className)}
    data-slot={getDataSlot(props, "field-group")}
    {...props}
  />
))
FieldGroup.displayName = "FieldGroup"

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("field-label", className)}
    data-slot={getDataSlot(props, "field-label")}
    {...props}
  />
))
FieldLabel.displayName = "FieldLabel"

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("field-content", className)}
    data-slot={getDataSlot(props, "field-content")}
    {...props}
  />
))
FieldContent.displayName = "FieldContent"

const FieldTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("field-title", className)}
    data-slot={getDataSlot(props, "field-title")}
    {...props}
  />
))
FieldTitle.displayName = "FieldTitle"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("field-description", className)}
    data-slot={getDataSlot(props, "field-description")}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("field-separator", className)}
    data-slot={getDataSlot(props, "field-separator")}
    {...props}
  />
))
FieldSeparator.displayName = "FieldSeparator"

type FieldIssue = { message?: string }

export interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: Array<FieldIssue | undefined> | FieldIssue
  issues?: Array<FieldIssue | undefined>
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, children, errors, issues, ...props }, ref) => {
    const errorList = [
      ...(Array.isArray(errors) ? errors : errors ? [errors] : []),
      ...(issues ?? []),
    ]
      .map((issue) => issue?.message?.trim())
      .filter((message): message is string => Boolean(message))
    const messageCount = errorList.length
    if (!children && messageCount === 0) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn("field-error", className)}
        data-slot={getDataSlot(props, "field-error")}
        {...props}
      >
        {children}
        {!children && messageCount === 1 ? <span>{errorList[0]}</span> : null}
        {!children && messageCount > 1 ? (
          <ul className="field-error__list">
            {errorList.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }
)
FieldError.displayName = "FieldError"

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
