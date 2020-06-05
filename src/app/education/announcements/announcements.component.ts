import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  posts: Post[] = [];
  currentGroup: Group;
  constructor(
    private postsService: PostsService,
    private groupsService: GroupsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
