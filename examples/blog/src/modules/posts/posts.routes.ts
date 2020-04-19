import { ServerRoute } from '@hapi/hapi'
import { runner } from '../../di'
import { CreatePost } from './command/create_post.command'
import { UpdatePost } from './command/update_post.command'
import { GetPost } from './command/get_post.command'
import { GetPosts } from './command/get_posts.command'

export const PostRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/posts',
    handler: async (request) => runner.run(GetPosts, request.params),
  },
  {
    method: 'POST',
    path: '/posts',
    handler: async (request) => runner.run(CreatePost, request.payload),
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    handler: async (request) => runner.run(GetPost, request.params),
  },
  {
    method: 'PUT',
    path: '/posts/{id}',
    handler: async (request) =>
      runner.run(UpdatePost, { id: request.params.id, payload: request.payload }),
  },
]
