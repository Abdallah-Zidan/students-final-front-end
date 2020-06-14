import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/education/models/post.model';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.scss'],
})
export class SingleCompanyComponent implements OnInit {
  @Input() post: Post;
  @Input() group: Group;
  @Input() resource;
  @Input() type;
  constructor() {}

  ngOnInit(): void {}
}
