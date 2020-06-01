import { Component, OnInit, Input } from '@angular/core';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-single-reply',
  templateUrl: './single-reply.component.html',
  styleUrls: ['./single-reply.component.scss'],
})
export class SingleReplyComponent implements OnInit {
  @Input() reply: CommentReply;
  @Input() group: Group;
  @Input() postId;
  @Input() commentId;
  replyBody;
  editing = false;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.replyBody = this.reply.body;
  }
  onEditReply() {
    this.editing = true;
  }
  onUpdateReply() {
    this.postsService
      .updateReply(
        this.replyBody,
        this.group.scope,
        this.group.id,
        this.postId,
        this.commentId,
        this.reply.id
      )
      .subscribe((res) => {
        console.log(res);
        this.editing = false;
        this.reply.body = this.replyBody;
      });
  }
  onDeleteReply() {
    this.postsService.deleteReply(
      this.group.scope,
      this.group.id,
      this.postId,
      this.commentId,
      this.reply.id
    );
  }
}
