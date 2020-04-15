import { InMemoryCrudRepository } from '../../src/repository/InMemoryCrudRepository'
import { Entity, EntityId } from 'rimo'
import { PartialDeep } from 'type-fest'

describe('InMemoryCrudRepository test', () => {
  interface PostProps {
    slug: string
  }

  class Post extends Entity<PostProps> {
    updateProps({ slug }: PartialDeep<PostProps>) {
      this.props.slug = slug || this.props.slug
    }

    get slug(): string {
      return this.props.slug
    }
  }

  class PostRepository extends InMemoryCrudRepository<Post, EntityId> {}

  let repository: PostRepository

  beforeEach(() => {
    repository = new PostRepository()
  })

  it('should save and retrieve an entity', async () => {
    const post = new Post({ slug: 'rimo' })

    const savedPost = await repository.save(post)
    expect(savedPost).toBeDefined()
    expect(savedPost.id).toBeDefined()
    expect(savedPost).not.toBe(post)
    expect(savedPost).toStrictEqual(post)

    const found = await repository.findById(post.id)
    expect(found).not.toBe(savedPost)
    expect(found).toStrictEqual(savedPost)
  })

  it('should save all entities', async () => {
    const post = new Post({ slug: 'rimo' })

    const savedPost = await repository.save(post)
    expect(savedPost).toBeDefined()
    expect(savedPost.id).toBeDefined()
    expect(savedPost).not.toBe(post)
    expect(savedPost).toStrictEqual(post)

    const found = await repository.findById(post.id)
    expect(found).not.toBe(savedPost)
    expect(found).toStrictEqual(savedPost)
  })

  it('should update an entity', async () => {
    const post = await repository.save(new Post({ slug: 'rimo' }))
    post.updateProps({ slug: 'rimo_2' })
    const updated = await repository.save(post)
    expect(updated).not.toBe(post)
    expect(updated).toStrictEqual(post)
  })
})
