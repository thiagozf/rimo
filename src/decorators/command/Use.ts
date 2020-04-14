import { Class } from 'type-fest'
import { Middleware } from '@rimo/command'
import { OnOptions, addSubscriber } from './utils'

export const Use = (HandlerClass: Class<Middleware>, options?: OnOptions): MethodDecorator => {
  return (
    target: any,
    _propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<any>
  ): void => {
    addSubscriber('middleware', target.constructor, options, HandlerClass, 'use')
  }
}
