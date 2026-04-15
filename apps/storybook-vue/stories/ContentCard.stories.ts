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

