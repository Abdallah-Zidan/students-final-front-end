import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendService {
  private receiverId;
  private subject = new Subject();
  private url = 'http://localhost:8000/api/v1/messages/';

  constructor(private http: HttpClient) {}

  sendMessage(message, receiverID): Observable<any> {
    let data = {
      text: message,
      receiver:receiverID
    };
    return this.http.post(this.url, data);
  }
  setReceiverId(receiverId)  {
    this.receiverId = receiverId;
    this.subject.next(receiverId);
  }

  getSubject()
  {
    return this.subject.asObservable();
  }
}
