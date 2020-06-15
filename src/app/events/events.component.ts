import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';
import { Subscription } from 'rxjs';
import { Post } from '../education/models/post.model';
import { PostsService } from '../education/services/posts.service';
import { StorageService } from '../services/storage.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  facultyGroups = this.postsService.facultyGroups;
  posts: Post[] = [];
  currentGroup: Group;
  resource = 'events';
  type = '0';
  user: User;
  private subscription: Subscription;
  constructor(
    private postsService: PostsService,
    private groupsService: GroupsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
    if (this.facultyGroups.length < 0) {
      this.groupsService.getGroups(this.storage.getUser('user'));
    }
    this.subscription = this.postsService.posts.subscribe((posts) => {
      this.posts = posts;
    });
    this.activatedRoute.params.subscribe((map) => {
      console.log(this.activatedRoute);
      const key = 'id';
      const key2 = 'scope';
      const id = map[key];
      const scope = map[key2];
      let tmp;
      if (this.user.role !== 4) {
        tmp = this.groupsService.facultyGroups[0].id;
      }
      if (id === 'all' && +scope === 3) {
        this.currentGroup = null;
        this.getPosts(this.resource, '2', null, 1);
      } else {
        if (id && scope) {
          this.currentGroup = this.groupsService.getGroup(id, scope);
        } else {
          this.router.navigate(['/events', 1, tmp]);
        }
        if (this.currentGroup) {
          console.log(this.currentGroup);

          this.getPosts(
            'events',
            (+this.currentGroup.scope - 1).toString(),
            this.currentGroup.id,
            1
          );
        } else {
          this.router.navigate(['/events', 1, tmp]);
        }
      }
    });
  }

  getPosts(resource, scope, id, page) {
    this.postsService.getPosts(resource, scope, id, this.type, page);
  }
  onLoadMore() {
    if (this.currentGroup) {
      this.postsService.loadMore(
        'events',
        (+this.currentGroup.scope - 1).toString(),
        this.currentGroup.id,
        this.type
      );
    } else {
      this.postsService.loadMore(this.resource, '2', null, this.type);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
