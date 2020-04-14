import { AggregateRoot } from '@rimo/core'

class Post extends AggregateRoot<{}> {}

/**
 * AggregateRoot test
 */
describe('AggregateRoot test', () => {
  it('should create an aggregate', () => {
    const post = new Post({})
    expect(post.id).toBeDefined()
  })
})
