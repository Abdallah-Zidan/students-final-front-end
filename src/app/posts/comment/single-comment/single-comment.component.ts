import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/education/models/comment.model';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit {
  @Input() comment: PostComment;
  constructor() {}

  ngOnInit(): void {}
}
