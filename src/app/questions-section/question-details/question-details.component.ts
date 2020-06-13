import { Component, OnInit, Input,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { QuestionService } from '../question.service';
import { StorageService } from 'src/app/services/storage.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  question;
  QuestionId;
  QuestionsList;
  questionTags;
  user;
  CommentBody;
  isEmpty=false;
  editing=false;
  result;

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpService:HttpService,
    private questionService:QuestionService,
    private storageService:StorageService,
    private route:Router,
    public dialog: MatDialog,
    public deleteDialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.user=this.storageService.getItem('user')
    this.activatedRoute.paramMap.subscribe(params => { 
      this.QuestionId = params.get('question'); 

    });

    this.questionService.QuestionsList.subscribe(
      res => {
                if(!res)
                {
                  this.httpService.requestQuestions(null).subscribe(
                    res => {
                            this.QuestionsList = res;
                            this.question=this.QuestionsList.data.questions.find(x=>x.id==this.QuestionId);
                            this.question=this.getTagsNames(this.question);  
                          },
                    err=>{console.log(err);});
                }
                else
                {
                  this.question = res.find(x=>x.id==this.QuestionId);
                };
             },
      err => {
                console.log(err);
             });

this.httpService.requestTags(1).subscribe(
      result =>{
          this.result=result;
          this.questionTags=this.result.data.tags
          console.log(this.questionTags)
        },
      error=>{
          console.log(error);
        } 
        );

}

editQuestion(question){
  const OldQuestion=Object.assign({}, question);
  
  const dialogRef = this.dialog.open(EditQuestionDialog, {
    width: '500px',
    data: {question:question,questionTags:this.questionTags}
  });
  dialogRef.afterClosed().subscribe(result => {
    if(typeof result === 'undefined')
      {this.question=Object.assign({}, OldQuestion)}
    else
      { this.httpService.requestUpdatePost("questions",this.question,this.question.id).subscribe(
        result=>{console.log(result)},
        error=>{console.log(error)});
      }
    },
     error=>{console.log(error)}
    );
 }



deleteQuestion(question){
  const dialogRef = this.deleteDialog.open(DeleteQuestion);
  dialogRef.afterClosed().subscribe((result) => {
  if (result === true) {
    this.httpService.requestDeletePost("questions",question.id).subscribe(
      result=>{
                this.route.navigate(['/questions']);
               },
      error=>{console.log(error)}
      );

    }}
  );
}

getTagsNames(Question){
    
    let TagsNames:string[]=[]
    Question.tags.forEach(element => {
      TagsNames.push(element.name)
    });
    Question.tags=TagsNames;
    return Question
}

addComment()
{
 this.httpService.requestAddComment("questions",this.CommentBody, this.question.id).subscribe(
   result=>{
     this.questionService.addQuestionComment(this.question,result,this.CommentBody,this.user)
     this.CommentBody="";
   },
   error=>{console.log(error)});
 }


}

@Component({
  selector: 'edit-question-dialog',
  templateUrl: 'edit-question-dialog.html',
  styleUrls: ['./question-details.component.scss']
})
export class EditQuestionDialog  {

  constructor(
    public dialogRef: MatDialogRef<EditQuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data,public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
selector: 'delete-question',
templateUrl: 'delete-question.html',
})
export class DeleteQuestion {}