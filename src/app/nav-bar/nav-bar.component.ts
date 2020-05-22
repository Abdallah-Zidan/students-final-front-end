import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubcription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubcription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy(){
    this.userSubcription.unsubscribe();
  }
}
