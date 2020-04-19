import { injectable, inject } from 'inversify'
import { CommandHandler } from 'rimo'
import { transformAndValidate } from 'class-transformer-validator'
import { GetPostsInput, PostOutput } from '../post.io'
import { Post } from '../post.model'
import { PostRepository } from '../posts.repository'
import { ValidationError } from '../../../error/ValidationError'

const toGetPostsOutput = async (input: Post[]) => {
  try {
    return await transformAndValidate(PostOutput, input, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

@injectable()
export class GetPosts implements CommandHandler<GetPostsInput, Array<PostOutput>> {
  constructor(@inject(PostRepository) private postRepository: PostRepository) {}

  handle = async (_event: unknown): Promise<Array<PostOutput>> => {
    const posts: Post[] = await this.postRepository.findAll()
    return toGetPostsOutput(posts)
  }
}
