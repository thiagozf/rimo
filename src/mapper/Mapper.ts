import { Either } from '@rimo/monad'

/**
 * An interface for mappers functions that converts a source type `S` to target type `T`.
 *
 * @typeParam S the source type
 * @typeParam T the target type
 */
export type Mapper<S, T> = <E extends Error>(source: S) => Either<E, T>
