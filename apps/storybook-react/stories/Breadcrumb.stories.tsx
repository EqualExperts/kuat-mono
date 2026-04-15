/**
 * Breadcrumb – localized UI component. Wraps shadcn-style primitives with items prop.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@equal-experts/kuat-react";
import type { BreadcrumbItemEntry } from "@equal-experts/kuat-react";
import { breadcrumbDocs } from "../docs/component-docs";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: breadcrumbDocs,
      },
    },
  },
  argTypes: {
    items: {
      description: "Ordered list of breadcrumb entries (label, optional href, optional children for dropdown)",
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for the nav",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

const simpleItems: BreadcrumbItemEntry[] = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Breadcrumb" },
];

export const Default: Story = {
  args: {
    items: simpleItems,
  },
};

export const WithDropdown: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      {
        label: "Section",
        children: [
          { label: "Documentation", href: "#/docs" },
          { label: "Themes", href: "#/themes" },
          { label: "GitHub", href: "#/github" },
        ],
      },
      { label: "Breadcrumb" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "When an item has `children`, it renders as a dropdown. Click to open the menu.",
      },
    },
  },
};

export const CustomAriaLabel: Story = {
  args: {
    items: simpleItems,
    "aria-label": "You are here",
  },
};

export const LongTrail: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Category", href: "#" },
      { label: "Subcategory", href: "#" },
      { label: "Current page" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "On narrow viewports (≤640px), the trail collapses to first … last with a dropdown for middle items.",
      },
    },
  },
};
