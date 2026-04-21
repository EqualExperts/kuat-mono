/**
 * Badge – localized UI component. Non-interactive label/tag. Variants and roundness per Figma.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@equal-experts/kuat-react";
import { BadgeCheckIcon } from "lucide-react";
import { badgeDocs } from "../docs/component-docs";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: badgeDocs,
      },
    },
  
    a11y: { test: "todo" },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost"],
      description: "The visual style variant of the badge",
    },
    roundness: {
      control: "select",
      options: ["default", "round"],
      description: "Border radius: default (6px) or round (pill)",
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

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const RoundnessComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-24 text-sm text-muted-foreground">Default (6px):</span>
        <Badge roundness="default">Label</Badge>
        <Badge roundness="default" variant="secondary">Label</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-24 text-sm text-muted-foreground">Round (pill):</span>
        <Badge roundness="round">Label</Badge>
        <Badge roundness="round" variant="secondary">Label</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Roundness: default (6px radius) vs round (pill).",
      },
    },
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
        <Badge variant="ghost">Ghost</Badge>
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
        <Badge roundness="round" className="h-5 min-w-5 px-1 font-mono tabular-nums">
          8
        </Badge>
        <Badge
          roundness="round"
          className="h-5 min-w-5 px-1 font-mono tabular-nums"
          variant="destructive"
        >
          99
        </Badge>
        <Badge
          roundness="round"
          className="h-5 min-w-5 px-1 font-mono tabular-nums"
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
        story: "Badges with icons and numeric indicators. Icons can be added as children, and badges can be styled as circular indicators using roundness=\"round\".",
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
      <Badge variant="ghost">Ghost</Badge>
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
      <Badge variant="ghost">Ghost</Badge>
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
      <div className="flex items-center gap-2">
        <span>Muted:</span>
        <Badge variant="ghost">Muted</Badge>
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

