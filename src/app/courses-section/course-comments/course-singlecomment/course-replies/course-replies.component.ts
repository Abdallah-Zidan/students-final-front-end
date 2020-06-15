import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/shared/models/group.model';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { CoursesService } from 'src/app/courses-section/services/courses.service';

@Component({
  selector: 'app-course-replies',
  templateUrl: './course-replies.component.html',
  styleUrls: ['./course-replies.component.scss']
})
export class CourseRepliesComponent implements OnInit {
  panelOpenState = false;
  @Input() replies: CommentReply[];
  @Input() postId;
  @Input() group: Group;
  @Input() commentId;
  body = '';
  isEmpty = true;
  constructor(private courseService:CoursesService) { }

  ngOnInit(): void {
  }
  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  onAddReply() {
    console.log("sadsa");
    
    this.courseService.addReply(
      this.body,
      this.postId,
      this.commentId
    );
    setTimeout(() => {
      this.body = '';
    }, 1500);
  }
}
