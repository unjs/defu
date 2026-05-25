import { isPlainObject } from "./_utils";
import type { DefuOptions, Merger, DefuFn as DefuFunction, DefuInstance } from "./types";

function resolveCreateDefuArgs(mergerOrOptions?: Merger | DefuOptions) {
  if (typeof mergerOrOptions === "function") {
    return { merger: mergerOrOptions, options: {} as DefuOptions };
  }

  return { merger: undefined, options: mergerOrOptions ?? {} };
}

function notifyDuplicate(
  options: DefuOptions,
  key: string,
  value: unknown,
  defaults: Record<string, unknown>,
  object: Record<string, unknown>,
) {
  if (options.onDuplicate && Object.hasOwn(defaults, key) && Object.is(object[key], value)) {
    options.onDuplicate(object, key, value);
  }
}

// Base function to apply defaults
function _defu<T>(
  baseObject: T,
  defaults: any,
  namespace = ".",
  merger?: Merger,
  options: DefuOptions = {},
): T {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger, options);
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
        options,
      );
    } else {
      notifyDuplicate(options, key, value, defaults, object);
      object[key] = value;
    }
  }

  return object;
}

// Create defu wrapper with optional merger and multi arg support
export function createDefu(mergerOrOptions?: Merger | DefuOptions): DefuFunction {
  const { merger, options } = resolveCreateDefuArgs(mergerOrOptions);

  return (...arguments_) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger, options), {} as any) as any;
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

export type { Defu, DefuFn, DefuInstance, DefuOptions } from "./types";
