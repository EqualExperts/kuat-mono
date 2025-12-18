# Kuat Design System Layout Templates

A guide to creating consistent layout structures for Equal Experts applications. This document provides standardized templates for marketing sites and product applications, ensuring brand consistency and optimal user experience across all EE digital products.

---

## Overview

All Equal Experts applications should follow consistent layout patterns to maintain brand recognition and provide a cohesive user experience. This guide provides two primary layout categories:

1. **Marketing Layouts** - For public-facing websites, landing pages, and marketing content
2. **Product/App Layouts** - For internal tools, dashboards, and application interfaces

**Key Principle:** Always include the Equal Experts logo correctly placed according to logo usage guidelines. Choose the appropriate layout type based on the application's purpose and audience.

---

## Layout Decision Tree

### Choose Marketing Layout When:
- ✅ Public-facing website or landing page
- ✅ Marketing content or promotional materials
- ✅ External audience (customers, prospects, public)
- ✅ Content-focused (blog, documentation, marketing pages)
- ✅ No complex navigation or application features

### Choose Product/App Layout When:
- ✅ Internal tools or dashboards
- ✅ Application interfaces with complex navigation
- ✅ Data-heavy or interactive interfaces
- ✅ Requires persistent navigation
- ✅ User workflows and task completion

---

## Marketing Layouts

Marketing layouts are designed for public-facing content with a clean, spacious design that emphasizes content and brand presence.

### Structure

```
┌─────────────────────────────────────────┐
│ Header (Light background)               │
│ [Logo]              [Navigation Links]  │
├─────────────────────────────────────────┤
│                                         │
│         Main Content Area              │
│         (Full width, spacious)          │
│                                         │
├─────────────────────────────────────────┤
│ Footer (Light background)               │
│ [Logo]              [Links/Info]        │
└─────────────────────────────────────────┘
```

### Header Specifications

- **Background**: Light (`bg-background` or `bg-white`)
- **Logo**: Full-color Equal Experts logo, left-aligned
- **Logo Size**: 120px-150px width (minimum 100px)
- **Navigation**: Horizontal, right-aligned or centered
- **Height**: 64px-80px (flexible based on content)
- **Padding**: 16px-24px horizontal, 16px vertical

### Implementation Examples

#### React - Marketing Header

```tsx
import { Button } from "@equal-experts/kuat-react";

export function MarketingHeader() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Left aligned */}
        <div className="flex-shrink-0">
          <img 
            src="/logo.svg" 
            alt="Equal Experts" 
            className="h-12 w-auto min-w-[100px]" 
          />
        </div>
        
        {/* Navigation - Right aligned */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/about" className="text-foreground hover:text-primary">
            About
          </a>
          <a href="/services" className="text-foreground hover:text-primary">
            Services
          </a>
          <a href="/contact" className="text-foreground hover:text-primary">
            Contact
          </a>
          <Button variant="default">Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
```

#### Vue - Marketing Header

```vue
<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
</script>

<template>
  <header class="bg-background border-b border-border">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo - Left aligned -->
      <div class="flex-shrink-0">
        <img 
          src="/logo.svg" 
          alt="Equal Experts" 
          class="h-12 w-auto min-w-[100px]" 
        />
      </div>
      
      <!-- Navigation - Right aligned -->
      <nav class="hidden md:flex items-center gap-6">
        <a href="/about" class="text-foreground hover:text-primary">
          About
        </a>
        <a href="/services" class="text-foreground hover:text-primary">
          Services
        </a>
        <a href="/contact" class="text-foreground hover:text-primary">
          Contact
        </a>
        <Button variant="default">Get Started</Button>
      </nav>
    </div>
  </header>
</template>
```

### Footer Specifications

- **Background**: Light (`bg-muted` or `bg-slate-50`)
- **Logo**: Full-color Equal Experts logo (smaller than header, 100px-120px)
- **Content**: Links, copyright, social media
- **Padding**: 32px-48px vertical, 24px horizontal

---

## Product/App Layouts

Product layouts are designed for application interfaces with persistent navigation. They use **dark navigation** (either horizontal or sidebar) to create clear visual hierarchy and focus user attention on content.

### Layout Options

Product applications should use **one of two navigation patterns**:

1. **Dark Horizontal Navigation** - For simpler apps with limited navigation items
2. **Dark Sidebar Navigation** - For complex apps with hierarchical navigation

Both options use the sidebar color tokens (`--sidebar`, `--sidebar-foreground`) for consistent dark navigation styling.

---

## Option 1: Dark Horizontal Navigation

Use horizontal navigation when you have a limited number of top-level navigation items (typically 5-7 items).

### Structure

```
┌─────────────────────────────────────────┐
│ Dark Navigation Bar (Tech Blue)         │
│ [Logo]    [Nav Items]    [User Menu]   │
├─────────────────────────────────────────┤
│                                         │
│         Main Content Area               │
│         (Light background)              │
│                                         │
└─────────────────────────────────────────┘
```

### Specifications

- **Background**: Dark sidebar color (`bg-sidebar` = Tech Blue)
- **Logo**: White monochrome Equal Experts logo
- **Logo Size**: 120px-150px width (minimum 100px)
- **Height**: 64px-72px fixed
- **Navigation Items**: Horizontal, left-aligned after logo
- **User Menu**: Right-aligned (profile, settings, logout)

### Implementation Examples

#### React - Dark Horizontal Navigation

```tsx
import { Button } from "@equal-experts/kuat-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Dark Horizontal Navigation */}
      <nav className="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo - White monochrome */}
          <div className="flex-shrink-0">
            <img 
              src="/logo-white.svg" 
              alt="Equal Experts" 
              className="h-10 w-auto min-w-[100px]" 
            />
          </div>
          
          {/* Navigation Items */}
          <div className="flex items-center gap-6 flex-1 px-8">
            <a href="/dashboard" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Dashboard
            </a>
            <a href="/projects" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Projects
            </a>
            <a href="/reports" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Reports
            </a>
            <a href="/settings" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Settings
            </a>
          </div>
          
          {/* User Menu - Right aligned */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sidebar-foreground">
              Profile
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
```

#### Vue - Dark Horizontal Navigation

```vue
<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";

defineProps<{
  children?: any;
}>();
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Dark Horizontal Navigation -->
    <nav class="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo - White monochrome -->
        <div class="flex-shrink-0">
          <img 
            src="/logo-white.svg" 
            alt="Equal Experts" 
            class="h-10 w-auto min-w-[100px]" 
          />
        </div>
        
        <!-- Navigation Items -->
        <div class="flex items-center gap-6 flex-1 px-8">
          <a href="/dashboard" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Dashboard
          </a>
          <a href="/projects" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Projects
          </a>
          <a href="/reports" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Reports
          </a>
          <a href="/settings" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Settings
          </a>
        </div>
        
        <!-- User Menu - Right aligned -->
        <div class="flex items-center gap-4">
          <Button variant="ghost" class="text-sidebar-foreground">
            Profile
          </Button>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
```

---

## Option 2: Dark Sidebar Navigation

Use sidebar navigation when you have complex, hierarchical navigation with multiple levels or many navigation items.

### Structure

```
┌──────┬──────────────────────────────────┐
│      │ Top Bar (Light)                  │
│ Dark │ [Breadcrumbs]    [User Menu]    │
│ Side │──────────────────────────────────┤
│ bar  │                                  │
│      │   Main Content Area              │
│ [Logo│   (Light background)             │
│ Nav] │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

### Specifications

- **Sidebar Background**: Dark sidebar color (`bg-sidebar` = Tech Blue)
- **Sidebar Width**: 240px-280px (collapsible to 64px)
- **Logo**: White monochrome Equal Experts logo at top
- **Logo Size**: 120px-150px width (minimum 100px)
- **Logo Placement**: Top of sidebar, centered or left-aligned with padding
- **Navigation**: Vertical, hierarchical if needed
- **Top Bar**: Light background (`bg-background`) for breadcrumbs and user actions
- **Content Area**: Light background, full remaining width

### Sidebar Color Tokens

The design system provides sidebar-specific color tokens:

- **`--sidebar`**: Sidebar background (Tech Blue)
- **`--sidebar-foreground`**: Text color on sidebar (White)
- **`--sidebar-primary`**: Primary accent color (EE Blue)
- **`--sidebar-primary-foreground`**: Text on primary accent
- **`--sidebar-accent`**: Hover/active state background
- **`--sidebar-accent-foreground`**: Text on accent background
- **`--sidebar-border`**: Border color for sidebar
- **`--sidebar-ring`**: Focus ring color

### Implementation Examples

#### React - Dark Sidebar Navigation

```tsx
import { Button } from "@equal-experts/kuat-react";
import { useState } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Dark Sidebar */}
      <aside 
        className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <img 
            src="/logo-white.svg" 
            alt="Equal Experts" 
            className={`h-10 w-auto min-w-[100px] transition-opacity ${
              sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
            }`}
          />
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <a 
            href="/dashboard" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Dashboard</span>
          </a>
          <a 
            href="/projects" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Projects</span>
          </a>
          <a 
            href="/reports" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Reports</span>
          </a>
          <a 
            href="/settings" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Settings</span>
          </a>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-[6px]"
            >
              ☰
            </button>
            <nav className="text-sm text-muted-foreground">
              Dashboard / Overview
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Profile</Button>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

#### Vue - Dark Sidebar Navigation

```vue
<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
import { ref } from "vue";

const sidebarOpen = ref(true);
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Dark Sidebar -->
    <aside 
      :class="[
        'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-sidebar-border">
        <img 
          src="/logo-white.svg" 
          alt="Equal Experts" 
          :class="[
            'h-10 w-auto min-w-[100px] transition-opacity',
            sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
          ]"
        />
      </div>
      
      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <a 
          href="/dashboard" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Dashboard</span>
        </a>
        <a 
          href="/projects" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Projects</span>
        </a>
        <a 
          href="/reports" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Reports</span>
        </a>
        <a 
          href="/settings" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Settings</span>
        </a>
      </nav>
    </aside>
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 hover:bg-muted rounded-[6px]"
          >
            ☰
          </button>
          <nav class="text-sm text-muted-foreground">
            Dashboard / Overview
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <Button variant="ghost">Profile</Button>
        </div>
      </header>
      
      <!-- Content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
```

---

## Logo Placement Guidelines

### Marketing Layouts

- **Header**: Full-color logo, left-aligned, 120px-150px width
- **Footer**: Full-color logo, smaller (100px-120px), centered or left-aligned
- **Background**: Light backgrounds (white, light gray)
- **Clear Space**: Follow logo usage guidelines (bracket+equals width)

### Product/App Layouts

- **Horizontal Nav**: White monochrome logo, left-aligned, 120px-150px width
- **Sidebar**: White monochrome logo, top of sidebar, 120px-150px width, centered or left-aligned with padding
- **Background**: Dark sidebar background (Tech Blue)
- **Clear Space**: Maintain adequate padding around logo (minimum 16px-24px)

### Logo Variants

- **Full-color logo** (`/logo.svg`): Use on light backgrounds (marketing layouts)
- **White monochrome logo** (`/logo-white.svg`): Use on dark backgrounds (product/app navigation)
- **Never use full-color logo on dark backgrounds** - use white monochrome instead

---

## Responsive Considerations

### Marketing Layouts

- **Mobile**: Stack logo and navigation vertically, or use hamburger menu
- **Tablet**: Maintain horizontal layout with adjusted spacing
- **Desktop**: Full horizontal layout with all navigation items visible

### Product/App Layouts

#### Horizontal Navigation
- **Mobile**: Collapse to hamburger menu, logo remains visible
- **Tablet**: Show primary navigation items, hide secondary
- **Desktop**: Full navigation with all items visible

#### Sidebar Navigation
- **Mobile**: Sidebar becomes overlay/drawer, hidden by default
- **Tablet**: Collapsible sidebar (default collapsed or expanded based on screen size)
- **Desktop**: Full sidebar visible (240px-280px width)

---

## Best Practices

### ✅ Do's

1. **Always include the logo**
   - ✅ Place logo prominently in header/navigation
   - ✅ Use appropriate variant (full-color or white monochrome)
   - ✅ Maintain minimum size requirements (100px)

2. **Choose the right layout type**
   - ✅ Use marketing layout for public-facing content
   - ✅ Use product layout for application interfaces
   - ✅ Select horizontal or sidebar based on navigation complexity

3. **Follow color guidelines**
   - ✅ Use sidebar color tokens for dark navigation
   - ✅ Use light backgrounds for content areas
   - ✅ Maintain proper contrast for accessibility

4. **Ensure responsive design**
   - ✅ Test layouts at all breakpoints
   - ✅ Provide mobile-friendly navigation
   - ✅ Maintain logo visibility on all screen sizes

5. **Maintain consistency**
   - ✅ Use consistent spacing (8-point grid)
   - ✅ Follow border radius guidelines (6px for interactive elements)
   - ✅ Use design system components and tokens

### ❌ Don'ts

1. **Don't mix layout types**
   - ❌ Don't use marketing layout for applications
   - ❌ Don't use product layout for marketing sites
   - ❌ Don't combine horizontal and sidebar navigation

2. **Don't compromise logo placement**
   - ❌ Don't place logo in corners without adequate padding
   - ❌ Don't use wrong logo variant for background color
   - ❌ Don't scale logo below minimum size

3. **Don't ignore color tokens**
   - ❌ Don't hardcode sidebar colors
   - ❌ Don't use arbitrary dark colors for navigation
   - ❌ Always use `bg-sidebar` and related tokens

4. **Don't skip responsive design**
   - ❌ Don't create layouts that only work on desktop
   - ❌ Don't hide navigation without mobile alternative
   - ❌ Don't ignore touch target sizes

---

## Integration with Design System

### Color Tokens

Layouts use the following semantic color tokens:

**Marketing Layouts:**
- `bg-background` - Light background
- `text-foreground` - Primary text color
- `border-border` - Border color

**Product/App Layouts:**
- `bg-sidebar` - Dark navigation background (Tech Blue)
- `text-sidebar-foreground` - Text on sidebar (White)
- `bg-sidebar-accent` - Hover/active state background
- `bg-background` - Content area background

### Spacing

Follow the 8-point grid system:
- Navigation height: 64px-80px (multiples of 8)
- Sidebar width: 240px-280px (multiples of 8)
- Padding: 16px, 24px, 32px (multiples of 8)

### Border Radius

- Navigation items: `rounded-[6px]` (interactive elements)
- Content cards: No radius (0px) for static content
- Form inputs: `rounded-[4px]` for inputs

---

## Additional Resources

- **Logo Guide:** See [logo.md](./logo.md) for complete logo usage specifications
- **Color Guide:** See [colours.md](./colours.md) for sidebar color tokens and usage
- **Spacing Guide:** See [spacing.md](./spacing.md) for spacing patterns and 8-point grid
- **Borders Guide:** See [borders.md](./borders.md) for border radius guidelines
- **Design System Overview:** See [design-system.md](./design-system.md) for complete design system documentation
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component patterns

---

## Notes

- **Consistency First:** All EE applications should follow these layout templates for brand consistency
- **Logo Always:** Every layout must include the Equal Experts logo correctly placed
- **Dark Navigation:** Product/app layouts use dark navigation (Tech Blue) for visual hierarchy
- **Responsive Required:** All layouts must work across mobile, tablet, and desktop
- **Design Tokens:** Always use design system color tokens—never hardcode colors

