import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbW98sr91eQL1D8sZFUxSdPXZdF2lHzns',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((res: any) => {
          const user = new User(res.email, res.localId, res.idToken);
          this.user.next(user);
        })
      );
  }
}
