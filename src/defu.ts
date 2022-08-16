import type { Merger, DefuFn, Defu } from './types'

function isObject (val: any) {
  return val !== null && typeof val === 'object'
}

// Base function to apply defaults
function _defu<T> (baseObj: T, defaults: any, namespace: string = '.', merger?: Merger): T {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger)
  }

  const obj = Object.assign({}, defaults)

  for (const key in baseObj) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }

    const val = baseObj[key]

    if (val === null || val === undefined) {
      continue
    }

    if (merger && merger(obj, key, val, namespace)) {
      continue
    }

    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key])
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : '') + key.toString(), merger)
    } else {
      obj[key] = val
    }
  }

  return obj
}

// Create defu wrapper with optional merger and multi arg support
export function createDefu (merger?: Merger): DefuFn {
  return (...args) => args.reduce((p, c) => _defu(p, c, '', merger), {} as any)
}

// Standard version
export const defu = createDefu() as Defu
export default defu

// Custom version with function merge support
export const defuFn = createDefu((obj, key, currentValue, _namespace) => {
  if (typeof obj[key] !== 'undefined' && typeof currentValue === 'function') {
    obj[key] = currentValue(obj[key])
    return true
  }
})

// Custom version with function merge support only for defined arrays
export const defuArrayFn = createDefu((obj, key, currentValue, _namespace) => {
  if (Array.isArray(obj[key]) && typeof currentValue === 'function') {
    obj[key] = currentValue(obj[key])
    return true
  }
})

export type { DefuFn, Defu, Coalesce, Merge, MergeArrays, Merger, IgnoredInput, Input, MergeObjects } from './types'
