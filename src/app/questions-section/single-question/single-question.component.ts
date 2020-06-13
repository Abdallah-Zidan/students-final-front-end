import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss']
})
export class SingleQuestionComponent implements OnInit {

  constructor(
    private storageService:StorageService,
    private httpService:HttpService,
    private router:Router,
    private questionService:QuestionService,
  ) { }
  @Input() question;
  @Input() user;
  @Input() QuestionTags;

  ngOnInit(): void {

    this.questionService.setUser(this.question);
    console.log(this.question)

  }
  
}