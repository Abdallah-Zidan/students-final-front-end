import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { HttpService } from 'src/app/services/http.service';
import { GroupsService } from 'src/app/services/groups.service';

/*
this service will handle all login , logout , register operations for the whole app
and contains a user subject to subscribe to any time for checking user status 
logged in or not
*/

const authEndPoints = {
  csrf: 'http://localhost:8000/sanctum/csrf-cookie',
  login: 'http://localhost:8000/api/v1/login',
  register: 'http://localhost:8000/api/v1/register',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenTimer: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
    private http: HttpClient,
    private groupsService: GroupsService
  ) {}

  login(email: string, password: string) {
    return this.httpService
      .requestLogin({
        email: email,
        password: password,
        device_name: navigator.platform,
      })
      .pipe(
        tap((res: any) => {
          const { user, token } = res.data;
          const currentUser = new User(
            user.id,
            user.name,
            user.email,
            user.type,
            user.address,
            user.mobile,
            user.avatar,
            user.verified,
            token.access_token,
            this.getFaculty(user),
            this.getUniversity(user),
            new Date(token.expired_at)
          );
          if (currentUser.isVerified) {
            this.user.next(currentUser);
            this.storageService.saveItem('user', currentUser);
            this.groupsService.getGroups(currentUser);
          } else {
            this.router.navigate(['/']);
          }
        })
      );
  }
  getFaculty(user) {
    if (user.type === 'Moderator') {
      return { id: user.profile.faculty.id, name: user.profile.faculty.name };
    } else {
      return null;
    }
  }
  getUniversity(user) {
    if (user.type === 'Moderator') {
      return {
        id: user.profile.faculty.university.id,
        name: user.profile.faculty.university.name,
      };
    } else {
      return null;
    }
  }
  autoLogin() {
    const user = this.storageService.getUser('user');
    if (user) {
      if (user.token && user.isVerified == true) {
        this.user.next(user);
        this.groupsService.getGroups(user);
      }
    }
    this.autoLogout(user.tokenExpDate);
  }

  logout() {
    this.httpService.requestLogout(navigator.platform).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.user.next(null);
          this.storageService.removeItem('user');
          this.storageService.removeItem('groups');
          if (this.tokenTimer) {
            clearTimeout(this.tokenTimer);
          }
          this.tokenTimer = null;
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  register(user) {
    return this.http
      .post(authEndPoints.register, {
        name: user.name,
        password: user.password,
        email: user.email,
        address: user.address,
        mobile: user.phone,
        gender: user.gender,
        birthdate: user.birthdate,
        year: user.level,
        departments: user.departments,
        faculty: user.faculty,
        fax: user.fax,
        website: user.website,
        description: user.description,
        type: user.type,
        blocked: user.blocked,
        device_name: navigator.platform,
      })
      .pipe(
        tap((res: any) => {
          const { token } = res.data;
        })
      );
  }
  autoLogout(expirationDate: Date) {
    const nowDate = new Date();
    console.log(nowDate);
    if (nowDate.getTime() > expirationDate.getTime()) {
      this.logout();
    } else {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expirationDate.getTime() - nowDate.getTime());
    }
  }
}
