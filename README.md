## tailwindcss-plugin-defaults

A TailwindCSS plugin that gives component authors default, override-able classes.

## Quick Start

```
npm i tailwindcss-plugin-defaults
```

```js
// tailwind.config.js

const defaults = require('tailwindcss-plugin-defaults');

module.exports = {
  content: [''],
  theme: {
    extend: {},
  },
  plugins: [defaults],
};
```

```jsx
// Set component defaults
function Card({ className }) {
  return <span className={`d:bg-gray-100 d:rounded d:p-4 d:shadow ${className}`}>;
}

// Easily override them without worrying about CSS ordering
function CardList() {
  return (
    <div className="flex space-x-6">
      {/* This card will have a bg-gray-50 background color */}
      <Card className="bg-gray-50" />

      {/* This card will have a bg-gray-100 background color */}
      <Card />
    </div>
  );
}
```

## Why

Providing override-able, default styles is a well-known issue for users of TailwindCSS who wish to build reusable components.

## Configuration

To use a modifier other than the default `d:...`, pass in a `modifier` configuration property to the plugin.

```js
// tailwind.config.js

const defaults = require('tailwindcss-plugin-defaults');

module.exports = {
  content: [''],
  theme: {
    extend: {},
  },
  plugins: [defaults({ modifier: 'default' })],
};
```

Now your modifier for default classes can be used as such.

```jsx
function Card({ className }) {
  return <span className={`default:bg-gray-100 ${className}`}>;
}
```
