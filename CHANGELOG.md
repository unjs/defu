# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v6.1.3

[compare changes](https://github.com/unjs/defu/compare/v6.1.2...v6.1.3)

### 🩹 Fixes

- Only merge plain objects ([#111](https://github.com/unjs/defu/pull/111))

### 📖 Documentation

- Update badges ([581dd92](https://github.com/unjs/defu/commit/581dd92))
- Fix typo ([#96](https://github.com/unjs/defu/pull/96))
- Fix the result of the array merging ([#99](https://github.com/unjs/defu/pull/99))
- Fix typo ([#107](https://github.com/unjs/defu/pull/107))

### 📦 Build

- Backward compatible cjs entry ([#110](https://github.com/unjs/defu/pull/110))

### 🏡 Chore

- Update dependencies ([63d0e8e](https://github.com/unjs/defu/commit/63d0e8e))
- Enable ts strict mode ([82d68c7](https://github.com/unjs/defu/commit/82d68c7))
- Fix tests ([59d0f6a](https://github.com/unjs/defu/commit/59d0f6a))

### 🎨 Styles

- Format with prettier v3 ([32650f1](https://github.com/unjs/defu/commit/32650f1))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Abdul Al-Hasany <info@kalimah-apps.com>
- Kricsleo 
- Donald Shtjefni ([@dnldsht](http://github.com/dnldsht))
- Sébastien Chopin <seb@nuxtjs.com>

## v6.1.2

[compare changes](https://github.com/unjs/defu/compare/v6.1.1...v6.1.2)


### 🩹 Fixes

  - Add node16 compatible type declaration ([#73](https://github.com/unjs/defu/pull/73))

### 🏡 Chore

  - Fix renovate config ([#56](https://github.com/unjs/defu/pull/56))
  - Use changelogen to release ([5e24124](https://github.com/unjs/defu/commit/5e24124))

### 🎨 Styles

  - Format with prettier ([26477ed](https://github.com/unjs/defu/commit/26477ed))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>
- Daniel Roe <daniel@roe.dev>
- Nozomu Ikuta <nick.0508.nick@gmail.com>

### [6.1.1](https://github.com/unjs/defu/compare/v6.1.0...v6.1.1) (2022-11-14)

## [6.1.0](https://github.com/unjs/defu/compare/v6.0.1...v6.1.0) (2022-08-16)


### Features

* export `Defu` type helper ([#45](https://github.com/unjs/defu/issues/45)) ([551ae4c](https://github.com/unjs/defu/commit/551ae4c87c13f2188b97930eaffd72e5575e9048))


### Bug Fixes

* **types:** constrain inferred types of `Defu` ([3d3ea3e](https://github.com/unjs/defu/commit/3d3ea3e4e982591632f070bbf64e28f9d98d6bf9))

### [6.0.1](https://github.com/unjs/defu/compare/v6.0.0...v6.0.1) (2022-08-16)


### Bug Fixes

* add typing to allow for non-objects input args ([#42](https://github.com/unjs/defu/issues/42)) ([1f3a701](https://github.com/unjs/defu/commit/1f3a701bc3fd839344359ad5c2b358fbefd978cc))
* merge object strings of many types  ([#44](https://github.com/unjs/defu/issues/44)) ([c7226f9](https://github.com/unjs/defu/commit/c7226f971740966282530745030123aa07ff7b17))

## [6.0.0](https://github.com/unjs/defu/compare/v5.0.1...v6.0.0) (2022-03-21)


### ⚠ BREAKING CHANGES

* Use named exports:
- `import defu from 'defu'` => `import { defu } from 'defu'`
- `defu.fn` => `import { defuFn }`
- `defu.arrayFn` => `import { defuArrayFn }`
* When merging input value with defaults with an array, order is reversed

### Features

* concat array defaults to the last ([f6df314](https://github.com/unjs/defu/commit/f6df314c26540591c3ac6534c6942edc3b06384f))
* use named exports ([4a8fc52](https://github.com/unjs/defu/commit/4a8fc52c228d82949384a50efe8f0052e9eaba68))


### Bug Fixes

* workaround for [#32](https://github.com/unjs/defu/issues/32) ([7b1f284](https://github.com/unjs/defu/commit/7b1f284b76d2a4706b37adbdb99c49ec9d2d35aa))

### [5.0.1](https://github.com/unjs/defu/compare/v5.0.0...v5.0.1) (2022-01-13)

## [5.0.0](https://github.com/unjs/defu/compare/v4.0.1...v5.0.0) (2021-05-12)


### ⚠ BREAKING CHANGES

* `undefined` values will be bypassed and not consistent behavior with defaults-deep anymore.

### Features

* skip nullish values from source ([#29](https://github.com/unjs/defu/issues/29)) ([076f10a](https://github.com/unjs/defu/commit/076f10a77fc1384f53e0586d3c77d754cd419f06))

### [4.0.1](https://github.com/unjs/defu/compare/v4.0.0...v4.0.1) (2021-04-23)

## [4.0.0](https://github.com/unjs/defu/compare/v3.2.2...v4.0.0) (2021-04-23)


### ⚠ BREAKING CHANGES

* module exports

### Features

* module exports ([42df406](https://github.com/unjs/defu/commit/42df406b6938bc7ffb5f628efaa9447c4e95b211))

### [3.2.2](https://github.com/unjs/defu/compare/v3.2.1...v3.2.2) (2020-11-10)


### Bug Fixes

* switch back to bili for es5 support till fixing in siroc ([07786c2](https://github.com/unjs/defu/commit/07786c270f9bf49529d8203f31b4b9bd696a6ee3))

### [3.2.1](https://github.com/unjs/defu/compare/v3.2.0...v3.2.1) (2020-11-09)


### Bug Fixes

* **types:** correct type inference where merged types are same ([#26](https://github.com/unjs/defu/issues/26)) ([f322607](https://github.com/unjs/defu/commit/f322607515a5bd19b1a2f28d7e3336fee9194520))

## [3.2.0](https://github.com/unjs/defu/compare/v3.1.0...v3.2.0) (2020-11-09)


### Features

* add type inference for defu result ([#24](https://github.com/unjs/defu/issues/24)) ([934d736](https://github.com/unjs/defu/commit/934d736da31f4824d9e135d925cece361b73c533))
* pass namespace to custom merger ([#25](https://github.com/unjs/defu/issues/25)) ([6bd7ef5](https://github.com/unjs/defu/commit/6bd7ef59ce3e94b68108355942dba9ac49284523))

## [3.1.0](https://github.com/unjs/defu/compare/v3.0.1...v3.1.0) (2020-08-04)


### Features

* add defu.arrayFn ([#21](https://github.com/unjs/defu/issues/21)) ([df05ed0](https://github.com/unjs/defu/commit/df05ed04088d6e0f0bc1a8cd9603fae46fb59268))

### [3.0.1](https://github.com/unjs/defu/compare/v3.0.0...v3.0.1) (2020-07-29)


### Bug Fixes

* recursively pass merger ([ec09394](https://github.com/unjs/defu/commit/ec09394d77533cd0a4753a943a5d6fbd25ef308d))

## [3.0.0](https://github.com/unjs/defu/compare/v2.0.4...v3.0.0) (2020-07-28)


### ⚠ BREAKING CHANGES

* defau will merge arrays too (#18)

### Features

* extend and custom merger ([#19](https://github.com/unjs/defu/issues/19)) ([4932232](https://github.com/unjs/defu/commit/493223278840132a6de2c3291b60f7b00b3fa477))
* merge arrays ([#18](https://github.com/unjs/defu/issues/18)) ([22c631e](https://github.com/unjs/defu/commit/22c631e354d9bc50380ce7beb8914bd44feb2309))

### [2.0.4](https://github.com/unjs/defu/compare/v2.0.3...v2.0.4) (2020-05-22)


### Bug Fixes

* correct path to types ([33d4bf0](https://github.com/unjs/defu/commit/33d4bf0331e70b69a3a2a392f18a8f890d45d4f9))

### [2.0.3](https://github.com/unjs/defu/compare/v2.0.2...v2.0.3) (2020-05-22)


### Bug Fixes

* specify type declaration file more precisely ([#15](https://github.com/unjs/defu/issues/15)) ([6aa47d4](https://github.com/unjs/defu/commit/6aa47d4a06a117b34b5e9231b04f8403056c2685))

### [2.0.2](https://github.com/unjs/defu/compare/v2.0.1...v2.0.2) (2020-04-19)

### [2.0.1](https://github.com/unjs/defu/compare/v2.0.0...v2.0.1) (2020-04-19)

### Docs

* Add note about `null`

## [2.0.0](https://github.com/unjs/defu/compare/v1.0.0...v2.0.0) (2020-04-19)

### Features

* Support passing multiple defaults ([89ef702](https://github.com/unjs/defu/commit/89ef702736b49cd48ca99a0dc64aa6ef3bd74e2d))
* Typescript rewrite ([9c906e6](https://github.com/unjs/defu/commit/9c906e64459da64d77124224edb66034ce92f20c))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/unjs/defu/compare/v0.0.4...v1.0.0) (2020-02-02)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/unjs/defu/compare/v0.0.3...v0.0.4) (2020-01-01)


### Bug Fixes

* improve es5 compatibility ([#2](https://github.com/unjs/defu/issues/2), [#9](https://github.com/unjs/defu/issues/9)) ([5a6de7c](https://github.com/unjs/defu/commit/5a6de7c))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/unjs/defu/compare/v0.0.1...v0.0.3) (2019-05-25)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/jesless/defu/compare/v0.0.1...v0.0.2) (2019-05-25)



<a name="0.0.1"></a>
## 0.0.1 (2019-02-07)


### Bug Fixes

* imrpove non-object handlers ([f89fa28](https://github.com/jesless/defu/commit/f89fa28))
