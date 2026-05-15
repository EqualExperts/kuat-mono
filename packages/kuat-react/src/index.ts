/**
 * @equal-experts/kuat-react
 *
 * Kuat Design System - React Components
 *
 * This package provides:
 * - Custom Kuat components (ButtonGroup, future blocks)
 * - Utilities (cn)
 * - Design tokens via bundled styles
 *
// For standard UI components not listed below (e.g. Dialog), install them directly
// via shadcn CLI with kuat-core theming. See documentation for setup guide.
 */

// =============================================================================
// STYLES
// =============================================================================
// Bundled design tokens and Tailwind runtime from @equal-experts/kuat-core.
import "./styles.css";

// =============================================================================
// STYLES: Each component imports its own CSS. Consumers should import
// @equal-experts/kuat-core/variables.css once for design tokens.
// Kuat custom components (e.g. ButtonGroup) use their own CSS files and are
// fully supported. For legacy Tailwind-only usage, import
// "@equal-experts/kuat-react/styles" or ensure your app has Tailwind.
// =============================================================================

// =============================================================================
// UTILITIES
// =============================================================================
export { cn } from "./lib/utils";

// =============================================================================
// KUAT CUSTOM COMPONENTS
// These are components unique to Kuat, not available in shadcn
// =============================================================================
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
  BUTTON_GROUP_ORIENTATIONS,
} from "./components/ui/button-group";
export type {
  ButtonGroupProps,
  ButtonGroupTextProps,
  ButtonGroupSeparatorProps,
  ButtonGroupOrientation,
} from "./components/ui/button-group";

export { ContentCard } from "./components/ui/content-card";
export type { ContentCardProps } from "./components/ui/content-card";

// =============================================================================
// KUAT BLOCKS (Composed Patterns)
// Pre-built compositions of components for common patterns
// =============================================================================
export {
  KuatHeader,
  kuatHeaderVariants,
  EELogo,
  KUAT_HEADER_LOCKUP_VARIANTS,
  KUAT_HEADER_APP_SWITCHER_EMPTY,
} from "./components/ui/kuat-header";
export type {
  KuatHeaderProps,
  EELogoProps,
  KuatHeaderVariant,
  KuatHeaderLockupVariant,
  KuatHeaderSubItem,
  KuatHeaderNavItem,
  KuatHeaderAccountItem,
  KuatHeaderAccountConfig,
  KuatHeaderAccountLabels,
  KuatHeaderAccountMobileTier,
  KuatHeaderActionItem,
  KuatHeaderApp,
  KuatHeaderAppSwitcherConfig,
  KuatHeaderAppSwitcherEmpty,
  KuatHeaderAppSwitcherLabels,
  KuatHeaderLockupConfig,
} from "./components/ui/kuat-header";

export {
  shouldShowAppSwitcher,
  resolveAppSwitcherLabels,
  resolveHeaderLockup,
} from "./components/ui/kuat-header";

export {
  IconButton,
  iconButtonVariants,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_ROUNDNESS,
  ICON_BUTTON_VARIANT_DEFAULT_ALIAS,
  ICON_BUTTON_SIZE_SM_ALIAS,
  ICON_BUTTON_SIZE_LG_ALIAS,
} from "./components/ui/icon-button";
export type {
  IconButtonProps,
  IconButtonSize,
  IconButtonRoundness,
} from "./components/ui/icon-button";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "./components/ui/carousel";
export type {
  CarouselItemBasis,
  CarouselResponsiveBasis,
  CarouselEventHandler,
  CarouselEventHandlers,
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
} from "./components/ui/carousel";

export {
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
  useKuatCarousel,
} from "./components/ui/kuat-carousel";
export type {
  KuatCarouselSlidesPerView,
  KuatCarouselProps,
  KuatCarouselContentProps,
  KuatCarouselItemProps,
} from "./components/ui/kuat-carousel";

export {
  KuatRadialProgress,
  KUAT_RADIAL_PROGRESS_SIZES,
  KUAT_RADIAL_PROGRESS_COLORS,
} from "./components/ui/kuat-radial-progress";
export type {
  KuatRadialProgressProps,
  KuatRadialProgressSize,
  KuatRadialProgressColor,
} from "./components/ui/kuat-radial-progress";

export {
  KuatLogoLockup,
  KUAT_LOGO_LOCKUP_USE,
  KUAT_LOGO_LOCKUP_MODE,
} from "./components/ui/kuat-logo-lockup";
export type {
  KuatLogoLockupProps,
  KuatLogoLockupUse,
  KuatLogoLockupMode,
} from "./components/ui/kuat-logo-lockup";

export { EELogoIcon } from "./components/ui/ee-logo-icon";
export type { EELogoIconProps } from "./components/ui/ee-logo-icon";

// Accordion (localized UI component – import from Kuat)
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion";

// AlertDialog (localized UI component – import from Kuat)
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/ui/alert-dialog";

// Badge (localized UI component – import from Kuat)
export { Badge, badgeVariants, BADGE_VARIANTS, BADGE_ROUNDNESS } from "./components/ui/badge";
export type { BadgeProps, BadgeVariant, BadgeRoundness } from "./components/ui/badge";

// Breadcrumb (localized UI component – import from Kuat)
export {
  Breadcrumb,
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/ui/breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItemEntry,
  BreadcrumbLinkProps,
} from "./components/ui/breadcrumb";

// Button (localized UI component – import from Kuat)
export {
  Button,
  buttonVariants,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_COLORS,
} from "./components/ui/button";
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonColor } from "./components/ui/button";

// Textarea (localized UI component – import from Kuat)
export { Textarea, TEXTAREA_RESIZE } from "./components/ui/textarea";
export type { TextareaProps, TextareaResize } from "./components/ui/textarea";

// Input (localized UI component – import from Kuat)
export { Input, INPUT_SIZES } from "./components/ui/input";
export type { InputProps, InputSize } from "./components/ui/input";

// Field (localized UI component – import from Kuat)
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
  FIELD_ORIENTATIONS,
} from "./components/ui/field"
export type {
  FieldErrorProps,
  FieldLegendProps,
  FieldLegendVariant,
  FieldOrientation,
  FieldProps,
} from "./components/ui/field"

// Select (localized UI component – import from Kuat)
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
} from "./components/ui/select";
export type {
  KuatSelectProps,
  SelectContentProps,
  SelectItemGroup,
  SelectItemOption,
  SelectItemProps,
  SelectItems,
  SelectLabelProps,
  SelectLines,
  SelectProps,
  SelectSeparatorProps,
  SelectSize,
  SelectTriggerProps,
  SelectValueProps,
} from "./components/ui/select";

// Checkbox (localized UI component – import from Kuat)
export {
  Checkbox,
  CheckboxField,
  CHECKBOX_FIELD_APPEARANCES,
  CHECKBOX_FIELD_LAYOUTS,
} from "./components/ui/checkbox";
export type {
  CheckboxProps,
  CheckboxFieldAppearance,
  CheckboxFieldLayout,
  CheckboxFieldProps,
} from "./components/ui/checkbox";

// Radio (localized UI component – import from Kuat)
export {
  RadioGroup,
  RadioGroupItem,
  RadioField,
  RADIO_FIELD_APPEARANCES,
  RADIO_FIELD_LAYOUTS,
} from "./components/ui/radio"
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioFieldAppearance,
  RadioFieldLayout,
  RadioFieldProps,
} from "./components/ui/radio"

// Switch (localized UI component – import from Kuat)
export {
  Switch,
  SwitchField,
  SWITCH_FIELD_APPEARANCES,
  SWITCH_FIELD_LAYOUTS,
} from "./components/ui/switch"
export type {
  SwitchProps,
  SwitchFieldAppearance,
  SwitchFieldLayout,
  SwitchFieldProps,
} from "./components/ui/switch"

// Toggle (localized UI component – import from Kuat)
export {
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  TOGGLE_SIZES,
  TOGGLE_SKINS,
} from "./components/ui/toggle"
export type {
  ToggleProps,
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleSize,
  ToggleSkin,
} from "./components/ui/toggle"

// Sonner (localized UI component – import from Kuat)
export { Sonner, SonnerContent, SONNER_POSITIONS, toast } from "./components/ui/sonner"
export type {
  SonnerAnnouncement,
  SonnerContentAction,
  SonnerContentProps,
  SonnerPosition,
  SonnerProps,
  SonnerToastOptions,
} from "./components/ui/sonner"


