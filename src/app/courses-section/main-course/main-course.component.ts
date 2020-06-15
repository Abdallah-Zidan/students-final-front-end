import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/auth/user.model';
import { Course } from '../models/course';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../services/courses.service';
import { DeleteDialogComponent } from 'src/app/posts/main-post/main-post.component';
// import {DeleteDialogComponent} from '../'

@Component({
  selector: 'app-main-course',
  templateUrl: './main-course.component.html',
  styleUrls: ['./main-course.component.scss']
})
export class MainCourseComponent implements OnInit {
  // @Input() group: Group;
  @Input() course: Course;
  @Input() resource: string;
  user: User;
  comment = '';
  postBody;
  constructor(
    private storage: StorageService,
    public deleteDialog: MatDialog,
    private courseService : CoursesService
  ) {}
  isEmpty = true;
  editing = false;
  ngOnInit() {
    this.postBody = this.course.body;
    this.user = this.storage.getUser('user');
  }
  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  onAddComment(courseId) {
    this.courseService.addComment(this.comment, courseId);
    setTimeout(() => {
      this.comment = '';
    }, 1500);
  }

  onEditPost() {
    this.editing = true;
  }
  onUpdatePost() {
    this.courseService
      .updateCourse(
        this.course.id,
        { body: this.postBody }
      )
      .subscribe((res) => {
        console.log(res);
        this.course.body = this.postBody;
        this.editing = false;
      });
  }
  onDeletePost() {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.courseService.deleteCourse(this.course.id);
      }
    });
  }
 
}

