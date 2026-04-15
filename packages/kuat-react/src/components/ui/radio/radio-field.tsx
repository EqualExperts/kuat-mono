"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field"
import { RadioGroupItem } from "./radio"

import "./radio-field.css"

export const RADIO_FIELD_APPEARANCES = ["plain", "card"] as const
export type RadioFieldAppearance = (typeof RADIO_FIELD_APPEARANCES)[number]

export const RADIO_FIELD_LAYOUTS = ["inline", "block"] as const
export type RadioFieldLayout = (typeof RADIO_FIELD_LAYOUTS)[number]

/** @deprecated Prefer composing `Field` + `RadioGroupItem` for new form layouts. */
export interface RadioFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupItem>, "id" | "children"> {
  /** Primary label (always shown). */
  label: React.ReactNode
  /** Optional secondary line (12px muted); works for both plain and card. */
  secondaryText?: React.ReactNode
  /** `plain` — no border/padding; `card` — bordered padded container (Figma Rich). */
  appearance?: RadioFieldAppearance
  /** `inline` — compact label; `block` — label row can grow (Figma Radio Group). */
  layout?: RadioFieldLayout
  /** Place radio on the right of the text block. */
  flipped?: boolean
  id?: string
  /** Required — must match a unique option in the parent `RadioGroup`. */
  value: string
}

/** @deprecated Prefer composing `Field` + `RadioGroupItem` for new form layouts. */
const RadioField = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioFieldProps
>(
  (
    {
      className,
      label,
      secondaryText,
      appearance = "plain",
      layout = "inline",
      flipped = false,
      id: idProp,
      disabled,
      value,
      ...radioItemProps
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const hasSecondary = secondaryText != null
    const isInvalid =
      radioItemProps["aria-invalid"] === true ||
      radioItemProps["aria-invalid"] === "true"

    return (
      <Field
        className={cn(
          "radio-field",
          `radio-field--appearance-${appearance}`,
          `radio-field--layout-${layout}`,
          hasSecondary && "radio-field--has-secondary",
          flipped && "radio-field--flipped",
          disabled && "radio-field--disabled",
          isInvalid && "radio-field--invalid",
          className
        )}
        data-slot="radio-field"
      >
        <FieldLabel className="radio-field__label" htmlFor={id}>
          <span className="radio-field__radio-wrap">
            <RadioGroupItem
              ref={ref}
              id={id}
              value={value}
              disabled={disabled}
              {...radioItemProps}
            />
          </span>
          <FieldContent className="radio-field__text">
            <FieldTitle className="radio-field__primary">{label}</FieldTitle>
            {hasSecondary ? (
              <FieldDescription className="radio-field__secondary">
                {secondaryText}
              </FieldDescription>
            ) : null}
          </FieldContent>
        </FieldLabel>
      </Field>
    )
  }
)
RadioField.displayName = "RadioField"

export { RadioField }
