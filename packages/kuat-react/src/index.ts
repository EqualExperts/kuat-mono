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
 * For standard UI components (Button, Dialog, etc.), install them directly
 * via shadcn CLI with kuat-core theming. See documentation for setup guide.
 */

// =============================================================================
// STYLES: Each component imports its own CSS. Consumers should import
// @equal-experts/kuat-core/variables.css once for design tokens.
// For deprecated components (Button, etc.) that use Tailwind, import
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
} from "./components/ui/button-group";

// =============================================================================
// KUAT BLOCKS (Composed Patterns)
// Pre-built compositions of components for common patterns
// =============================================================================
export { KuatHeader, kuatHeaderVariants, EELogo } from "./components/ui/kuat-header";
export type { KuatHeaderProps, EELogoProps } from "./components/ui/kuat-header";

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

// =============================================================================
// DEPRECATED EXPORTS
// These components are re-exports of shadcn components.
// Install them directly via shadcn CLI for better maintainability.
//
// Migration guide:
// 1. Install @equal-experts/kuat-core for design tokens
// 2. Run: npx shadcn@latest add button (or other component)
// 3. Remove imports from @equal-experts/kuat-react
//
// These exports will be removed in the next major version.
// =============================================================================

/**
 * @deprecated Install directly via `npx shadcn@latest add button`.
 * The component will be themed automatically when using kuat-core.
 */
export { Button, buttonVariants } from "./components/ui/button";
/** @deprecated */
export type { ButtonProps } from "./components/ui/button";

