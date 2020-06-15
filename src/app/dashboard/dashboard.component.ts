import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User as AuthUser } from '../auth/user.model';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	user: AuthUser;

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.user = user);
	}
}