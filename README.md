# tailwind-unit-replace

[![npm version](https://badge.fury.io/js/tailwind-unit-replace.svg)](https://badge.fury.io/js/tailwind-unit-replace)
[![CI](https://github.com/huygn/tailwind-unit-replace/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/huygn/tailwind-unit-replace/actions/workflows/ci.yml)

Helpers to replace Tailwind's default unit (`rem`) with whatever possible, be it `em`, `px` .etc.

Let's face it, Tailwind's default `rem` unit works great for websites & apps. But if you're building components library or plugins, chances are you'd like your plugin's size/spacing to stay fixed as desired (in `px`) or dynamically based on it's closest ancestor (like `em`). This repo aims to make it possible without hassles.

## Install

```sh
npm i -D tailwind-unit-replace
```

## Usage

```javascript
const { replaceTailwindUnit, toEM, toPX } = require('tailwind-unit-replace')

const config = { ... } // your custom Tailwind config

module.exports = replaceTailwindUnit({
  exclude: ['fontFamily'],
  replacer: toEM // or `toPX` to convert to pixel (16-based)
})(config)
```

If you'd like to replace unit with a more flexible value, you can write a custom `replacer` - take a look at [toEM](./src/extras.ts)'s implementation, for example this is how I did in another project:

```typescript
function replacer(value: string) {
  return value.replace(remUnitRegex, (match, remDigit) => {
    const amount = Number(remDigit);
    if (Number.isNaN(amount)) return match;
    return `calc(var(--root-font-size) * ${amount})`;
  });
}
```

`replacer` function will be called on each config (deeply nested) string value, and is expected to return a string value which will be applied to the final replaced Tailwind config.
