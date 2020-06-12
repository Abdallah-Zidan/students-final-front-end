import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../models/message';
import Pusher from 'pusher-js';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/auth/user.model';

@Injectable()
export class FeedService {
  private subject: Subject<Message> = new Subject<Message>();
  private pusherClient: Pusher;
  private event = 'message.sent';
  private channel: string;
  private user: User;
  private pusherAppId = 'c6908de3c6904b8babfb';

  constructor(private storage: StorageService) {
    this.user = this.storage.getUser('user');
    this.channel = `private-chat.${this.user.id}`;
    this.pusherClient = new Pusher(this.pusherAppId, {
      cluster: 'eu',
      authEndpoint: 'http://localhost:8000/broadcasting/auth',
      auth: {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      },
    });

    const channel = this.pusherClient.subscribe(this.channel);

    channel.bind(this.event, (res) => {
      this.subject.next(
        new Message(
          res.message.id,
          res.message.text,
          res.message.from,
          res.message.to,
          res.message.created_at,
          res.message.created_at_human
        )
      );
    });
  }

  getFeedItems(): Observable<Message> {
    return this.subject.asObservable();
  }
}
