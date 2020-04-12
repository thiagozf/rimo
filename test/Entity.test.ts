import { Entity } from '../src/Entity'
import { EntityId } from '../src/EntityId'

/**
 * Entity test
 */
describe('Entity test', () => {
  class Post extends Entity<{
    title: string
  }> {
    get title(): string {
      return this.props.title
    }
  }

  it('should create an entity', () => {
    const post = new Post({ title: 'Meet Rimo' })
    expect(post.title).toBe('Meet Rimo')
  })

  it('should be equal when ID is the same', () => {
    const id = new EntityId('id')
    const post = new Post({ title: 'Meet Rimo' }, id)
    expect(post.equals(new Post({ title: 'Why Rimo rocks' }, id))).toBeTruthy()
    expect(post.equals(post)).toBeTruthy()
    expect(post.equals(new (class Blog extends Entity<{}> {})({}) as Post)).toBeFalsy()
    expect(post.equals((undefined as unknown) as Post)).toBeFalsy()
    expect(post.equals({} as Post)).toBeFalsy()
  })
})
