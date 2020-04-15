import { AggregateRoot, EntityId } from 'rimo'
import { PartialDeep } from 'type-fest'

export class PostId extends EntityId {}

export interface PostProps {
  slug: string
  title: string
  content: string
  author: string
}

export class Post extends AggregateRoot<PostProps> {
  updateProps(props: PartialDeep<PostProps>) {
    this.props.author = props.author || this.props.author
    this.props.content = props.content || this.props.content
    this.props.slug = props.slug || this.props.slug
    this.props.title = props.title || this.props.title
  }

  get slug() {
    return this.props.slug
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
