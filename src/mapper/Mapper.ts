/**
 * An interface for mappers functions that converts a source type `S` to target type `T`.
 *
 * @typeParam S the source type
 * @typeParam T the target type
 */
export type Mapper<S, T> = (source: S) => T
