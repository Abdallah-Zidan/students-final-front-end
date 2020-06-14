import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/course.model';

@Component({
	selector: 'app-show-dialog',
	templateUrl: './show-dialog.component.html',
	styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {
	course: Course;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.course = data.course
	}

	ngOnInit(): void { }
}