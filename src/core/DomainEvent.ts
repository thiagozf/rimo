import { EntityId } from './EntityId'

/**
 * A domain event's representation.
 *
 * A domain event captures the memory of something interesting,
 * which affects the domain somehow.
 */
export interface DomainEvent {
  timestamp: Date
  getAggregateId(): EntityId
}
