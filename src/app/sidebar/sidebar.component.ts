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
import { ToolsComponent } from '../tools/tools.component';

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
  isTrue = false;
  menus = [];
  constructor(
    public sidebarservice: SidebarService,
    private storage: StorageService,
    private authService: AuthService,
    private groupsService: GroupsService
  ) {}

  ngOnInit() {
    this.user = this.storage.getUser('user');
    this.groupsService.getGroups(this.storage.getUser('user'));
    this.menus = this.getMenuList();
  }
  getDepartmentgroups(groupRoute) {
    if (this.groupsService.departmentGroups) {
      return this.groupsService.departmentGroups.map((group) => {
        return { title: group.name, scope: 0, id: group.id, route: groupRoute };
      });
    }
    return null;
  }
  getFacultygroups(groupRoute) {
    if (this.groupsService.facultyGroups) {
      return this.groupsService.facultyGroups.map((group) => {
        return { title: group.name, scope: 1, id: group.id, route: groupRoute };
      });
    }
    return null;
  }
  getUniversitygroups(groupRoute) {
    if (this.groupsService.universityGroups) {
      return this.groupsService.universityGroups.map((group) => {
        return { title: group.name, scope: 2, id: group.id, route: groupRoute };
      });
    }
    return null;
  }
  getFacUniGroups(groupRoute) {
    if (this.user.role === 4) {
      return this.getAllSystemGroup(groupRoute);
    }
    return this.getFacultygroups(groupRoute)
      .concat(this.getUniversitygroups(groupRoute))
      .concat(this.getAllSystemGroup(groupRoute));
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  getAllSystemGroup(groupRoute) {
    return [{ title: 'All system', scope: 3, id: null, route: groupRoute }];
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element) => {
        if (element) {
          if (element === currentMenu) {
            currentMenu.active = !currentMenu.active;
          } else {
            element.active = false;
          }
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
    if(this.user.personalData.type=="Student")
          return [
            {
              title: 'Navigate to',
              type: 'header',
            },
            [1, 2].includes(this.user.role)
              ? {
                  title: 'Department Groups',
                  icon: 'fa fa-users',
                  active: false,
                  type: 'dropdown',
                  submenus: this.getDepartmentgroups('groups'),
                }
              : null,
            [1, 2, 3].includes(this.user.role)
              ? {
                  title: 'Faculty Groups',
                  icon: 'fa fa-university',
                  active: false,
                  type: 'dropdown',
                  submenus: this.getFacultygroups('groups'),
                }
              : null,
            [1, 2, 3].includes(this.user.role)
              ? {
                  title: 'Announcements',
                  icon: 'fa fa-university',
                  active: false,
                  type: 'dropdown',
                  submenus: this.getFacUniGroups('announcements'),
                }
              : null,
            {
              title: 'Events',
              icon: 'fa fa-calendar',
              active: false,
              type: 'dropdown',
              submenus: this.getFacUniGroups('events'),
            },
            {
              title: 'Trainings',
              icon: 'fa fa-globe',
              active: false,
              type: 'dropdown',
              submenus: this.getFacUniGroups('companies'),
              typo: 1,
            },
            {
              title: 'Internships',
              icon: 'fa fa-globe',
              active: false,
              type: 'dropdown',
              submenus: this.getFacUniGroups('companies'),
              typo: 2,
            },
            {
              title: 'Job Offers',
              icon: 'fa fa-globe',
              active: false,
              type: 'dropdown',
              submenus: this.getFacUniGroups('companies'),
              typo: 4,
            },
            {
              title: 'Extra',
              type: 'header',
            },
            {
              title: 'Tools Sharing',
              icon: 'fa fa-handshake-o',
              active: false,
              type: 'simple',
              badge: {
                text: 'Beta',
                class: 'badge-primary',
              },
              link:'/tools',
            },
            {
              title: 'Sharing Habitations',
              icon: 'fa fa-home',
              active: false,
              type: 'simple',
              badge: {
                text: 'Beta',
                class: 'badge-primary',
              },
              link:'/transportition',
            },
            {
              title: 'Questions',
              icon: 'fa fa-question',
              active: false,
              type: 'simple',
              badge: {
                text: 'Beta',
                class: 'badge-primary',
              },
              link:'/questions',
            },
            // {
            //   title: 'Calendar',
            //   icon: 'fa fa-calendar',
            //   active: false,
            //   type: 'simple',
            // },
            // {
            //   title: 'Examples',
            //   icon: 'fa fa-folder',
            //   active: false,
            //   type: 'simple',
            // },
          ];
    else
        return [
          {
            title: 'Navigate to',
            type: 'header',
          },
          [1, 2].includes(this.user.role)
            ? {
                title: 'Department Groups',
                icon: 'fa fa-users',
                active: false,
                type: 'dropdown',
                submenus: this.getDepartmentgroups('groups'),
              }
            : null,
          [1, 2, 3].includes(this.user.role)
            ? {
                title: 'Faculty Groups',
                icon: 'fa fa-university',
                active: false,
                type: 'dropdown',
                submenus: this.getFacultygroups('groups'),
              }
            : null,
          [1, 2, 3].includes(this.user.role)
            ? {
                title: 'Announcements',
                icon: 'fa fa-university',
                active: false,
                type: 'dropdown',
                submenus: this.getFacUniGroups('announcements'),
              }
            : null,
          {
            title: 'Events',
            icon: 'fa fa-calendar',
            active: false,
            type: 'dropdown',
            submenus: this.getFacUniGroups('events'),
          },
          {
            title: 'Trainings',
            icon: 'fa fa-globe',
            active: false,
            type: 'dropdown',
            submenus: this.getFacUniGroups('companies'),
            typo: 1,
          },
          {
            title: 'Internships',
            icon: 'fa fa-globe',
            active: false,
            type: 'dropdown',
            submenus: this.getFacUniGroups('companies'),
            typo: 2,
          },
          {
            title: 'Job Offers',
            icon: 'fa fa-globe',
            active: false,
            type: 'dropdown',
            submenus: this.getFacUniGroups('companies'),
            typo: 4,
          },
          {
            title: 'Extra',
            type: 'header',
          },
          
          {
            title: 'Questions',
            icon: 'fa fa-question',
            active: false,
            type: 'simple',
            badge: {
              text: 'Beta',
              class: 'badge-primary',
            },
            link:'/questions',
          },
          // {
          //   title: 'Calendar',
          //   icon: 'fa fa-calendar',
          //   active: false,
          //   type: 'simple',
          // },
          // {
          //   title: 'Examples',
          //   icon: 'fa fa-folder',
          //   active: false,
          //   type: 'simple',
          // },
        ];
  }
  changeTheme() {
    this.isTrue = !this.isTrue;
  }
}
