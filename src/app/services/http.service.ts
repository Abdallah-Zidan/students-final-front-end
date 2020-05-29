import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const endPoints = {
  csrf: 'http://localhost:8000/sanctum/csrf-cookie',
  login: 'http://localhost:8000/api/v1/login',
  logout: 'http://localhost:8000/api/v1/logout',
  register: 'http://localhost:8000/api/v1/register',
  groups: 'http://localhost:8000/api/v1/user/departments',
  posts: 'http://localhost:8000/api/v1/posts',
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
  requestGroups() {
    return this.http.get(endPoints.groups);
  }
  requestPosts(scope, scopeId, page) {
    return this.http.get(endPoints.posts, {
      params: new HttpParams()
        .append('scope', scope)
        .append('scope_id', scopeId)
        .append('page', page),
    });
  }
}
