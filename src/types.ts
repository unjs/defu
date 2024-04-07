/**
 * Represents a generic input object that can have string, number or symbol keys and values of any type.
 */
export type Input = Record<string | number | symbol, any>;
/**
 * Represents types of input that should be ignored during merge operations.
 * This includes primitive types, arrays, empty objects and undefined.
 */
export type IgnoredInput =
  | boolean
  | number
  | null
  | any[]
  | Record<never, any>
  | undefined;

/**
 * Defines a function type for custom merge strategies in defu functions.
 * @returns {any} - The result of the custom merge operation, if any.
 * @template T - The type of the target object.
 * @template K - The type of keys in the target object.
 */
export type Merger = <T extends Input, K extends keyof T>(
  /**
   * The target object to merge into.
   */
  object: T,

  /**
   * The current key in the object being processed.
   */
  key: keyof T,

  /**
   * The value corresponding to the key in the source object.
   */
  value: T[K],

  /**
   * A string representing the namespace path to the key.
   */
  namespace: string,
) => any;

type nullish = null | undefined | void;

/**
 * Merges two input objects with rules for handling conflicts and special types such as arrays and null values.
 * @template Target - The type of target object.
 * @template Defaults - The type of the default object.
 */
export type MergeObjects<
  Destination extends Input,
  Defaults extends Input,
> = Destination extends Defaults
  ? Destination
  : Omit<Destination, keyof Destination & keyof Defaults> &
      Omit<Defaults, keyof Destination & keyof Defaults> & {
        -readonly [Key in keyof Destination &
          keyof Defaults]: Destination[Key] extends nullish
          ? Defaults[Key] extends nullish
            ? nullish
            : Defaults[Key]
          : Defaults[Key] extends nullish
            ? Destination[Key]
            : Merge<Destination[Key], Defaults[Key]>; // eslint-disable-line no-use-before-define
      };

/**
 * Recursively merges a source object with an array of default objects or ignored input.
 * @template S - The type of the source object.
 * @template D - The type of array containing default or ignored input objects.
 */
export type Defu<
  S extends Input,
  D extends Array<Input | IgnoredInput>,
> = D extends [infer F, ...infer Rest]
  ? F extends Input
    ? Rest extends Array<Input | IgnoredInput>
      ? Defu<MergeObjects<S, F>, Rest>
      : MergeObjects<S, F>
    : F extends IgnoredInput
      ? Rest extends Array<Input | IgnoredInput>
        ? Defu<S, Rest>
        : S
      : S
  : S;

/**
 * Defines a function type that merges a source object with a set of default or ignored inputs.
 * @template Source - The type of the source object.
 * @template Defaults - The type of array containing the default or ignored inputs.
 */
export type DefuFn = <
  Source extends Input,
  Defaults extends Array<Input | IgnoredInput>,
>(
  source: Source,
  ...defaults: Defaults
) => Defu<Source, Defaults>;

/**
 * Represents an instance of a defu function, including utility methods such as `fn' and `arrayFn'.
 */
export interface DefuInstance {
  <Source extends Input, Defaults extends Array<Input | IgnoredInput>>(
    source: Source | IgnoredInput,
    ...defaults: Defaults
  ): Defu<Source, Defaults>;
  fn: DefuFn;
  arrayFn: DefuFn;
  extend(merger?: Merger): DefuFn;
}

/**
 * Merges two arrays into one, combining the types of elements in both arrays.
 * @template Target - The type of the target array.
 * @template source - The type of the source array.
 */
export type MergeArrays<Destination, Source> = Destination extends Array<
  infer DestinationType
>
  ? Source extends Array<infer SourceType>
    ? Array<DestinationType | SourceType>
    : Source | Array<DestinationType>
  : Source | Destination;

/**
 * Defines rules for merging two objects, handling special cases such as arrays, functions and null values.
 * @template Target - The type of target object.
 * @template Defaults - The type of the default object.
 */
export type Merge<Destination extends Input, Defaults extends Input> =
  // Remove explicitly null types
  Destination extends nullish
    ? Defaults extends nullish
      ? nullish
      : Defaults
    : Defaults extends nullish
      ? Destination
      : // Handle arrays
        Destination extends Array<any>
        ? Defaults extends Array<any>
          ? MergeArrays<Destination, Defaults>
          : Destination | Defaults
        : // Don't attempt to merge Functions, RegExps, Promises
          // eslint-disable-next-line @typescript-eslint/ban-types
          Destination extends Function
          ? Destination | Defaults
          : Destination extends RegExp
            ? Destination | Defaults
            : Destination extends Promise<any>
              ? Destination | Defaults
              : // Don't attempt to merge Functions, RegExps, Promises
                // eslint-disable-next-line @typescript-eslint/ban-types
                Defaults extends Function
                ? Destination | Defaults
                : Defaults extends RegExp
                  ? Destination | Defaults
                  : Defaults extends Promise<any>
                    ? Destination | Defaults
                    : // Ensure we only merge Records
                      Destination extends Input
                      ? Defaults extends Input
                        ? MergeObjects<Destination, Defaults>
                        : Destination | Defaults
                      : Destination | Defaults;
