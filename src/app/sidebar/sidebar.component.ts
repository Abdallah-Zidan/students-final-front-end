import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { User } from '../auth/user.model';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../auth/services/auth.service';
import { GroupsService } from '../services/groups.service';
import { Group } from '../shared/models/group.model';

// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200)),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  user: User;
  menus = [];
  
  constructor(
    public sidebarservice: SidebarService,
    private storage: StorageService,
    private authService: AuthService,
    private groupsService: GroupsService
  ) {}

  ngOnInit() {
    this.user = this.storage.getUser('user');
    if (this.groupsService.departmentGroups.length < 1) {
      this.groupsService.getGroups();
    }
    this.menus = this.getMenuList();
  }
  getDepartmentgroups(groupRoute) {
    return this.groupsService.departmentGroups.map((group) => {
      return { title: group.name, scope: 0, id: group.id, route: groupRoute };
    });
  }
  getFacultygroups(groupRoute) {
    return this.groupsService.facultyGroups.map((group) => {
      return { title: group.name, scope: 1, id: group.id, route: groupRoute };
    });
  }
  getUniversitygroups(groupRoute) {
    console.log(this.groupsService.universityGroups);
    
    return this.groupsService.universityGroups.map((group) => {
      return { title: group.name, scope: 2, id: group.id, route: groupRoute };
    });
  }
  onLogout() {
    this.authService.logout();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
  getMenuList() {
    return [
      {
        title: 'Navigate to',
        type: 'header',
      },

      {
        title: 'Department Groups',
        icon: 'fa fa-users',
        active: false,
        type: 'dropdown',
        submenus: this.getDepartmentgroups('groups'),
      },
      {
        title: 'Faculty Groups',
        icon: 'fa fa-university',
        active: false,
        type: 'dropdown',
        submenus: this.getFacultygroups('groups'),
      },
      {
        title: 'Faculty Announcement',
        icon: 'far fa-gem',
        active: false,
        type: 'dropdown',
        submenus: this.getFacultygroups('announcements')
      },
      {
        title: 'University Announcement',
        icon: 'far fa-gem',
        active: false,
        type: 'dropdown',
        submenus: this.getUniversitygroups('announcements')
      },
      {
        title: 'Events',
        icon: 'fa fa-chart-line',
        active: false,
        type: 'dropdown',
        submenus: [
          {
            title: 'Faculty',
          },
          {
            title: 'University',
          },
          {
            title: 'All Universities',
          },
        ],
      },
      {
        title: 'Companies',
        icon: 'fa fa-globe',
        active: false,
        type: 'dropdown',
        submenus: [
          {
            title: 'Events',
          },
          {
            title: 'Job offers',
          },
          {
            title: 'Trainings',
          },
        ],
      },
      {
        title: 'Extra',
        type: 'header',
      },
      {
        title: 'Tools Sharing',
        icon: 'fa fa-book',
        active: false,
        type: 'simple',
        badge: {
          text: 'Beta',
          class: 'badge-primary',
        },
      },
      {
        title: 'Calendar',
        icon: 'fa fa-calendar',
        active: false,
        type: 'simple',
      },
      {
        title: 'Examples',
        icon: 'fa fa-folder',
        active: false,
        type: 'simple',
      },
    ];
  }
}
