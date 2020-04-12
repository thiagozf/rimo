import { Entity, EntityId } from '@rimo/core'

/**
 * A repository interface. Captures the entity type to manage and its ID type.
 *
 * This interface's purpose is to hold type information, as well as being able
 * to discover interfaces that extend this one.
 *
 * Domain repositories extending this interface can selectively expose CRUD methods by simply declaring methods of the
 * same signature as those declared in {@link CrudRepository}.
 *
 * @typeParam T the entity type the repository manages
 * @typeParam ID the type of the id of the entity the repository manages
 */
export interface Repository<T extends Entity<any>, ID extends EntityId> {}
