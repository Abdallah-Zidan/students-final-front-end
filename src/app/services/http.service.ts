import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { replacePostsUrl } from './url.helper';

const endPoints = {
  csrf: 'http://localhost:8000/sanctum/csrf-cookie',
  login: 'http://localhost:8000/api/v1/login',
  logout: 'http://localhost:8000/api/v1/logout',
  register: 'http://localhost:8000/api/v1/register',
  universites: 'http://localhost:8000/api/v1/universities',
  verificationResend: 'http://localhost:8000/api/v1/email/resend',
  userData: 'http://localhost:8000/api/v1/user/profile',
  userDepartment: 'http://localhost:8000/api/v1/user/departments',
  studentDepartmentGroup: '',
  studentFacultyGroup: '',
  professorDepartments: '',
  professorFaculties: '',
  groups: 'http://localhost:8000/api/v1/user/departments',
  departmentPosts:
    'http://localhost:8000/api/v1/departments/{department_faculty}/posts',
  facultyPosts: 'http://localhost:8000/api/v1/faculties/{faculty}/posts',
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * this service will handle any http request to centralize all http requests
   */
  constructor(private http: HttpClient) {}

  requestLogin(loginData: {
    email: string;
    password: string;
    device_name: string;
  }) {
    return this.http.post(endPoints.login, loginData);
  }

  requestLogout(deviceName: string) {
    return this.http.post(endPoints.logout, deviceName);
  }

  requestCSRF() {
    this.http.get(endPoints.csrf).subscribe((res) => {
      console.log(res);
    });
  }

  getUniversites() {
    return this.http.get<any>(endPoints.universites);
  }

  verifyEmail(user): Observable<HttpResponse<any>> {
    let headers_object = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + user._token.access_token
    );
    return this.http.get<any>(endPoints.verificationResend, {
      headers: headers_object,
      observe: 'response',
    });
  }

  getUser() {
    return this.http.get<any>(endPoints.userData);
  }

  getuserDepartment() {
    return this.http.get<any>(endPoints.userDepartment);
  }

  updateProfile(user) {
    return this.http.post<any>(endPoints.userData, user)
  }

  requestGroups() {
    return this.http.get(endPoints.groups);
  }
  requestPosts(scope, scopeId, page) {
    return this.http.get(replacePostsUrl(endPoints, scope, scopeId));
  }
  requestAddPost(postBody, postFiles, scope, scopeId) {
    const formData = new FormData();
    formData.append('body', postBody);
    formData.append('files', postFiles);
    console.log(formData.getAll('files'));

    return this.http.post(replacePostsUrl(endPoints, scope, scopeId), formData);
  }
  requestUpdatePost(postBody, scope, scopeId, postId) {
    return this.http.put(
      replacePostsUrl(endPoints, scope, scopeId) + `/${postId}`,
      {
        body: postBody,
      }
    );
  }
  requestDeletePost(scope, scopeId, postId) {
    return this.http.delete(
      replacePostsUrl(endPoints, scope, scopeId) + `/${postId}`
    );
  }
  requestAddComment(
    commentBody: string,
    scope: string,
    scopeId: string,
    postId: string
  ) {
    return this.http.post(
      replacePostsUrl(endPoints, scope, scopeId) + `/${postId}/comments`,
      {
        body: commentBody,
      }
    );
  }
  requestEditComment(commentBody, scope, scopeId, postId, commentId) {
    return this.http.put(
      replacePostsUrl(endPoints, scope, scopeId) +
        `/${postId}/comments/${commentId}`,
      {
        body: commentBody,
      }
    );
  }
  requestDeleteComment(scope, scopeId, postId, commentId) {
    return this.http.delete(
      replacePostsUrl(endPoints, scope, scopeId) +
        `/${postId}/comments/${commentId}`
    );
  }
  requestAddReply(replyBody, scope, scopeId, postId, commentId) {
    return this.http.post(
      replacePostsUrl(endPoints, scope, scopeId) +
        `/${postId}/comments/${commentId}/replies`,
      {
        body: replyBody,
      }
    );
  }
  requestEditReply(replyBody, scope, scopeId, postId, commentId, replyId) {
    return this.http.put(
      replacePostsUrl(endPoints, scope, scopeId) +
        `/${postId}/comments/${commentId}/replies/${replyId}`,
      { body: replyBody }
    );
  }
  requestDeleteReply(scope, scopeId, postId, commentId, replyId) {
    return this.http.delete(
      replacePostsUrl(endPoints, scope, scopeId) +
        `/${postId}/comments/${commentId}/replies/${replyId}`
    );
  }
}
