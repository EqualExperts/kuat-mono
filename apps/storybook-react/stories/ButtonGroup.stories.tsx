import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@equal-experts/kuat-react";
import { ArchiveIcon, DownloadIcon, ShareIcon, TrashIcon } from "lucide-react";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the button group",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic horizontal button group with multiple buttons.",
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical button group orientation.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Download">
        <DownloadIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Share">
        <ShareIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Archive">
        <ArchiveIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Delete">
        <TrashIcon />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button group with icon buttons.",
      },
    },
  },
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <Button variant="outline">Cancel</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button group with a separator between button groups.",
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>
        <span>Actions</span>
      </ButtonGroupText>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button group with a text label using ButtonGroupText.",
      },
    },
  },
};

export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button group with different button variants.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Horizontal</h3>
        <ButtonGroup>
          <Button variant="outline">First</Button>
          <Button variant="outline">Second</Button>
          <Button variant="outline">Third</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Vertical</h3>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">First</Button>
          <Button variant="outline">Second</Button>
          <Button variant="outline">Third</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With Separator</h3>
        <ButtonGroup>
          <Button variant="outline">Save</Button>
          <Button variant="outline">Cancel</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With Text</h3>
        <ButtonGroup>
          <ButtonGroupText>Actions</ButtonGroupText>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Display all button group variants together for comparison.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white">
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
        <Button variant="outline">Delete</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Actions</ButtonGroupText>
        <Button variant="outline">Save</Button>
        <Button variant="outline">Cancel</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Button group variants in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-col gap-4 p-4 bg-slate-950">
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
        <Button variant="outline">Delete</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Actions</ButtonGroupText>
        <Button variant="outline">Save</Button>
        <Button variant="outline">Cancel</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Button group variants in dark mode.",
      },
    },
  },
};

