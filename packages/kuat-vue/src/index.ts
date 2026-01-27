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
 * For standard UI components (Button, Dialog, etc.), install them directly
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

// =============================================================================
// KUAT BLOCKS (Composed Patterns)
// Pre-built compositions of components for common patterns
// =============================================================================
// Coming soon: KuatHeader, KuatFooter, KuatSearchPattern, etc.

// =============================================================================
// DEPRECATED EXPORTS
// These components are re-exports of shadcn-vue components.
// Install them directly via shadcn-vue CLI for better maintainability.
//
// Migration guide:
// 1. Install @equal-experts/kuat-core for design tokens
// 2. Run: npx shadcn-vue@latest add button (or other component)
// 3. Remove imports from @equal-experts/kuat-vue
//
// These exports will be removed in the next major version.
// =============================================================================

/**
 * @deprecated Install directly via `npx shadcn-vue@latest add button`.
 * The component will be themed automatically when using kuat-core.
 */
export { Button, buttonVariants } from "./components/ui/button";
/** @deprecated */
export type { ButtonVariants } from "./components/ui/button";

/**
 * @deprecated Install directly via `npx shadcn-vue@latest add accordion`.
 * The component will be themed automatically when using kuat-core.
 */
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion";

/**
 * @deprecated Install directly via `npx shadcn-vue@latest add alert-dialog`.
 * The component will be themed automatically when using kuat-core.
 */
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

/**
 * @deprecated Install directly via `npx shadcn-vue@latest add badge`.
 * The component will be themed automatically when using kuat-core.
 */
export { Badge, badgeVariants } from "./components/ui/badge";
/** @deprecated */
export type { BadgeVariants } from "./components/ui/badge";
