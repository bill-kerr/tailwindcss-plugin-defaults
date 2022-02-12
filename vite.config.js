const { defineConfig } = require('vite');
const path = require('path');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'react-dynamic-debounce',
    },
  },
  server: {
    port: 3001,
  },
});
