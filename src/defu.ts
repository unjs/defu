
type Merger = (obj: any, key: string, value: any) => any
type DefuFn = <T>(...args: T | any) => T
interface Defu {
  <T>(...args: T | any): T
  fn: DefuFn
  extend(merger?: Merger): DefuFn
}

function isObject (val: any) {
  return val !== null && typeof val === 'object'
}

// Base function to apply defaults
function _defu<T> (baseObj: T, defaults: any, merger?: Merger): T {
  if (!isObject(defaults)) {
    return _defu(baseObj, {})
  }

  const obj = Object.assign({}, defaults)

  for (const key in baseObj) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }

    const val = baseObj[key]

    if (val === null) {
      continue
    }

    if (merger && merger(obj, key, val)) {
      continue
    }

    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = obj[key].concat(val)
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key])
    } else {
      obj[key] = val
    }
  }

  return obj
}

// Create defu wrapper with optional merger and multi arg support
function extend (merger?: Merger): DefuFn {
  return (...args) => args.reduce((p, c) => _defu(p, c, merger), {})
}

// Basic version
const defu = extend() as Defu

// Custom version with function merge support
defu.fn = extend((obj, key, value) => {
  if (typeof value === 'function') {
    obj[key] = value(obj[key])
    return true
  }
})

// Support user extending
defu.extend = extend

export default defu
