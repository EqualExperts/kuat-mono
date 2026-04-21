import type { Preview } from "@storybook/vue3";
import { withThemeByClassName } from "@storybook/addon-themes";
import "@equal-experts/kuat-vue/styles";

const DEVICE_VIEWPORTS = {
  mobileSmall: {
    name: "Mobile Small (320x568)",
    styles: { width: "320px", height: "568px" },
  },
  mobileLarge: {
    name: "Mobile Large (414x896)",
    styles: { width: "414px", height: "896px" },
  },
  tablet: {
    name: "Tablet (768x1024)",
    styles: { width: "768px", height: "1024px" },
  },
  laptop: {
    name: "Laptop (1024x768)",
    styles: { width: "1024px", height: "768px" },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      options: DEVICE_VIEWPORTS,
      defaultViewport: "responsive",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;

