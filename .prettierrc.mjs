/** @type {import("prettier").Config} */
export default {
  trailingComma: "all",
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  astroAllowShorthand: false,

  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
