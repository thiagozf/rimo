import { Class } from 'type-fest'
import { CommandHandler } from '@rimo/command'

declare var global: {
  __rimo_metadata_storage?: MetadataStorage
}

export interface SubscriberMetadata {
  HandlerClass: Class
  SubscriberClass: Class
  method: string | symbol
  priority: number
}

export interface SubscribersMetadata {
  middleware: Map<Class<CommandHandler>, SubscriberMetadata[]>
  before: Map<Class<CommandHandler>, SubscriberMetadata[]>
  after: Map<Class<CommandHandler>, SubscriberMetadata[]>
}

interface Metadata {
  subscribers: SubscribersMetadata
}

export class MetadataStorage {
  public metadata: Metadata = {
    subscribers: {
      middleware: new Map(),
      before: new Map(),
      after: new Map(),
    },
  }

  private constructor() {}

  static getInstance(): MetadataStorage {
    if (!global.__rimo_metadata_storage) {
      global.__rimo_metadata_storage = new MetadataStorage()
    }

    return global.__rimo_metadata_storage
  }
}

export const storage: MetadataStorage = MetadataStorage.getInstance()
