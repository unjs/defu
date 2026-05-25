import { isPlainObject } from "./_utils";
import type { DefuOptions, Merger, DefuFn as DefuFunction, DefuInstance } from "./types";

function isDefuOptions(value: unknown): value is DefuOptions {
  if (!isPlainObject(value)) {
    return false;
  }

  const object = value as Record<string, unknown>;
  const keys = Object.keys(object);

  return keys.length > 0 && keys.every((key) => key === "skipNullish");
}

function splitDefuArgs(arguments_: unknown[]) {
  const args = [...arguments_];
  let options: DefuOptions = {};

  const last = args[args.length - 1];
  if (isDefuOptions(last)) {
    options = last;
    args.pop();
  }

  return { args, options };
}

// Base function to apply defaults
function _defu<T>(
  baseObject: T,
  defaults: any,
  namespace = ".",
  merger?: Merger,
  options: DefuOptions = {},
): T {
  const skipNullish = options.skipNullish !== false;

  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger, options);
  }

  const object = { ...defaults };

  for (const key of Object.keys(baseObject as Record<string, any>)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    const value = (baseObject as Record<string, any>)[key];

    if (skipNullish && (value === null || value === undefined)) {
      continue;
    }

    if (!skipNullish && (value === null || value === undefined)) {
      object[key] = value;
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
      object[key] = value;
    }
  }

  return object;
}

// Create defu wrapper with optional merger and multi arg support
export function createDefu(merger?: Merger): DefuFunction {
  return (...arguments_) => {
    const { args, options } = splitDefuArgs(arguments_);

    if (merger && args.length > 1 && isPlainObject(args[0])) {
      const [source, ...defaults] = args;

      return _defu(
        source,
        // eslint-disable-next-line unicorn/no-array-reduce
        defaults.reduce((p, c) => _defu(p, c, "", merger, options), {} as any),
        "",
        merger,
        options,
      ) as any;
    }

    // eslint-disable-next-line unicorn/no-array-reduce
    return args.reduce((p, c) => _defu(p, c, "", merger, options), {} as any);
  };
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
