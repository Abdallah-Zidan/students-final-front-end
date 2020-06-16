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
  currentUserData: 'http://localhost:8000/api/v1/user/profile',
  userData: 'http://localhost:8000/api/v1/user/profile/{id}',
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
  CloseTool:'http://localhost:8000/api/v1/tools/close',
  
  report: 'http://localhost:8000/api/v1/posts/report',
  questions: 'http://localhost:8000/api/v1/questions',
  rates: 'http://localhost:8000/api/v1/comments/{comment_id}/rates'

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

  getUser(profileId) {
    if(profileId)
      return this.http.get<any>(endPoints.userData.replace('{id}', profileId));
    else
      return this.http.get<any>(endPoints.currentUserData);     
  }

  getuserDepartment() {
    return this.http.get<any>(endPoints.userDepartment);
  }

  updateProfile(user) {
    return this.http.post<any>(endPoints.currentUserData, user);
  }

  requestGroups() {
    return this.http.get(endPoints.groups);
  }
  requestPosts(resource, scope, scopeId, type, page) {
    return this.http.get(
      getResourceUrlGet(endPoints.getResources, resource, scope, scopeId, type,page)
    );
  }

  
  requestAddPost(resource, data: FormData) {
    console.log(resource);
    console.log(data.get('body'));
    console.log(getResourcesUrl(endPoints.resources, resource));
    return this.http.post(getResourcesUrl(endPoints.resources, resource), data);
  }
  requestUpdatePost(resource, data, resourceId) {
    return this.http.put(
      getResourcesUrl(endPoints.resources, resource, resourceId),
      data
    );
  }
  requestDeletePost(resource, resourceId) {
    return this.http.delete(
      getResourcesUrl(endPoints.resources, resource, resourceId)
    );
  }
  requestReportPost(resourceId) {
    return this.http.post(endPoints.report, {
      id: resourceId,
    });
  }
  requestAddComment(resource, commentBody: string, resourceId: string) {
    console.log(
      getCommentsUrl(endPoints.comments, resource, resourceId) +
        `/${resourceId}/comments`
    );
    return this.http.post(
      getCommentsUrl(endPoints.comments, resource, resourceId),
      {
        body: commentBody,
      }
    );
  }
  requestEditComment(resource, commentBody, resourceId, commentId) {
    return this.http.put(
      getCommentsUrl(endPoints.comments, resource, resourceId, commentId),
      {
        body: commentBody,
      }
    );
  }
  requestDeleteComment(resource, resourceId, commentId) {
    return this.http.delete(
      getCommentsUrl(endPoints.comments, resource, resourceId, commentId)
    );
  }
  requestAddReply(replyBody, commentId) {
    return this.http.post(getRepliesUrl(endPoints.replies, commentId), {
      body: replyBody,
    });
  }
  requestEditReply(replyBody, commentId, replyId) {
    return this.http.put(getRepliesUrl(endPoints.replies, commentId, replyId), {
      body: replyBody,
    });
  }
  requestDeleteReply(commentId, replyId) {
    return this.http.delete(
      getRepliesUrl(endPoints.replies, commentId, replyId)
    );
  }

  requestTags(scope){
    return this.http.get(endPoints.tags,{params:{scope:scope}});
  }

  
  requestTools(type,tags,page){
    if(!tags)
    {return this.http.get(endPoints.tools,{ params: {type:type,page:page} });}
    else
    {return this.http.get(endPoints.tools,{ params: {type:type,tags:tags,page:page} });}
  }


  requestCloseTool(resourceId) {
    return this.http.post(endPoints.CloseTool, {id: resourceId});
  }
  
  requestQuestions(tags){
    if(!tags)
    {return this.http.get(endPoints.questions);}
    else
    {return this.http.get(endPoints.questions,{ params: {tags:tags} });}
  }

 requsetEditRates(rate, commentId,comment){
  return this.http.post(endPoints.rates.replace('{comment_id}', commentId), {
    rate: rate,
    comment:comment,
  });
 }
 

}
