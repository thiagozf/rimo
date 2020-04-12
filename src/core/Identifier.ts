import { Object } from './Object'

export type PrimitiveIdentifier = string | number

export class Identifier<T extends PrimitiveIdentifier> implements Object {
  constructor(private value: T) {
    this.value = value
  }

  equals(id?: Identifier<T>): boolean {
    if (id === undefined) {
      return false
    }

    if (!(id instanceof this.constructor)) {
      return false
    }

    return id.toValue() === this.value
  }

  toValue(): T {
    return this.value
  }
}
