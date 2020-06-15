import { Component, OnInit, Input } from '@angular/core';
import { CommentReply } from 'src/app/shared/models/reply.model';
import { Group } from 'src/app/shared/models/group.model';
import { TutorialService } from 'src/app/tutorials/models/services/tutorial.service';

@Component({
  selector: 'app-tutorial-replies',
  templateUrl: './tutorial-replies.component.html',
  styleUrls: ['./tutorial-replies.component.scss']
})
export class TutorialRepliesComponent implements OnInit {
  panelOpenState = false;
  @Input() replies: CommentReply[];
  @Input() postId;
  @Input() group: Group;
  @Input() commentId;
  body = '';
  isEmpty = true;
  constructor(private tutorialService:TutorialService) { }

  ngOnInit(): void {
  }
  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  onAddReply() {
    console.log("sadsa");
    
    this.tutorialService.addReply(
      this.body,
      this.postId,
      this.commentId
    );
    setTimeout(() => {
      this.body = '';
    }, 1500);
  }

}
