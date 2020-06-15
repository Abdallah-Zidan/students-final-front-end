import { Component, OnInit, Input } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/posts/main-post/main-post.component';
import { User } from 'src/app/auth/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Tutorial } from '../models/tutorial';
import { TutorialService } from '../models/services/tutorial.service';

@Component({
  selector: 'app-single-tutorial',
  templateUrl: './single-tutorial.component.html',
  styleUrls: ['./single-tutorial.component.scss']
})
export class SingleTutorialComponent implements OnInit {
  @Input() tutorial: Tutorial;
  @Input() resource: string;
  user: User;
  comment = '';
  postBody;
  constructor(
    private storage: StorageService,
    public deleteDialog: MatDialog,
    private tutorialService :TutorialService
  ) {}
  isEmpty = true;
  editing = false;
  ngOnInit() {
    this.postBody = this.tutorial.body;
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
    this.tutorialService.addComment(this.comment, courseId);
    setTimeout(() => {
      this.comment = '';
    }, 1500);
  }

  onEditPost() {
    this.editing = true;
  }
  onUpdatePost() {
    this.tutorialService
      .updateTutorial(
        this.tutorial.id,
        { body: this.postBody }
      )
      .subscribe((res) => {
        console.log(res);
        this.tutorial.body = this.postBody;
        this.editing = false;
      });
  }
  onDeletePost() {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.tutorialService.deleteTutorial(this.tutorial.id);
      }
    });
  }

}
