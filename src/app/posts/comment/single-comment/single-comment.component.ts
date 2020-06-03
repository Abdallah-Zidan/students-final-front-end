import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/shared/models/comment.model';
import { Group } from 'src/app/shared/models/group.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit {
  @Input() comment: PostComment;
  @Input() postId;
  @Input() group: Group;
  isEmpty = true;
  user;
  editing = false;
  commentBody;
  constructor(
    private postsService: PostsService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.commentBody = this.comment.body;
    this.user = this.storage.getUser('user');
  }

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.comment = $event.target.value;
  }
  onEditComment() {
    this.editing = true;
  }
  onUpdateComment() {
    this.postsService
      .updateComment(
        this.commentBody,
        this.group.scope,
        this.group.id,
        this.postId,
        this.comment.id
      )
      .subscribe((res) => {
        console.log(res);
        this.comment.body = this.commentBody;
      });
    this.editing = false;
  }
  onDeleteComment() {
    this.postsService.deleteComment(
      this.group.scope,
      this.group.id,
      this.postId,
      this.comment.id
    );
  }
}
