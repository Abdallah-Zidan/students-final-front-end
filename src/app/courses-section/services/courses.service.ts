import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import {
  getAttachments,
  getCreator,
  getComments,
  findInArray,
} from 'src/app/education/services/posts.helper';
import { ElementCreator } from 'src/app/shared/models/creator.model';
import { PostComment } from 'src/app/shared/models/comment.model';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesSubject = new Subject<Course[]>();
  coursesArr: Course[] = [];
  url = {
    posts: 'http://localhost:8000/api/v1/coursePosts/',
    courses:'http://localhost:8000/api/v1/user/courses/'
  }

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private httpService: HttpService,
    private postService :PostsService
  ) {}

  addCourse(data) :Observable<any> {
    return this.httpClient.post(this.url.posts, data).pipe(
      tap((res: any) => {
      // const resPost = res.data.;
      const currUser = this.storage.getUser('user');
      const newPost = new Course(
        res.data.coursePost.id,
        data.get('body'),
        getAttachments(res.data.coursePost),
        new ElementCreator(
          currUser.id,
          currUser.personalData.name,
          currUser.personalData.avatar
        ),
        [],
        'now'
      );
      this.coursesArr.unshift(newPost);
      this.coursesSubject.next(this.coursesArr);
    })
  );
  }

  getCoursesPosts(course = null) {
    let params;
    if (course) {
      params = {
        course: course,
      };
    }
    this.httpClient.get(this.url.posts, { params }).subscribe((res: any) => {
      if (res.data.course_posts) {
        this.coursesArr = [];
        res.data.course_posts.forEach((course) => {
          this.coursesArr.push(
            new Course(
              course.id,
              course.body,
              getAttachments(course),
              getCreator(course),
              getComments(course),
              course.created_at_human,
              course.course_department_faculty
            )
          );
        });
        this.coursesSubject.next(this.coursesArr);
      }
    });
  }

  getCourses():Observable<any>
  {
    return this.httpClient.get(this.url.courses);
  }

  updateCourse(courseId, data) {
    return this.httpClient.put(this.url + courseId, data);
  }

  deleteCourse(courseId) {
    return this.httpClient.delete(this.url.posts + courseId).subscribe((res) => {
      console.log(res);
      const { index } = findInArray(courseId, this.coursesArr);
      this.coursesArr.splice(index, 1);
      this.coursesSubject.next(this.coursesArr);
    });;
    
  }
  addComment(body,courseId)
  {
    const { element, index } = findInArray(courseId, this.coursesArr);
    this.httpService
      .requestAddComment('coursePosts', body, courseId)
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
        this.coursesArr[index] = element;
        this.coursesSubject.next(this.coursesArr);
      });
  }

  updateComment(resource, body, postId, commentId) {
    return this.httpService.requestEditComment(
      resource,
      body,
      postId,
      commentId
    );
  }
  deleteComment(resource, postId, commentId) {
    const { element, index } = findInArray(postId, this.coursesArr);
    const commentIndex = findInArray(commentId, element.comments);
    this.httpService
      .requestDeleteComment(resource, postId, commentId)
      .subscribe((res) => {
        console.log(res);
        element.comments.splice(commentIndex, 1);
        this.coursesArr[index] = element;
        console.log("here");
        this.coursesSubject.next(this.coursesArr);
      });
  }
  addReply(body, postId, commentId) {
    const { element, index } = findInArray(postId, this.coursesArr);
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
      this.coursesArr[index] = element;
      this.coursesSubject.next(this.coursesArr);
    });
  }
  updateReply(body, commentId, replyId) {
    return this.httpService.requestEditReply(body, commentId, replyId);
  }
  deleteReply(postId, commentId, replyId) {
    const { element, index } = findInArray(postId, this.coursesArr);
    const commentData = findInArray(commentId, element.comments);
    const replyIndex = findInArray(replyId, commentData.element.replies);
    this.httpService.requestDeleteReply(commentId, replyId).subscribe((res) => {
      element.comments[commentData.index].replies.splice(replyIndex, 1);
      this.coursesArr[index] = element;
      this.coursesSubject.next(this.coursesArr);
    });
  }


}
