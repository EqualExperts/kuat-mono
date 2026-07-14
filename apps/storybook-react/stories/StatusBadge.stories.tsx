/**
 * StatusBadge – localized UI component. Non-interactive status indicator per Figma (node 3425:546).
 */
import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge, STATUS_BADGE_TYPES } from "@equal-experts/kuat-react";
import { statusBadgeDocs } from "../docs/component-docs";

const meta: Meta<typeof StatusBadge> = {
  title: "Data Display/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: statusBadgeDocs,
      },
    },

    a11y: { test: "error" },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "error", "info", "neutral"],
      description: "Semantic status type; sets the fill colour and icon",
    },
    size: {
      control: "select",
      options: ["base", "large"],
      description: "Base (12px text) or Large (14px text)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = {
  args: {
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    children: "Warning",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    children: "Error",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    children: "Info",
  },
};

export const Neutral: Story = {
  args: {
    type: "neutral",
    children: "Neutral",
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_BADGE_TYPES.map((type) => (
          <StatusBadge key={type} type={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </StatusBadge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_BADGE_TYPES.map((type) => (
          <StatusBadge key={type} type={type} size="large">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </StatusBadge>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All five types in both sizes (Base row, Large row).",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 bg-white p-4">
      {STATUS_BADGE_TYPES.map((type) => (
        <StatusBadge key={type} type={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </StatusBadge>
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "StatusBadge types in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-wrap gap-4 bg-slate-950 p-4">
      {STATUS_BADGE_TYPES.map((type) => (
        <StatusBadge key={type} type={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </StatusBadge>
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "StatusBadge types in dark mode. Fills are raw brand ramps, so rendering matches light mode — no dark-mode spec exists yet.",
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Profile complete:</span>
        <StatusBadge type="success">Complete</StatusBadge>
      </div>
      <div className="flex items-center gap-2">
        <span>Payment details:</span>
        <StatusBadge type="warning">Needs attention</StatusBadge>
      </div>
      <div className="flex items-center gap-2">
        <span>Deployment:</span>
        <StatusBadge type="error">Failed</StatusBadge>
      </div>
      <div className="flex items-center gap-2">
        <span>Environment:</span>
        <StatusBadge type="info">Staging</StatusBadge>
      </div>
      <div className="flex items-center gap-2">
        <span>Records:</span>
        <StatusBadge type="neutral">Archived</StatusBadge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Per-type usage: Success = completed/positive, Warning = needs attention, Error = failure/destructive, Info = neutral informational, Neutral = non-semantic metadata.",
      },
    },
  },
};
