import { injectable } from 'inversify'
import { InMemoryCrudRepository } from '../../repository/InMemoryCrudRepository'
import { Post, PostId } from './post.model'

@injectable()
export class PostRepository extends InMemoryCrudRepository<Post, PostId> {}
