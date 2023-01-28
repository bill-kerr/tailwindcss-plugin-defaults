const defaults = require("./dist/tailwindcss-plugin-defaults.umd");

module.exports = {
  content: ["index.html"],
  theme: {
    extend: {},
  },
  plugins: [defaults],
};
