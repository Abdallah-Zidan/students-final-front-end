import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ToolService } from '../tools/services/tool.service';

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
    private toolService:ToolService) { }

  QuestionsList;QuestionTags;TempQuestions;
  SearchList;SearchTag;response=null;
  user;result;

  ngOnInit(): void {
    this.httpService.requestQuestions(null).subscribe(
      res=>{console.log(res)
        this.TempQuestions=res;
        this.getTagsNames(this.TempQuestions.data.questions);
        this.QuestionsList=this.TempQuestions.data.questions;
           },
      err=>{console.log(err)}
    )

    this.user=this.storageService.getItem('user');
    this.httpService.requestTags(0).subscribe(
      result =>{
        this.result=result;
        this.QuestionTags=this.result.data.tags
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

