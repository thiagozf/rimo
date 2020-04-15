import { Repository, Entity, EntityId } from 'rimo'

export interface InMemoryRepository<T extends Entity<any>, ID extends EntityId>
  extends Repository<T, ID> {}
