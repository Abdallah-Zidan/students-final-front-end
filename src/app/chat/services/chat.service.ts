import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public receiverId;
  public token;
  constructor(private http: HttpClient) {}

  getAllReceivers(user: User, page = null): Observable<any> {
    this.token = user.token;
    return this.http.get('http://127.0.0.1:8000/api/v1/receivers', {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      params: {
        page: page,
      },
    });
  }

  getAllMessages(receiverId, page = null): Observable<any> {
    this.receiverId = receiverId;
    return this.http.get(
      'http://127.0.0.1:8000/api/v1/messages/' + this.receiverId,
      {
        headers: { Authorization: 'Bearer ' + this.token },
        params: {
          page: page,
        },
      }
    );

  }
  setReceiverId(receiverId) {
    this.receiverId = receiverId;
  }
}
