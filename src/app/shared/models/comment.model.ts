import { ElementCreator } from './creator.model';
import { CommentReply } from './reply.model';

export class PostComment {
  constructor(
    public id: string,
    public body: string,
    public creator: ElementCreator,
    public replies: CommentReply[]
  ) {}
}
