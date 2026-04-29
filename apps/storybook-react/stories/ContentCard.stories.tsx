import type { Meta, StoryObj } from "@storybook/react"
import { Badge, ContentCard } from "@equal-experts/kuat-react"
import { contentCardDocs } from "../docs/component-docs"

const meta: Meta<typeof ContentCard> = {
  title: "Blocks/ContentCard",
  component: ContentCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: contentCardDocs,
      },
    },
  
    a11y: { test: "todo" },
  },
}

export default meta
type Story = StoryObj<typeof ContentCard>

const requiredProps = {
  badge: <Badge variant="secondary">Case study</Badge>,
  category: "User experience",
  title: "A clear & descriptive headline",
  titleHeadingLevel: 3 as const,
}

const DEFAULT_CARD_IMAGE_SRC =
  "https://www.figma.com/api/mcp/asset/d40b239e-c915-4257-bd35-5dcbe21dac08"
const DEFAULT_ALT_TEXT = "Default alt text"

export const Default: Story = {
  render: () => (
    <div className="p-6 bg-background">
      <ContentCard
        {...requiredProps}
        contentText="Content content content content content content content content content content content content content"
        headerAccessory={<><div>XYZ</div><div>XYZ</div></>}
        customContent={<div className="flex h-full items-start">Custom content component</div>}
        footer={<div className="flex h-full items-center justify-between w-full">Footer slot content</div>}
        titleHeadingLevel={1}
        imageSrc={DEFAULT_CARD_IMAGE_SRC}
        imageAlt={DEFAULT_ALT_TEXT}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Content Card with header props and populated accessory/custom/footer slots.",
      },
    },
  },
}

export const Responsive: Story = {
  render: () => (
    <div className="p-6 bg-background space-y-6">
      <div className="w-full">
        <ContentCard
          {...requiredProps}
          contentText="Short content"
          customContent={<div>Custom content</div>}
          footer={<div>Footer</div>}
          imageSrc={DEFAULT_CARD_IMAGE_SRC}
          imageAlt={DEFAULT_ALT_TEXT}
        />
      </div>

      <div className="w-64">
        <ContentCard
          {...requiredProps}
          contentText="Content content content content content content"
          headerAccessory={<div>Accessory</div>}
          customContent={<div>Custom content</div>}
          footer={<div>Footer</div>}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The card fills the container width (up to its max width) and stays responsive.",
      },
    },
  },
}

export const DefaultWidth: Story = {
  render: () => (
    <div className="p-6 bg-background">
      <div className="w-full max-w-xl">
        <ContentCard
          {...requiredProps}
          width="default"
          contentText="Default width keeps the original max-width constraint."
          imageSrc={DEFAULT_CARD_IMAGE_SRC}
          imageAlt={DEFAULT_ALT_TEXT}
        />
      </div>
    </div>
  ),
}

export const FluidWidth: Story = {
  render: () => (
    <div className="p-6 bg-background space-y-6">
      <div className="w-full max-w-xl">
        <ContentCard
          {...requiredProps}
          width="fluid"
          contentText="Fluid width fills the parent container."
          imageSrc={DEFAULT_CARD_IMAGE_SRC}
          imageAlt={DEFAULT_ALT_TEXT}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContentCard {...requiredProps} width="fluid" contentText="Grid item 1 (fluid)." />
        <ContentCard {...requiredProps} width="fluid" contentText="Grid item 2 (fluid)." />
      </div>
    </div>
  ),
}

export const CustomMaxWidth: Story = {
  render: () => (
    <div className="p-6 bg-background space-y-6">
      <div className="w-full max-w-xl">
        <ContentCard
          {...requiredProps}
          width="custom"
          maxWidth="28rem"
          contentText="Custom max width set to 28rem."
        />
      </div>
      <div className="w-full max-w-xl">
        <ContentCard
          {...requiredProps}
          width="custom"
          maxWidth={320}
          contentText="Custom max width can also be provided as a number (px)."
        />
      </div>
    </div>
  ),
}

export const ClickableAsChild: Story = {
  render: () => (
    <div className="p-6 bg-background">
      <ContentCard
        {...requiredProps}
        contentText="Content content content content content"
        asChild
        headerAccessory={<div className="flex">Accessory</div>}
        customContent={<div>Custom content</div>}
        footer={<div>Footer</div>}
      >
        <a href="/example" aria-label="Open content card" />
      </ContentCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "When `asChild` is enabled, the card renders as the provided root element (e.g. <a>), making the whole card clickable.",
      },
    },
  },
}

