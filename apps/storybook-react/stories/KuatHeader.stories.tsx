import type { Meta, StoryObj } from "@storybook/react"
import { KuatHeader, Button, IconButton } from "@equal-experts/kuat-react"
import { Menu, ChevronDown, User, LayoutGrid } from "lucide-react"
import { kuatHeaderDocs } from "../docs/component-docs"

const meta: Meta<typeof KuatHeader> = {
  title: "Blocks/KuatHeader",
  component: KuatHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: kuatHeaderDocs,
      },
    },
    a11y: { test: "todo" },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bold"],
      description: "The visual variant of the header",
    },
    title: {
      control: "text",
      description: "The page or application title",
    },
    lockup: {
      description: "Built-in EE logo lockup. Omit for title-only (no default logo).",
    },
  },
}

export default meta
type Story = StoryObj<typeof KuatHeader>

const navigationItems = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Opportunities", url: "/opportunities" },
  {
    label: "Settings",
    url: "/settings",
    items: [
      { label: "Profile", url: "/settings/profile" },
      { label: "Team", url: "/settings/team" },
    ],
  },
]

/** Long nav list for mobile sheet scroll / sticky footer overlap testing. */
const longNavigationItems = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Opportunities", url: "/opportunities" },
  { label: "Projects", url: "/projects" },
  { label: "Clients", url: "/clients" },
  { label: "Contracts", url: "/contracts" },
  { label: "Invoices", url: "/invoices" },
  { label: "Reports", url: "/reports" },
  { label: "Analytics", url: "/analytics" },
  { label: "Resources", url: "/resources" },
  { label: "Training", url: "/training" },
  { label: "Support", url: "/support" },
  {
    label: "Settings",
    url: "/settings",
    items: [
      { label: "Profile", url: "/settings/profile" },
      { label: "Team", url: "/settings/team" },
      { label: "Notifications", url: "/settings/notifications" },
      { label: "Security", url: "/settings/security" },
    ],
  },
  { label: "Admin", url: "/admin" },
]

const account = {
  items: [
    {
      label: "John Doe",
      href: "/account",
      icon: <User className="h-4 w-4" />,
    },
  ],
  mobile: {
    heading: "Account",
    subtitle: "Profile and security",
    items: [
      { label: "Your profile", href: "#account-profile" },
      { label: "Sign out", href: "#sign-out" },
    ],
  },
}

const sampleApps = [
  { id: "1", label: "Timesheets", href: "#ts", description: "Log time and expenses" },
  { id: "2", label: "Procurement", href: "#proc", description: "Purchase requests" },
  { id: "3", label: "Equal Experts Profile", href: "#profile", description: "Your EE profile" },
  { id: "4", label: "Nexus", href: "#nx", description: "Internal directory" },
]

const manyApps = Array.from({ length: 20 }, (_, i) => ({
  id: `app-${i}`,
  label: `Application ${i + 1}`,
  href: `#app-${i}`,
  description: "Short description for scanning",
}))

const LegacyNavItems = ({ variant = "default" }: { variant?: "default" | "bold" }) => (
  <div className="flex items-center gap-1">
    <Button variant="ghost" className={variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""}>
      Dashboard
    </Button>
    <Button variant="ghost" className={variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""}>
      Opportunities
    </Button>
    <Button variant="ghost" className={variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""}>
      Settings
      <ChevronDown className="ml-1 h-4 w-4" />
    </Button>
  </div>
)

const LegacyUserMenu = ({ variant = "default" }: { variant?: "default" | "bold" }) => (
  <Button
    variant="outline"
    className={`gap-2 ${
      variant === "bold"
        ? "border-slate-300/30 text-slate-100 hover:bg-white/10"
        : ""
    }`}
  >
    <User className="h-4 w-4" />
    <span className="hidden sm:inline">John Doe</span>
    <ChevronDown className="h-4 w-4" />
  </Button>
)

const LegacyMobileMenuTrigger = ({
  variant = "default",
}: {
  variant?: "default" | "bold"
}) => (
  <Button
    variant="ghost"
    size="icon"
    className={`h-10 w-10 ${
      variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""
    }`}
    aria-label="Open menu"
  >
    <Menu className="h-6 w-6" />
  </Button>
)

export const Default: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
  },
}

export const Bold: Story = {
  args: {
    variant: "bold",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
  },
}

export const WithoutNavigation: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Dashboard",
    account,
  },
}

export const MinimalHeader: Story = {
  args: {
    variant: "default",
    title: "My App",
  },
}

export const DemoLockupDefaultVariant: Story = {
  args: {
    variant: "default",
    lockup: { variant: "demo" },
    title: "Kuat Demo",
    navigation: navigationItems,
    account,
  },
}

export const DemoLockupBoldVariant: Story = {
  args: {
    variant: "bold",
    lockup: { variant: "demo" },
    title: "Kuat Demo",
    navigation: navigationItems,
    account,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 px-4 text-sm font-medium">Default Variant</h3>
        <KuatHeader
          variant="default"
          title="Timesheets"
          lockup={{ variant: "default" }}
          navigation={navigationItems}
          account={account}
        />
      </div>
      <div>
        <h3 className="mb-2 px-4 text-sm font-medium">Bold Variant</h3>
        <KuatHeader
          variant="bold"
          title="Timesheets"
          lockup={{ variant: "default" }}
          navigation={navigationItems}
          account={account}
        />
      </div>
    </div>
  ),
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="px-4 text-sm text-muted-foreground">
        Resize your browser window to see the responsive behavior. Desktop shows
        full navigation, mobile shows a full-screen menu sheet with account links
        fixed at the bottom.
      </p>
      <KuatHeader
        variant="default"
        title="Timesheets"
        lockup={{ variant: "default" }}
        navigation={navigationItems}
        account={account}
      />
    </div>
  ),
}

export const ResponsiveDemoLockup: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="px-4 text-sm text-muted-foreground">
        Resize your browser window to verify the demo lockup adapts to mobile
        with title-first hierarchy and reduced logo sizing.
      </p>
      <KuatHeader
        variant="default"
        lockup={{ variant: "demo" }}
        title="Kuat Demo"
        navigation={navigationItems}
        account={account}
      />
    </div>
  ),
}

export const LegacySlots: Story = {
  args: {
    variant: "default",
    title: "Legacy Header",
  },
  render: (args) => (
    <KuatHeader
      {...args}
      navigation={<LegacyNavItems variant={args.variant} />}
      accountMarkup={<LegacyUserMenu variant={args.variant} />}
      mobileMenuTrigger={<LegacyMobileMenuTrigger variant={args.variant} />}
    />
  ),
}

export const IconButtonFromPackageRoot: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <p className="text-sm text-muted-foreground">
        IconButton imported from <code>@equal-experts/kuat-react</code> (same export as the header waffle).
      </p>
      <IconButton type="button" variant="ghost" color="ee-blue" aria-label="Demo icon button">
        <LayoutGrid className="h-5 w-5" aria-hidden />
      </IconButton>
    </div>
  ),
}

export const WithAppSwitcher: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
    appSwitcher: { apps: sampleApps },
  },
}

export const WithAppSwitcherLongNavigation: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: longNavigationItems,
    account,
    appSwitcher: { apps: sampleApps },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mobile menu with a long navigation list. Scroll to the last items and confirm they stay visible above the sticky Account / app switcher block.",
      },
    },
  },
}

export const WithAppSwitcherBold: Story = {
  args: {
    variant: "bold",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
    appSwitcher: { apps: sampleApps },
  },
}

export const WithAppSwitcherManyApps: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
    appSwitcher: { apps: manyApps },
  },
}

export const WithAppSwitcherLoading: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
    appSwitcher: { apps: [], loading: true },
  },
}

export const WithAppSwitcherEmptyMessage: Story = {
  args: {
    variant: "default",
    lockup: { variant: "default" },
    title: "Timesheets",
    navigation: navigationItems,
    account,
    appSwitcher: {
      apps: [],
      empty: "message",
      emptyMessage: "No applications configured for this environment.",
    },
  },
}

export const AppsOnlyMobileSheet: Story = {
  args: {
    variant: "default",
    title: "EE Apps",
    lockup: { variant: "default" },
    appSwitcher: { apps: sampleApps },
    mobileMenuAriaLabel: "Equal Experts apps menu",
  },
}
