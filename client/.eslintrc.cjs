/** @type {import("eslint").Linter.Config} */
const config = {
  parserOptions: {
    project: true,
  },
  extends: ["next/core-web-vitals", "../core/eslint.cjs"],
};
module.exports = config;
