import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/education/models/post.model';
import { PostsService } from 'src/app/education/services/posts.service';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss'],
})
export class MainPostComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postsService: PostsService) {}
  isEmpty = true;

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  ngOnInit(): void {
    this.postsService.posts.subscribe((posts) => {
      this.posts = posts;
    });
  }
}
