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
    public createdHuman: string = null,
    public department: any = null,
    public faculty: any = null,
    public type: string = null,
    public title: string = null,
    public startDate: any = null,
    public endDate: any = null
  ) {}

  public get isReported(): boolean {
    return this.reported;
  }

  public setReported(v: boolean) {
    this.reported = v;
  }
}
