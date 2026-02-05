import type { Meta, StoryObj } from "@storybook/react";
import { KuatHeader, Button } from "@equal-experts/kuat-react";
import { Menu, ChevronDown, User } from "lucide-react";

const meta: Meta<typeof KuatHeader> = {
  title: "Kuat Blocks/KuatHeader",
  component: KuatHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
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
  },
};

export default meta;
type Story = StoryObj<typeof KuatHeader>;

// Navigation items for desktop
const NavItems = ({ variant = "default" }: { variant?: "default" | "bold" }) => (
  <div className="flex items-center gap-1">
    <Button
      variant="ghost"
      className={variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""}
    >
      Dashboard
    </Button>
    <Button
      variant="ghost"
      className={variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""}
    >
      Opportunities
    </Button>
    <Button
      variant="ghost"
      className={variant === "bold" ? "text-slate-100 hover:bg-white/10" : ""}
    >
      Settings
      <ChevronDown className="ml-1 h-4 w-4" />
    </Button>
  </div>
);

// User menu placeholder
const UserMenu = ({ variant = "default" }: { variant?: "default" | "bold" }) => (
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
);

// Mobile menu trigger
const MobileMenuTrigger = ({
  variant = "default",
}: {
  variant?: "default" | "bold";
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
);

export const Default: Story = {
  args: {
    variant: "default",
    title: "Timesheets",
  },
  render: (args) => (
    <KuatHeader
      {...args}
      navigation={<NavItems variant={args.variant} />}
      actions={<UserMenu variant={args.variant} />}
      mobileMenuTrigger={<MobileMenuTrigger variant={args.variant} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default light variant of the KuatHeader with the EE logo, navigation, and user menu.",
      },
    },
  },
};

export const Bold: Story = {
  args: {
    variant: "bold",
    title: "Timesheets",
  },
  render: (args) => (
    <KuatHeader
      {...args}
      navigation={<NavItems variant={args.variant} />}
      actions={<UserMenu variant={args.variant} />}
      mobileMenuTrigger={<MobileMenuTrigger variant={args.variant} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bold dark variant of the KuatHeader with Tech Blue background. Logo text automatically switches to white.",
      },
    },
  },
};

export const WithoutNavigation: Story = {
  args: {
    variant: "default",
    title: "Dashboard",
  },
  render: (args) => (
    <KuatHeader
      {...args}
      actions={<UserMenu variant={args.variant} />}
      mobileMenuTrigger={<MobileMenuTrigger variant={args.variant} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Header without navigation items - useful for simpler layouts.",
      },
    },
  },
};

export const MinimalHeader: Story = {
  args: {
    variant: "default",
    title: "My App",
  },
  render: (args) => <KuatHeader {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Minimal header with just the default EE logo and title.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Default Variant</h3>
        <KuatHeader
          variant="default"
          title="Timesheets"
          navigation={<NavItems variant="default" />}
          actions={<UserMenu variant="default" />}
          mobileMenuTrigger={<MobileMenuTrigger variant="default" />}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 px-4">Bold Variant</h3>
        <KuatHeader
          variant="bold"
          title="Timesheets"
          navigation={<NavItems variant="bold" />}
          actions={<UserMenu variant="bold" />}
          mobileMenuTrigger={<MobileMenuTrigger variant="bold" />}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all header variants. Note how the EE logo text color adapts to each variant.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-slate-950 p-4">
      <KuatHeader
        variant="default"
        title="Timesheets"
        navigation={<NavItems variant="default" />}
        actions={<UserMenu variant="default" />}
        mobileMenuTrigger={<MobileMenuTrigger variant="default" />}
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Default header variant in dark mode - adapts colors automatically.",
      },
    },
  },
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground px-4">
        Resize your browser window to see the responsive behavior. Desktop shows
        full navigation, mobile shows hamburger menu. Logo resizes appropriately.
      </p>
      <KuatHeader
        variant="default"
        title="Timesheets"
        navigation={<NavItems variant="default" />}
        actions={<UserMenu variant="default" />}
        mobileMenuTrigger={<MobileMenuTrigger variant="default" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates responsive behavior - resize your browser to see mobile vs desktop layouts.",
      },
    },
  },
};

export const CustomLogo: Story = {
  render: () => (
    <KuatHeader
      variant="default"
      title="Custom App"
      logo={
        <div className="flex items-center gap-2 font-bold text-xl text-slate-700">
          <div className="w-10 h-10 bg-transform-teal-500 rounded flex items-center justify-center text-white text-sm">
            CA
          </div>
          <span>Custom App</span>
        </div>
      }
      navigation={<NavItems variant="default" />}
      mobileMenuTrigger={<MobileMenuTrigger variant="default" />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "You can override the default EE logo with a custom logo element.",
      },
    },
  },
};
