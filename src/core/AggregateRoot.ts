import { Entity } from './Entity'
import { DomainEvent } from './DomainEvent'
import { DomainEvents } from './DomainEvents'
import { EntityId } from './EntityId'

/**
 * An aggregate root's representation.
 *
 * Aggregate roots are clusters of domain objects ({@linkcode Entity} or {@linkcode ValueObject})
 * that can be treated as single units.
 *
 * Example:
 * ```typescript
 * class Post extends Entity<{ title: string; content: string, comments: Array<Comment> }> {
 * }
 *
 * const post = new Post({ title: 'Hello Rimo!', content: 'You are amazing :)', comments: [] })
 * // post.id -> generated
 * // post.title -> 'Hello Rimo!'
 * // post.content -> 'You are amazing :)'
 * // post.comments -> []
 * ```
 *
 * Rimo offers native support to domain events ({@linkcode DomainEvent}).
 * Domain events are useful to decouple bounded contexts logic and side effects from the
 * main application logic.
 *
 * Example:
 * ```typescript
 *
 * class PostLiked implements DomainEvent {
 *   public static type: string = 'PostLiked'
 *
 *   public timestamp: Date
 *   public post: Post
 *   public user: string
 *
 *   constructor(post: Post, user: string) {
 *     this.timestamp = new Date()
 *     this.post = post
 *     this.user = user
 *   }
 *
 *   getAggregateId(): EntityId {
 *     return this.post.id
 *   }
 * }
 *
 * class Post extends Entity<{ title: string; author: string }> {
 *   public like(user: string) {
 *     this.addDomainEvent(new PostLiked(this, user))
 *   }
 * }
 *
 * class PostLikedNotificationHandler implements DomainEventHandler {
 *   constructor() {
 *     this.setupSubscriptions()
 *   }
 *
 *   setupSubscriptions = () => {
 *     DomainEvents.register(this.onEvent, PostLiked.type)
 *   }
 *
 *   onEvent = async ({ post, user }: PostLiked) => {
 *     const { author, title } = post
 *     emailService.send(author, `Hey! User ${user} liked your post ${title}.`)
 *   }
 * }
 * ```
 *
 * @typeParam T  The properties of this aggregate root.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = []

  get id(): EntityId {
    return this._id
  }

  /**
   * Get the domain events of this aggregate.
   * @returns the domain events
   */
  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  /**
   * Add the event to this aggregate's list of domain events
   * and mark this aggregate instance to dispatch.
   *
   * @param domainEvent the event
   */
  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  /**
   * Clear the domain events after a dispatch.
   */
  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length)
  }
}
