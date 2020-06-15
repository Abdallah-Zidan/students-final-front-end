import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Faculty } from '../../models/faculty.model';

@Component({
	selector: 'app-show-dialog',
	templateUrl: './show-dialog.component.html',
	styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {
	faculty: Faculty;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.faculty = data.faculty
	}

	ngOnInit(): void { }
}