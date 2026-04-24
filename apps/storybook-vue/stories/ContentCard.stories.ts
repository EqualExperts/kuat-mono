import type { Meta, StoryObj } from "@storybook/vue3"
import { ContentCard, Badge } from "@equal-experts/kuat-vue"
import { contentCardDocs } from "../docs/component-docs"

const meta: Meta<typeof ContentCard> = {
  title: "Components/ContentCard",
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
  category: "User experience",
  title: "A clear & descriptive headline",
  titleHeadingLevel: 3,
}

const DEFAULT_CARD_IMAGE_SRC =
  "https://www.figma.com/api/mcp/asset/d40b239e-c915-4257-bd35-5dcbe21dac08"

const DEFAULT_ALT_TEXT = "Default alt text"

export const Default: Story = {
  render: () => ({
    components: { ContentCard, Badge },
    template: `
      <div class="p-6 bg-background">
        <ContentCard
          category="${requiredProps.category}"
          title="A clear &amp; descriptive headline!"
          :title-heading-level="${requiredProps.titleHeadingLevel}"
          content-text="Content content content content content content content content content content content content content"
          :image-src="'${DEFAULT_CARD_IMAGE_SRC}'"
          :image-alt="'${DEFAULT_ALT_TEXT}'"
        >
          <template #badge>
            <Badge variant="secondary">Case study</Badge>
          </template>
          <template #header-accessory>
            <div>XYZ</div>
            <div>XYZ</div>
          </template>

          <template #custom-content>
            <div class="flex h-full items-start">Custom content component</div>
          </template>

          <template #footer>
            <div class="flex h-full items-center justify-between w-full">Footer slot content</div>
          </template>
        </ContentCard>
      </div>
    `,
  }),
}

export const Responsive: Story = {
  render: () => ({
    components: { ContentCard, Badge },
    template: `
      <div class="p-6 bg-background space-y-6">
        <div class="w-full py-4">
          <ContentCard
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Short content"
            :image-src="'${DEFAULT_CARD_IMAGE_SRC}'"
            :image-alt="'${DEFAULT_ALT_TEXT}'"
            >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
            <template #custom-content>
              <div>Custom content</div>
            </template>
            <template #footer>
              <div>Footer</div>
            </template>
          </ContentCard>
        </div>

        <div class="my-4">
          <ContentCard
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Content content content content content content"
            :image-src="'${DEFAULT_CARD_IMAGE_SRC}'"
            :image-alt="'${DEFAULT_ALT_TEXT}'"
            >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
            <template #header-accessory>
              <div>Accessory</div>
            </template>
            <template #custom-content>
              <div>Custom content</div>
            </template>
            <template #footer>
              <div>Footer</div>
            </template>
          </ContentCard>
        </div>
      </div>
    `,
  }),
}

export const DefaultWidth: Story = {
  render: () => ({
    components: { ContentCard, Badge },
    template: `
      <div class="p-6 bg-background">
        <div class="w-full max-w-xl">
          <ContentCard
            width="default"
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Default width keeps the original max-width constraint."
            :image-src="'${DEFAULT_CARD_IMAGE_SRC}'"
            :image-alt="'${DEFAULT_ALT_TEXT}'"
          >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
          </ContentCard>
        </div>
      </div>
    `,
  }),
}

export const FluidWidth: Story = {
  render: () => ({
    components: { ContentCard, Badge },
    template: `
      <div class="p-6 bg-background space-y-6">
        <div class="w-full max-w-xl">
          <ContentCard
            width="fluid"
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Fluid width fills the parent container."
            :image-src="'${DEFAULT_CARD_IMAGE_SRC}'"
            :image-alt="'${DEFAULT_ALT_TEXT}'"
          >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
          </ContentCard>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ContentCard
            width="fluid"
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Grid item 1 (fluid)."
          >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
          </ContentCard>
          <ContentCard
            width="fluid"
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Grid item 2 (fluid)."
          >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
          </ContentCard>
        </div>
      </div>
    `,
  }),
}

export const CustomMaxWidth: Story = {
  render: () => ({
    components: { ContentCard, Badge },
    template: `
      <div class="p-6 bg-background space-y-6">
        <div class="w-full max-w-xl">
          <ContentCard
            width="custom"
            max-width="28rem"
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Custom max width set to 28rem."
          >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
          </ContentCard>
        </div>

        <div class="w-full max-w-xl">
          <ContentCard
            width="custom"
            :max-width="320"
            category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
            :title-heading-level="${requiredProps.titleHeadingLevel}"
            content-text="Custom max width can also be provided as a number (px)."
          >
            <template #badge>
              <Badge variant="secondary">Case study</Badge>
            </template>
          </ContentCard>
        </div>
      </div>
    `,
  }),
}

export const ClickableAsChild: Story = {
  render: () => ({
    components: { ContentCard, Badge },
    template: `
      <div class="p-6 bg-background">
        <ContentCard
          as-child
          category="${requiredProps.category}"
            title="A clear &amp; descriptive headline"
          :title-heading-level="${requiredProps.titleHeadingLevel}"
          content-text="Content content content content content"
          :image-src="null"
        >
          <a href="/example" aria-label="Open content card"></a>

          <template #badge>
            <Badge variant="secondary">Case study</Badge>
          </template>
          <template #header-accessory>
            <div>Accessory</div>
          </template>
          <template #custom-content>
            <div>Custom content</div>
          </template>
          <template #footer>
            <div>Footer</div>
          </template>
        </ContentCard>
      </div>
    `,
  }),
}

