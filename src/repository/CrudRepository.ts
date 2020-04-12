import { Entity, EntityId } from '@rimo/core'
import { Either } from '@rimo/monad'
import { Repository } from './Repository'

/**
 * Interface for generic CRUD operations on a repository for a specific entity.
 *
 * It is assumed that all operations are asynchronous and could fail, thus
 * returning an {@linkcode Either} monad.
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
  save: <E extends Error, S extends T>(entity: S) => Promise<Either<E, S>>

  /**
   * Saves all given entities.
   *
   * @param entities to save.
   * @return the saved entities.
   */
  saveAll: <E extends Error, S extends T>(entities: S[]) => Promise<Either<E, S[]>>

  /**
   * Retrieves an entity by its ID.
   *
   * @param id of the entity.
   * @return the entity with the given ID or `undefined` if none found.
   */
  findById: <E extends Error>(id: ID) => Promise<Either<E, T | undefined>>

  /**
   * Returns whether an entity with the given ID exists.
   *
   * @param id of the entity.
   * @return `true` if an entity with the given id exists, `false` otherwise.
   */
  existsById: <E extends Error>(id: ID) => Promise<Either<E, boolean>>

  /**
   * Returns all instances of the type.
   *
   * @return all entities
   */
  findAll: <E extends Error>() => Promise<Either<E, T[]>>

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
  findAllById: <E extends Error>(ids: ID[]) => Promise<Either<E, T[]>>

  /**
   * Returns the number of entities.
   *
   * @return the number of entities.
   */
  count: <E extends Error>() => Promise<Either<E, number>>

  /**
   * Deletes the entity with the given id.
   *
   * @param id of entity to delete.
   */
  deleteById: <E extends Error>(id: ID) => Promise<Either<E, void>>

  /**
   * Deletes a given entity.
   *
   * @param entity to delete.
   */
  delete: <E extends Error>(entity: T) => Promise<Either<E, void>>

  /**
   * Deletes the given entities, or all when no arguments are provided.
   *
   * @param entities to delete or `undefined` to delete all.
   */
  deleteAll: <E extends Error>(entities?: T[]) => Promise<Either<E, void>>
}
