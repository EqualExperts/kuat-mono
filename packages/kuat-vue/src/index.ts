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

export {
  ChatMessage,
  CHAT_MESSAGE_VARIANTS,
} from "./components/ui/chat-message";
export type { ChatMessageVariant } from "./components/ui/chat-message";

export { ChatComposer } from "./components/ui/chat-composer";

// =============================================================================
// KUAT BLOCKS (Composed Patterns)
// Pre-built compositions of components for common patterns
// =============================================================================
export { KuatChatLayout } from "./components/ui/kuat-chat-layout";

export { KuatHeader, kuatHeaderVariants, EELogo } from "./components/ui/kuat-header";
export type { KuatHeaderVariants } from "./components/ui/kuat-header";

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

