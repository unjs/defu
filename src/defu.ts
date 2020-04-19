function isObject (val: any) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

type defuObj = {
  [key: string]: defuObj | any,
}

function _defu<T extends defuObj> (baseObj: T | any, defaults: T | any): T {
  if (!isObject(baseObj)) {
    return _defu({}, defaults)
  }

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

    if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key])
    } else {
      obj[key] = val
    }
  }

  return obj
}

function defu<T extends defuObj> (...args: T | any): T {
  return args.reduce(_defu, {})
}

export default defu
