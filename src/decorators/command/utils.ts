import { Class } from 'type-fest'
import { CommandHandler } from '@rimo/command'
import { SubscribersMetadata, SubscriberMetadata, storage } from '@rimo/metadata'

export interface OnOptions {
  priority?: number
}

const sortByPriority = (arr: { priority: number }[]): void => {
  arr.sort((a, b) => (a.priority < b.priority ? 1 : -1))
}

export const addSubscriber = (
  kind: keyof SubscribersMetadata,
  HandlerClass: Class<CommandHandler>,
  options: OnOptions = {},
  SubscriberClass: any,
  propertyKey: string | symbol
) => {
  let subscribers: SubscriberMetadata[]

  // istanbul ignore next
  if (storage.metadata.subscribers[kind].has(HandlerClass)) {
    subscribers = storage.metadata.subscribers[kind].get(HandlerClass) as SubscriberMetadata[]
  } else {
    subscribers = []
    storage.metadata.subscribers[kind].set(HandlerClass, subscribers)
  }

  subscribers.push({
    HandlerClass,
    SubscriberClass,
    method: propertyKey as string,
    priority: options.priority || 0,
  })

  sortByPriority(subscribers)
}
