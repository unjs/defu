import type { Merger, DefuFn as DefuFunction, DefuInstance } from "./types";

function isObject(value: any) {
  return value !== null && typeof value === "object";
}

// Base function to apply defaults
function _defu<T>(
  baseObject: T,
  defaults: any,
  namespace = ".",
  merger?: Merger,
  clone?: boolean
): T {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger, clone);
  }

  const object = Object.assign({}, defaults);

  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    let value = baseObject[key];

    if (value === null || value === undefined) {
      continue;
    }

    if (merger && merger(object, key, value, namespace)) {
      continue;
    }

    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger,
        clone
      );
    } else {
      if (clone) {
        // eslint-disable-next-line no-var
        var structuredClone: (x: any) => any;
        value = structuredClone
          ? structuredClone(value)
          : JSON.parse(JSON.stringify(value));
      }
      object[key] = value;
    }
  }

  return object;
}

// Create defu wrapper with optional merger and multi arg support
export function createDefu(
  merger?: Merger,
  options?: { clone?: boolean }
): DefuFunction {
  const clone = options?.clone || false;
  return (...arguments_) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger, clone), {} as any);
}

// Standard version
export const defu = createDefu() as DefuInstance;
export default defu;

// Custom version with function merge support
export const defuFn = createDefu((object, key, currentValue) => {
  if (
    typeof object[key] !== "undefined" &&
    typeof currentValue === "function"
  ) {
    object[key] = currentValue(object[key]);
    return true;
  }
});

// Custom version with function merge support only for defined arrays
export const defuArrayFn = createDefu((object, key, currentValue) => {
  if (Array.isArray(object[key]) && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

export type { Defu } from "./types";
