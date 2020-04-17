import { AggregateRoot, EntityId } from 'rimo'
import { PartialDeep } from 'type-fest'
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
  }

  set title(title: string) {
    this.props.slug = getSlug(title)
    this.props.title = title
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get author() {
    return this.props.author
  }
}
