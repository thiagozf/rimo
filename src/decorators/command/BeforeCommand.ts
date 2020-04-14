import { Class } from 'type-fest'
import { CommandHandler } from '@rimo/command'
import { OnOptions, addSubscriber } from './utils'

export const BeforeCommand = (
  HandlerClass: Class<CommandHandler>,
  options?: OnOptions
): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<any>
  ): void => {
    addSubscriber('before', HandlerClass, options, target.constructor, propertyKey)
  }
}
