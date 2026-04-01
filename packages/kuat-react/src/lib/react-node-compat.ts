import * as React from "react"

/**
 * React 19's `ReactNode` includes `bigint`, while React 18 does not. Kuat packages
 * may be typechecked against React 19 while consumers use React 18; narrowing
 * children/slot props avoids `ForwardRefExoticComponent` JSX incompatibilities.
 */
export type KuatSlotContent =
  | React.ReactElement
  | React.ReactPortal
  | string
  | number
  | boolean
  | null
  | undefined
  | ReadonlyArray<KuatSlotContent>
