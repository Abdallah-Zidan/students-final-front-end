import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: User;
  color: string;
  isOpened  = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storage: StorageService,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.user = this.storage.getUser('user');

    if (this.router.url.includes('/messages')) {
      this.isOpened = true;
    }
  }
  onLogout() {
    this.authService.logout();
  }

  changeColor(color) {
    this.color = color;
  }
}
