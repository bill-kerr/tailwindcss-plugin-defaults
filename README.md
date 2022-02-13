## tailwindcss-plugin-defaults

A Tailwind CSS plugin that gives component authors default, override-able classes.

## Quick Start

```
npm i tailwindcss-plugin-defaults
```

Add the plugin to your `tailwind.config.js` file and disable the default `preflight` CSS reset (see [How](#how) for why we need to do this. Don't worry, we still provide the same resest).

```js
// tailwind.config.js

const defaults = require('tailwindcss-plugin-defaults');

module.exports = {
  content: [''],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
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
  corePlugins: {
    preflight: false,
  },
  plugins: [defaults({ modifier: 'default' })],
};
```

Now your modifier for default classes can be used as follows.

```html
<div class="default:bg-gray-100">You can change the modifier!</div>
```

## Why

Providing override-able, default styles is a well-known issue for users of Tailwind CSS who wish to build reusable components. Without `tailwindcss-plugin-defaults`, the following element will have a background color of `bg-green-900` despite it being defined earlier in the class list. This is because `bg-green-900` is defined _later_ in the CSS file.

```html
<div class="bg-green-900 bg-green-50">My background color is bg-green-900 😢</div>
```

With `tailwindcss-plugin-defaults`, we can change that behavior.

```html
<div class="d:bg-green-900 bg-green-50">My background color is bg-green-50! 😄</div>
```

## How

Default classes make use of the [`:where()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:where). The `:where()` pseudo-class drops specificity to 0, allowing classes to be overridden by any CSS declaration. The default class for `mt-4` would look like:

```css
:where(.d\:mt-4) {
  margin-top: 1rem;
}
```

This now allows base components to implement `d:mt-4` and colliding margin utilities such as `mt-1` will now supersede the default utility.

This is great, but because `:where()` drops the specificity to 0, base styles like the following are more specific.

```css
button {
  background-color: transparent;
}
```

This means `d:bg-red-100` applied to a button will do nothing. To solve that, `tailwindcss-plugin-defaults` provides its own CSS reset, which lowers the specificity of the reset by--you guessed it--wrapping those declarations in `:where()`. Not to worry, it does the same things as the default Tailwind CSS preflight.
