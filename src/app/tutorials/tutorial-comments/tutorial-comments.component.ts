import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/shared/models/comment.model';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-tutorial-comments',
  templateUrl: './tutorial-comments.component.html',
  styleUrls: ['./tutorial-comments.component.scss']
})
export class TutorialCommentsComponent implements OnInit {
  panelOpenState = false;
  @Input() comments: PostComment[];
  @Input() group: Group;
  @Input() postId;
  @Input() resource: string;
  constructor() { }

  ngOnInit(): void {
  }

}
