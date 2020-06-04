import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  signUp = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.activatedRoute.routeConfig.path === 'register') {
      this.signUp = true;
    } else {
      this.signUp = false;
    }
  }
}
