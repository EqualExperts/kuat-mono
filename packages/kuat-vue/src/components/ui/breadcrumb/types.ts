export interface BreadcrumbItemEntry {
  label: string
  href?: string
  children?: Array<{ label: string; href: string }>
}
