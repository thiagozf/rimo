import { ServerRoute } from '@hapi/hapi'
import { PostRoutes } from '../modules/posts'
import { withErrorHandling } from './withErrorHandling'
import { NotFoundRoute } from './not_found.routes'

const modulesRoutes = [...PostRoutes, NotFoundRoute]

export const routes: ServerRoute[] = withErrorHandling(modulesRoutes)
