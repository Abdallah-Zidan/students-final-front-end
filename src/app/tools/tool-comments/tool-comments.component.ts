import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tool-comments',
  templateUrl: './tool-comments.component.html',
  styleUrls: ['./tool-comments.component.scss']
})
export class ToolCommentsComponent implements OnInit {

  constructor() { }

  panelOpenState = false;
  @Input() comments;
  @Input() tool;

  ngOnInit(): void {
    console.log(this.tool)
  }

}
