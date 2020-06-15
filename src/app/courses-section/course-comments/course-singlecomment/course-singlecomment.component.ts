import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/shared/models/comment.model';
import { StorageService } from 'src/app/services/storage.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-singlecomment',
  templateUrl: './course-singlecomment.component.html',
  styleUrls: ['./course-singlecomment.component.scss'],
})
export class CourseSinglecommentComponent implements OnInit {
  @Input() comment: PostComment;
  @Input() postId;
  @Input() resource: string;
  @Input() group: any;
  isEmpty = true;
  user;
  editing = false;
  commentBody;

  constructor(
    private storage: StorageService,
    private courseSerive: CoursesService
  ) {}

  ngOnInit(): void {
    this.commentBody = this.comment.body;
    this.user = this.storage.getUser('user');
    if (this.comment.body.startsWith('https://www.loom.com/share')) {
      this.comment.body = this.comment.body.replace('share', 'embed');
      console.log(this.comment.body);
    }
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
    this.courseSerive
      .updateComment(
        this.resource,
        this.commentBody,
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
    this.courseSerive.deleteComment(
      this.resource,
      this.postId,
      this.comment.id
    );
  }
}
