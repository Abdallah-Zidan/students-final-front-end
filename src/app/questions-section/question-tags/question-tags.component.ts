import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-tags',
  templateUrl: './question-tags.component.html',
  styleUrls: ['./question-tags.component.scss']
})
export class QuestionTagsComponent implements OnInit {

@Input() questionTags;
TempQuestions;
QuestionsList;
result;
@Input() choosing;
  constructor(
    private httpService:HttpService,
    private questionService:QuestionService,
  ) { }

  ngOnInit(): void {
  }

  onChooseTag(tag)
  {
    this.httpService.requestQuestions(tag).subscribe(
      res=>{
            this.TempQuestions=res;
            this.getTagsNames(this.TempQuestions.data.questions);
            this.QuestionsList=this.TempQuestions.data.questions;
            this.questionService.setQuestions(this.QuestionsList);
            this.choosing=true;
           },
           err=>{console.log(err)}
    )
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
}
