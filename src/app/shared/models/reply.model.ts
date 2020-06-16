import { ElementCreator } from './creator.model';
export class CommentReply {
  constructor(
    public id: string,
    public body: string,
    public creator: ElementCreator,
    public createdHuman: string = null
  ) {}
}
