## tailwindcss-plugin-defaults

A Tailwind CSS plugin that gives component authors default, override-able classes.

## Quick Start

```
npm i tailwindcss-plugin-defaults
```

Add the plugin to your `tailwind.config.js` file.

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

Remove the `@tailwind base;` directive from your CSS file.

```diff
// styles.css

-@tailwind base;
@tailwind components;
@tailwind utilities;
```

If you're not using `postcss`, copy the contents of our modified `preflight.css` (URL_GOES_HERE) to the top of `styles.css` where `@tailwind base;` used to be.

If you are using `postcss` with `postcss-import`, change your CSS file to the following:

```css
@import 'tailwindcss-plugin-import/preflight.css';
@tailwind components;
@tailwind utilities;
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

Providing override-able, default styles is a well-known issue for users of Tailwind CSS who wish to build reusable components. Without `tailwindcss-plugin-defaults`, the following element will have a background color of `bg-green-900` despite it being defined earlier in the class list. This is because `bg-green-900` is defined _later_ in the css file.

```html
<div class="bg-green-900 bg-green-50">My background color is bg-green-900 😢</div>
```

With `tailwindcss-plugin-defaults`, we can change that behavior.

```html
<div class="d:bg-green-900 bg-green-50">My background color is bg-green-50! 😄</div>
```

## How

Brief description on how we do this.

## Configuration

To use a modifier other than the default `d:`, pass in a `modifier` configuration property to the plugin.

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

```html
<div class="default:bg-gray-100">You can change the modifier!</div>
```
