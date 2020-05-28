import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


const endPoints = {
  csrf: 'http://localhost:8000/sanctum/csrf-cookie',
  login: 'http://localhost:8000/api/v1/login',
  logout: 'http://localhost:8000/api/v1/logout',
  register: 'http://localhost:8000/api/v1/register',
  universites: 'http://localhost:8000/api/v1/university',
  verificationResend: 'http://localhost:8000/api/v1/email/resend',
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

  verifyEmail(user):Observable<HttpResponse<any>> 
  {
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + user._token.access_token);
    return this.http.get<any>(endPoints.verificationResend,{headers:headers_object, observe: 'response' });
  }
 
}
