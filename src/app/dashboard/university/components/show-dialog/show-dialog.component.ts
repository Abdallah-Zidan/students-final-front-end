import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { University } from '../../models/university.model';

@Component({
	selector: 'app-show-dialog',
	templateUrl: './show-dialog.component.html',
	styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {
	university: University;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.university = data.university
	}

	ngOnInit(): void { }
}