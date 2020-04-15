import { injectable, inject } from 'inversify'
import { CommandHandler } from 'rimo'
import { transformAndValidate } from 'class-transformer-validator'
import { UpdatePostInput, PostOutput } from '../post.io'
import { Post } from '../post.model'
import { PostRepository } from '../posts.repository'
import { ValidationError } from '../../../error/ValidationError'

const toUpdatePostInput = async (input: unknown) => {
  try {
    return await transformAndValidate(UpdatePostInput, input as object, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

const toUpdatePostOutput = async (input: Post) => {
  try {
    return await transformAndValidate(PostOutput, input, {
      validator: { whitelist: true },
    })
  } catch (e) {
    throw new ValidationError(e)
  }
}

@injectable()
export class UpdatePost implements CommandHandler<UpdatePostInput, PostOutput | undefined> {
  constructor(@inject(PostRepository) private postRepository: PostRepository) {}

  handle = async (event: unknown): Promise<PostOutput | undefined> => {
    const input = await toUpdatePostInput(event)

    const post: Post | undefined = await this.postRepository.findById(input.id)
    if (!post) {
      return undefined
    }

    post.updateProps(input.payload)
    const updatedPost: Post = await this.postRepository.save(post)

    return toUpdatePostOutput(updatedPost)
  }
}
