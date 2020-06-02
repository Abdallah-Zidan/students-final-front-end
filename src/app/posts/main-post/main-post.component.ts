import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import { Post } from 'src/app/education/models/post.model';
import { Group } from 'src/app/shared/models/group.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss'],
})
export class MainPostComponent implements OnInit {
  @Input() group: Group;
  @Input() post: Post;
  user: User;
  comment = '';
  postBody;
  constructor(
    private postsService: PostsService,
    private storage: StorageService
  ) {}
  isEmpty = true;
  editing = false;
  ngOnInit() {
    this.postBody = this.post.body;
    this.user = this.storage.getUser('user');
  }
  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.comment = $event.target.value;
  }
  onAddComment(postId) {
    this.postsService.addComment(
      this.comment,
      this.group.scope,
      this.group.id,
      postId
    );
  }

  onEditPost() {
    this.editing = true;
  }
  onUpdatePost() {
    this.postsService
      .updatePost(this.postBody, this.group.scope, this.group.id, this.post.id)
      .subscribe((res) => {
        console.log(res);
        this.post.body = this.postBody;
        this.editing = false;
      });
  }
  onDeletePost() {
    this.postsService.deletePost(this.group.scope, this.group.id, this.post.id);
  }
}
