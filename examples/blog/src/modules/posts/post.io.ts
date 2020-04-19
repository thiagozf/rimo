import { IsNotEmpty, MinLength, MaxLength, ValidateNested, IsString } from 'class-validator'
import { Expose, Type, Transform } from 'class-transformer'
import { PartialDeep } from 'type-fest'
import { PostId, Post } from './post.model'

export class GetPostsInput {}

export class GetPostInput {
  @Expose()
  @IsNotEmpty()
  @Type(() => PostId)
  @Transform((value: string) => new PostId(value))
  readonly id!: PostId
}

export class PostInput implements PartialDeep<Post> {
  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  public title!: string

  @Expose()
  @IsString()
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
  @Type(() => PostId)
  @Transform((value: string) => new PostId(value))
  readonly id!: PostId

  @Expose()
  @IsNotEmpty()
  @Type(() => PostInput)
  @ValidateNested()
  readonly payload!: PostInput
}

export class PostOutput {
  @Expose()
  @IsNotEmpty()
  @Type(() => PostId)
  @Transform((id: PostId) => id.toValue())
  public id!: PostId

  @Expose()
  @IsNotEmpty()
  readonly slug!: string

  @Expose()
  @MinLength(3)
  @MaxLength(100)
  readonly title!: string

  @Expose()
  @IsNotEmpty()
  readonly content!: string

  @Expose()
  @IsNotEmpty()
  readonly author!: string
}
