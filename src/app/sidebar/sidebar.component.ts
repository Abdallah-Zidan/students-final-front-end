import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { User } from '../auth/user.model';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../auth/services/auth.service';
import { GroupsService } from '../services/groups.service';


// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  user: User;
  menus = [];
  constructor(
    public sidebarservice: SidebarService,
    private storage: StorageService,
    private authService: AuthService,
    private groupsService: GroupsService) {
    this.menus = sidebarservice.getMenuList();
  }



  ngOnInit() {
    this.user = this.storage.getUser('user');
    if (this.groupsService.departmentGroups.length < 1) {
      this.groupsService.getGroups();
    }
    const departmentGroups = this.groupsService.departmentGroups;
    const facultyGroups = this.groupsService.facultyGroups;
  }


  onLogout() {
    this.authService.logout();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
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

}
