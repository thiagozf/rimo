import { AggregateRoot } from './AggregateRoot'
import { EntityId } from './EntityId'
import { DomainEvent } from './DomainEvent'

interface HandlersMap {
  [key: string]: Array<(event: DomainEvent) => void>
}

export class DomainEvents {
  private static handlersMap: HandlersMap = {}
  private static markedAggregates: AggregateRoot<any>[] = []

  /**
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */
  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    // Skip when aggregate was already marked
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(id: EntityId): AggregateRoot<any> | null {
    let found = null
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate
      }
    }

    return found
  }

  public static dispatchEventsForAggregate(id: EntityId): void {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register<T extends DomainEvent>(
    callback: (event: T) => Promise<void>,
    eventClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = []
    }

    // TODO: fix types
    this.handlersMap[eventClassName].push(callback as (event: DomainEvent) => Promise<void>)
  }

  public static clearHandlers(): void {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = []
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName]
      for (let handler of handlers) {
        handler(event)
      }
    }
  }
}
