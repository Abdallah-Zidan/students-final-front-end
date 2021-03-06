import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { QuestionService } from './question.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import AOS from 'aos';

@Component({
  selector: 'app-questions-section',
  templateUrl: './questions-section.component.html',
  styleUrls: ['./questions-section.component.scss']
})
export class QuestionsSectionComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private questionService: QuestionService,
    public dialog: MatDialog,
  ) { }

  QuestionsList; questionTags; TempQuestions;
  SearchTag; response = null;
  user; result;
  tags: Array<string> = [];
  title; body;
  recent = true;

  ngOnInit(): void {
    // AOS.init();
    this.httpService.requestQuestions(null).subscribe(
      res => {
        this.TempQuestions = res;
        this.getTagsNames(this.TempQuestions.data.questions);
        this.QuestionsList = this.TempQuestions.data.questions;
        this.questionService.setQuestions(this.QuestionsList);
      },
      err => { console.log(err) }
    )

    this.user = this.storageService.getItem('user');

    this.httpService.requestTags(1).subscribe(
      result => {
        this.result = result;
        this.questionTags = this.result.data.tags
      },
      error => {
        console.log(error);
      }
    );
  }

  getTagsNames(Questions) {

    Questions.forEach(Question => {
      let TagsNames: string[] = []
      Question.tags.forEach(element => {
        TagsNames.push(element.name)
      });
      Question.tags = TagsNames;
    });
  }

  addQuestion() {

    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '500px',
      data: { title: this.title, body: this.body, tags: this.tags, questionTags: this.questionTags }
    });
    dialogRef.afterClosed().subscribe(result => {

      const formData = new FormData();
      formData.append('title', result.title);
      formData.append('body', result.body);

      if (this.tags != null) {
        for (const tag of result.tags) {
          formData.append('tags[]', tag);
        }
      }

      this.httpService.requestAddPost('questions', formData).subscribe(
        res => {
          this.questionService.addQuestion(res, this.user, result.title, result.body, result.tags)
        },
        err => {
          console.log(err)
        }
      );

      this.tags = [];

    },
      error => { console.log(error) }
    );
  }


  search() {
    if (this.SearchTag == null) {
      this.response = "Please insert tag"
      setTimeout(() => {
        this.response = null;
      }, 3000);
    }
    else {
      this.httpService.requestQuestions(this.SearchTag).subscribe(
        res => {
          this.TempQuestions = res;
          if (this.TempQuestions.data.questions.length > 0) {
            this.getTagsNames(this.TempQuestions.data.questions);
            this.QuestionsList = this.TempQuestions.data.questions;
          }
          else {
            this.response = "Not Found"
            setTimeout(() => {
              this.response = null;
            }, 4000);
          }
        },
        err => { console.log(err) }
      )
    }
    this.SearchTag = null;
  }

  showRecent() {
    this.questionService.QuestionsList.subscribe(res => this.QuestionsList = res);
    this.recent = true;
  }
  showTags() {
    this.recent = false;
  }
}


@Component({
  selector: 'add-question-dialog',
  templateUrl: 'add-question-dialog.html',
  styleUrls: ['./questions-section.component.scss']
})
export class AddQuestionDialog {
  newTag;
  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  onNoClick(): void {
    this.data.tags = [];
    this.dialogRef.close();
  }

  displayTagInput() {
    let add_input = document.getElementById("TagInput");

    if (add_input.style.display === "none") {
      add_input.style.display = "block";
    }
    else {
      this.newTag = null
      add_input.style.display = "none";
    }
  }
  
  addNewTag() {
    let found;
    if (this.newTag) {
      found = this.data.questionTags.find(x => x.name == this.newTag);
      if (!found) { this.data.questionTags.push({ name: this.newTag }); }
      this.data.tags = this.data.tags|| [];
      this.data.tags.push(this.newTag);
    }
    this.displayTagInput()
  }


}