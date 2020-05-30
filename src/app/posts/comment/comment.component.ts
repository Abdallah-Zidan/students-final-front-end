import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/education/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  panelOpenState = false;
<<<<<<< HEAD

  constructor() { }

  ngOnInit(): void {
  }
=======
  @Input() comments: PostComment[];
  constructor() {}
>>>>>>> efaefc3ac5cbdf0c8942c99bcd9c3e433cb07d08

  ngOnInit(): void {}
}
