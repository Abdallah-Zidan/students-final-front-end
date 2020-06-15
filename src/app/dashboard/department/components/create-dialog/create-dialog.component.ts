import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from '../../models/department.model';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	form: FormGroup;
	department: Department;
	onSubmitd = new EventEmitter<Department>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.department = data.department
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.department.name, [
				Validators.required
			])
		});
	}

	onSubmit(event) {
		this.isBusy = true;
		let department = new Department(this.department.id, this.form.get('name').value);
		this.onSubmitd.emit(department);
	}
}