import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subject } from 'rxjs';
import { Group } from '../../shared/models/group.model';
import { Post } from '../models/post.model';
import {
  getComments,
  getCreator,
  getAttachments,
  findInArray,
} from './posts.helper';
import { StorageService } from 'src/app/services/storage.service';
import { ElementCreator } from '../../shared/models/creator.model';
import { PostComment } from '../../shared/models/comment.model';
import { CommentReply } from '../../shared/models/reply.model';
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

  getPosts(resource, scope, scopeId, page) {
    this.httpService.requestPosts(resource, scope, scopeId, page).subscribe(
      (res: any) => {
        console.log(res.data);
        const resPosts = res.data.posts;
        this.postsArr = [];
        resPosts.forEach((post) => {
          this.postsArr.push(
            new Post(
              post.id,
              post.body,
              getAttachments(post),
              post.reported,
              getCreator(post),
              getComments(post),
              post.created_at_human,
              post.department_faculty && post.department_faculty.department,
              post.department_faculty && post.department_faculty.faculty,
              post.type
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
          [],
          'now',
        );
        this.postsArr.unshift(newPost);
        this.posts.next(this.postsArr);
      });
  }
  updatePost(body, scope, scopeId, postId) {
    return this.httpService.requestUpdatePost(body, scope, scopeId, postId);
  }
  deletePost(scope, scopeId, postId) {
    this.httpService
      .requestDeletePost(scope, scopeId, postId)
      .subscribe((res) => {
        console.log(res);
        const { index } = findInArray(postId, this.postsArr);
        this.postsArr.splice(index, 1);
        this.posts.next(this.postsArr);
      });
  }
  addComment(body, postId) {
    const { element, index } = findInArray(postId, this.postsArr);
    this.httpService.requestAddComment(body, postId).subscribe((res: any) => {
      const resComment = res.data.comment;
      const currUser = this.storage.getUser('user');
      const creator = new ElementCreator(
        currUser.id,
        currUser.personalData.name,
        currUser.personalData.avatar
      );
      const newComment = new PostComment(resComment.id, body, creator, []);
      element.comments.push(newComment);
      this.postsArr[index] = element;
      this.posts.next(this.postsArr);
    });
  }
  updateComment(body, postId, commentId) {
    return this.httpService.requestEditComment(body, postId, commentId);
  }
  deleteComment(postId, commentId) {
    const { element, index } = findInArray(postId, this.postsArr);
    const commentIndex = findInArray(commentId, element.comments);
    this.httpService
      .requestDeleteComment(postId, commentId)
      .subscribe((res) => {
        console.log(res);
        element.comments.splice(commentIndex, 1);
        this.postsArr[index] = element;
        this.posts.next(this.postsArr);
      });
  }
  addReply(body, postId, commentId) {
    const { element, index } = findInArray(postId, this.postsArr);
    const commentIndex = findInArray(commentId, element.comments).index;
    this.httpService.requestAddReply(body, commentId).subscribe((res: any) => {
      const resReply = res.data.reply;
      const currUser = this.storage.getUser('user');
      const creator = new ElementCreator(
        currUser.id,
        currUser.personalData.name,
        currUser.personalData.avatar
      );
      const newReply = new CommentReply(resReply.id, body, creator);
      element.comments[commentIndex].replies.push(newReply);
      this.postsArr[index] = element;
      this.posts.next(this.postsArr);
    });
  }
  updateReply(body, commentId, replyId) {
    return this.httpService.requestEditReply(body, commentId, replyId);
  }
  deleteReply(postId, commentId, replyId) {
    const { element, index } = findInArray(postId, this.postsArr);
    const commentData = findInArray(commentId, element.comments);
    const replyIndex = findInArray(replyId, commentData.element.replies);
    this.httpService.requestDeleteReply(commentId, replyId).subscribe((res) => {
      console.log(res);
      element.comments[commentData.index].replies.splice(replyIndex, 1);
      this.postsArr[index] = element;
      this.posts.next(this.postsArr);
    });
  }
}
