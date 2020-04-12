import { ValueObject } from '../src/ValueObject'

/**
 * ValueObject test
 */
describe('ValueObject test', () => {
  class TestValueObject extends ValueObject<{ value: string }> {
    get value(): string {
      return this.props.value
    }
  }

  it('should create a value object with given props', () => {
    const vo = new TestValueObject({ value: 'hello world' })
    expect(vo.value).toBe('hello world')
  })

  it('should be equal when all attributes have the same value', () => {
    const vo = new TestValueObject({ value: 'value' })
    expect(vo.equals(new TestValueObject({ value: 'value' }))).toBeTruthy()
    expect(vo.equals(new TestValueObject({ value: 'other' }))).toBeFalsy()
    expect(vo.equals()).toBeFalsy()
  })
})
