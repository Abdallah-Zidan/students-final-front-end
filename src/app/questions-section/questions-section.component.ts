import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { QuestionService } from './question.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-questions-section',
  templateUrl: './questions-section.component.html',
  styleUrls: ['./questions-section.component.scss']
})
export class QuestionsSectionComponent implements OnInit {

  constructor(
    private httpService:HttpService,
    private storageService:StorageService,
    private router:Router,
    private questionService:QuestionService,
    public dialog: MatDialog,
  ) { }

  QuestionsList;questionTags;TempQuestions;
  SearchList;SearchTag;response=null;
  user;result;
  tags:Array<string> = [];
  title;body;

  ngOnInit(): void {
    this.httpService.requestQuestions(null).subscribe(
      res=>{
            this.TempQuestions=res;
            this.getTagsNames(this.TempQuestions.data.questions);
            this.QuestionsList=this.TempQuestions.data.questions;

            this.questionService.setQuestions(this.QuestionsList);
           },
           err=>{console.log(err)}
    )

    this.user=this.storageService.getItem('user');

    this.httpService.requestTags(1).subscribe(
      result =>{
        this.result=result;
        this.questionTags=this.result.data.tags
      },
      error=>{
        console.log(error);
      } 
    );
  }

  getTagsNames(Questions){
    
    Questions.forEach(Question => {
      let TagsNames:string[]=[]
      Question.tags.forEach(element => {
        TagsNames.push(element.name)
      });
      Question.tags=TagsNames;
    });
  }

 addQuestion(){
    
    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '500px',
      data: {title:this.title,body:this.body,tags:this.tags,questionTags:this.questionTags}
    });
    dialogRef.afterClosed().subscribe(result => {

      const formData = new FormData();
      formData.append('title', result.title);
      formData.append('body', result.body);
     
      if(this.tags!=null){
        for (const tag of result.tags) {
          formData.append('tags[]', tag);}
       }

      this.httpService.requestAddPost('questions',formData).subscribe(
        res=>{
          this.questionService.addQuestion(res,this.user,result.title, result.body,result.tags)
        },
        err=>{
          console.log(err)
        }
      );
        
      },
       error=>{console.log(error)}
      );
   }


search(){
  if(this.SearchTag==null)
  {
    this.response="Please insert tag"
          setTimeout(() => {
            this.response = null;
          }, 4000);
  }
  else
  { 
        if(this.SearchList.data.tools.length>0)
        {   
        }
        else{
          this.response="Not Found"
          setTimeout(() => {
            this.response = null;
          }, 4000);
        }
         
  }
    this.SearchTag=null;
  }
}


@Component({
  selector: 'add-question-dialog',
  templateUrl: 'add-question-dialog.html',
  styleUrls: ['./questions-section.component.scss']
})
export class AddQuestionDialog  {

  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data,public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}