import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { Expose, Type, Transform } from 'class-transformer'
import { PostId } from './post.model'

export class GetPostsInput {}

export class GetPostInput {
  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @Transform((value: string) => new PostId(value))
  readonly id!: PostId
}

export class PostInput {
  @Expose()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  public slug!: string

  @Expose()
  @IsNotEmpty()
  @MaxLength(100)
  public title!: string

  @Expose()
  @IsNotEmpty()
  public content!: string

  @Expose()
  @IsNotEmpty()
  public author!: string
}

export class CreatePostInput extends PostInput {}

export class UpdatePostInput {
  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @Transform((value: string) => new PostId(value))
  readonly id!: PostId

  @Expose()
  @IsNotEmpty()
  @Type(() => PostInput)
  readonly payload!: PostInput
}

export class PostOutput {
  @Expose()
  @IsNotEmpty()
  @Type(() => PostId)
  @Transform((value: PostId) => value.toValue())
  public id!: string

  @Expose()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly slug!: string

  @Expose()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title!: string

  @Expose()
  @IsNotEmpty()
  readonly content!: string

  @Expose()
  @IsNotEmpty()
  readonly author!: string
}
