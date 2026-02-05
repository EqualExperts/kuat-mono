import type { Meta, StoryObj } from "@storybook/vue3";
import { KuatHeader, Button } from "@equal-experts/kuat-vue";
import { Menu, ChevronDown, User } from "lucide-vue-next";

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

export const Default: Story = {
  render: (args) => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    setup() {
      return { args };
    },
    template: `
      <KuatHeader v-bind="args">
        <template #navigation>
          <div class="flex items-center gap-1">
            <Button variant="ghost" :class="args.variant === 'bold' ? 'text-slate-100 hover:bg-white/10' : ''">Dashboard</Button>
            <Button variant="ghost" :class="args.variant === 'bold' ? 'text-slate-100 hover:bg-white/10' : ''">Opportunities</Button>
            <Button variant="ghost" :class="args.variant === 'bold' ? 'text-slate-100 hover:bg-white/10' : ''">
              Settings
              <ChevronDown class="ml-1 h-4 w-4" />
            </Button>
          </div>
        </template>
        <template #actions>
          <Button variant="outline" class="gap-2" :class="args.variant === 'bold' ? 'border-slate-300/30 text-slate-100 hover:bg-white/10' : ''">
            <User class="h-4 w-4" />
            <span class="hidden sm:inline">John Doe</span>
            <ChevronDown class="h-4 w-4" />
          </Button>
        </template>
        <template #mobile-menu-trigger>
          <Button variant="ghost" size="icon" class="h-10 w-10" :class="args.variant === 'bold' ? 'text-slate-100 hover:bg-white/10' : ''" aria-label="Open menu">
            <Menu class="h-6 w-6" />
          </Button>
        </template>
      </KuatHeader>
    `,
  }),
  args: {
    variant: "default",
    title: "Timesheets",
  },
  parameters: {
    docs: {
      description: {
        story: "Default light variant of the KuatHeader with the EE logo, navigation, and user menu.",
      },
    },
  },
};

export const Bold: Story = {
  render: (args) => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    setup() {
      return { args };
    },
    template: `
      <KuatHeader v-bind="args">
        <template #navigation>
          <div class="flex items-center gap-1">
            <Button variant="ghost" class="text-slate-100 hover:bg-white/10">Dashboard</Button>
            <Button variant="ghost" class="text-slate-100 hover:bg-white/10">Opportunities</Button>
            <Button variant="ghost" class="text-slate-100 hover:bg-white/10">
              Settings
              <ChevronDown class="ml-1 h-4 w-4" />
            </Button>
          </div>
        </template>
        <template #actions>
          <Button variant="outline" class="gap-2 border-slate-300/30 text-slate-100 hover:bg-white/10">
            <User class="h-4 w-4" />
            <span class="hidden sm:inline">John Doe</span>
            <ChevronDown class="h-4 w-4" />
          </Button>
        </template>
        <template #mobile-menu-trigger>
          <Button variant="ghost" size="icon" class="h-10 w-10 text-slate-100 hover:bg-white/10" aria-label="Open menu">
            <Menu class="h-6 w-6" />
          </Button>
        </template>
      </KuatHeader>
    `,
  }),
  args: {
    variant: "bold",
    title: "Timesheets",
  },
  parameters: {
    docs: {
      description: {
        story: "Bold dark variant of the KuatHeader with Tech Blue background. Logo text automatically switches to white.",
      },
    },
  },
};

export const WithoutNavigation: Story = {
  render: () => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    template: `
      <KuatHeader variant="default" title="Dashboard">
        <template #actions>
          <Button variant="outline" class="gap-2">
            <User class="h-4 w-4" />
            <span class="hidden sm:inline">John Doe</span>
            <ChevronDown class="h-4 w-4" />
          </Button>
        </template>
        <template #mobile-menu-trigger>
          <Button variant="ghost" size="icon" class="h-10 w-10" aria-label="Open menu">
            <Menu class="h-6 w-6" />
          </Button>
        </template>
      </KuatHeader>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Header without navigation items - useful for simpler layouts.",
      },
    },
  },
};

export const MinimalHeader: Story = {
  render: () => ({
    components: { KuatHeader },
    template: `<KuatHeader variant="default" title="My App" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Minimal header with just the default EE logo and title.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="text-sm font-medium mb-2 px-4">Default Variant</h3>
          <KuatHeader variant="default" title="Timesheets">
            <template #navigation>
              <div class="flex items-center gap-1">
                <Button variant="ghost">Dashboard</Button>
                <Button variant="ghost">Opportunities</Button>
                <Button variant="ghost">
                  Settings
                  <ChevronDown class="ml-1 h-4 w-4" />
                </Button>
              </div>
            </template>
            <template #actions>
              <Button variant="outline" class="gap-2">
                <User class="h-4 w-4" />
                <span class="hidden sm:inline">John Doe</span>
                <ChevronDown class="h-4 w-4" />
              </Button>
            </template>
            <template #mobile-menu-trigger>
              <Button variant="ghost" size="icon" class="h-10 w-10" aria-label="Open menu">
                <Menu class="h-6 w-6" />
              </Button>
            </template>
          </KuatHeader>
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 px-4">Bold Variant</h3>
          <KuatHeader variant="bold" title="Timesheets">
            <template #navigation>
              <div class="flex items-center gap-1">
                <Button variant="ghost" class="text-slate-100 hover:bg-white/10">Dashboard</Button>
                <Button variant="ghost" class="text-slate-100 hover:bg-white/10">Opportunities</Button>
                <Button variant="ghost" class="text-slate-100 hover:bg-white/10">
                  Settings
                  <ChevronDown class="ml-1 h-4 w-4" />
                </Button>
              </div>
            </template>
            <template #actions>
              <Button variant="outline" class="gap-2 border-slate-300/30 text-slate-100 hover:bg-white/10">
                <User class="h-4 w-4" />
                <span class="hidden sm:inline">John Doe</span>
                <ChevronDown class="h-4 w-4" />
              </Button>
            </template>
            <template #mobile-menu-trigger>
              <Button variant="ghost" size="icon" class="h-10 w-10 text-slate-100 hover:bg-white/10" aria-label="Open menu">
                <Menu class="h-6 w-6" />
              </Button>
            </template>
          </KuatHeader>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all header variants. Note how the EE logo text color adapts to each variant.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    template: `
      <div class="dark bg-slate-950 p-4">
        <KuatHeader variant="default" title="Timesheets">
          <template #navigation>
            <div class="flex items-center gap-1">
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">Opportunities</Button>
              <Button variant="ghost">
                Settings
                <ChevronDown class="ml-1 h-4 w-4" />
              </Button>
            </div>
          </template>
          <template #actions>
            <Button variant="outline" class="gap-2">
              <User class="h-4 w-4" />
              <span class="hidden sm:inline">John Doe</span>
              <ChevronDown class="h-4 w-4" />
            </Button>
          </template>
          <template #mobile-menu-trigger>
            <Button variant="ghost" size="icon" class="h-10 w-10" aria-label="Open menu">
              <Menu class="h-6 w-6" />
            </Button>
          </template>
        </KuatHeader>
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Default header variant in dark mode - adapts colors automatically.",
      },
    },
  },
};

export const ResponsiveDemo: Story = {
  render: () => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    template: `
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground px-4">
          Resize your browser window to see the responsive behavior. Desktop shows full navigation, mobile shows hamburger menu. Logo resizes appropriately.
        </p>
        <KuatHeader variant="default" title="Timesheets">
          <template #navigation>
            <div class="flex items-center gap-1">
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">Opportunities</Button>
              <Button variant="ghost">
                Settings
                <ChevronDown class="ml-1 h-4 w-4" />
              </Button>
            </div>
          </template>
          <template #actions>
            <Button variant="outline" class="gap-2">
              <User class="h-4 w-4" />
              <span class="hidden sm:inline">John Doe</span>
              <ChevronDown class="h-4 w-4" />
            </Button>
          </template>
          <template #mobile-menu-trigger>
            <Button variant="ghost" size="icon" class="h-10 w-10" aria-label="Open menu">
              <Menu class="h-6 w-6" />
            </Button>
          </template>
        </KuatHeader>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates responsive behavior - resize your browser to see mobile vs desktop layouts.",
      },
    },
  },
};

export const CustomLogo: Story = {
  render: () => ({
    components: { KuatHeader, Button, Menu, ChevronDown, User },
    template: `
      <KuatHeader variant="default" title="Custom App">
        <template #logo>
          <div class="flex items-center gap-2 font-bold text-xl text-slate-700">
            <div class="w-10 h-10 bg-transform-teal-500 rounded flex items-center justify-center text-white text-sm">CA</div>
            <span>Custom App</span>
          </div>
        </template>
        <template #navigation>
          <div class="flex items-center gap-1">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Settings</Button>
          </div>
        </template>
        <template #mobile-menu-trigger>
          <Button variant="ghost" size="icon" class="h-10 w-10" aria-label="Open menu">
            <Menu class="h-6 w-6" />
          </Button>
        </template>
      </KuatHeader>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "You can override the default EE logo with a custom logo using the #logo slot.",
      },
    },
  },
};
