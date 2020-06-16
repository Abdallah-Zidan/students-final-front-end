import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Tutorial } from '../tutorial';
import { ElementCreator } from 'src/app/shared/models/creator.model';
import { getAttachments, getCreator, getComments, findInArray } from 'src/app/education/services/posts.helper';
import { HttpService } from 'src/app/services/http.service';
import { PostComment } from 'src/app/shared/models/comment.model';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { tap } from 'rxjs/operators';
import { getTags } from './tutorials.helper';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private url = {
    tutorial: 'http://localhost:8000/api/v1/tutorials/',
    tags:'http://localhost:8000/api/v1/tags'
  }
  tutorialSubject = new Subject<Tutorial[]>();
  tutorialArr = [];
  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private httpService:HttpService
  ) {}
  addCourse(data): Observable<any> {
    return this.httpClient.post(this.url.tutorial, data).pipe(
      tap((res: any) => {
        const currUser = this.storage.getUser('user');
        const newPost = new Tutorial(
          res.data.tutorial.id,
          data.get('body'),
          getAttachments(res.data.tutorial),
          new ElementCreator(
            currUser.id,
            currUser.personalData.name,
            currUser.personalData.avatar
          ),
          [],
          'now',
          res.data.tutorial.tags
        );
        this.tutorialArr.unshift(newPost);
        this.tutorialSubject.next(this.tutorialArr);
      })
    );
  }

  getTutorials(tags = null) {
    let params;
    if (tags) {
      params = {
        tags: tags,
      };
    }
    this.httpClient.get(this.url.tutorial, { params }).subscribe((res: any) => {
      if (res.data.tutorials) {
        this.tutorialArr = [];
        res.data.tutorials.forEach((tutorial) => {
          this.tutorialArr.push(
            new Tutorial(
              tutorial.id,
              tutorial.body,
              getAttachments(tutorial),
              getCreator(tutorial),
              getComments(tutorial),
              tutorial.created_at_human,
              tutorial.tags
            )
          );
        });
        this.tutorialSubject.next(this.tutorialArr);
      }
    });
  }

  getTags(): Observable<any> {
    const params = {
      scope: "2",
    };
    return this.httpClient.get(this.url.tags, { params })
  }

  updateTutorial(tutorialId, data) {
    return this.httpClient.put(this.url.tutorial + tutorialId, data);
  }

  deleteTutorial(tutorialId) {
    return this.httpClient
      .delete(this.url.tutorial + tutorialId)
      .subscribe((res) => {
        console.log(res);
        const { index } = findInArray(tutorialId, this.tutorialArr);
        this.tutorialArr.splice(index, 1);
        this.tutorialSubject.next(this.tutorialArr);
      });
  }
  addComment(body, tutorialId) {
    const { element, index } = findInArray(tutorialId, this.tutorialArr);
    this.httpService
      .requestAddComment('tutorials', body, tutorialId)
      .subscribe((res: any) => {
        const resComment = res.data.comment;
        const currUser = this.storage.getUser('user');
        const creator = new ElementCreator(
          currUser.id,
          currUser.personalData.name,
          currUser.personalData.avatar
        );
        const newComment = new PostComment(resComment.id, body, creator, []);
        element.comments.push(newComment);
        this.tutorialArr[index] = element;
        this.tutorialSubject.next(this.tutorialArr);
      });
  }

  updateComment(resource, body, tutorialId, commentId) {
    return this.httpService.requestEditComment(
      resource,
      body,
      tutorialId,
      commentId
    );
  }
  deleteComment(resource, tutorialId, commentId) {
    const { element, index } = findInArray(tutorialId, this.tutorialArr);
    const commentIndex = findInArray(commentId, element.comments).index;
    this.httpService
      .requestDeleteComment(resource, tutorialId, commentId)
      .subscribe((res) => {
        console.log(res);
        element.comments.splice(commentIndex, 1);
        this.tutorialArr[index] = element;
        console.log('here');
        this.tutorialSubject.next(this.tutorialArr);
      });
  }
  addReply(body, tutorialId, commentId) {
    const { element, index } = findInArray(tutorialId, this.tutorialArr);
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
      this.tutorialArr[index] = element;
      this.tutorialSubject.next(this.tutorialArr);
    });
  }
  updateReply(body, commentId, replyId) {
    return this.httpService.requestEditReply(body, commentId, replyId);
  }
  deleteReply(postId, commentId, replyId) {
    const { element, index } = findInArray(postId, this.tutorialArr);
    const commentData = findInArray(commentId, element.comments);
    const replyIndex = findInArray(replyId, commentData.element.replies).index;
    this.httpService.requestDeleteReply(commentId, replyId).subscribe((res) => {
      element.comments[commentData.index].replies.splice(replyIndex, 1);
      this.tutorialArr[index] = element;
      this.tutorialSubject.next(this.tutorialArr);
    });
  }
}
