# 🇩 defu

> Recursively assign default properties. Lightweight and Fast!

[![Standard JS][standard-src]][standard-href]
[![david dm][david-src]][david-href]
[![codecov][codecov-src]][codecov-href]
[![circleci][circleci-src]][circleci-href]

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-dt-src]][npm-dt-href]
[![package phobia][packagephobia-src]][packagephobia-href]

## Install

Install package:

```bash
npm install defu
```

OR

```bash
yarn add defu
```

## Usage

```js
defu (object, defaults)
```

### Arguments

- **object (Object):** The destination object.
- **source (Object):** The source object.

```js
const defu = require('defu')

console.log(defu({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }))
// => { a: { b: 2, c: 3 } }
```

### Remarks

Assignment of `__proto__` and `constructor` keys will be skipped to prevent security issues with object pollution.

## License

MIT. Made with 💖

<!-- Refs -->
[standard-src]: https://flat.badgen.net/badge/code%20style/standard/green
[standard-href]: https://standardjs.com

[npm-v-src]: https://flat.badgen.net/npm/v/defu/latest
[npm-v-href]: https://npmjs.com/package/defu

[npm-dt-src]: https://flat.badgen.net/npm/dt/defu
[npm-dt-href]: https://npmjs.com/package/defu

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/defu
[packagephobia-href]: https://packagephobia.now.sh/result?p=defu

[david-src]: https://flat.badgen.net/david/dep/jsless/defu
[david-href]: https://david-dm.org/jsless/defu

[codecov-src]: https://flat.badgen.net/codecov/c/github/jsless/defu/master
[codecov-href]: https://codecov.io/gh/jsless/defu

[circleci-src]: https://flat.badgen.net/circleci/github/jsless/defu/master
[circleci-href]: https://circleci.com/gh/jsless/defu
