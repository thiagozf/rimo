import { Either } from '@rimo/monad'

/**
 * Represents a stateless operation that, given an input `I`, is expected to return an output `O`.
 *
 * This interface could represent either an application service or a domain service.
 */
export interface Service<I, O> {
  execute: <E extends Error>(input: I) => Promise<Either<E, O>>
}
