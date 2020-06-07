import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { PostsService } from 'src/app/education/services/posts.service';
import { Group } from 'src/app/shared/models/group.model';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  user: User;
  body = '';
  title: string;
  @Input() group: Group;
  @Input() resource: string;
  @Input() type: number;
  isEmpty = true;
  selectedFiles: File[] = [];

  addFile = false;
  addOrRemove = 'Add File(s)';

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  constructor(
    private storage: StorageService,
    private postsService: PostsService,
    private service: NotificationsService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
  }
  onAddPost() {
    const formData = new FormData();
    formData.append('body', this.body);
    if (this.title) {
      formData.append('title', this.title);
    }
    if (this.group) {
      formData.append('group', this.group.scope);
      formData.append('group_id', this.group.id);
    } else {
      formData.append('group', '2');
    }
    for (const file of this.selectedFiles) {
      formData.append('files[]', file);
    }
    if (this.resource !== 'posts') {
      formData.append('type', this.type.toString());
    }
    this.postsService.addPost(this.resource, formData).subscribe((res) => {
      if (res.data) {
        this.body = '';
        this.title = '';
        this.selectedFiles = [];
        this.onSuccess();
      }
    });
  }
  add() {
    if (this.addFile) {
      this.addFile = false;
      this.addOrRemove = 'Add File(s)';
    } else {
      this.addFile = true;
      this.addOrRemove = 'Cancel';
    }
  }
  onSuccess() {
    this.service.info('Posted', 'your post has been submitted successfully', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: false,
      maxLength: 10,
    });
  }
}
