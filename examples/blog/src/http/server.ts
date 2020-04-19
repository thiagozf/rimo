import { Server } from '@hapi/hapi'
import { routes } from './routes'

const host = 'localhost'
const port = 3000

export const server: Server = new Server({
  host,
  port,
})

server.route(routes)
