import { Object } from './Object'
import { EntityId } from './EntityId'
import { cloneDeep } from 'lodash'

const isEntity = (v: unknown): v is Entity<any> => {
  return v instanceof Entity
}

/**
 * An entity's representation.
 *
 * Entities are objects that have a distinct identity
 * that runs through time and different representations.
 *
 * Example:
 *
 * ```typescript
 * class Post extends Entity<{ title: string; content: string }> {
 *   get title() {
 *     return this.props.title
 *   }
 *
 *   get content() {
 *     return this.props.content
 *   }
 * }
 *
 * const post = new Post({ title: 'Hello Rimo!', content: 'You are amazing :)' })
 * // post.id -> generated
 * // post.title -> 'Hello Rimo!'
 * // post.content -> 'You are amazing :)'
 * ```
 *
 * @typeParam T  The properties of this entity
 */
export abstract class Entity<T> implements Object {
  protected readonly _id: EntityId
  public readonly props: T

  constructor(props: T, id: EntityId = new EntityId()) {
    this._id = id
    this.props = cloneDeep(props)
  }

  get id(): EntityId {
    return this._id
  }

  public equals(object?: Entity<T>): boolean {
    if (object === undefined) {
      return false
    }

    if (!isEntity(object)) {
      return false
    }

    if (!(object instanceof this.constructor)) {
      return false
    }

    if (this === object) {
      return true
    }

    return this._id.equals(object._id)
  }
}
