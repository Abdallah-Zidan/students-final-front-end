import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.model';

@Component({
	selector: 'app-show-dialog',
	templateUrl: './show-dialog.component.html',
	styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {
	user: User;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.user = data.user
	}

	ngOnInit(): void { }
}