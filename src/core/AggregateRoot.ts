import { Entity } from './Entity'

/**
 * An aggregate root's representation.
 *
 * Aggregate roots are clusters of domain objects ({@linkcode Entity} or {@linkcode ValueObject})
 * that can be treated as single units.
 *
 * Example:
 * ```typescript
 * class Post extends Entity<{ title: string; content: string, comments: Array<Comment> }> {
 *   get title() {
 *     return this.props.title
 *   }
 *
 *   get content() {
 *     return this.props.content
 *   }
 *
 *   get comments() {
 *     return cloneDeep(this.props.comments)
 *   }
 * }
 *
 * const post = new Post({ title: 'Hello Rimo!', content: 'You are amazing :)', comments: [] })
 * // post.id -> generated
 * // post.title -> 'Hello Rimo!'
 * // post.content -> 'You are amazing :)'
 * // post.comments -> []
 * ```
 *
 * @typeParam T  The properties of this aggregate root.
 */
export abstract class AggregateRoot<T> extends Entity<T> {}
