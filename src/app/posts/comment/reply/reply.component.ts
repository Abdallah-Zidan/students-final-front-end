import { Component, OnInit, Input } from '@angular/core';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  panelOpenState = false;
  @Input() replies: CommentReply[];
  @Input() postId;
  @Input() group: Group;
  @Input() commentId;
  body = '';
  isEmpty = true;

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onAddReply() {
    this.postsService.addReply(
      this.body,
      this.postId,
      this.commentId
    );
    setTimeout(() => {
      this.body = '';
    }, 1500);
  }
}
