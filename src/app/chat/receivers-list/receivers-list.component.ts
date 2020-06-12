import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User } from 'src/app/auth/user.model';
import { SendService } from '../services/send-service.service';
import { FeedService } from '../services/feed.service';

@Component({
  selector: 'app-receivers-list',
  templateUrl: './receivers-list.component.html',
  styleUrls: ['./receivers-list.component.scss'],
})
export class ReceiversListComponent implements OnInit {
  @Input() currentUser: User;
  @Input() receivers;
  @Input() activeChat;
  @Input() blinkingId ;
  currentPage;
  nextPage;
  public more = false;
  public newMessageId;

  constructor(
    private chatService: ChatService,
    private sendService: SendService,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    this.chatService.getAllReceivers(this.currentUser).subscribe(
      (res) => {
        this.receivers = res.data.receivers;
       
      },
      (err) => {}
    );
    this.feedService.getFeedItems().subscribe(res => {
      this.newMessageId = res.id;
    })
  }

  onClick(id) {
    this.activeChat = id;
    this.sendService.setReceiverId(id);
  }
}
