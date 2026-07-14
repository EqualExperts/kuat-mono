/**
 * Tag – localized UI component. Categorisation pill per Figma (node 3442:513).
 */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, TagGroup, TAG_COLORS } from "@equal-experts/kuat-react";
import { tagDocs } from "../docs/component-docs";

const meta: Meta<typeof Tag> = {
  title: "Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: tagDocs,
      },
    },

    a11y: { test: "error" },
  },
  argTypes: {
    color: {
      control: "select",
      options: [...TAG_COLORS],
      description: "Colour category from the extended Data/Digital palette",
    },
    mode: {
      control: "select",
      options: ["display", "toggle", "dismiss"],
      description:
        "Interaction model — one per group: display (span), toggle (filter button), dismiss (removable button)",
    },
    selected: {
      control: "boolean",
      description: "Toggle mode only: selected state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const label = (color: string) =>
  color
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const AllColours: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {TAG_COLORS.map((color) => (
        <Tag key={color} color={color}>
          {label(color)}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All nine colour categories in display mode (/50 tint, /700 text).",
      },
    },
  },
};

const ToggleGroupExample = () => {
  const [selected, setSelected] = React.useState<string[]>(["transform-teal"]);
  return (
    <TagGroup label="Technology filters">
      {TAG_COLORS.slice(0, 5).map((color) => (
        <Tag
          key={color}
          color={color}
          mode="toggle"
          selected={selected.includes(color)}
          onSelectedChange={(next) =>
            setSelected((prev) =>
              next ? [...prev, color] : prev.filter((c) => c !== color)
            )
          }
        >
          {label(color)}
        </Tag>
      ))}
    </TagGroup>
  );
};

export const ToggleFilters: Story = {
  render: () => <ToggleGroupExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Toggle mode: multi-select filter group. Selected tags darken to /200 and show a check icon; aria-pressed reflects the state.",
      },
    },
  },
};

const DismissGroupExample = () => {
  const [tags, setTags] = React.useState([
    { color: "index-indigo" as const, text: "Design" },
    { color: "transform-teal" as const, text: "Engineering" },
    { color: "cursor-coral" as const, text: "Data" },
  ]);
  return (
    <TagGroup label="Applied filters">
      {tags.map((tag) => (
        <Tag
          key={tag.text}
          color={tag.color}
          mode="dismiss"
          onDismiss={() => setTags((prev) => prev.filter((t) => t.text !== tag.text))}
        >
          {tag.text}
        </Tag>
      ))}
    </TagGroup>
  );
};

export const DismissibleTags: Story = {
  render: () => <DismissGroupExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Dismiss mode: removable applied-filter chips. Removal reflows the group and is announced via TagGroup's aria-live region.",
      },
    },
  },
};

export const SelectedStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {TAG_COLORS.map((color) => (
          <Tag key={color} color={color} mode="toggle" selected>
            {label(color)}
          </Tag>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {TAG_COLORS.map((color) => (
          <Tag key={color} color={color} mode="dismiss">
            {label(color)}
          </Tag>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Selected Toggle (check) and Selected Dismiss (x) visuals for all nine colours.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 bg-white p-4">
      {TAG_COLORS.map((color) => (
        <Tag key={color} color={color}>
          {label(color)}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Tag colours in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex flex-wrap gap-2 bg-slate-950 p-4">
      {TAG_COLORS.map((color) => (
        <Tag key={color} color={color}>
          {label(color)}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Tag colours in dark mode: the --tag-* semantic tokens invert (/700 fills, /100 text) via the .dark class.",
      },
    },
  },
};
