import { Attachment } from 'src/app/shared/models/attachment.model'
import { ElementCreator } from 'src/app/shared/models/creator.model'
import { PostComment } from 'src/app/shared/models/comment.model'
import { Tag } from './tag'

export class Tutorial {
	constructor(
		public id: string,
		public body: string,
		public files: Attachment[],
		public creator: ElementCreator,
		public comments: PostComment[],
		public createdHuman: string = null,
		public tags:Tag[]
	  ) {}
}
