function isObject (val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function defu (_obj, _defaults) {
  if (!isObject(_obj)) {
    return defu({}, _defaults)
  }

  if (!isObject(_defaults)) {
    return defu(_obj, {})
  }

  const obj = Object.assign({}, _defaults)

  for (const key in _obj) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }

    const val = _obj[key]

    if (val === null) {
      continue
    }

    if (isObject(val) && isObject(obj[key])) {
      obj[key] = defu(val, obj[key])
    } else {
      obj[key] = val
    }
  }

  return obj
}

module.exports = defu
