import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

/*
this service will handle all login , logout , register operations for the whole app
and contains a user subject to subscribe to any time for checking user status 
logged in or not
*/

const authEndPoints = {
  login:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbW98sr91eQL1D8sZFUxSdPXZdF2lHzns',
  register: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  login(email: string, password: string) {
    return this.http
      .post(authEndPoints.login, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res: any) => {
          const user = new User(res.email, res.localId, res.idToken);
          this.user.next(user);
          this.storageService.saveItem('user', user);
        })
      );
  }

  autoLogin() {
    const user = this.storageService.getUser('user');
    if (user) {
      if (user.token) {
        this.user.next(user);
      }
    }
  }

  logout() {
    this.user.next(null);
    this.storageService.removeItem('user');
    this.router.navigate(['/login']);
  }
}
