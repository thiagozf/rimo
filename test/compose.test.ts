import { compose } from '../src/compose'

/**
 * Compose test
 */
describe('compose test', () => {
  it('should compose objects', () => {
    const hello = { hello: 'hello' }
    const world = { world: 'world' }

    expect(compose(hello, world)).toStrictEqual({
      hello: 'hello',
      world: 'world',
    })
  })
})
