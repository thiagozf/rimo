export interface Left<L> {
  readonly _either: 'Left'
  readonly left: L
}

export interface Right<R> {
  readonly _either: 'Right'
  readonly right: R
}

/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of {@linkcode Either} is either an instance of {@linkcode Left} or {@linkcode Right}.
 *
 * A common use of {@linkcode Either} is as an alternative to `Optional` for dealing with possible missing values. In this usage,
 * `Optional.empty` is replaced with a {@linkcode Left}, which can contain useful information. {@linkcode Right} takes the place of `Optional.map`.
 * Convention dictates that {@linkcode Left} is used for failure and {@linkcode Right} is used for success.
 *
 * For example, `Either<Error, number>` could be used to detect whether a received input has the expected `number` type.
 * If it doesn't, an `Error` is returned.
 *
 * ```typescript
 * import { Either, left, right } from 'rimo'
 *
 * const parse = (input: string): Either<Error, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(new Error('not a number')) : right(n)
 * }
 * ```
 */
export type Either<L, R> = Left<L> | Right<R>

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure.
 */
export const left = <L = never, R = never>(left: L): Either<L, R> => {
  return { _either: 'Left', left }
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value.
 */
export const right = <L = never, R = never>(right: R): Either<L, R> => {
  return { _either: 'Right', right }
}

export const isLeft = <L, R>(ma: Either<L, R>): ma is Left<L> => {
  return ma._either === 'Left'
}

export const isRight = <L, R>(ma: Either<L, R>): ma is Right<R> => {
  return ma._either === 'Right'
}
