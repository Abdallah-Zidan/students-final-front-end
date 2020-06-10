import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: User;
  color: string;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storage: StorageService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.user = this.storage.getUser('user');
  }
  onLogout() {
    this.authService.logout();
  }

  changeColor(color) {
    this.color = color;
  }
}
