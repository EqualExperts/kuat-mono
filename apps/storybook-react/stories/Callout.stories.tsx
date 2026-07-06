/**
 * Callout – Kuat custom component. Info/positive/warning/issue banner with optional
 * description, per-type icon, and link action.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Callout, CALLOUT_TYPES } from "@equal-experts/kuat-react";
import { calloutDocs } from "../docs/component-docs";

const meta: Meta<typeof Callout> = {
  title: "Feedback/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: calloutDocs,
      },
    },
    a11y: { test: "todo" },
  },
  argTypes: {
    type: {
      control: "select",
      options: CALLOUT_TYPES,
      description: "The semantic type of the callout",
    },
    icon: {
      control: "boolean",
      description: "Show or hide the per-type icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  args: {
    title: "Some good information",
  },
};

export const WithDescription: Story = {
  args: {
    title: "Some good information",
    description:
      "This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive",
  },
};

export const WithAction: Story = {
  args: {
    title: "Some good information",
    description:
      "This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive",
    action: { label: "Close message", href: "#" },
  },
};

export const Positive: Story = {
  args: {
    type: "positive",
    title: "This is positive",
    description:
      "This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive",
    action: { label: "Close message", href: "#" },
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "A warning",
    description:
      "This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive",
    action: { label: "Close message", href: "#" },
  },
};

export const Issue: Story = {
  args: {
    type: "issue",
    title: "Some is not good",
    description:
      "This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive",
    action: { label: "Close message", href: "#" },
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "Some good information",
    icon: false,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {CALLOUT_TYPES.map((type) => (
        <Callout
          key={type}
          type={type}
          title={`This is a ${type} callout`}
          description="Supporting description text for this callout."
          action={{ label: "Close message", href: "#" }}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Display all callout types together for comparison.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-white p-4">
      {CALLOUT_TYPES.map((type) => (
        <Callout key={type} type={type} title={`This is a ${type} callout`} />
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Callout types in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-col gap-4 bg-slate-950 p-4">
      {CALLOUT_TYPES.map((type) => (
        <Callout key={type} type={type} title={`This is a ${type} callout`} />
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Callout types in dark mode.",
      },
    },
  },
};
