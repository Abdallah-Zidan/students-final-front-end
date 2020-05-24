import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  public isMenuCollapsed = true;
  constructor(private authService: AuthService) {}
  title = 'test-project';
  isAuthenticated = false;
  private userSubcription: Subscription;

  ngOnInit() {
    this.userSubcription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
