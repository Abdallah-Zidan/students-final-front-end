import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/shared/models/comment.model';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  panelOpenState = false;
  @Input() comments: PostComment[];
  @Input() group: Group;
  @Input() postId;
  @Input() postUserId;
  @Input() resource: string;
  constructor() {}

  ngOnInit(): void {}
}
