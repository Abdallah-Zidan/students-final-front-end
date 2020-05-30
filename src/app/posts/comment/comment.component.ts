import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/education/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  panelOpenState = false;
  @Input() comments: PostComment[];
  constructor() {}

  ngOnInit(): void {}
}
