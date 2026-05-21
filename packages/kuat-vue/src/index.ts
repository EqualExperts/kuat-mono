/**
 * @equal-experts/kuat-vue
 *
 * Kuat Design System - Vue Components
 *
 * This package provides:
 * - Custom Kuat components (ButtonGroup, future blocks)
 * - Utilities (cn)
 * - Design tokens via bundled styles
 *
 * For standard UI components not listed below (e.g. Dialog), install them directly
 * via shadcn-vue CLI with kuat-core theming. See documentation for setup guide.
 */

// =============================================================================
// STYLES
// =============================================================================
// Bundled design tokens from @equal-experts/kuat-core
import "./styles.css";

// =============================================================================
// UTILITIES
// =============================================================================
export { cn } from "./lib/utils";

// =============================================================================
// KUAT CUSTOM COMPONENTS
// These are components unique to Kuat, not available in shadcn-vue
// =============================================================================
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "./components/ui/button-group";
export type { ButtonGroupVariants } from "./components/ui/button-group";

export { ContentCard } from "./components/ui/content-card";

// =============================================================================
// KUAT BLOCKS (Composed Patterns)
// Pre-built compositions of components for common patterns
// =============================================================================
export { KuatHeader, kuatHeaderVariants, EELogo } from "./components/ui/kuat-header";
export type {
  KuatHeaderVariants,
  KuatHeaderVariant,
  KuatHeaderLockupVariant,
  KuatHeaderApp,
  KuatHeaderAppSwitcherConfig,
  KuatHeaderAccountConfig,
  KuatHeaderAccountItem,
  KuatHeaderNavItem,
  KuatHeaderLockupConfig,
  KuatHeaderMobileAccount,
  KuatHeaderMobileAccountItem,
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
  IconButtonVariants,
  IconButtonSize,
  IconButtonRoundness,
} from "./components/ui/icon-button";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/ui/carousel";
export type {
  CarouselItemBasis,
  CarouselResponsiveBasis,
  CarouselOrientation,
  CarouselApi,
  CarouselEventHandler,
  CarouselEventHandlers,
} from "./components/ui/carousel";

export {
  KuatCarousel,
  KuatCarouselContent,
  KuatCarouselItem,
  KuatCarouselPrevious,
  KuatCarouselNext,
} from "./components/ui/kuat-carousel";
export type { KuatCarouselSlidesPerView } from "./components/ui/kuat-carousel";

export {
  KuatRadialProgress,
  KUAT_RADIAL_PROGRESS_SIZES,
  KUAT_RADIAL_PROGRESS_COLORS,
} from "./components/ui/kuat-radial-progress";
export type {
  KuatRadialProgressSize,
  KuatRadialProgressColor,
} from "./components/ui/kuat-radial-progress";

export {
  KuatLogoLockup,
  EELogoIcon,
  KUAT_LOGO_LOCKUP_USE,
  KUAT_LOGO_LOCKUP_MODE,
} from "./components/ui/kuat-logo-lockup";
export type {
  KuatLogoLockupUse,
  KuatLogoLockupMode,
} from "./components/ui/kuat-logo-lockup";

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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";

// Badge (localized UI component – import from Kuat)
export { Badge, badgeVariants, BADGE_VARIANTS, BADGE_ROUNDNESS } from "./components/ui/badge";
export type { BadgeVariants, BadgeVariant, BadgeRoundness } from "./components/ui/badge";

// Breadcrumb (localized UI component – import from Kuat)
export { Breadcrumb } from "./components/ui/breadcrumb";
export type { BreadcrumbItemEntry } from "./components/ui/breadcrumb";

// Button (localized UI component – import from Kuat)
export {
  Button,
  buttonVariants,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_COLORS,
} from "./components/ui/button";
export type { ButtonVariants, ButtonVariant, ButtonSize, ButtonColor } from "./components/ui/button";

// Textarea (localized UI component – import from Kuat)
export { Textarea, TEXTAREA_RESIZE } from "./components/ui/textarea";
export type { TextareaResize } from "./components/ui/textarea";

// Input (localized UI component – import from Kuat)
export { Input, INPUT_SIZES } from "./components/ui/input";
export type { InputSize } from "./components/ui/input";

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
  FIELD_LEGEND_VARIANTS,
  FIELD_ORIENTATIONS,
} from "./components/ui/field"
export type { FieldLegendVariant, FieldOrientation } from "./components/ui/field"

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
  SelectItemGroup,
  SelectItemOption,
  SelectItems,
  SelectLines,
  SelectSize,
} from "./components/ui/select";

// Checkbox (localized UI component – import from Kuat)
export {
  Checkbox,
  CheckboxField,
  CHECKBOX_FIELD_APPEARANCES,
  CHECKBOX_FIELD_LAYOUTS,
} from "./components/ui/checkbox";
export type { CheckboxFieldAppearance, CheckboxFieldLayout } from "./components/ui/checkbox";

// Radio (localized UI component – import from Kuat)
export {
  RadioGroup,
  RadioGroupItem,
  RadioField,
  RADIO_FIELD_APPEARANCES,
  RADIO_FIELD_LAYOUTS,
} from "./components/ui/radio"
export type { RadioFieldAppearance, RadioFieldLayout } from "./components/ui/radio"

// Switch (localized UI component – import from Kuat)
export {
  Switch,
  SwitchField,
  SWITCH_FIELD_APPEARANCES,
  SWITCH_FIELD_LAYOUTS,
} from "./components/ui/switch"
export type { SwitchFieldAppearance, SwitchFieldLayout } from "./components/ui/switch"

// Toggle (localized UI component – import from Kuat)
export { Toggle, TOGGLE_SIZES, TOGGLE_SKINS } from "./components/ui/toggle"
export type { ToggleSize, ToggleSkin } from "./components/ui/toggle"

export {
  ToggleGroup,
  ToggleGroupItem,
  TOGGLE_GROUP_ORIENTATIONS,
} from "./components/ui/toggle-group"
export type { ToggleGroupOrientation } from "./components/ui/toggle-group"

// Sonner (localized UI component – import from Kuat)
export { Sonner, SonnerContent, SONNER_POSITIONS, toast } from "./components/ui/sonner"
export type {
  SonnerAnnouncement,
  SonnerContentAction,
  SonnerPosition,
  SonnerToastOptions,
} from "./components/ui/sonner"

