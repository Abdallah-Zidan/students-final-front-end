import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from '../../models/department.model';

@Component({
	selector: 'app-show-dialog',
	templateUrl: './show-dialog.component.html',
	styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {
	department: Department;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.department = data.department
	}

	ngOnInit(): void { }
}