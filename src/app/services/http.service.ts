import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const endPoints = {
  csrf: 'http://localhost:8000/sanctum/csrf-cookie',
  login: 'http://localhost:8000/api/v1/login',
  logout: 'http://localhost:8000/api/v1/logout',
  register: '',
  studentDepartmentGroup: '',
  studentFacultyGroup: '',
  professorDepartments: '',
  professorFaculties: '',
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /*this service will handle any http request to centralize all
        http requests
    */
  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, body: any) {
    return this.http.post(url, body);
  }

  requestLogin(loginData: {
    email: string;
    password: string;
    device_name: string;
  }) {
    return this.post(endPoints.login, loginData);
  }

  requestLogout(deviceName: string) {
    return this.post(endPoints.logout, deviceName);
  }

  requestCSRF() {
    this.get(endPoints.csrf).subscribe((res) => {
      console.log(res);
    });
  }
}
