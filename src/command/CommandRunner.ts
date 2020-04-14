import { Class } from 'type-fest'
import { Container, DefaultContainer } from '@rimo/container'
import { storage, SubscriberMetadata, SubscribersMetadata } from '@rimo/metadata'
import { CommandHandler } from './CommandHandler'
import { RunnerCommandHandler } from './RunnerCommandHandler'

export interface CommandRunnerConfig {
  container?: Container
}

/**
 * Runs commands
 */
export class CommandRunner {
  protected container: Container
  protected handlers: Map<Class<CommandHandler>, CommandHandler> = new Map()
  protected subscribers: Map<Class<CommandHandler>, SubscriberMetadata> = new Map()

  constructor({ container = new DefaultContainer() }: CommandRunnerConfig = {}) {
    this.container = container
  }

  /**
   * Executes commands.
   */
  run = async <T extends CommandHandler>(
    Handler: Class<T>,
    event: Parameters<T['handle']>['0']
  ): Promise<ReturnType<T['handle']>> => {
    const handler = await this.container.get(Handler)

    if (handler instanceof RunnerCommandHandler) {
      handler.setRunner(this)
    }

    await this.emit('middleware', Handler, event)
    await this.emit('before', Handler, event)
    const result = await handler.handle(event)
    await this.emit('after', Handler, result)

    return result
  }

  /**
   * Serially executes `@BeforeCommand(Handler)` or `@AfterCommand(Handler)` decorated methods for the given `Handler`.
   */
  emit = async <T extends CommandHandler>(
    type: keyof SubscribersMetadata,
    HandlerClass: Class<T>,
    result: ReturnType<T['handle']>
  ): Promise<void> => {
    if (storage.metadata.subscribers[type].has(HandlerClass)) {
      const subscribers = storage.metadata.subscribers[type].get(
        HandlerClass
      ) as SubscriberMetadata[]
      for (const meta of subscribers) {
        await this.container.get(meta.SubscriberClass)[meta.method](result, this)
      }
    }
  }
}
