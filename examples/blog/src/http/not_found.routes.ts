import { ServerRoute } from '@hapi/hapi'
import { notFound } from '@hapi/boom'

export const NotFoundRoute: ServerRoute = {
  method: ['GET', 'POST'],
  path: '/{any*}',
  handler: () => {
    return notFound('Dang, this resource isn’t available :(')
  },
}
