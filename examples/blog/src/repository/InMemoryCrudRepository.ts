import { injectable } from 'inversify'
import { Entity, EntityId, CrudRepository, PrimitiveIdentifier } from 'rimo'
import { cloneDeep } from 'lodash'
import { InMemoryRepository } from './InMemoryRepository'

@injectable()
export abstract class InMemoryCrudRepository<T extends Entity<any>, ID extends EntityId>
  implements InMemoryRepository<T, ID>, CrudRepository<T, ID> {
  readonly data: Map<PrimitiveIdentifier, T> = new Map()

  private get = (id: ID): T | undefined => {
    const record = this.data.get(id.toValue())
    return record && cloneDeep(record)
  }

  private set = <S extends T>(entity: S) => {
    this.data.set(entity.id.toValue(), cloneDeep(entity))
    return cloneDeep(entity)
  }

  save = async <S extends T>(entity: S) => {
    return this.set(entity)
  }

  saveAll = async <S extends T>(entities: S[]) => Promise.all(entities.map(this.save))

  findById = async (id: ID) => this.get(id)

  existsById = async (id: ID) => this.findById(id) !== undefined

  findAll = async () => Array.from(this.data.values()).map(cloneDeep)

  findAllById = async (ids: ID[]) => {
    const records = await Promise.all(ids.map(this.findById))
    return records.filter((r: T | undefined): r is T => r !== undefined)
  }

  count = async () => this.data.size

  deleteById = async (id: EntityId) => {
    this.data.delete(id.toValue())
  }

  delete = ({ id }: T) => this.deleteById(id)

  deleteAll = async (entities?: T[]) => {
    await Promise.all(entities !== undefined ? entities.map(this.delete) : [this.data.clear()])
  }
}
