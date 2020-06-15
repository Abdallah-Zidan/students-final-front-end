import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { University } from '../../models/university.model';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	form: FormGroup;
	university: University;
	onSubmitd = new EventEmitter<University>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.university = data.university
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(this.university.name, [
				Validators.required
			])
		});
	}

	onSubmit(event) {
		this.isBusy = true;
		let university = new University(this.university.id, this.form.get('name').value);
		this.onSubmitd.emit(university);
	}
}