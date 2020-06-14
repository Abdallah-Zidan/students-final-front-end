import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarService } from './sidebar/sidebar.service';

import { trigger, transition, group, style, query, animate } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
          ], { optional: true }),
          query(':enter', animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' })), { optional: true } ),
        ]),
      ]),

    ])]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, public sidebarservice: SidebarService) { }
  title = 'test-project';
  ngOnInit() {
    this.authService.autoLogin();
  }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  getDepth(outlet) {
    // tslint:disable-next-line:no-string-literal
    return outlet.activatedRouteData['depth'];
  }
}
