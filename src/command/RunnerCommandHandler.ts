import { CommandHandler } from './CommandHandler'
import { CommandRunner } from './CommandRunner'

export abstract class RunnerCommandHandler<I = any, O = any> implements CommandHandler<I, O> {
  abstract async handle(event: I): Promise<O>

  public runner!: CommandRunner

  // async run<T extends CommandHandler>(
  //   Handler: Class<T>,
  //   event: Parameters<T['handle']>['0']
  // ): Promise<ReturnType<T['handle']>> {
  //   return this.runner.run(Handler, event)
  // }

  public setRunner(runner: CommandRunner) {
    this.runner = runner
  }
}
