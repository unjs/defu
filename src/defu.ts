import { isPlainObject } from "./_utils";
import type { Merger, DefuFn as DefuFunction, DefuInstance } from "./types";

// Base function to apply defaults
function _defu<T>(baseObject: T, defaults: any, namespace = ".", merger?: Merger, allowNullish = false): T {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger, allowNullish);
  }

  const object = { ...defaults };

  for (const key of Object.keys(baseObject as Record<string, any>)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    const value = (baseObject as Record<string, any>)[key];

    if (!allowNullish && (value === null || value === undefined)) {
      continue;
    }

    if (merger && merger(object, key, value, namespace)) {
      continue;
    }

    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger,
        allowNullish,
      );
    } else {
      object[key] = value;
    }
  }

  return object;
}

// Create defu wrapper with optional merger and multi arg support. Pass
// `{ allowNullish: true }` to also copy explicit `null`/`undefined` values from
// the base object (bringing back nullish-override support via option). See #95.
export function createDefu(
  merger?: Merger,
  options: { allowNullish?: boolean } = {},
): DefuFunction {
  const allowNullish = !!options.allowNullish;
  return (...arguments_) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce(
      (p, c) => _defu(p, c, "", merger, allowNullish),
      {} as any,
    );
}

// Standard version
export const defu = createDefu() as DefuInstance;
export default defu;

// Custom version with function merge support
export const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== undefined && typeof currentValue === "function") {
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

export type { Defu, DefuFn, DefuInstance } from "./types";
