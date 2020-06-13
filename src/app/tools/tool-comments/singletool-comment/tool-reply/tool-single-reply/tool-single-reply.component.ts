import { Component, OnInit ,Input} from '@angular/core';
import { ToolService } from 'src/app/tools/services/tool.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tool-single-reply',
  templateUrl: './tool-single-reply.component.html',
  styleUrls: ['./tool-single-reply.component.scss']
})
export class ToolSingleReplyComponent implements OnInit {

  @Input() reply;
  @Input() user;
  @Input() tool;
  @Input() comment;
  replyBody;
  editing = false;
  
  constructor(
    private toolService: ToolService,
    private httpService:HttpService,
  ) {}

  ngOnInit(): void {
    this.replyBody = this.reply.body;
  }
  onEditReply() {
    this.editing = true;
  }
  onUpdateReply() {
    this.httpService.requestEditReply(this.replyBody,this.comment.id,this.reply.id).subscribe(
      result=>{
        this.reply.body=this.replyBody;
      },
      error=>{
        console.log(error)
      }
    )
    this.editing = false;

  }
  onDeleteReply() {
    this.httpService.requestDeleteReply(this.comment.id,this.reply.id).subscribe(
      result=>{
        console.log(result)
        this.toolService.deleteReplay(this.comment,this.reply)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
