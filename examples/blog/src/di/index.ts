import 'reflect-metadata'
// Command runner
import { Container } from 'inversify'
import { CommandRunner } from 'rimo'
// Posts
import { PostRepository, CreatePost, GetPost, GetPosts, UpdatePost } from '../modules/posts'

export const container = new Container()
// Repositories
container.bind(PostRepository).toSelf().inSingletonScope()
// Use cases
container.bind(CreatePost).toSelf().inSingletonScope()
container.bind(GetPosts).toSelf().inSingletonScope()
container.bind(GetPost).toSelf().inSingletonScope()
container.bind(UpdatePost).toSelf().inSingletonScope()

export const runner = new CommandRunner({ container })
