import { AggregateRoot } from '../src/AggregateRoot'
import { DomainEvent } from '../src/DomainEvent'
import { EntityId } from '../src/EntityId'
import { DomainEventHandler } from '../src/DomainEventHandler'
import { DomainEvents } from '../src/DomainEvents'

class PostFollowed implements DomainEvent {
  public static type: string = 'PostFollowed'

  public timestamp: Date
  public post: Post
  public user: string

  constructor(post: Post, user: string) {
    this.timestamp = new Date()
    this.post = post
    this.user = user
  }

  getAggregateId(): EntityId {
    return this.post.id
  }
}

class PostLiked implements DomainEvent {
  public static type: string = 'PostLiked'

  public timestamp: Date
  public post: Post
  public user: string

  constructor(post: Post, user: string) {
    this.timestamp = new Date()
    this.post = post
    this.user = user
  }

  getAggregateId(): EntityId {
    return this.post.id
  }
}

class Post extends AggregateRoot<{}> {
  public like(user: string) {
    this.addDomainEvent(new PostLiked(this, user))
  }

  public follow(user: string) {
    this.addDomainEvent(new PostFollowed(this, user))
  }
}

class PostLikesNotificationHandler implements DomainEventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions = () => {
    DomainEvents.register(this.onEvent, PostLiked.type)
  }

  onEvent = async () => {
    // Notify author via e-mail!
  }
}

class PostLikesAggregatorHandler implements DomainEventHandler {
  constructor(private stats: PostStats) {
    this.setupSubscriptions()
  }

  setupSubscriptions = () => {
    DomainEvents.register(this.onEvent, PostLiked.type)
  }

  onEvent = async (event: PostLiked) => {
    this.stats.addLikeToPost(event.post)
  }
}

interface PostsLikes {
  [key: string]: number
}

class PostStats {
  private likes: PostsLikes = {}

  private getIndex = (post: Post) => {
    return post.id.toValue()
  }

  public addLikeToPost = (post: Post) => {
    const idx = this.getIndex(post)
    const likes = this.getLikesOf(post)
    this.likes[idx] = likes + 1
  }

  public getLikesOf = (post: Post) => {
    const idx = this.getIndex(post)
    return this.likes[idx] || 0
  }
}

/**
 * AggregateRoot test
 */
describe('Entity test', () => {
  it('should create an aggregate', () => {
    const post = new Post({})
    expect(post.id).toBeDefined()
    expect(post.domainEvents).toHaveLength(0)
  })

  it('should be able to create domain events', () => {
    const stats = new PostStats()
    new PostLikesAggregatorHandler(stats)
    new PostLikesNotificationHandler()

    const post = new Post({})
    post.like('thiagozf')
    post.follow('thiagozf')
    post.like('rimo')

    const otherPost = new Post({})
    otherPost.like('dunha')

    expect(post.domainEvents).toHaveLength(3)
    expect(stats.getLikesOf(post)).toBe(0)

    DomainEvents.dispatchEventsForAggregate(post.id)
    DomainEvents.dispatchEventsForAggregate(otherPost.id)
    DomainEvents.dispatchEventsForAggregate(new EntityId('random'))

    expect(stats.getLikesOf(post)).toBe(2)

    DomainEvents.clearHandlers()
    DomainEvents.clearMarkedAggregates()
  })
})
