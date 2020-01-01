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

  var obj = Object.assign({}, _defaults)
  Object.keys(_obj).forEach(function (key) {
    if (key === '__proto__' || key === 'constructor') {
      return
    }

    var val = _obj[key]

    if (val === null) {
      return
    }

    if (isObject(val) && isObject(obj[key])) {
      obj[key] = defu(val, obj[key])
    } else {
      obj[key] = val
    }
  })
  return obj
}

module.exports = defu
