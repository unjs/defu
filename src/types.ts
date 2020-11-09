export type Merger = <T extends Input, K extends keyof T>(
  obj: T,
  key: keyof T,
  value: T[K],
  namespace: string
) => any;

export type DefuFn = <Source extends Input, Defaults extends Input>(
  source: Source,
  ...defaults: Defaults[]
) => MergeObjects<Source, Defaults>;

export interface Defu {
  <Source extends Input, Defaults extends Input>(source: Source, ...defaults: Defaults[]): MergeObjects<
    Source,
    Defaults
  >;
  fn: DefuFn;
  arrayFn: DefuFn;
  extend(merger?: Merger): DefuFn;
}

type Input = Record<string | number | symbol, any>

type MergeArrays<Destination, Source> = Destination extends Array<infer DestinationType>
  ? Source extends Array<infer SourceType>
    ? Array<DestinationType | SourceType>
    : Source | Array<DestinationType>
  : Source | Destination

type MergeObjects<
  Destination extends Input,
  Defaults extends Input
> = Destination extends Defaults ? Destination : Omit<Destination, keyof Destination & keyof Defaults> & Omit<Defaults, keyof Destination & keyof Defaults> &
  {
    -readonly [Key in keyof Destination & keyof Defaults]:
      Destination[Key] extends null
        ? Defaults[Key] extends null
          ? null
          : Defaults[Key]
        : Defaults[Key] extends null
          ? Destination[Key]
          : Merge<Destination[Key], Defaults[Key]>
  }

export type Merge<
  Destination extends Input,
  Defaults extends Input
> =
  // Remove explicitly null types
  Destination extends null
  ? Defaults extends null
    ? null
    : Defaults
  : Defaults extends null
    ? Destination
    // Handle arrays
    : Destination extends Array<any>
      ? Defaults extends Array<any>
        ? MergeArrays<Destination, Defaults>
        : Destination | Defaults
      // Don't attempt to merge Functions, RegExps, Promises
      : Destination extends Function
        ? Destination | Defaults
        : Destination extends RegExp
          ? Destination | Defaults
          : Destination extends Promise<any>
            ? Destination | Defaults
            // Don't attempt to merge Functions, RegExps, Promises
            : Defaults extends Function
              ? Destination | Defaults
              : Defaults extends RegExp
                ? Destination | Defaults
                : Defaults extends Promise<any>
                  ? Destination | Defaults
                  // Ensure we only merge Records
                  : Destination extends Input
                    ? Defaults extends Input
                      ? MergeObjects<Destination, Defaults>
                      : Destination | Defaults
                    : Destination | Defaults
