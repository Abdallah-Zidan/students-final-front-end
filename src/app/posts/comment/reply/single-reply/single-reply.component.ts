import { Component, OnInit, Input } from '@angular/core';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { Group } from 'src/app/shared/models/group.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-single-reply',
  templateUrl: './single-reply.component.html',
  styleUrls: ['./single-reply.component.scss'],
})
export class SingleReplyComponent implements OnInit {
  @Input() reply: CommentReply;
  @Input() group: Group;
  @Input() postId;
  @Input() postUserId;
  @Input() commentId;
  user;
  replyBody;
  editing = false;
  constructor(
    private postsService: PostsService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.replyBody = this.reply.body;
    this.user = this.storageService.getUser('user');
  }
  onEditReply() {
    this.editing = true;
  }
  onUpdateReply() {
    this.postsService
      .updateReply(
        this.replyBody,
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
      this.postId,
      this.commentId,
      this.reply.id
    );
  }
}
