import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SendService } from '../services/send-service.service';
import { User } from 'src/app/auth/user.model';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message';
@Component({
  selector: 'send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss'],
})
export class SendFormComponent implements OnInit {
  @Input() messages: Array<any>;
  @Input() currentUser: User;
  @Input() receiverId: string;
  @Output() receiversChanged = new EventEmitter();
  @Output() firstMessageChanged = new EventEmitter();
  firstMessage = true;

  public newMessage: string;
  constructor(
    private router: Router,
    private sendService: SendService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.sendService.getSubject().subscribe((res) => {
      this.firstMessage = true;
    });
  }

  sendMessage() {
    this.sendService.setReceiverId(this.receiverId);
    const message = this.newMessage.trim();
    if (message) {
      this.sendService.sendMessage(message, this.receiverId).subscribe(
        (res) => {
          this.newMessage = '';
          if (this.messages.length == 0 || this.firstMessage) {
            this.refreshReceiversList();
          }

          if (this.firstMessage) {
            this.firstMessage = false;
          }

          this.messages.push(
            new Message(
              res.data.message.id,
              message,
              {
                id: this.currentUser.id,
                avatar: null,
                name: null,
              },
              {
                id: null,
                avatar: null,
                name: null,
              },
              res.data.message.created_at,
              res.data.message.created_at_human
            )
          );
        },
        (err) => {}
      );
    }
  }
  onKeyDown(e) {
    if (e.keyCode == 13) {
      //Enter
      e.preventDefault();
      this.sendMessage();
    }
  }

  refreshReceiversList() {
    this.chatService.getAllReceivers(this.currentUser).subscribe((res) => {
      this.receiversChanged.emit(res.data.receivers);
    });
  }

  scrollChat() {
    // const historyEle: HTMLElement = document.querySelector('.msg_history');
    // historyEle.scrollBy(0, historyEle.scrollHeight);
    // historyEle.scrollBy(0, 5000 );
  }
}
