import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subject } from 'rxjs';
import { Group } from '../../shared/models/group.model';
import { Post } from '../models/post.model';
import {
  getComments,
  getCreator,
  getAttachments,
  findPostInArray,
} from './posts.helper';
import { StorageService } from 'src/app/services/storage.service';
import { ElementCreator } from '../models/creator.model';
import { PostComment } from '../models/comment.model';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts = new Subject<Post[]>();
  postsArr: Post[] = [];
  departmentGroups: Group[] = [];
  facultyGroups: Group[] = [];

  constructor(
    private httpService: HttpService,
    private storage: StorageService
  ) {}

  getPosts(scope, scopeId, page) {
    this.httpService.requestPosts(scope, scopeId, page).subscribe(
      (res: any) => {
        const resPosts = res.data.posts;
        resPosts.forEach((post) => {
          this.postsArr.push(
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
        this.posts.next(this.postsArr);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addPost(body, files, scope, scopeId) {
    this.httpService
      .requestAddPost(body, files, scope, scopeId)
      .subscribe((res: any) => {
        const resPost = res.data.post;
        const currUser = this.storage.getUser('user');

        const newPost = new Post(
          resPost.id,
          body,
          getAttachments(resPost),
          false,
          new ElementCreator(
            currUser.id,
            currUser.personalData.name,
            currUser.personalData.avatar
          ),
          []
        );
        this.postsArr.unshift(newPost);
        this.posts.next(this.postsArr);
      });
  }
  addComment(body, scope, scopeId, postId) {
    const { post, index } = findPostInArray(postId, this.postsArr);
    console.log(post);

    this.httpService
      .requestAddComment(body, scope, scopeId, postId)
      .subscribe((res: any) => {
        const resComment = res.data.comment;
        const currUser = this.storage.getUser('user');
        const newComment = new PostComment(
          resComment.id,
          body,
          new ElementCreator(
            currUser.id,
            currUser.personalData.name,
            currUser.personalData.avatar
          ),
          []
        );
        post.comments.push(newComment);
        this.postsArr[index] = post;
        this.posts.next(this.postsArr);
      });
  }
}
