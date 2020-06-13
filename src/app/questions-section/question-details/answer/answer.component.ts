import { Component, OnInit,Input } from '@angular/core';
import {StorageService} from '../../../services/storage.service'
import {HttpService} from '../../../services/http.service'
import { QuestionService } from '../../question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
@Input() comment;
@Input() question;
isEmpty = true;
user;
editing = false;
commentBody;
  constructor(
    private storageService:StorageService,
    private httpService:HttpService,
    private questionService:QuestionService,
  ) { }

  ngOnInit(): void {
    this.commentBody = this.comment.body;
    this.user = this.storageService.getUser('user');
  }

  
 
  onEditComment() {
    this.editing = true;

  }
  onUpdateComment() {
    this.httpService.requestEditComment("questions",this.commentBody,this.question.id,this.comment.id).subscribe(
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
    this.httpService.requestDeleteComment("questions",this.question.id,this.comment.id).subscribe(
      result=>{
        this.questionService.deleteQuestionComment(this.question,this.comment)
      },
      error=>{
        console.log(error)
      }
    )
  }

  likeComment(){
    this.httpService.requsetEditRates(1,this.comment.id,this.comment).subscribe(
      res=>{
        this.comment.rates-= -1;
        this.comment.rated=1;
      },
      error=>{
        console.log(error)
      }
    )
   
  }
  dislikeComment(){
    this.httpService.requsetEditRates(-1,this.comment.id,this.comment).subscribe(
      res=>{
        this.comment.rates-= 1
        this.comment.rated=-1;
      },
      error=>{
        console.log(error)
      }
    )
   
  }

}





 

