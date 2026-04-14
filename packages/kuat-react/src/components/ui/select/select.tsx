"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  isSelectItemGroup,
  SELECT_LINES,
  SELECT_SIZES,
  type SelectItems,
  type SelectLines,
  type SelectSize,
} from "./constants"
import "./select.css"

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value
const SelectGroup = SelectPrimitive.Group
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("select-label", className)}
    data-slot="select-label"
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    size?: SelectSize
    lines?: SelectLines
    label?: React.ReactNode
    prepend?: React.ReactNode
    decoration?: React.ReactNode
    invalid?: boolean
  }
>(
  (
    {
      className,
      children,
      size = "regular",
      lines = "single",
      label,
      prepend,
      decoration,
      invalid,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "select-trigger",
        `select-trigger--size-${size}`,
        `select-trigger--lines-${lines}`,
        className
      )}
      data-slot="select-trigger"
      aria-invalid={invalid || props["aria-invalid"] ? true : undefined}
      {...props}
    >
      {prepend ? <span className="select-trigger__prepend">{prepend}</span> : null}
      <span className="select-trigger__value-wrap">
        {label ? <span className="select-trigger__label">{label}</span> : null}
        {children}
      </span>
      {decoration ? (
        <span className="select-trigger__decoration">{decoration}</span>
      ) : null}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="select-trigger__icon size-4" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("select-scroll-button", className)}
    data-slot="select-scroll-up-button"
    {...props}
  >
    <ChevronUp className="size-4" aria-hidden />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("select-scroll-button", className)}
    data-slot="select-scroll-down-button"
    {...props}
  >
    <ChevronDown className="size-4" aria-hidden />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    size?: SelectSize
    maxHeight?: number | string
  }
>(
  (
    {
      className,
      children,
      position = "item-aligned",
      size = "regular",
      maxHeight,
      style,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "select-content",
          `select-content--position-${position}`,
          `select-content--size-${size}`,
          className
        )}
        data-slot="select-content"
        position={position}
        style={
          {
            ...style,
            "--kuat-select-content-max-height":
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          } as React.CSSProperties
        }
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="select-viewport" data-slot="select-viewport">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("select-separator", className)}
    data-slot="select-separator"
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  prepend?: React.ReactNode
  description?: React.ReactNode
  decoration?: React.ReactNode
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, prepend, description, decoration, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn("select-item", description && "select-item--double", className)}
    data-slot="select-item"
    {...props}
  >
    {prepend ? <span className="select-item__prepend">{prepend}</span> : null}
    <span className="select-item__text">
      <SelectPrimitive.ItemText className="select-item__label">{children}</SelectPrimitive.ItemText>
      {description ? (
        <span className="select-item__description">{description}</span>
      ) : null}
    </span>
    {decoration ? <span className="select-item__decoration">{decoration}</span> : null}
    <SelectPrimitive.ItemIndicator className="select-item__indicator">
      <Check className="size-4" aria-hidden />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export interface KuatSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "children"> {
  items?: SelectItems
  placeholder?: string
  size?: SelectSize
  lines?: SelectLines
  prepend?: React.ReactNode
  decoration?: React.ReactNode
  label?: React.ReactNode
  invalid?: boolean
  position?: React.ComponentPropsWithoutRef<typeof SelectContent>["position"]
  maxHeight?: number | string
  triggerClassName?: string
  contentClassName?: string
  emptyText?: React.ReactNode
  children?: React.ReactNode
  triggerProps?: Omit<
    React.ComponentPropsWithoutRef<typeof SelectTrigger>,
    "children" | "size" | "lines" | "label" | "prepend" | "decoration" | "invalid"
  >
}

function renderSimpleItems(items: SelectItems): React.ReactNode {
  return items.map((item, itemIndex) => {
    if (isSelectItemGroup(item)) {
      return (
        <SelectGroup key={`group-${itemIndex}`}>
          <SelectLabel>{item.label}</SelectLabel>
          {item.items.map((entry) => (
            <SelectItem
              key={entry.value}
              value={entry.value}
              disabled={entry.disabled}
              prepend={entry.prepend}
              description={entry.description}
              decoration={entry.decoration}
            >
              {entry.label}
            </SelectItem>
          ))}
          {itemIndex < items.length - 1 ? <SelectSeparator /> : null}
        </SelectGroup>
      )
    }

    return (
      <SelectItem
        key={item.value}
        value={item.value}
        disabled={item.disabled}
        prepend={item.prepend}
        description={item.description}
        decoration={item.decoration}
      >
        {item.label}
      </SelectItem>
    )
  })
}

function KuatSelect({
  items = [],
  placeholder = "Select an item",
  size = "regular",
  lines = "single",
  prepend,
  decoration,
  label,
  invalid = false,
  position = "item-aligned",
  maxHeight = 320,
  triggerClassName,
  contentClassName,
  emptyText = "No options available",
  children,
  triggerProps,
  ...rootProps
}: KuatSelectProps) {
  const hasChildren = React.Children.count(children) > 0

  return (
    <Select {...rootProps}>
      <SelectTrigger
        size={size}
        lines={lines}
        prepend={prepend}
        decoration={decoration}
        label={label}
        invalid={invalid}
        className={triggerClassName}
        {...triggerProps}
      >
        <SelectValue className="select-trigger__value" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        size={size}
        position={position}
        maxHeight={maxHeight}
        className={contentClassName}
      >
        {hasChildren
          ? children
          : items.length > 0
            ? renderSimpleItems(items)
            : <p className="select-empty">{emptyText}</p>}
      </SelectContent>
    </Select>
  )
}

export type SelectProps = React.ComponentPropsWithoutRef<typeof Select>
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectTrigger>
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectContent>
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectLabel>
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectSeparator>
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectValue>

export {
  KuatSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SELECT_LINES,
  SELECT_SIZES,
}
