import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionSub = new BehaviorSubject<any>(null);
  private questionSearch = new BehaviorSubject<any>(null);

  QuestionsList = this.questionSub.asObservable();
  SearchList = this.questionSearch.asObservable();


  constructor() { }
  question;
  setQuestions(questions) {
    this.questionSub.next(questions)
  }

  setSearchQuestions(questions) {
    this.questionSearch.next(questions)
  }

  addQuestion(result,user,title,body,tags){
     this.question={
       "id": result.data.question.id,
       "title":title,
       "body":body,
       "user":{id:user.id,name:user.name,avatar:user.avatar},
       "comments":[],
       "tags":this.addTags(tags),
       "created_at": "",
       "created_at_human": "now"
     }
     
     this.questionSub.value.unshift( this.question);
    }

    addTags(tags)
    {
      let tagsArray: Array<any> =[];
        tags.forEach((tag) => {
          tagsArray.push(tag);
      });
        return tagsArray; 
    } 
// ========================================================================
  addQuestionComment(question,comment,commentBody,user)
  {    
    question.comments.push({
      id:comment.data.comment.id,
      body:commentBody,
      user:user,
      created_at_human: "now",
      rated: 0,
      rates: 0
    })
  }

  
  deleteQuestionComment(question,comment)
  { let removeIndex;
    removeIndex=question.comments.indexOf(comment)
    question.comments.splice(removeIndex, 1); 
  }
}
