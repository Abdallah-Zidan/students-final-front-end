import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/course.model';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	form: FormGroup;
	course: Course;
	onSubmitd = new EventEmitter<Course>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.course = data.course
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.course.name, [
				Validators.required
			]),
			description: new FormControl(this.course.description, [
				Validators.required
			])
		});
	}

	onSubmit(event) {
		this.isBusy = true;
		let course = new Course(this.course.id, this.form.get('name').value, this.form.get('description').value);
		this.onSubmitd.emit(course);
	}
}