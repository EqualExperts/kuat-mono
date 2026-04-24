import type { Meta, StoryObj } from "@storybook/react"
import { KuatHeader, Button } from "@equal-experts/kuat-react"
import { Menu, ChevronDown, User } from "lucide-react"
import { kuatHeaderDocs } from "../docs/component-docs"

const meta: Meta<typeof KuatHeader> = {
  title: "Kuat Blocks/KuatHeader",
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
    hideLogo: {
      control: "boolean",
      description: "Hide the default EE logo",
    },
    lockupVariant: {
      control: "select",
      options: ["default", "demo"],
      description: "Logo/title lockup mode in the header",
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

const actionItems = [
  {
    label: "John Doe",
    url: "/account",
    icon: <User className="h-4 w-4" />,
    items: [
      { label: "Account", url: "/account" },
      { label: "Sign out", url: "/sign-out" },
    ],
  },
]

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
    lockupVariant: "default",
    title: "Timesheets",
    navigation: navigationItems,
    actions: actionItems,
  },
}

export const Bold: Story = {
  args: {
    variant: "bold",
    lockupVariant: "default",
    title: "Timesheets",
    navigation: navigationItems,
    actions: actionItems,
  },
}

export const WithoutNavigation: Story = {
  args: {
    variant: "default",
    lockupVariant: "default",
    title: "Dashboard",
    actions: actionItems,
  },
}

export const MinimalHeader: Story = {
  args: {
    variant: "default",
    lockupVariant: "default",
    title: "My App",
  },
}

export const DemoLockupDefaultVariant: Story = {
  args: {
    variant: "default",
    lockupVariant: "demo",
    title: "Kuat Demo",
    navigation: navigationItems,
    actions: actionItems,
  },
}

export const DemoLockupBoldVariant: Story = {
  args: {
    variant: "bold",
    lockupVariant: "demo",
    title: "Kuat Demo",
    navigation: navigationItems,
    actions: actionItems,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 px-4 text-sm font-medium">Default Variant</h3>
        <KuatHeader variant="default" title="Timesheets" navigation={navigationItems} actions={actionItems} />
      </div>
      <div>
        <h3 className="mb-2 px-4 text-sm font-medium">Bold Variant</h3>
        <KuatHeader variant="bold" title="Timesheets" navigation={navigationItems} actions={actionItems} />
      </div>
    </div>
  ),
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="px-4 text-sm text-muted-foreground">
        Resize your browser window to see the responsive behavior. Desktop shows
        full navigation, mobile shows a full-screen menu sheet with actions fixed
        at the bottom.
      </p>
      <KuatHeader variant="default" title="Timesheets" navigation={navigationItems} actions={actionItems} />
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
        lockupVariant="demo"
        title="Kuat Demo"
        navigation={navigationItems}
        actions={actionItems}
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
      actions={<LegacyUserMenu variant={args.variant} />}
      mobileMenuTrigger={<LegacyMobileMenuTrigger variant={args.variant} />}
    />
  ),
}
