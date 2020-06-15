import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from 'src/app/courses-section/services/courses.service';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { StorageService } from 'src/app/services/storage.service';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-course-singlereply',
  templateUrl: './course-singlereply.component.html',
  styleUrls: ['./course-singlereply.component.scss'],
})
export class CourseSinglereplyComponent implements OnInit {
  @Input() reply: CommentReply;
  @Input() group: Group;
  @Input() postId;
  @Input() commentId;
  user;
  replyBody;
  editing = false;
  constructor(
    private storageService: StorageService,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.replyBody = this.reply.body;
    this.user = this.storageService.getUser('user');
  }
  onEditReply() {
    this.editing = true;
  }
  onUpdateReply() {
    this.courseService
      .updateReply(this.replyBody, this.commentId, this.reply.id)
      .subscribe((res) => {
        console.log(res);
        this.editing = false;
        this.reply.body = this.replyBody;
      });
  }
  onDeleteReply() {
    this.courseService.deleteReply(this.postId, this.commentId, this.reply.id);
  }
}
