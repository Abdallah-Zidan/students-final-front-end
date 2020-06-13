import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionSub = new BehaviorSubject<any>(null);
  question = this.questionSub.asObservable();


  constructor() { }

  setUser(question) {
    this.questionSub.next(question)
  }
}
