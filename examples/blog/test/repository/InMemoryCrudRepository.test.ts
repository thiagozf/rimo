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

  it('should save an entity', async () => {
    const post = new Post({ slug: 'rimo' })

    expect(await repository.count()).toBe(0)
    const savedPost = await repository.save(post)
    expect(savedPost).toBeDefined()
    expect(savedPost.id).toBeDefined()
    expect(savedPost).not.toBe(post)
    expect(savedPost).toStrictEqual(post)
  })

  it('should find an entity', async () => {
    const post = await repository.save(new Post({}))
    const found = await repository.findById(post.id)
    expect(found).not.toBe(post)
    expect(found).toStrictEqual(post)
    expect(await repository.count()).toBe(1)
  })

  it('should save all entities', async () => {
    const post1 = new Post({})
    const post2 = new Post({})
    await repository.saveAll([post1, post2])
    expect(await repository.findAllById([post1.id, post2.id])).toHaveLength(2)
  })

  it('should update an entity', async () => {
    const post = await repository.save(new Post({ slug: 'rimo' }))
    post.updateProps({ slug: 'rimo_2' })
    const updated = await repository.save(post)
    expect(updated).not.toBe(post)
    expect(updated).toStrictEqual(post)
  })

  it('should delete an entity', async () => {
    const post = await repository.save(new Post({ slug: 'rimo' }))
    expect(await repository.findById(post.id)).toStrictEqual(post)
    await repository.delete(post)
    expect(await repository.findById(post.id)).not.toBeDefined()
  })

  it('should delete all entities', async () => {
    await repository.save(new Post({}))
    await repository.save(new Post({}))
    expect(await repository.count()).toBe(2)
    await repository.deleteAll()
    expect(await repository.count()).toBe(0)
  })

  it('should delete all entities', async () => {
    const post1 = await repository.save(new Post({}))
    const post2 = await repository.save(new Post({}))
    expect(await repository.count()).toBe(2)
    await repository.deleteAll([post1, post2])
    expect(await repository.count()).toBe(0)
  })
})
