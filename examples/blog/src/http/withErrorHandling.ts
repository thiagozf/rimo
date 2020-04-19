import { ServerRoute, Lifecycle } from '@hapi/hapi'
import { notFound, badImplementation, boomify } from '@hapi/boom'
import { ValidationError } from '../error/ValidationError'

export const withErrorHandling = (routes: ServerRoute[]): ServerRoute[] => {
  return routes.map((route) => ({
    ...route,
    handler: async (...args) => {
      try {
        const response = await (route.handler as Lifecycle.Method)(...args)
        return response || notFound()
      } catch (e) {
        // TODO: better error handling and logging
        if (e instanceof ValidationError) {
          const err = boomify(e, { statusCode: 422, data: e.errors })
          // @ts-ignore
          err.output.payload.details = err.data
          return err
        }
        console.log(e)
        return badImplementation()
      }
    },
  }))
}

