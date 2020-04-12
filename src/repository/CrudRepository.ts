import { Entity, EntityId } from '@rimo/core'
import { Repository } from './Repository'

/**
 * Interface for generic CRUD operations on a repository for a specific entity.
 *
 * @typeParam T the entity type the repository manages
 * @typeParam ID the type of the id of the entity the repository manages
 */
export interface CrudRepository<T extends Entity<any>, ID extends EntityId>
  extends Repository<T, ID> {
  /**
   * Saves a given entity. Use the returned instance for further operations
   * as the save operation might have changed the entity instance.
   *
   * @param entity to save.
   * @return the saved entity.
   */
  save: <S extends T>(entity: S) => Promise<S>

  /**
   * Saves all given entities.
   *
   * @param entities to save.
   * @return the saved entities.
   */
  saveAll: <S extends T>(entities: S[]) => Promise<S[]>

  /**
   * Retrieves an entity by its ID.
   *
   * @param id of the entity.
   * @return the entity with the given ID or `undefined` if none found.
   */
  findById: (id: ID) => Promise<T | undefined>

  /**
   * Returns whether an entity with the given ID exists.
   *
   * @param id of the entity.
   * @return `true` if an entity with the given id exists, `false` otherwise.
   */
  existsById: (id: ID) => Promise<boolean>

  /**
   * Returns all instances of the type.
   *
   * @return all entities
   */
  findAll: () => Promise<T[]>

  /**
   * Returns all instances of the type `T` with the given IDs.
   *
   * If some or all ids are not found, no entities are returned for these IDs.
   *
   * Note that the order of elements in the result is not guaranteed.
   *
   * @param ids of entities to be retuned.
   * @return the entities.
   */
  findAllById: (ids: ID[]) => Promise<T[]>

  /**
   * Returns the number of entities.
   *
   * @return the number of entities.
   */
  count: () => Promise<number>

  /**
   * Deletes the entity with the given id.
   *
   * @param id of entity to delete.
   */
  deleteById: (id: ID) => Promise<void>

  /**
   * Deletes a given entity.
   *
   * @param entity to delete.
   */
  delete: (entity: T) => Promise<void>

  /**
   * Deletes the given entities, or all when no arguments are provided.
   *
   * @param entities to delete or `undefined` to delete all.
   */
  deleteAll: (entities?: T[]) => Promise<void>
}
