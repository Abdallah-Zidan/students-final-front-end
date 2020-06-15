import { Component, OnInit, OnDestroy } from '@angular/core';

import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';
import { Subscription } from 'rxjs';
import { Post } from '../education/models/post.model';
import { PostsService } from '../education/services/posts.service';
import { StorageService } from '../services/storage.service';
import { User } from '../auth/user.model';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  facultyGroups = this.postsService.facultyGroups;
  posts: Post[] = [];
  currentGroup: Group;
  resource = 'events';
  type;
  image: string;
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
    this.subscription = this.postsService.posts.subscribe((posts) => {
      this.posts = posts;
    });
    this.activatedRoute.params.subscribe((map) => {
      const key = 'id';
      const key2 = 'scope';
      const key3 = 'type';
      const id = map[key];
      const scope = map[key2];
      this.type = map[key3];
      let tmp: Group;
      if (
        this.groupsService.facultyGroups &&
        this.groupsService.facultyGroups[0]
      ) {
        tmp = this.groupsService.facultyGroups[0];
      } else {
        tmp = new Group(null, 'all system', '3');
      }
      if (id === 'all' && +scope === 3 && this.type) {
        this.currentGroup = null;
        if (this.user.role === 4) {
          this.getPosts(this.resource, null, null, 1);
        } else {
          this.getPosts(this.resource, '2', null, 1);
        }
      } else {
        if (id && scope && this.type) {
          this.currentGroup = this.groupsService.getGroup(id, scope);
        } else {
          this.currentGroup = tmp;
          this.router.navigate([
            '/companies',
            1,
            tmp.id ? 1 : 3,
            tmp.id ? tmp.id : 'all',
          ]);
        }
        if (this.currentGroup && ['1', '2', '4'].includes(this.type)) {
          this.getPosts(
            'events',
            (+this.currentGroup.scope - 1).toString(),
            this.currentGroup.id,
            1
          );
        } else {
          this.currentGroup = tmp;
          this.router.navigate([
            '/companies',
            1,
            tmp.id ? 1 : 3,
            tmp.id ? tmp.id : 'all',
          ]);
        }
      }
    });
  }

  getPosts(resource, scope, id, page) {
    this.postsService.getPosts(resource, scope, id, this.type, page);
    if (+this.type === 1) {
      this.image = 'trainings';
    } else if (+this.type === 4) {
      this.image = 'job offers';
    } else if (+this.type === 2) {
      this.image = 'companies';
    }
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
      if (this.user.role === 4) {
        this.postsService.loadMore(this.resource, null, null, this.type);
      } else {
        this.postsService.loadMore(this.resource, '2', null, this.type);
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
