module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "storybook-builder-vite",
  },
  framework: "@storybook/react",
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
};
