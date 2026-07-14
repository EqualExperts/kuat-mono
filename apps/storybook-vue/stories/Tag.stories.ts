/**
 * Tag – localized UI component. Categorisation pill per Figma (node 3442:513).
 */
import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { Tag, TagGroup, TAG_COLORS } from "@equal-experts/kuat-vue";
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

export const Default: Story = {
  render: (args) => ({
    components: { Tag },
    setup() {
      return { args };
    },
    template: '<Tag v-bind="args">Label</Tag>',
  }),
};

export const AllColours: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div class="flex flex-wrap gap-2">
        <Tag color="base">Base</Tag>
        <Tag color="index-indigo">Index Indigo</Tag>
        <Tag color="transform-teal">Transform Teal</Tag>
        <Tag color="packet-plum">Packet Plum</Tag>
        <Tag color="server-slate">Server Slate</Tag>
        <Tag color="logic-lime">Logic Lime</Tag>
        <Tag color="signal-yellow">Signal Yellow</Tag>
        <Tag color="cursor-coral">Cursor Coral</Tag>
        <Tag color="patch-peach">Patch Peach</Tag>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "All nine colour categories in display mode (/50 tint, /700 text).",
      },
    },
  },
};

export const ToggleFilters: Story = {
  render: () => ({
    components: { Tag, TagGroup },
    setup() {
      const filters = ref([
        { color: "base", text: "All", selected: false },
        { color: "index-indigo", text: "Design", selected: false },
        { color: "transform-teal", text: "Engineering", selected: true },
        { color: "packet-plum", text: "Data", selected: false },
        { color: "server-slate", text: "Delivery", selected: false },
      ]);
      return { filters };
    },
    template: `
      <TagGroup label="Technology filters">
        <Tag
          v-for="filter in filters"
          :key="filter.text"
          :color="filter.color"
          mode="toggle"
          :selected="filter.selected"
          @update:selected="(next) => (filter.selected = next)"
        >
          {{ filter.text }}
        </Tag>
      </TagGroup>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle mode: multi-select filter group. Selected tags darken to /200 and show a check icon; aria-pressed reflects the state.",
      },
    },
  },
};

export const DismissibleTags: Story = {
  render: () => ({
    components: { Tag, TagGroup },
    setup() {
      const tags = ref([
        { color: "index-indigo", text: "Design" },
        { color: "transform-teal", text: "Engineering" },
        { color: "cursor-coral", text: "Data" },
      ]);
      const remove = (text: string) => {
        tags.value = tags.value.filter((t) => t.text !== text);
      };
      return { tags, remove };
    },
    template: `
      <TagGroup label="Applied filters">
        <Tag
          v-for="tag in tags"
          :key="tag.text"
          :color="tag.color"
          mode="dismiss"
          @dismiss="remove(tag.text)"
        >
          {{ tag.text }}
        </Tag>
      </TagGroup>
    `,
  }),
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
  render: () => ({
    components: { Tag },
    setup() {
      return { colors: TAG_COLORS };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <Tag v-for="color in colors" :key="color" :color="color" mode="toggle" selected>
            {{ color }}
          </Tag>
        </div>
        <div class="flex flex-wrap gap-2">
          <Tag v-for="color in colors" :key="color" :color="color" mode="dismiss">
            {{ color }}
          </Tag>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Selected Toggle (check) and Selected Dismiss (x) visuals for all nine colours.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => ({
    components: { Tag },
    setup() {
      return { colors: TAG_COLORS };
    },
    template: `
      <div class="flex flex-wrap gap-2 bg-white p-4">
        <Tag v-for="color in colors" :key="color" :color="color">{{ color }}</Tag>
      </div>
    `,
  }),
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
  render: () => ({
    components: { Tag },
    setup() {
      return { colors: TAG_COLORS };
    },
    template: `
      <div class="dark flex flex-wrap gap-2 bg-slate-950 p-4">
        <Tag v-for="color in colors" :key="color" :color="color">{{ color }}</Tag>
      </div>
    `,
  }),
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
