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
  body: string;
  @Input() group: Group;
  isEmpty = true;

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.body = $event.target.value;
  }

  constructor(
    private storage: StorageService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
  }
  onAddPost() {
    this.postsService.addPost(this.body, [], this.group.scope, this.group.id);
  }
}
