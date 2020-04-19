import { injectable, inject } from 'inversify'
import { CommandHandler } from 'rimo'
import { transformAndValidate } from 'class-transformer-validator'
import { CreatePostInput, PostOutput } from '../post.io'
import { Post } from '../post.model'
import { PostRepository } from '../posts.repository'
import { ValidationError } from '../../../error/ValidationError'

const toCreatePostInput = async (input: unknown) => {
  try {
    return await transformAndValidate(CreatePostInput, input as object, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

const toCreatePostOutput = async (input: Post) => {
  try {
    return await transformAndValidate(PostOutput, input, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

@injectable()
export class CreatePost implements CommandHandler<CreatePostInput, PostOutput> {
  constructor(@inject(PostRepository) private postRepository: PostRepository) {}

  handle = async (event: unknown): Promise<PostOutput> => {
    const input = await toCreatePostInput(event)
    const post: Post = new Post(input)
    const saved = await this.postRepository.save(post)
    return await toCreatePostOutput(saved)
  }
}
