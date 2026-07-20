import { isPlainObject } from "./_utils";
import type { Merger, DefuFn as DefuFunction, DefuInstance } from "./types";

// Base function to apply defaults
function _defu<T>(baseObject: T, defaults: any, namespace = ".", merger?: Merger, warnDuplicates = false): T {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger, warnDuplicates);
  }

  const object = { ...defaults };

  for (const key of Object.keys(baseObject as Record<string, any>)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    const value = (baseObject as Record<string, any>)[key];

    if (value === null || value === undefined) {
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
        warnDuplicates,
      );
    } else {
      if (warnDuplicates && key in defaults) {
        // eslint-disable-next-line no-console
        console.warn(
          `[defu] Redundant property "${(namespace ? `${namespace}.` : "") + key}" is already specified with a default value.`,
        );
      }
      object[key] = value;
    }
  }

  return object;
}

// Create defu wrapper with optional merger and multi arg support. Pass
// `{ warnDuplicates: true }` to log a warning when a base-property value
// overrides a property that already exists in the defaults (redundant
// duplication). See issue #128.
export function createDefu(
  merger?: Merger,
  options: { warnDuplicates?: boolean } = {},
): DefuFunction {
  const warnDuplicates = !!options.warnDuplicates;
  return (...arguments_) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger, warnDuplicates), {} as any);
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
