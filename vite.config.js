const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "tailwindcss-plugin-defaults",
    },
  },
  server: {
    port: 3001,
  },
});
