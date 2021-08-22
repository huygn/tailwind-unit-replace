# tailwind-unit-replace

[![npm version](https://badge.fury.io/js/tailwind-unit-replace.svg)](https://badge.fury.io/js/tailwind-unit-replace)

Helpers to replace Tailwind's default unit (`rem`) with whatever possible, be it `em`, `px` .etc.

Let's face it, Tailwind's default `rem` unit works great for websites & apps. But if you're building components library or plugins, chances are you'd like your plugin size/spacing to stay fixed as desired (in `px`) or dynamically based of it's closest ancestor (like `em`). This repo aims to make it possible without hassles.

## Install

```sh
npm i -D tailwind-unit-replace
```

## Usage

```javascript
const { replaceTailwindUnit, toEM } = require('tailwind-unit-replace')

const config = { ... } // your custom Tailwind config

module.exports = replaceTailwindUnit({
  exclude: ['fontFamily'],
  replacer: toEM
})(config)
```

If you'd like to replace with `px` instead of `em`, you can write a custom `replacer` - take a look at [toEM](./src/extras.ts)'s implementation, `remUnitRegex` is also exported (at top level) for convenience.

`replacer` function will be called on each config (deeply nested) string value, and is expected to return a string value which will be applied to the final replaced Tailwind config.
