import { Component, OnInit, OnDestroy } from '@angular/core';

import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';
import { Subscription } from 'rxjs';
import { Post } from '../education/models/post.model';
import { PostsService } from '../education/services/posts.service';
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
  private subscription: Subscription;
  constructor(
    private postsService: PostsService,
    private groupsService: GroupsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.facultyGroups.length < 0) {
      this.groupsService.getGroups();
    }
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
      const tmp = this.groupsService.facultyGroups[0].id;
      if (id === 'all' && +scope === 3 && this.type) {
        this.currentGroup = null;
        this.getPosts(this.resource, '2', null, 1);
      } else {
        if (id && scope && this.type) {
          this.currentGroup = this.groupsService.getGroup(id, scope);
        } else {
          this.router.navigate(['/companies', 1, 1, tmp]);
        }
        if (this.currentGroup && ['1', '2', '4'].includes(this.type)) {
          this.getPosts(
            'events',
            (+this.currentGroup.scope - 1).toString(),
            this.currentGroup.id,
            1
          );
        } else {
          this.router.navigate(['/companies', 1, 1, tmp]);
        }
      }
    });
  }

  getPosts(resource, scope, id, page) {
    this.postsService.getPosts(resource, scope, id, this.type, page);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
