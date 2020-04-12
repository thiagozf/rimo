import { EntityId } from '../src/EntityId'

/**
 * EntityId test
 */
describe('EntityId test', () => {
  class PostId extends EntityId {}

  it('should create an entity id', () => {
    const id = new PostId('id')
    expect(id.toValue()).toBe('id')
  })

  it('should assign an ID when not defined', () => {
    const id = new PostId()
    expect(id.toValue()).toBeDefined()
  })
})
