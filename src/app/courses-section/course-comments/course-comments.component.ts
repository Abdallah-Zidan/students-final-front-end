import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/shared/models/comment.model';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-course-comments',
  templateUrl: './course-comments.component.html',
  styleUrls: ['./course-comments.component.scss']
})
export class CourseCommentsComponent implements OnInit {
  panelOpenState = false;
  @Input() comments: PostComment[];
  @Input() group: Group;
  @Input() postId;
  @Input() resource: string;
  constructor() { }

  ngOnInit(): void {
  }

}
