import { injectable, inject } from 'inversify'
import { CommandHandler } from 'rimo'
import { transformAndValidate } from 'class-transformer-validator'
import { GetPostInput, PostOutput } from '../post.io'
import { Post } from '../post.model'
import { PostRepository } from '../posts.repository'
import { ValidationError } from '../../../error/ValidationError'

const toGetPostInput = async (input: unknown) => {
  try {
    return await transformAndValidate(GetPostInput, input as object, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

const toGetPostOutput = async (input: Post) => {
  try {
    return await transformAndValidate(PostOutput, input, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

@injectable()
export class GetPost implements CommandHandler<GetPostInput, PostOutput | undefined> {
  constructor(@inject(PostRepository) private postRepository: PostRepository) {}

  handle = async (event: unknown): Promise<PostOutput | undefined> => {
    const { id } = await toGetPostInput(event)
    const post: Post | undefined = await this.postRepository.findById(id)
    return post && toGetPostOutput(post)
  }
}
