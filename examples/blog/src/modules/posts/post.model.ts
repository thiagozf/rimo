import { AggregateRoot, EntityId } from 'rimo'
import { PartialDeep } from 'type-fest'
import { IsNotEmpty, MaxLength } from 'class-validator'
import getSlug from 'speakingurl'

export class PostId extends EntityId {}

export interface PostReadOnlyProps {
  slug: string
}

export interface PostEditableProps {
  title: string
  content: string
  author: string
}

export interface PostProps extends PostReadOnlyProps, PostEditableProps {}

export class Post extends AggregateRoot<PostProps> {
  public populate(props: PartialDeep<PostEditableProps>) {
    this.props.author = props.author || this.props.author
    this.props.content = props.content || this.props.content
    this.props.title = props.title || this.props.title
    this.props.slug = getSlug(this.props.title)
  }

  @IsNotEmpty()
  get slug() {
    return this.props.slug
  }

  @IsNotEmpty()
  @MaxLength(100)
  get title() {
    return this.props.title
  }

  @IsNotEmpty()
  get content() {
    return this.props.content
  }

  @IsNotEmpty()
  get author() {
    return this.props.author
  }
}
