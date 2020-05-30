import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private groupsService: GroupsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  facultyGroups = this.postsService.facultyGroups;
  departmentGroups = this.postsService.departmentGroups;
  posts: Post[] = [];
  ngOnInit(): void {
    if (this.departmentGroups.length < 0) {
      this.groupsService.getGroups();
    }
    this.postsService.posts.subscribe((posts) => {
      this.posts = posts;
    });
    this.activatedRoute.params.subscribe((map) => {
      const key = 'id';
      const id = map[key];
      let group: Group;
      if (id) {
        group = this.groupsService.getGroup(id);
      } else {
        group = this.groupsService.departmentGroups[0];
      }
      if (group) {
        this.getPosts(group.scope, group.id, 1);
      } else {
        this.router.navigate(['/groups']);
      }
    });
  }
  getPosts(scope, id, page) {
    this.postsService.getPosts(scope, id, page);
  }
}
