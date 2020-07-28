# 🇩 defu

> Recursively assign default properties. Lightweight and Fast!

[![Standard JS][standard-src]][standard-href]
[![david dm][david-src]][david-href]
[![codecov][codecov-src]][codecov-href]
[![circleci][circleci-src]][circleci-href]

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-dt-src]][npm-dt-href]
[![package phobia][packagephobia-src]][packagephobia-href]
[![bundle phobia][bundlephobia-src]][bundlephobia-href]

## Install

Install package:

```bash
yarn add defu
# or
npm install defu
```

## Usage

```js
const options = defu (object, ...defaults)
```

Most left arguments have more perioriry when assigning defaults.

### Arguments

- **object (Object):** The destination object.
- **source (Object):** The source object.

```js
const defu = require('defu')

console.log(defu({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }))
// => { a: { b: 2, c: 3 } }
```

## Custom Merger

Sometimes default merging strategy is not desirable. Using `defu.extend` we can create a custom instance with different merging strategy.

This function accepts `obj` (target object), `key` and `value` (default value) and should return `true` if applied custom merging.

**Example:** Sum numbers instead of overriding

```js
const ext = defu.extend((obj, key, val) => {
  if (typeof val === 'number') {
    obj[key] += val
    return true
  }
})

ext({ cost: 15 }, { cost: 10 }) // { cost: 25 }
```

## Function Merger

Using `defu.fn`, if user provided a function, it will be called with default value instead of merging. Mostly useful for array merging.

**Example:** Filter some items from defaults (array)

```js

defu.fn({
  ignore(val) => val.filter(i => i !== 'dist')
 }, {
   ignore: [
     'node_modules',
     'dist
   ]
 }) // { ignore: ['node_modules'] }
```

### Remarks

- `object` and `defaults` are not modified
- `null` values are skipped same as [defaults-deep](https://www.npmjs.com/package/defaults-deep). Please use either [omit-deep](http://npmjs.com/package/omit-deep) or [lodash.defaultsdeep](https://www.npmjs.com/package/lodash.defaultsdeep) if you need to to preserve.
- Assignment of `__proto__` and `constructor` keys will be skipped to prevent security issues with object pollution.
- Will concat `array` values (it default property is defined)
```js
console.log(defu({ array: ['b', 'c'] }, { array: ['a'] }))
// => { array: [a', 'b', 'c']}
```

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

[bundlephobia-src]: https://flat.badgen.net/bundlephobia/min/defu
[bundlephobia-href]: https://bundlephobia.com/result?p=defu

[david-src]: https://flat.badgen.net/david/dep/nuxt-contrib/defu
[david-href]: https://david-dm.org/nuxt-contrib/defu

[codecov-src]: https://flat.badgen.net/codecov/c/github/nuxt-contrib/defu/master
[codecov-href]: https://codecov.io/gh/nuxt-contrib/defu

[circleci-src]: https://flat.badgen.net/circleci/github/nuxt-contrib/defu/master
[circleci-href]: https://circleci.com/gh/nuxt-contrib/defu
