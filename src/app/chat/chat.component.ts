import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../auth/user.model';
import { FeedService } from './services/feed.service';
import { Subscription, Observable } from 'rxjs';
import { Message } from './models/message';
import { SendService } from './services/send-service.service';
import { ChatService } from './services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [FeedService],
})
export class ChatComponent implements OnInit, OnDestroy {
  public currentUser: User;
  public messages: Message[] = [];
  private feedSubscription: Subscription;
  public newMessage: string;
  public receiverId: string;
  public more = false;
  private currentPage;
  private nextPage;
  public receivers;
  firstMessage;
  blinkingId;
  inMore = false;
  msgRefChangesSubscribtion: Subscription;
  @ViewChildren('msgRef') msgRef: QueryList<any>;

  @HostListener('wheel', ['$event']) onMouseWheel(e) {
    if (e.target.scrollTop == 0 && this.currentPage != this.nextPage) {
      this.more = true;
    } else {
      this.more = false;
    }
  }

  constructor(
    private storage: StorageService,
    private feedService: FeedService,
    private chatService: ChatService,
    private activeRoute: ActivatedRoute,
    private sendSerivce: SendService
  ) {
    this.currentUser = this.storage.getUser('user');
    this.feedSubscription = feedService.getFeedItems().subscribe((message) => {
      this.messages.push(message);

      if (message.from.id != this.receiverId) {
        this.blinkingId = message.from.id;
        this.refreshReceiversList();
      } else {
        this.inMore = false;
      }
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((map) => {
      this.receiverId = map['id'];
      this.firstMessage = true;
      if(this.receiverId)
      this.chatService.getAllMessages(this.receiverId).subscribe(
        (res) => {
          this.messages = res.data.messages;
          this.messages.reverse();

          this.msgRefChangesSubscribtion = this.msgRef.changes.subscribe(
            (res) => {
              if (!this.inMore)
                this.msgRef.last.nativeElement.scrollIntoView({
                  behavior: 'smooth',
                });
            }
          );
          //set pages
          this.currentPage = res.meta.current_page;
          if (this.currentPage < res.meta.last_page) {
            this.nextPage = this.currentPage + 1;
          } else {
            this.nextPage = this.currentPage;
          }
        },
        (err) => {}
      );
    });

    this.sendSerivce.getSubject().subscribe((res:string) => {
      this.inMore = false;
      this.receiverId = res;
    });
  }

  onMore() {
    this.inMore = true;
    this.chatService.getAllMessages(this.receiverId, this.nextPage).subscribe(
      (res) => {
        this.messages = res.data.messages.reverse().concat(this.messages);
        //set pages
        this.currentPage = res.meta.current_page;
        if (this.currentPage < res.meta.last_page) {
          this.nextPage = this.currentPage + 1;
        } else {
          this.more = false;
        }
      },
      (err) => {}
    );
  }

  onReceiversChanged(receivers) {
    this.receivers = receivers;
  }

  refreshReceiversList() {
    this.chatService.getAllReceivers(this.currentUser).subscribe((res) => {
      this.receivers = res.data.receivers;
    });
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

}
