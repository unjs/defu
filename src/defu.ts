import { isPlainObject } from "./_utils";
import type { Merger, DefuFn as DefuFunction, DefuInstance } from "./types";

// Base function to apply defaults
function _defu<T>(
  baseObject: T,
  defaults: any,
  namespace = ".",
  merger?: Merger,
): T {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }

  const object = Object.assign({}, defaults);

  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    const value = baseObject[key];

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
      );
    } else {
      object[key] = value;
    }
  }

  return object;
}

/**
 * Creates a new `defu` function that can optionally use a custom merger.
 * 
 * @param {Merger} [merger] - An optional merger function to handle the merge logic. See {@link Merger}.
 * @return {DefuFunction} - A `defu` function capable of merging multiple objects with support for custom merging.
 * See {@link DefuFunction}.
 * @example
 * const ext = createDefu((obj, key, value) => {
 *   if (typeof obj[key] === "number" && typeof value === "number") {
 *     obj[key] += value;
 *     return true;
 *   }
 * });
 * ext({ cost: 15 }, { cost: 10 }); // { cost: 25 }
 */
export function createDefu(merger?: Merger): DefuFunction {
  return (...arguments_) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {} as any);
}

/**
 * The standard `defu` function created without a custom function. See {@link createDefu}.
 */
export const defu = createDefu() as DefuInstance;
export default defu;

/**
 * Custom `defu` function that specifically merges functions by taking the current value as a function
 * with the previous value as an argument. See {@link createDefu}.
 * @example
 * defuFn(
 *    { 
 *      ignore: (val) => val.filter((item) => item !== "dist"),
 *      count: (count) => count + 20
 *    },
 *    { ignore: ["node_modules", "dist"], count: 10 },
 * ); // { ignore: ["node_modules"], count: 30 }
 */
export const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== undefined && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

/**
 * A custom `defu` function that applies a function merger only to array properties.
 * See {@link createDefu}.
 * @example
 * defuArrayFn(
 *    {
 *      ignore: (val) => val.filter(i => i !== 'dist'),
 *      count: () => 20
 *    },
 *    { ignore: ['node_modules', 'dist'], count: 10 }
 * ); // { ignore: ['node_modules'], count: 20 }
 */
export const defuArrayFn = createDefu((object, key, currentValue) => {
  if (Array.isArray(object[key]) && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

export type { Defu } from "./types";
