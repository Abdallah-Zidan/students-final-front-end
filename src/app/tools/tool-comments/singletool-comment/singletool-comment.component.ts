import { Component, OnInit, Input } from '@angular/core';
import {StorageService} from '../../../services/storage.service'
import {HttpService} from '../../../services/http.service'
import { ToolService } from 'src/app/tools/services/tool.service';

@Component({
  selector: 'app-singletool-comment',
  templateUrl: './singletool-comment.component.html',
  styleUrls: ['./singletool-comment.component.scss']
})
export class SingletoolCommentComponent implements OnInit {

  @Input() comment;
  @Input() tool;
  
  isEmpty = true;
  user;
  editing = false;
  commentBody;
  constructor(
    private storageService:StorageService,
    private httpService:HttpService,
    private toolService:ToolService,
  ) {}

  ngOnInit(): void {
    this.commentBody = this.comment.body;
    this.user = this.storageService.getUser('user');
  }

 
  onEditComment() {
    this.editing = true;

  }
  onUpdateComment() {
    this.httpService.requestEditComment("tools",this.commentBody,this.tool.id,this.comment.id).subscribe(
      result=>{
        this.comment.body=this.commentBody;
      },
      error=>{
        console.log(error)
      }
    )
    this.editing = false;

  }
  onDeleteComment() {
    this.httpService.requestDeleteComment("tools",this.tool.id,this.comment.id).subscribe(
      result=>{
        this.toolService.deleteToolComment(this.tool,this.comment)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
