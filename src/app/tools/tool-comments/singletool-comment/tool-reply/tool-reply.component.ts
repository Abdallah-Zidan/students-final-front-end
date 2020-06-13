import { Component, OnInit,Input } from '@angular/core';
import { ToolService } from 'src/app/tools/services/tool.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tool-reply',
  templateUrl: './tool-reply.component.html',
  styleUrls: ['./tool-reply.component.scss']
})
export class ToolReplyComponent implements OnInit {

  panelOpenState = false;
  @Input() replies;
  @Input() tool;
  @Input() comment;
  user;
  body = null;

  constructor(
    private toolService: ToolService,
    private storageService:StorageService,
    private httpService:HttpService,
    ){}

  ngOnInit(): void {
    this.user = this.storageService.getUser('user');
  }

  onAddReply() {
    this.httpService.requestAddReply(this.body,this.comment.id).subscribe(
      result=>{
        this.toolService.addReplay(this.comment,result,this.body,this.user);
        this.body=null;
      },
      error=>{
        console.log(error)
      }
    )
    // this.toolService.addReply(
    //   this.body,
    //   this.postId,
    //   this.commentId
    // );
    // setTimeout(() => {
    //   this.body = '';
    // }, 1500);
  }

}
