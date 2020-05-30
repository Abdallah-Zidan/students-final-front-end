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

<<<<<<< HEAD
  constructor() { }
  ngOnInit(): void {
  }

=======
  ngOnInit(): void {}
>>>>>>> efaefc3ac5cbdf0c8942c99bcd9c3e433cb07d08
}
