import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subject } from 'rxjs';
import { Group } from '../../shared/models/group.model';
import { Post } from '../models/post.model';
import { getComments, getCreator, getAttachments } from './posts.helper';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts = new Subject<Post[]>();
  departmentGroups: Group[] = [];
  facultyGroups: Group[] = [];

  constructor(private httpService: HttpService) {}

  getPosts(scope, scopeId, page) {
    const postsArr: Post[] = [];
    this.httpService
      .requestPosts(scope, scopeId, page)
      .subscribe((res: any) => {
        const resPosts = res.data.posts;
        resPosts.forEach((post) => {
          postsArr.push(
            new Post(
              post.id,
              post.body,
              getAttachments(post),
              post.reported,
              getCreator(post),
              getComments(post)
            )
          );
        });
        this.posts.next(postsArr);
      });
  }
}
