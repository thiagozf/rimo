import { cloneDeep, isEqual } from 'lodash'
import { Object } from './Object'

/**
 * A value object's properties representation: a simple object.
 */
interface ValueObjectProps {
  [key: string]: any
}

/**
 * A value object's representation.
 *
 * Value objects are objects that matter only as the combination of their attributes.
 * Two value objects with the same values for all their attributes are considered equal.
 *
 * Example:
 *
 * ```typescript
 * class Address extends ValueObject<{ street: string; streetNumber: string }> {
 * }
 *
 * const address = new Address({ street: 'Street A' })
 * ```
 *
 * @typeParam T  The properties of this value object
 */
export abstract class ValueObject<T extends ValueObjectProps> implements Object {
  public props: T

  constructor(props: T) {
    this.props = cloneDeep(props)
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }

    return isEqual(this.props, vo.props)
  }
}
