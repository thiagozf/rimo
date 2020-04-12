import { Identifier } from '@rimo/core'

/**
 * Identifier test
 */
describe('Identifier test', () => {
  class StringIdentifier extends Identifier<string> {}

  it('should create an identifier', () => {
    const id = new StringIdentifier('id')
    expect(id.toValue()).toBe('id')
  })

  it('should be equal when the value is the same value', () => {
    const id = new StringIdentifier('id')
    expect(id.equals(new StringIdentifier('id'))).toBeTruthy()
    expect(id.equals(new Identifier('id'))).toBeFalsy()
    expect(id.equals(undefined)).toBeFalsy()
    // expect(vo.equals()).toBeFalsy()
  })
})
