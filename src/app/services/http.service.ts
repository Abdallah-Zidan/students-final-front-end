import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  getResourceUrlGet,
  getCommentsUrl,
  getResourcesUrl,
  getRepliesUrl,
} from './url.helper';

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
  getResources:
    'http://localhost:8000/api/v1/{resource}?group={scope}&group_id={scope_id}&type={type}',
  resources: 'http://localhost:8000/api/v1/{resource}',
  comments: 'http://localhost:8000/api/v1/{resource}/{resource_id}/comments',
  replies: 'http://localhost:8000/api/v1/comments/{comment_id}/replies',

  tools: 'http://localhost:8000/api/v1/tools',
  tags:  'http://localhost:8000/api/v1/tags',
  CloseTool:'http://localhost:8000/api/v1/tools/close'
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

  verifyEmail(token): Observable<HttpResponse<any>> {
    let headers_object = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token
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
    return this.http.post<any>(endPoints.userData, user);
  }

  requestGroups() {
    return this.http.get(endPoints.groups);
  }
  requestPosts(resource,scope, scopeId, page) {
    return this.http.get(
      getResourceUrlGet(endPoints.getResources, resource, scope, scopeId)
    );
  }

  requestTools(type,tags){
    if(!tags)
    {return this.http.get(endPoints.tools,{ params: {type:type} });}
    else
    {return this.http.get(endPoints.tools,{ params: {type:type,tags:tags} });}
  }
  requestAddPost(postBody, postFiles, scope, scopeId) {
    const formData = new FormData();
    formData.append('body', postBody);
    formData.append('group', scope);
    formData.append('group_id', scopeId);
    for (const file of postFiles) {
      formData.append('files[]', file);
    }

    console.log(formData.getAll('files'));

    return this.http.post(
      getResourcesUrl(endPoints.resources, 'posts'),
      formData
    );
  }
  requestUpdatePost(resourceBody, scope, scopeId, resourceId) {
    return this.http.put(
      getResourcesUrl(endPoints.resources, 'posts', resourceId),
      {
        body: resourceBody,
      }
    );
  }
  requestDeletePost(scope, scopeId, resourceId) {
    return this.http.delete(
      getResourcesUrl(endPoints.resources, 'posts', resourceId)
    );
  }
  requestAddComment(
    commentBody: string,
    resourceId: string
  ) {
    console.log(
      getCommentsUrl(endPoints.comments, 'posts', resourceId) +
        `/${resourceId}/comments`
    );
    return this.http.post(
      getCommentsUrl(endPoints.comments, 'posts', resourceId),
      {
        body: commentBody,
      }
    );
  }
  requestEditComment(commentBody, resourceId, commentId) {
    return this.http.put(
      getCommentsUrl(endPoints.comments, 'posts', resourceId, commentId),
      {
        body: commentBody,
      }
    );
  }
  requestDeleteComment( resourceId, commentId) {
    return this.http.delete(
      getCommentsUrl(endPoints.comments, 'posts', resourceId, commentId)
    );
  }
  requestAddReply(replyBody, commentId) {
    return this.http.post(getRepliesUrl(endPoints.replies, commentId), {
      body: replyBody,
    });
  }
  requestEditReply(replyBody,  commentId, replyId) {
    return this.http.put(getRepliesUrl(endPoints.replies, commentId, replyId), {
      body: replyBody,
    });
  }
  requestDeleteReply( commentId, replyId) {
    return this.http.delete(
      getRepliesUrl(endPoints.replies, commentId, replyId)
    );
  }

  requestTags(scope){
    return this.http.get(endPoints.tags,{params:{scope:scope}});
  }

  requestAddTool(ToolData){
    return this.http.post(getResourcesUrl(endPoints.resources, 'tools'),ToolData);
  }
  requestUpdateTool(resourceBody, resourceId) {
    return this.http.put(
      getResourcesUrl(endPoints.resources, 'tools', resourceId),resourceBody);
  }
  
  requestDeleteTool(resourceId) {
    return this.http.delete(
      getResourcesUrl(endPoints.resources, 'tools', resourceId)
    );
  }

  requestCloseTool(resourceId) {
    console.log(resourceId)
    return this.http.post(endPoints.CloseTool,resourceId);
  }
  
  requestAddToolComment(commentBody: string,resourceId: string) {
    console.log(
      getCommentsUrl(endPoints.comments, 'tools', resourceId) +
        `/${resourceId}/comments`
    );
    return this.http.post(
      getCommentsUrl(endPoints.comments, 'tools', resourceId),
      {
        body: commentBody,
      }
    );
  }

  requestEditToolComment(commentBody, resourceId, commentId) {
    return this.http.put(
      getCommentsUrl(endPoints.comments, 'tools', resourceId, commentId),
      {
        body: commentBody,
      }
    );
  }
  requestDeleteToolComment( resourceId, commentId) {
    return this.http.delete(
      getCommentsUrl(endPoints.comments, 'tools', resourceId, commentId)
    );
  }
}
