import { Component, OnInit, Input } from '@angular/core';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { Group } from 'src/app/shared/models/group.model';
import { StorageService } from 'src/app/services/storage.service';
import { TutorialService } from 'src/app/tutorials/models/services/tutorial.service';

@Component({
  selector: 'app-tutorial-singlereply',
  templateUrl: './tutorial-singlereply.component.html',
  styleUrls: ['./tutorial-singlereply.component.scss']
})
export class TutorialSinglereplyComponent implements OnInit {

  @Input() reply: CommentReply;
  @Input() group: Group;
  @Input() postId;
  @Input() commentId;
  user;
  replyBody;
  editing = false;
  constructor(
    private storageService: StorageService,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.replyBody = this.reply.body;
    this.user = this.storageService.getUser('user');
  }
  onEditReply() {
    console.log("edit");
    this.editing = true;
  }
  onUpdateReply() {
    this.tutorialService
      .updateReply(this.replyBody, this.commentId, this.reply.id)
      .subscribe((res) => {
        console.log(res);
        this.editing = false;
        this.reply.body = this.replyBody;
      });
  }
  onDeleteReply() {
    this.tutorialService.deleteReply(this.postId, this.commentId, this.reply.id);
  }

}
