/** @type {import("prettier").Config} */
export default {
  trailingComma: "all",
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,

  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: ["<THIRD_PARTY_MODULES>", `^(@api|@components)(/|$)`, "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
