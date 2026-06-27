// Forked from sindresorhus/is-plain-obj (MIT)
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
export function isPlainObject(value: unknown): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);

  if (
    prototype !== null &&
    prototype !== Object.prototype &&
    Object.getPrototypeOf(prototype) !== null
  ) {
    return false;
  }

  if (Symbol.iterator in value) {
    return false;
  }

  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }

  return true;
}

// Own enumerable keys, including symbol keys. Mirrors the keys copied by an
// object spread (`{ ...object }`), unlike `Object.keys` which omits symbols.
export function getOwnEnumerableKeys(object: Record<string | symbol, any>): Array<string | symbol> {
  const keys: Array<string | symbol> = Object.keys(object);
  for (const symbol of Object.getOwnPropertySymbols(object)) {
    if (Object.prototype.propertyIsEnumerable.call(object, symbol)) {
      keys.push(symbol);
    }
  }
  return keys;
}
