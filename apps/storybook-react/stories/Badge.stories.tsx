/**
 * @deprecated This component import is deprecated.
 *
 * For new projects, install Badge directly via shadcn CLI:
 * ```bash
 * npx shadcn@latest add badge
 * ```
 *
 * The component will be themed automatically when using kuat-core.
 * This story demonstrates the Badge styling that kuat-core provides.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@equal-experts/kuat-react";
import { BadgeCheckIcon } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge (Deprecated)",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style variant of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Display all badge variants together for comparison.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          8
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
        >
          99
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with icons and numeric indicators. Icons can be added as children, and badges can be styled as circular indicators.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4 bg-white">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Badge variants in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-wrap gap-4 p-4 bg-slate-950">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Badge variants in dark mode.",
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Active:</span>
        <Badge>Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>In Progress:</span>
        <Badge variant="secondary">In Progress</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Error:</span>
        <Badge variant="destructive">Error</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Draft:</span>
        <Badge variant="outline">Draft</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common use case: displaying status indicators with labels.",
      },
    },
  },
};

