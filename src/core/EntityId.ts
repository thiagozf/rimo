import { nanoid } from 'nanoid'
import { Identifier, PrimitiveIdentifier } from './Identifier'

/**
 * An entity's identity representation.
 */
export class EntityId extends Identifier<PrimitiveIdentifier> {
  constructor(id?: PrimitiveIdentifier) {
    super(id ? id : nanoid())
  }
}
