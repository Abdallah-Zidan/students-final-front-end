import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  question;

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpService:HttpService,
    private questionService:QuestionService,
  ) { }

  ngOnInit(): void {
    this.questionService.question.subscribe(
      res => {this.question = res});
      console.log(this.question)
  }

}
