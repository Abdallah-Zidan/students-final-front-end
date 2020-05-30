import { Attachment } from './attachment.model';
import { ElementCreator } from './creator.model';
import { PostComment } from './comment.model';

export class Post {
  constructor(
    public id: string,
    public body: string,
    public files: Attachment[],
    private reported: boolean,
    public creator: ElementCreator,
    public comments: PostComment[]
  ) {}

  public get isReported(): boolean {
    return this.reported;
  }
}
