import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  panelOpenState = false;

  isEmpty = true;

  onCommenting($event){
    if($event.target.value){
      this.isEmpty = false;
    }
    else{
      this.isEmpty = true;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
