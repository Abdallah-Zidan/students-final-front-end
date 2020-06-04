import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { PostsService } from 'src/app/education/services/posts.service';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  user: User;
  body = '';
  @Input() group: Group;
  isEmpty = true;
  selectedFiles: File[] = [];

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  constructor(
    private storage: StorageService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
  }
  onAddPost() {
    this.postsService.addPost(
      this.body,
      this.selectedFiles,
      this.group.scope,
      this.group.id
    );
    setTimeout(() => {
      this.body = '';
    }, 2000);
  }
  onFilesSelected(event) {
    this.selectedFiles = event.target.files;
  }
}
