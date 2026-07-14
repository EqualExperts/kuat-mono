/**
 * TagGroup – localized UI component. Accessibility wrapper for Tag sets (group role, label, live region).
 */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, TagGroup } from "@equal-experts/kuat-react";
import { tagGroupDocs } from "../docs/component-docs";

const meta: Meta<typeof TagGroup> = {
  title: "Data Display/TagGroup",
  component: TagGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: tagGroupDocs,
      },
    },

    a11y: { test: "error" },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Accessible name for the group (required)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  render: () => (
    <TagGroup label="Technologies">
      <Tag color="index-indigo">React</Tag>
      <Tag color="transform-teal">Vue</Tag>
      <Tag color="packet-plum">TypeScript</Tag>
      <Tag color="logic-lime">Node</Tag>
    </TagGroup>
  ),
};

export const WrappingRow: Story = {
  render: () => (
    <div className="max-w-md">
      <TagGroup label="Skills">
        <Tag color="index-indigo">Product strategy</Tag>
        <Tag color="transform-teal">Service design</Tag>
        <Tag color="packet-plum">User research</Tag>
        <Tag color="server-slate">Accessibility</Tag>
        <Tag color="logic-lime">Data engineering</Tag>
        <Tag color="signal-yellow">Platform</Tag>
        <Tag color="cursor-coral">Delivery</Tag>
        <Tag color="patch-peach">Coaching</Tag>
      </TagGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tags wrap onto new rows with an 8px gap in both axes — plain flex-wrap, no layout logic.",
      },
    },
  },
};

const DismissReflowExample = () => {
  const [tags, setTags] = React.useState([
    "Design",
    "Engineering",
    "Data",
    "Delivery",
    "Research",
  ]);
  return (
    <div className="max-w-sm">
      <TagGroup label="Applied filters">
        {tags.map((text) => (
          <Tag
            key={text}
            color="transform-teal"
            mode="dismiss"
            onDismiss={() => setTags((prev) => prev.filter((t) => t !== text))}
          >
            {text}
          </Tag>
        ))}
      </TagGroup>
    </div>
  );
};

export const DismissWithReflow: Story = {
  render: () => <DismissReflowExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Dismissing a tag reflows the remaining tags automatically and announces the removal (e.g. \"Design removed\") via the group's polite aria-live region.",
      },
    },
  },
};
