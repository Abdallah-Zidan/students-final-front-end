import { Attachment } from '../../shared/models/attachment.model';
import { ElementCreator } from '../../shared/models/creator.model';
import { PostComment } from '../../shared/models/comment.model';

export class Post {
  constructor(
    public id: string,
    public body: string,
    public files: Attachment[],
    private reported: boolean,
    public creator: ElementCreator,
    public comments: PostComment[],
    public createdHuman: string = '',
    public department: any = '',
    public faculty: any = '',
    public type: string = '',
    public title: string = null
  ) {}

  public get isReported(): boolean {
    return this.reported;
  }

  public setReported(v: boolean) {
    this.reported = v;
  }
}
